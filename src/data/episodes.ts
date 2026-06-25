import type { Episode } from '../types/content'

import episodeThumbnail1 from '../assets/images/episode-thumbnail-1.png'
import episodeThumbnail2 from '../assets/images/episode-thumbnail-2.png'
import episodeThumbnail3 from '../assets/images/episode-thumbnail-3.png'
import episodeThumbnail4 from '../assets/images/episode-thumbnail-4.png'
import episodeThumbnail5 from '../assets/images/episode-thumbnail-5.png'
import episodeThumbnail6 from '../assets/images/episode-thumbnail-6.png'

export const featuredEpisode: Episode = {
  id: 1,
  number: 'EP 027',
  title: 'Discipline Is How You Build A New Identity',
  description:
    "Discipline isn't about motivation. It's about who you decide to become when no one is watching. We break down how daily choices create a new identity that lasts.",
  thumbnail: episodeThumbnail1,
  youtubeUrl: '#',
  spotifyUrl: '#',
  applePodcastsUrl: '#',
  duration: '45:32',
}

export const episodes: Episode[] = [
  {
    id: 2,
    number: 'EP 026',
    title: 'Discipline Is How You Build A New Identity',
    description:
      'How small, repeated decisions shape who you become over time.',
    thumbnail: episodeThumbnail1,
    youtubeUrl: '#',
    spotifyUrl: '#',
    applePodcastsUrl: '#',
    duration: '42:15',
  },
  {
    id: 3,
    number: 'EP 025',
    title: 'The Gap Between Potential and Reality',
    description:
      'Why knowing what to do and doing it are two very different things.',
    thumbnail: episodeThumbnail2,
    youtubeUrl: '#',
    spotifyUrl: '#',
    applePodcastsUrl: '#',
    duration: '38:44',
  },
  {
    id: 4,
    number: 'EP 024',
    title: 'Eliminate The Noise. Protect Your Focus.',
    description:
      'Cutting through distractions to focus on what actually matters.',
    thumbnail: episodeThumbnail3,
    youtubeUrl: '#',
    spotifyUrl: '#',
    applePodcastsUrl: '#',
    duration: '41:20',
  },
  {
    id: 5,
    number: 'EP 023',
    title: "You Don't Need More Time, You Need Direction",
    description:
      "Time isn't the problem. Clarity is. Here's how to find your direction.",
    thumbnail: episodeThumbnail4,
    youtubeUrl: '#',
    spotifyUrl: '#',
    applePodcastsUrl: '#',
    duration: '36:55',
  },
  {
    id: 6,
    number: 'EP 022',
    title: 'The Compound Effect of Daily Decisions',
    description:
      'Small choices compound into massive results. We explore how.',
    thumbnail: episodeThumbnail5,
    youtubeUrl: '#',
    spotifyUrl: '#',
    applePodcastsUrl: '#',
    duration: '44:10',
  },
  {
    id: 7,
    number: 'EP 021',
    title: 'Comfort Is the Enemy of Growth',
    description:
      'Why staying comfortable is the fastest way to stop growing.',
    thumbnail: episodeThumbnail6,
    youtubeUrl: '#',
    spotifyUrl: '#',
    applePodcastsUrl: '#',
    duration: '39:30',
  },
]
