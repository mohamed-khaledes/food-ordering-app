'use server'

import { Pages, Routes } from '@/constants/enums'
import { db } from '@/lib/prisma'
import { getCurrentLocale, getTrans } from '@/lib/translations/server'
import { addProductSchema, updateProductSchema } from '@/validations/product'
import { Extras, ExtraIngredients, ProductSizes, Sizes } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const addProduct = async (
  args: {
    categoryId: string
    options: { sizes: Partial<Sizes>[]; extras: Partial<Extras>[] }
  },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale()
  const translations = await getTrans()
  const submittedValues = Object.fromEntries(formData.entries())
  const result = addProductSchema(translations).safeParse(submittedValues)
  if (result.success === false) {
    return {
      error: result.error.flatten().fieldErrors,
      status: 400,
      submittedValues
    }
  }
  const data: any = result.data
  const basePrice = Number(data.basePrice)
  const imageFile = data.image as File
  const imageUrl = Boolean(imageFile.size) ? await getImageUrl(imageFile) : undefined
  try {
    console.log({
      ...data,
      image: imageUrl,
      basePrice,
      categoryId: args.categoryId,
      sizes: {
        createMany: {
          data: args.options.sizes.map(size => ({
            name: size.name as ProductSizes,
            price: Number(size.price)
          }))
        }
      },
      extras: {
        createMany: {
          data: args.options.extras.map(extra => ({
            name: extra.name as ExtraIngredients,
            price: Number(extra.price)
          }))
        }
      }
    })
    if (imageUrl) {
      await db.product.create({
        data: {
          ...data,
          image: imageUrl,
          basePrice,
          categoryId: args.categoryId,
          sizes: {
            createMany: {
              data: args.options.sizes.map(size => ({
                name: size.name as ProductSizes,
                price: Number(size.price)
              }))
            }
          },
          extras: {
            createMany: {
              data: args.options.extras.map(extra => ({
                name: extra.name as ExtraIngredients,
                price: Number(extra.price)
              }))
            }
          }
        }
      })
      revalidatePath(`/${locale}/${Routes.MENU}`)
      revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`)
      revalidatePath(`/${locale}`)
      return {
        status: 201,
        message: translations.messages.productAdded
      }
    }
    return {}
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      message: translations.messages.unexpectedError
    }
  }
}

export const updateProduct = async (
  args: {
    productId: string
    options: { sizes: Partial<Sizes>[]; extras: Partial<Extras>[] }
  },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale()
  const translations = await getTrans()
  const result = updateProductSchema(translations).safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return {
      error: result.error.flatten().fieldErrors,
      status: 400,
      formData
    }
  }
  const data = result.data
  const basePrice = Number(data.basePrice)
  const imageFile = data.image as File
  const imageUrl = Boolean(imageFile.size) ? await getImageUrl(imageFile) : undefined

  const product = await db.product.findUnique({
    where: { id: args.productId }
  })

  if (!product) {
    return {
      status: 400,
      message: translations.messages.unexpectedError
    }
  }
  try {
    const updatedProduct = await db.product.update({
      where: {
        id: args.productId
      },
      data: {
        ...data,
        basePrice,
        image: imageUrl ?? product.image
      }
    })

    await db.sizes.deleteMany({
      where: { productId: args.productId }
    })
    await db.sizes.createMany({
      data: args.options.sizes.map(size => ({
        productId: args.productId,
        name: size.name as ProductSizes,
        price: Number(size.price)
      }))
    })

    await db.extras.deleteMany({
      where: { productId: args.productId }
    })

    await db.extras.createMany({
      data: args.options.extras.map(extra => ({
        productId: args.productId,
        name: extra.name as ExtraIngredients,
        price: Number(extra.price)
      }))
    })
    revalidatePath(`/${locale}/${Routes.MENU}`)
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`)
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${updatedProduct.id}/${Pages.EDIT}`
    )
    revalidatePath(`/${locale}`)
    return {
      status: 200,
      message: translations.messages.updateProductSucess
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      message: translations.messages.unexpectedError
    }
  }
}
const getImageUrl = async (imageFile: File) => {
  const formData = new FormData()
  formData.append('file', imageFile)
  formData.append('pathName', 'product_images')

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData
    })
    console.log(response)
    const image = (await response.json()) as { url: string }
    return image.url
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error)
  }
}

export const deleteProduct = async (id: string) => {
  const locale = await getCurrentLocale()
  const translations = await getTrans()
  try {
    await db.product.delete({
      where: { id }
    })
    revalidatePath(`/${locale}/${Routes.MENU}`)
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`)
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${id}/${Pages.EDIT}`)
    revalidatePath(`/${locale}`)
    return {
      status: 200,
      message: translations.messages.deleteProductSucess
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      message: translations.messages.unexpectedError
    }
  }
}
