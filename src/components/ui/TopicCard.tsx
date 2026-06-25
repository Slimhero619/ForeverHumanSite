import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import type { Topic } from '../../types/content'

interface TopicCardProps {
  topic: Topic
}

function TopicCard({ topic }: TopicCardProps) {
  const IconComponent = Icons[topic.icon as keyof typeof Icons] as React.ComponentType<{
    size?: number
    className?: string
  }> | undefined

  return (
    <motion.div
      className="flex flex-col items-center gap-3 group cursor-pointer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-border bg-card flex items-center justify-center transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent/5">
        {IconComponent ? (
          <IconComponent
            size={20}
            className="text-secondary transition-colors duration-300 group-hover:text-accent"
          />
        ) : (
          <span className="text-secondary text-xs">{topic.icon}</span>
        )}
      </div>
      <span className="text-xs text-secondary group-hover:text-primary transition-colors duration-300 text-center">
        {topic.name}
      </span>
    </motion.div>
  )
}

export default TopicCard
