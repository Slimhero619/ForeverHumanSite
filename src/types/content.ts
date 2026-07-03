export interface Episode {
  id: number
  number: string
  title: string
  description: string
  thumbnail: string
  youtubeUrl: string
  spotifyUrl: string
  applePodcastsUrl: string
  duration: string
}

export interface Topic {
  name: string
  icon: string
}

export interface Book {
  id: number
  title: string
  author: string
  cover: string
}

export interface Thought {
  id: string
  title: string
  date: string
  category: string
  slug: string
  excerpt: string
  featured: boolean
}

export interface NavItem {
  label: string
  href: string
}

export interface SocialLink {
  name: string
  icon: string
  url: string
}
