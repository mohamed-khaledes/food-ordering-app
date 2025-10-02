import BestSellers from '@/features/home/best-sellers'
import Hero from '@/features/home/hero'

export default async function Home() {
  return (
    <main>
      <Hero />
      <BestSellers />
    </main>
  )
}
