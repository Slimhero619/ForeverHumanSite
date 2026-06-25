import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { books } from '../../data/books'
import BookCard from '../ui/BookCard'
import AnimatedSection from '../ui/AnimatedSection'

function BooksSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scrollLeft() {
    scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' })
  }

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' })
  }

  return (
    <div id="books" aria-labelledby="books-title">
      <AnimatedSection>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl md:text-3xl tracking-wide uppercase text-primary">
            Books That Changed Me
          </h2>
          <div className="flex gap-2">
            <button
              onClick={scrollLeft}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-secondary hover:text-accent hover:border-accent/50 transition-all duration-200 cursor-pointer"
              aria-label="Scroll books left"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={scrollRight}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-secondary hover:text-accent hover:border-accent/50 transition-all duration-200 cursor-pointer"
              aria-label="Scroll books right"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </AnimatedSection>
    </div>
  )
}

export default BooksSection
