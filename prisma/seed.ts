import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// const prisma = new PrismaClient()
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

/**
 * Product imagery, keyed by product name.
 *
 * Swap any value here and re-run the seed — no other line in this file
 * references an image URL.
 *
 * The defaults are Unsplash photos (Unsplash License: free for commercial use,
 * no attribution, hotlinking supported).
 *
 * Using pngtree assets instead: their CDN returns 403 to direct requests and
 * their free tier is licensed for personal use only, so pasting a pngtree page
 * URL here will not work. Download the asset under a licence that covers
 * commercial use, upload it (the app already has Cloudinary wired up — see
 * `src/app/api/upload/route.ts`), then paste the resulting Cloudinary URL.
 *
 * The product cards render with `object-contain` on a white field, so
 * transparent PNG cut-outs will look closest to the design comps.
 */
const PRODUCT_IMAGES: Record<string, string> = {
  // ── Bowls ────────────────────────────────────────────────
  'Grilled Salmon Bowl':
    'https://res.cloudinary.com/du02cjd0v/image/upload/v1785250384/Grilled_Salmon_Bowl_puqhzn.png',
  'Quinoa Power Bowl':
    'https://res.cloudinary.com/du02cjd0v/image/upload/v1785250165/Quinoa_Power_Bowl_etzzsl.png',
  'Teriyaki Chicken Bowl':
    'https://res.cloudinary.com/du02cjd0v/image/upload/v1785250161/Teriyaki_Chicken_Bowl_xtujev.png',

  // ── Wraps ────────────────────────────────────────────────
  'Avocado Power Wrap':
    'https://res.cloudinary.com/du02cjd0v/image/upload/v1785250692/Avocado_Power_Wrap_rbwqrs.png',
  'Falafel & Hummus Wrap':
    'https://res.cloudinary.com/du02cjd0v/image/upload/v1785250160/Falafel_Hummus_Wrap_xlq1ub.png',
  'Smoked Turkey Wrap':
    'https://res.cloudinary.com/du02cjd0v/image/upload/v1785250161/Smoked_Turkey_Wrap_grftkx.png',

  // ── Salads ───────────────────────────────────────────────
  'Quinoa Garden Salad':
    'https://res.cloudinary.com/du02cjd0v/image/upload/v1785250161/Quinoa_Garden_Salad_vkc93u.png',
  'Greek Salad':
    'https://res.cloudinary.com/du02cjd0v/image/upload/v1785250161/Greek_Salad_rqotu8.png',
  'Caesar Salad':
    'https://res.cloudinary.com/du02cjd0v/image/upload/v1785250161/Caesar_Salad_iojakz.png',

  // ── Soups ────────────────────────────────────────────────
  'Tomato Basil Soup':
    'https://res.cloudinary.com/du02cjd0v/image/upload/v1785250162/Tomato_Basil_Soup_oze0a5.png',
  'Lentil Soup':
    'https://res.cloudinary.com/du02cjd0v/image/upload/v1785250160/Lentil_Soup_rrxrqc.png',

  // ── Juices ───────────────────────────────────────────────
  'Green Detox Juice':
    'https://res.cloudinary.com/du02cjd0v/image/upload/v1785250161/Green_Detox_Juice_il4hiv.png',
  'Orange Sunrise Juice':
    'https://res.cloudinary.com/du02cjd0v/image/upload/v1785250160/Orange_Sunrise_Juice_trmqdr.png',
  'Berry Blast Juice':
    'https://res.cloudinary.com/du02cjd0v/image/upload/v1785250160/Berry_Blast_Juice_cuflkx.png'
}

/** Fails loudly rather than seeding a product with an empty image. */
const productImage = (name: string) => {
  const url = PRODUCT_IMAGES[name]
  if (!url) throw new Error(`No image mapped for product "${name}" — add it to PRODUCT_IMAGES.`)
  return url
}

async function main() {
  console.log('🌱 Seeding database...')

  // Clean existing data
  await prisma.orderProductExtras.deleteMany()
  await prisma.orderProduct.deleteMany()
  await prisma.order.deleteMany()
  await prisma.extras.deleteMany()
  await prisma.sizes.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // Categories
  const bowls = await prisma.category.create({ data: { name: 'Bowls', nameAr: 'أطباق' } })
  const wraps = await prisma.category.create({ data: { name: 'Wraps', nameAr: 'راب' } })
  const salads = await prisma.category.create({ data: { name: 'Salads', nameAr: 'سلطات' } })
  const soups = await prisma.category.create({ data: { name: 'Soups', nameAr: 'شوربات' } })
  const juices = await prisma.category.create({ data: { name: 'Juices', nameAr: 'عصائر' } })

  console.log('✅ Categories created')

  // ─── BOWLS ───────────────────────────────────────────────
  await prisma.product.create({
    data: {
      name: 'Grilled Salmon Bowl',
      nameAr: 'طبق سلمون مشوي',
      description:
        'Omega-rich grilled salmon fillet served over brown rice with steamed broccoli, avocado slices, and a sesame ginger drizzle.',
      descriptionAr:
        'فيليه سلمون مشوي غني بأوميغا ٣ يُقدّم على أرز بني مع بروكلي مطهو بالبخار وشرائح أفوكادو وصوص السمسم بالزنجبيل.',
      image: productImage('Grilled Salmon Bowl'),
      basePrice: 14.9,
      categoryId: bowls.id,
      sizes: {
        create: [
          { name: 'SMALL', price: 0 },
          { name: 'MEDIUM', price: 2.5 },
          { name: 'LARGE', price: 4.5 }
        ]
      },
      extras: {
        create: [
          { name: 'CHEESE', price: 1.0 },
          { name: 'TOMATO', price: 0.5 }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      name: 'Quinoa Power Bowl',
      nameAr: 'طبق الكينوا بالبروتين',
      description:
        'Protein-packed quinoa base topped with roasted chickpeas, cherry tomatoes, cucumber, red onion, and lemon tahini dressing.',
      descriptionAr:
        'قاعدة كينوا غنية بالبروتين مع حمص محمّص وطماطم كرزية وخيار وبصل أحمر وصوص الطحينة بالليمون.',
      image: productImage('Quinoa Power Bowl'),
      basePrice: 12.5,
      categoryId: bowls.id,
      sizes: {
        create: [
          { name: 'SMALL', price: 0 },
          { name: 'MEDIUM', price: 2.0 },
          { name: 'LARGE', price: 4.0 }
        ]
      },
      extras: {
        create: [
          { name: 'CHEESE', price: 1.0 },
          { name: 'ONION', price: 0.5 }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      name: 'Teriyaki Chicken Bowl',
      nameAr: 'طبق دجاج تيرياكي',
      description:
        'Tender grilled chicken glazed in homemade teriyaki sauce, served with jasmine rice, edamame, shredded carrots, and sesame seeds.',
      descriptionAr:
        'دجاج مشوي طري بصوص التيرياكي المُعد منزليًا، يُقدّم مع أرز الياسمين والإدامامي والجزر المبروش وحبوب السمسم.',
      image: productImage('Teriyaki Chicken Bowl'),
      basePrice: 13.5,
      categoryId: bowls.id,
      sizes: {
        create: [
          { name: 'SMALL', price: 0 },
          { name: 'MEDIUM', price: 2.5 },
          { name: 'LARGE', price: 4.5 }
        ]
      },
      extras: {
        create: [
          { name: 'PEPPER', price: 0.5 },
          { name: 'ONION', price: 0.5 }
        ]
      }
    }
  })

  console.log('✅ Bowls created')

  // ─── WRAPS ───────────────────────────────────────────────
  await prisma.product.create({
    data: {
      name: 'Avocado Power Wrap',
      nameAr: 'راب الأفوكادو',
      description:
        'Whole-wheat wrap filled with smashed avocado, grilled chicken strips, mixed greens, tomato, and a drizzle of chipotle mayo.',
      descriptionAr:
        'خبز قمح كامل محشو بالأفوكادو المهروس وشرائح دجاج مشوي وخضروات ورقية وطماطم ولمسة من مايونيز الشيبوتلي.',
      image: productImage('Avocado Power Wrap'),
      basePrice: 11.5,
      categoryId: wraps.id,
      sizes: {
        create: [
          { name: 'SMALL', price: 0 },
          { name: 'MEDIUM', price: 1.5 },
          { name: 'LARGE', price: 3.0 }
        ]
      },
      extras: {
        create: [
          { name: 'CHEESE', price: 1.0 },
          { name: 'BACON', price: 1.5 }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      name: 'Falafel & Hummus Wrap',
      nameAr: 'راب الفلافل والحمص',
      description:
        'Crispy baked falafel with creamy hummus, pickled red cabbage, fresh parsley, and harissa in a warm flatbread wrap.',
      descriptionAr:
        'فلافل مقرمشة مخبوزة مع حمص كريمي وملفوف أحمر مخلل وبقدونس طازج وهريسة داخل خبز مسطح دافئ.',
      image: productImage('Falafel & Hummus Wrap'),
      basePrice: 10.0,
      categoryId: wraps.id,
      sizes: {
        create: [
          { name: 'SMALL', price: 0 },
          { name: 'MEDIUM', price: 1.5 },
          { name: 'LARGE', price: 3.0 }
        ]
      },
      extras: {
        create: [
          { name: 'TOMATO', price: 0.5 },
          { name: 'ONION', price: 0.5 }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      name: 'Smoked Turkey Wrap',
      nameAr: 'راب الديك الرومي المدخن',
      description:
        'Sliced smoked turkey breast with Swiss cheese, romaine lettuce, dijon mustard, and sun-dried tomatoes in a spinach tortilla.',
      descriptionAr:
        'شرائح صدور ديك رومي مدخنة مع جبنة سويسرية وخس روماني وخردل ديجون وطماطم مجففة في تورتيلا السبانخ.',
      image: productImage('Smoked Turkey Wrap'),
      basePrice: 11.0,
      categoryId: wraps.id,
      sizes: {
        create: [
          { name: 'SMALL', price: 0 },
          { name: 'MEDIUM', price: 1.5 },
          { name: 'LARGE', price: 3.0 }
        ]
      },
      extras: {
        create: [
          { name: 'CHEESE', price: 1.0 },
          { name: 'BACON', price: 1.5 }
        ]
      }
    }
  })

  console.log('✅ Wraps created')

  // ─── SALADS ──────────────────────────────────────────────
  await prisma.product.create({
    data: {
      name: 'Quinoa Garden Salad',
      nameAr: 'سلطة الكينوا بالخضروات',
      description:
        'A refreshing mix of quinoa, seasonal vegetables, roasted seeds, cucumber ribbons, and a bright lemon tahini dressing.',
      descriptionAr:
        'خليط منعش من الكينوا وخضروات الموسم والبذور المحمّصة وشرائح الخيار مع صوص الطحينة بالليمون.',
      image: productImage('Quinoa Garden Salad'),
      basePrice: 10.0,
      categoryId: salads.id,
      sizes: {
        create: [
          { name: 'SMALL', price: 0 },
          { name: 'MEDIUM', price: 1.5 },
          { name: 'LARGE', price: 3.0 }
        ]
      },
      extras: {
        create: [
          { name: 'CHEESE', price: 1.0 },
          { name: 'TOMATO', price: 0.5 }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      name: 'Greek Salad',
      nameAr: 'سلطة يونانية',
      description:
        'Classic Greek salad with romaine lettuce, Kalamata olives, red onion, cucumber, ripe tomatoes, and crumbled feta with oregano vinaigrette.',
      descriptionAr:
        'سلطة يونانية كلاسيكية بالخس الروماني وزيتون كالاماتا وبصل أحمر وخيار وطماطم ناضجة وجبنة فيتا مع صوص الأوريغانو.',
      image: productImage('Greek Salad'),
      basePrice: 9.5,
      categoryId: salads.id,
      sizes: {
        create: [
          { name: 'SMALL', price: 0 },
          { name: 'MEDIUM', price: 1.5 },
          { name: 'LARGE', price: 3.0 }
        ]
      },
      extras: {
        create: [
          { name: 'CHEESE', price: 1.0 },
          { name: 'ONION', price: 0.5 }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      name: 'Caesar Salad',
      nameAr: 'سلطة سيزر',
      description:
        'Crisp romaine lettuce, parmesan shavings, house-made croutons, and a rich Caesar dressing with a hint of anchovy and lemon.',
      descriptionAr:
        'خس روماني مقرمش مع رقائق جبنة بارميزان وخبز محمّص منزلي وصوص سيزر غني بلمسة من الأنشوجة والليمون.',
      image: productImage('Caesar Salad'),
      basePrice: 9.0,
      categoryId: salads.id,
      sizes: {
        create: [
          { name: 'SMALL', price: 0 },
          { name: 'MEDIUM', price: 1.5 },
          { name: 'LARGE', price: 3.0 }
        ]
      },
      extras: {
        create: [
          { name: 'BACON', price: 1.5 },
          { name: 'CHEESE', price: 1.0 }
        ]
      }
    }
  })

  console.log('✅ Salads created')

  // ─── SOUPS ───────────────────────────────────────────────
  await prisma.product.create({
    data: {
      name: 'Lentil & Vegetable Soup',
      nameAr: 'شوربة عدس بالخضار',
      description:
        'Hearty red lentil soup slow-cooked with carrots, celery, cumin, and a squeeze of fresh lemon. Served with warm bread.',
      descriptionAr:
        'شوربة عدس أحمر دسمة مطهوة على نار هادئة مع الجزر والكرفس والكمون وعصرة ليمون طازج. تُقدّم مع خبز دافئ.',
      image: productImage('Tomato Basil Soup'),
      basePrice: 8.0,
      categoryId: soups.id,
      sizes: {
        create: [
          { name: 'SMALL', price: 0 },
          { name: 'MEDIUM', price: 1.5 },
          { name: 'LARGE', price: 3.0 }
        ]
      },
      extras: {
        create: [
          { name: 'PEPPER', price: 0.5 },
          { name: 'ONION', price: 0.5 }
        ]
      }
    }
  })

  await prisma.product.create({
    data: {
      name: 'Roasted Tomato Soup',
      nameAr: 'شوربة طماطم مشوية',
      description:
        'Velvety roasted tomato and basil soup blended smooth with a touch of cream and topped with herb-infused olive oil.',
      descriptionAr:
        'شوربة طماطم مشوية بالريحان ناعمة القوام مع لمسة من الكريمة وزيت زيتون بالأعشاب.',
      image: productImage('Lentil Soup'),
      basePrice: 7.5,
      categoryId: soups.id,
      sizes: {
        create: [
          { name: 'SMALL', price: 0 },
          { name: 'MEDIUM', price: 1.5 },
          { name: 'LARGE', price: 3.0 }
        ]
      },
      extras: {
        create: [
          { name: 'CHEESE', price: 1.0 },
          { name: 'PEPPER', price: 0.5 }
        ]
      }
    }
  })

  console.log('✅ Soups created')

  // ─── JUICES ──────────────────────────────────────────────
  await prisma.product.create({
    data: {
      name: 'Green Detox Juice',
      nameAr: 'عصير ديتوكس أخضر',
      description:
        'Cold-pressed blend of spinach, cucumber, green apple, ginger, and lemon. Refreshing and packed with vitamins.',
      descriptionAr:
        'خليط معصور على البارد من السبانخ والخيار والتفاح الأخضر والزنجبيل والليمون. منعش وغني بالفيتامينات.',
      image: productImage('Green Detox Juice'),
      basePrice: 6.5,
      categoryId: juices.id,
      sizes: {
        create: [
          { name: 'SMALL', price: 0 },
          { name: 'MEDIUM', price: 1.0 },
          { name: 'LARGE', price: 2.0 }
        ]
      },
      extras: { create: [] }
    }
  })

  await prisma.product.create({
    data: {
      name: 'Mango Sunrise',
      nameAr: 'شروق المانجو',
      description:
        'Tropical blend of fresh mango, orange juice, carrot, and a pinch of turmeric for a bright immune-boosting drink.',
      descriptionAr:
        'خليط استوائي من المانجو الطازج وعصير البرتقال والجزر ورشة كركم لمشروب منعش يدعم المناعة.',
      image: productImage('Orange Sunrise Juice'),
      basePrice: 6.0,
      categoryId: juices.id,
      sizes: {
        create: [
          { name: 'SMALL', price: 0 },
          { name: 'MEDIUM', price: 1.0 },
          { name: 'LARGE', price: 2.0 }
        ]
      },
      extras: { create: [] }
    }
  })

  await prisma.product.create({
    data: {
      name: 'Berry Blast Smoothie',
      nameAr: 'سموذي التوت',
      description:
        'Mixed berries, banana, almond milk, chia seeds, and a drizzle of honey blended into a thick, antioxidant-rich smoothie.',
      descriptionAr:
        'توت مشكّل وموز وحليب لوز وبذور الشيا ولمسة عسل، ممزوجة في سموذي كثيف غني بمضادات الأكسدة.',
      image: productImage('Berry Blast Juice'),
      basePrice: 7.0,
      categoryId: juices.id,
      sizes: {
        create: [
          { name: 'SMALL', price: 0 },
          { name: 'MEDIUM', price: 1.0 },
          { name: 'LARGE', price: 2.0 }
        ]
      },
      extras: { create: [] }
    }
  })

  console.log('✅ Juices created')

  // ─── BLOG ────────────────────────────────────────────────
  await prisma.blog.deleteMany()

  await prisma.blog.createMany({
    data: [
      {
        title: 'Pure is the most healthy and most nourishing food',
        slug: 'pure-is-the-most-healthy-and-nourishing-food',
        excerpt:
          'Why we build every menu around whole ingredients, and what "pure" actually means once it reaches your plate.',
        content:
          'Every dish on our menu starts as a whole ingredient. No powders, no concentrates, no shortcuts that survive a long shelf life at the cost of flavour.\n\nWe buy from farms we have walked. That means we know the soil, the water and the people, and we can tell you exactly where a tomato came from on any given week.\n\nPure is not a marketing word for us. It is a constraint. If an ingredient cannot be traced, it does not go in the pot.',
        image:
          'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=900&q=80',
        author: 'Akla Kitchen',
        views: 238
      },
      {
        title: "Nature's path organic food is a place to find",
        slug: 'natures-path-organic-food-is-a-place-to-find',
        excerpt:
          'A short guide to reading organic labels properly, and the three certifications that actually mean something.',
        content:
          'Organic labelling is a maze. Most shoppers read the word and stop there, which is exactly what the weakest certifications rely on.\n\nThere are three marks worth learning. Each one audits the farm rather than the packaging, and each one requires a paper trail that goes back several seasons.\n\nWe publish our suppliers for the same reason. If a claim cannot be checked by someone outside the company, it is not a claim — it is a slogan.',
        image:
          'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
        author: 'Akla Kitchen',
        views: 194
      },
      {
        title: 'Organics is a brand known for its focus on income',
        slug: 'organics-is-a-brand-known-for-its-focus-on-income',
        excerpt:
          'What paying farmers properly does to a menu, and why the cheapest ingredient is rarely the cheapest choice.',
        content:
          'Paying above market rate sounds like a cost problem. In practice it solves three others: supply stability, quality consistency, and the amount of food we throw away.\n\nA farm that can plan its season sells us the same quality in March as in September. That predictability is what lets our chefs write a menu six weeks ahead.\n\nThe cheapest crate on the market is usually the one somebody else rejected. We stopped buying those years ago and our waste dropped by a third.',
        image:
          'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
        author: 'Akla Kitchen',
        views: 176
      }
    ]
  })

  console.log('✅ Blog posts created')
  console.log('🎉 Seeding complete!')
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
