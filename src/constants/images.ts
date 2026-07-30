/**
 * Every stock image the redesign uses, in one place.
 *
 * These are free Unsplash photos (Unsplash License — free for commercial use,
 * no attribution required). Swap any value for your own asset path and the
 * whole site updates; nothing else references these URLs directly.
 */

const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const IMAGES = {
  /** Page masthead backdrop behind the title + breadcrumb. */
  bannerBackground: unsplash('1542838132-92c53300491e', 1920),

  /** Hero product shot on the home page. */
  hero: unsplash('1610832958506-aa56368176cf', 1000),

  /** Centre image of the Product Facilities section. */
  facilities: unsplash('1557800636-894a64c1696f', 900),

  /** Image beside the FAQ accordion. */
  faq: unsplash('1543168256-418811576931', 900),

  /** Pair of images in the About / "Trusted store" block. */
  aboutPrimary: unsplash('1592924357228-91a4daadcfea', 800),
  aboutSecondary: unsplash('1560493676-04071c5f467b', 800),

  /** Backdrop of the full-bleed video CTA band. */
  ctaBackground: unsplash('1416879595882-3373a0480b5b', 1600),

  /** Todays Hot Deals product shot. */
  hotDeal: unsplash('1587049352846-4a222e784d38', 800),

  /** Promo tiles beside the trending grid. */
  promoMango: unsplash('1553279768-865429fa0078', 700),
  promoJuice: unsplash('1600271886742-f049cd451bba', 700),

  /** Three coloured offer tiles under the hero. */
  bannerSale: unsplash('1557800636-894a64c1696f', 600),
  bannerOrder: unsplash('1622597467836-f3285f2131b8', 600),
  bannerPackage: unsplash('1610832958506-aa56368176cf', 600),

  /** Team member portraits on the About page. */
  team: [
    unsplash('1507003211169-0a1dd7228f2d', 500),
    unsplash('1500648767791-00dcc994a43e', 500),
    unsplash('1519085360753-af0119f7cbe7', 500)
  ],

  /** Client testimonial avatars. */
  testimonials: [
    unsplash('1494790108377-be9c29b29330', 300),
    unsplash('1438761681033-6461ffad8d80', 300),
    unsplash('1472099645785-5658abf4ff4e', 300)
  ],

  /** Fallback cover for blog posts with no image set. */
  blogFallback: unsplash('1416879595882-3373a0480b5b', 900),

  /** Seed covers for the starter blog posts. */
  blogSeed: [
    unsplash('1595855759920-86582396756a', 900),
    unsplash('1466692476868-aef1dfb1e735', 900),
    unsplash('1416879595882-3373a0480b5b', 900)
  ],

  /** Neutral placeholder for products with no uploaded image. */
  productFallback: unsplash('1610832958506-aa56368176cf', 600)
} as const
