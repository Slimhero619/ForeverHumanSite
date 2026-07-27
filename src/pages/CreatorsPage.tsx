import { useEffect } from 'react'
import CreatorHeroSection from '../components/sections/creators/CreatorHeroSection'
import CreatorPillarsSection from '../components/sections/creators/CreatorPillarsSection'
import CreatorServicesSection from '../components/sections/creators/CreatorServicesSection'
import CreatorCTASection from '../components/sections/creators/CreatorCTASection'

function CreatorsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <div className="min-h-screen bg-bg text-primary">
      <CreatorHeroSection />
      <CreatorPillarsSection />
      <CreatorServicesSection />
      <CreatorCTASection />
    </div>
  )
}

export default CreatorsPage
