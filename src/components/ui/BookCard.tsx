import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import type { Book } from '../../types/content'

interface BookCardProps {
  book: Book
}

function BookCard({ book }: BookCardProps) {
  return (
    <motion.div
      className="flex-shrink-0 w-36 group cursor-pointer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="aspect-[2/3] rounded-lg overflow-hidden bg-card border border-border mb-3 flex items-center justify-center group-hover:border-accent/30 transition-colors duration-300">
        {book.cover ? (
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 p-4 text-center">
            <BookOpen size={28} className="text-accent/60" />
            <span className="text-xs text-secondary leading-tight font-medium">
              {book.title}
            </span>
          </div>
        )}
      </div>
      <h3 className="text-xs font-semibold text-primary leading-tight mb-1 line-clamp-2">
        {book.title}
      </h3>
      <p className="text-xs text-secondary">{book.author}</p>
    </motion.div>
  )
}

export default BookCard
