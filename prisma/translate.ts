/**
 * Backfills Arabic names and descriptions onto categories and products that
 * already exist.
 *
 * Use this instead of re-running `seed.ts` on a database with real data: the
 * seeder starts with `deleteMany` on orders, products and categories, so it
 * would wipe live order history. This only ever runs UPDATEs, matches rows by
 * their English name, and is safe to run repeatedly.
 *
 *   npx prisma db execute --help   # (not this — see README steps)
 *   npx tsx prisma/translate.ts
 */
// Loaded explicitly: running this through `tsx` directly means the Prisma CLI
// isn't around to read `.env` for us. Same approach `seed.ts` takes.
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const CATEGORIES: Record<string, string> = {
  Bowls: 'أطباق',
  Wraps: 'راب',
  Salads: 'سلطات',
  Soups: 'شوربات',
  Juices: 'عصائر'
}

const PRODUCTS: Record<string, { nameAr: string; descriptionAr: string }> = {
  'Grilled Salmon Bowl': {
    nameAr: 'طبق سلمون مشوي',
    descriptionAr:
      'فيليه سلمون مشوي غني بأوميغا ٣ يُقدّم على أرز بني مع بروكلي مطهو بالبخار وشرائح أفوكادو وصوص السمسم بالزنجبيل.'
  },
  'Quinoa Power Bowl': {
    nameAr: 'طبق الكينوا بالبروتين',
    descriptionAr:
      'قاعدة كينوا غنية بالبروتين مع حمص محمّص وطماطم كرزية وخيار وبصل أحمر وصوص الطحينة بالليمون.'
  },
  'Teriyaki Chicken Bowl': {
    nameAr: 'طبق دجاج تيرياكي',
    descriptionAr:
      'دجاج مشوي طري بصوص التيرياكي المُعد منزليًا، يُقدّم مع أرز الياسمين والإدامامي والجزر المبروش وحبوب السمسم.'
  },
  'Avocado Power Wrap': {
    nameAr: 'راب الأفوكادو',
    descriptionAr:
      'خبز قمح كامل محشو بالأفوكادو المهروس وشرائح دجاج مشوي وخضروات ورقية وطماطم ولمسة من مايونيز الشيبوتلي.'
  },
  'Falafel & Hummus Wrap': {
    nameAr: 'راب الفلافل والحمص',
    descriptionAr:
      'فلافل مقرمشة مخبوزة مع حمص كريمي وملفوف أحمر مخلل وبقدونس طازج وهريسة داخل خبز مسطح دافئ.'
  },
  'Smoked Turkey Wrap': {
    nameAr: 'راب الديك الرومي المدخن',
    descriptionAr:
      'شرائح صدور ديك رومي مدخنة مع جبنة سويسرية وخس روماني وخردل ديجون وطماطم مجففة في تورتيلا السبانخ.'
  },
  'Quinoa Garden Salad': {
    nameAr: 'سلطة الكينوا بالخضروات',
    descriptionAr:
      'خليط منعش من الكينوا وخضروات الموسم والبذور المحمّصة وشرائح الخيار مع صوص الطحينة بالليمون.'
  },
  'Greek Salad': {
    nameAr: 'سلطة يونانية',
    descriptionAr:
      'سلطة يونانية كلاسيكية بالخس الروماني وزيتون كالاماتا وبصل أحمر وخيار وطماطم ناضجة وجبنة فيتا مع صوص الأوريغانو.'
  },
  'Caesar Salad': {
    nameAr: 'سلطة سيزر',
    descriptionAr:
      'خس روماني مقرمش مع رقائق جبنة بارميزان وخبز محمّص منزلي وصوص سيزر غني بلمسة من الأنشوجة والليمون.'
  },
  'Lentil & Vegetable Soup': {
    nameAr: 'شوربة عدس بالخضار',
    descriptionAr:
      'شوربة عدس أحمر دسمة مطهوة على نار هادئة مع الجزر والكرفس والكمون وعصرة ليمون طازج. تُقدّم مع خبز دافئ.'
  },
  'Roasted Tomato Soup': {
    nameAr: 'شوربة طماطم مشوية',
    descriptionAr:
      'شوربة طماطم مشوية بالريحان ناعمة القوام مع لمسة من الكريمة وزيت زيتون بالأعشاب.'
  },
  'Green Detox Juice': {
    nameAr: 'عصير ديتوكس أخضر',
    descriptionAr:
      'خليط معصور على البارد من السبانخ والخيار والتفاح الأخضر والزنجبيل والليمون. منعش وغني بالفيتامينات.'
  },
  'Mango Sunrise': {
    nameAr: 'شروق المانجو',
    descriptionAr:
      'خليط استوائي من المانجو الطازج وعصير البرتقال والجزر ورشة كركم لمشروب منعش يدعم المناعة.'
  },
  'Berry Blast Smoothie': {
    nameAr: 'سموذي التوت',
    descriptionAr:
      'توت مشكّل وموز وحليب لوز وبذور الشيا ولمسة عسل، ممزوجة في سموذي كثيف غني بمضادات الأكسدة.'
  }
}

async function main() {
  let categoriesUpdated = 0
  let productsUpdated = 0
  const unmatched: string[] = []

  for (const [name, nameAr] of Object.entries(CATEGORIES)) {
    const result = await prisma.category.updateMany({ where: { name }, data: { nameAr } })
    if (result.count > 0) categoriesUpdated += result.count
    else unmatched.push(`category: ${name}`)
  }

  for (const [name, translation] of Object.entries(PRODUCTS)) {
    const result = await prisma.product.updateMany({ where: { name }, data: translation })
    if (result.count > 0) productsUpdated += result.count
    else unmatched.push(`product: ${name}`)
  }

  console.log(`✅ ${categoriesUpdated} categories and ${productsUpdated} products translated`)

  if (unmatched.length > 0) {
    console.log('\n⚠️  No row matched these English names — translate them from the admin panel:')
    unmatched.forEach(entry => console.log('   - ' + entry))
  }

  // Anything still missing Arabic will fall back to English on /ar pages.
  const [missingProducts, missingCategories] = await Promise.all([
    prisma.product.count({ where: { OR: [{ nameAr: null }, { nameAr: '' }] } }),
    prisma.category.count({ where: { OR: [{ nameAr: null }, { nameAr: '' }] } })
  ])
  console.log(
    `\nStill without Arabic: ${missingProducts} product(s), ${missingCategories} category(ies).` +
      (missingProducts + missingCategories > 0
        ? ' These will show their English text on Arabic pages.'
        : '')
  )
}

main()
  .catch(error => {
    console.error('❌ translate failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
