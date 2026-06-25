import { topics } from '../../data/topics'
import TopicCard from '../ui/TopicCard'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'

function TopicsSection() {
  return (
    <section
      id="topics"
      className="py-16 md:py-24 border-y border-border bg-card/30"
      aria-labelledby="topics-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading title="Topics We Explore" />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
            {topics.map((topic) => (
              <TopicCard key={topic.name} topic={topic} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default TopicsSection
