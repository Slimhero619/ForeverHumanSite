import AnimatedSection from '../ui/AnimatedSection'
import galleryStudio from '../../assets/images/gallery-studio.png'
import galleryCity from '../../assets/images/gallery-city.png'
import galleryWorkspace from '../../assets/images/gallery-workspace.png'
import galleryBooks from '../../assets/images/gallery-books.png'
import aboutPortrait from '../../assets/images/about-portrait.png'
import heroBackground from '../../assets/images/hero-background.png'
import episodeThumbnail2 from '../../assets/images/episode-thumbnail-2.png'
import episodeThumbnail4 from '../../assets/images/episode-thumbnail-4.png'

interface GalleryImage {
  src: string
  alt: string
  span?: string
}

const galleryImages: GalleryImage[] = [
  { src: galleryStudio, alt: 'Podcast studio setup', span: 'col-span-2 row-span-2' },
  { src: galleryBooks, alt: 'Book collection' },
  { src: galleryWorkspace, alt: 'Planning workspace' },
  { src: galleryCity, alt: 'City view' },
  { src: aboutPortrait, alt: 'Behind the scenes' },
  { src: heroBackground, alt: 'Golden hour' },
  { src: episodeThumbnail2, alt: 'On location' },
  { src: episodeThumbnail4, alt: 'Open road' },
]

function GallerySection() {
  return (
    <section className="py-16 md:py-24" aria-label="Photo gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[200px]">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden ${image.span || ''}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default GallerySection
