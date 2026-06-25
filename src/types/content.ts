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
  id: number
  text: string
  date: string
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
