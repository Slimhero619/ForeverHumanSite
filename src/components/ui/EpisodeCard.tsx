import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Episode } from '../../types/content'

interface EpisodeCardProps {
  episode: Episode
}

function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <motion.article
      className="group bg-card rounded-lg overflow-hidden border border-border hover:border-accent/30 transition-colors duration-300"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={episode.thumbnail}
          alt={episode.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-sm leading-snug text-primary mb-2 line-clamp-2">
          {episode.title}
        </h3>
        <p className="text-xs text-secondary line-clamp-2 mb-3">
          {episode.description}
        </p>
        <a
          href={episode.youtubeUrl}
          className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent-hover transition-colors duration-200"
        >
          <ArrowUpRight size={14} />
        </a>
      </div>
    </motion.article>
  )
}

export default EpisodeCard
