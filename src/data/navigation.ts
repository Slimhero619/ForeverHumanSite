import type { NavItem, SocialLink } from '../types/content'

export const navItems: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Episodes', href: '#episodes' },
  { label: 'Start Here', href: '#latest-episode' },
  { label: 'About', href: '#about' },
  { label: 'Books', href: '#books' },
  { label: 'Contact', href: '#newsletter' },
]

export const socialLinks: SocialLink[] = [
  { name: 'YouTube', icon: 'MonitorPlay', url: '#' },
  { name: 'Spotify', icon: 'Music', url: '#' },
  { name: 'Instagram', icon: 'Camera', url: '#' },
  { name: 'TikTok', icon: 'Clapperboard', url: '#' },
  { name: 'X / Twitter', icon: 'Hash', url: '#' },
  { name: 'LinkedIn', icon: 'Users', url: '#' },
  { name: 'Email', icon: 'Mail', url: 'mailto:hello@foreverhuman.com' },
]
