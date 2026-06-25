import { thoughts } from '../../data/thoughts'
import ThoughtCard from '../ui/ThoughtCard'
import SectionHeading from '../ui/SectionHeading'
import AnimatedSection from '../ui/AnimatedSection'

function ThoughtsSection() {
  return (
    <div aria-labelledby="thoughts-title">
      <AnimatedSection>
        <SectionHeading
          title="Latest Thoughts"
          actionLabel="View All Thoughts"
          actionHref="#"
        />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="flex flex-col gap-4">
          {thoughts.map((thought) => (
            <ThoughtCard key={thought.id} thought={thought} />
          ))}
        </div>
      </AnimatedSection>
    </div>
  )
}

export default ThoughtsSection
