import { useState, useEffect } from 'react'
import type { Episode } from '../types/content'
import { featuredEpisode as staticFeatured, episodes as staticEpisodes } from '../data/episodes'
import { decodeHtmlEntities } from '../utils/decodeHtmlEntities'

// ─── YouTube Episodes Hook ─────────────────────────────────────────────────────
//
// WHERE THE YOUTUBE INTEGRATION LIVES:
//   Server-side:  vite.config.ts  → "api-youtube-middleware" plugin
//                 Route: GET /api/youtube
//   Client-side:  This hook (useYouTubeEpisodes)
//   Fallback:     src/data/episodes.ts (static placeholder data)
//
// HOW TO CHANGE THE FEATURED EPISODE LOGIC:
//   The API returns videos sorted newest-first. This hook uses index 0 as the
//   featured episode and indices 1–6 as the grid episodes.
//
//   To change which video is featured:
//     Option A: Reorder the array returned by vite.config.ts (server-side).
//     Option B: Modify the splitting logic below (e.g. find a video by ID).
//     Option C: Add a query parameter like /api/youtube?featured=VIDEO_ID
//               and handle it in the middleware.
//
// FALLBACK BEHAVIOR:
//   If the fetch fails for any reason (network error, missing API key, YouTube
//   outage, quota exceeded), the hook silently falls back to the static episode
//   data in src/data/episodes.ts. No error is shown to users.
// ────────────────────────────────────────────────────────────────────────────────

interface UseYouTubeEpisodesResult {
  /** The single newest video, used by LatestEpisodeSection */
  featuredEpisode: Episode
  /** The next 6 newest videos, used by EpisodeGridSection */
  episodes: Episode[]
  /** True while the initial fetch is in flight */
  isLoading: boolean
}

export function useYouTubeEpisodes(): UseYouTubeEpisodesResult {
  // Start with static data so the page is never blank
  const [featuredEpisode, setFeaturedEpisode] = useState<Episode>(staticFeatured)
  const [episodes, setEpisodes] = useState<Episode[]>(staticEpisodes)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function fetchEpisodes() {
      try {
        const res = await fetch('/api/youtube')

        if (!res.ok) {
          // Server returned an error — fall back silently
          return
        }

        const raw: Episode[] = await res.json()

        if (!Array.isArray(raw) || raw.length === 0) {
          // Unexpected shape or empty — keep static data
          return
        }

        // Decode HTML entities the YouTube API returns (e.g. &#39; → ')
        const data = raw.map((ep) => ({
          ...ep,
          title: decodeHtmlEntities(ep.title),
          description: decodeHtmlEntities(ep.description),
        }))

        if (cancelled) return

        // The newest video (index 0) becomes the featured "Latest Episode".
        // The remaining videos populate the "Latest Episodes" grid.
        // To change this logic, see the comments at the top of this file.
        setFeaturedEpisode(data[0])
        setEpisodes(data.slice(1))
      } catch {
        // Network error, CORS issue, or any other failure.
        // Silently keep the static fallback data — no user-facing error.
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchEpisodes()

    return () => {
      cancelled = true
    }
  }, [])

  return { featuredEpisode, episodes, isLoading }
}
