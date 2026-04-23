import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// const prisma = new PrismaClient()
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

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
  const bowls = await prisma.category.create({ data: { name: 'Bowls' } })
  const wraps = await prisma.category.create({ data: { name: 'Wraps' } })
  const salads = await prisma.category.create({ data: { name: 'Salads' } })
  const soups = await prisma.category.create({ data: { name: 'Soups' } })
  const juices = await prisma.category.create({ data: { name: 'Juices' } })

  console.log('✅ Categories created')

  // ─── BOWLS ───────────────────────────────────────────────
  await prisma.product.create({
    data: {
      name: 'Grilled Salmon Bowl',
      description:
        'Omega-rich grilled salmon fillet served over brown rice with steamed broccoli, avocado slices, and a sesame ginger drizzle.',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
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
      description:
        'Protein-packed quinoa base topped with roasted chickpeas, cherry tomatoes, cucumber, red onion, and lemon tahini dressing.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
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
      description:
        'Tender grilled chicken glazed in homemade teriyaki sauce, served with jasmine rice, edamame, shredded carrots, and sesame seeds.',
      image: 'https://images.unsplash.com/photo-1604908177453-7462950a6a3b?w=600',
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
      description:
        'Whole-wheat wrap filled with smashed avocado, grilled chicken strips, mixed greens, tomato, and a drizzle of chipotle mayo.',
      image: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=600',
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
      description:
        'Crispy baked falafel with creamy hummus, pickled red cabbage, fresh parsley, and harissa in a warm flatbread wrap.',
      image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600',
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
      description:
        'Sliced smoked turkey breast with Swiss cheese, romaine lettuce, dijon mustard, and sun-dried tomatoes in a spinach tortilla.',
      image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600',
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
      description:
        'A refreshing mix of quinoa, seasonal vegetables, roasted seeds, cucumber ribbons, and a bright lemon tahini dressing.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600',
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
      description:
        'Classic Greek salad with romaine lettuce, Kalamata olives, red onion, cucumber, ripe tomatoes, and crumbled feta with oregano vinaigrette.',
      image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=600',
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
      description:
        'Crisp romaine lettuce, parmesan shavings, house-made croutons, and a rich Caesar dressing with a hint of anchovy and lemon.',
      image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600',
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
      description:
        'Hearty red lentil soup slow-cooked with carrots, celery, cumin, and a squeeze of fresh lemon. Served with warm bread.',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600',
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
      description:
        'Velvety roasted tomato and basil soup blended smooth with a touch of cream and topped with herb-infused olive oil.',
      image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=600',
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
      description:
        'Cold-pressed blend of spinach, cucumber, green apple, ginger, and lemon. Refreshing and packed with vitamins.',
      image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600',
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
      description:
        'Tropical blend of fresh mango, orange juice, carrot, and a pinch of turmeric for a bright immune-boosting drink.',
      image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600',
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
      description:
        'Mixed berries, banana, almond milk, chia seeds, and a drizzle of honey blended into a thick, antioxidant-rich smoothie.',
      image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600',
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
