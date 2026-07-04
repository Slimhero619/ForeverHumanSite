import type { IncomingMessage, ServerResponse } from 'http'

// In-memory cache for YouTube responses on warm serverless instances.
const YOUTUBE_CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes
let youtubeCache: { data: string; timestamp: number } | null = null

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  const youtubeApiKey = process.env.YOUTUBE_API_KEY
  const youtubeChannelId = process.env.YOUTUBE_CHANNEL_ID

  if (!youtubeApiKey || !youtubeChannelId) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'YouTube credentials are not configured.' }))
    return
  }

  // Return cached data if still fresh
  if (youtubeCache && Date.now() - youtubeCache.timestamp < YOUTUBE_CACHE_TTL_MS) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'X-Cache': 'HIT',
    })
    res.end(youtubeCache.data)
    return
  }

  try {
    // Step 1: Search for the latest videos on the channel.
    // We request 7 results: 1 for the featured section + 6 for the grid.
    const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search')
    searchUrl.searchParams.set('key', youtubeApiKey)
    searchUrl.searchParams.set('channelId', youtubeChannelId)
    searchUrl.searchParams.set('part', 'snippet')
    searchUrl.searchParams.set('order', 'date')
    searchUrl.searchParams.set('maxResults', '7')
    searchUrl.searchParams.set('type', 'video')

    const searchRes = await fetch(searchUrl.toString())
    if (!searchRes.ok) {
      throw new Error(`YouTube search API returned ${searchRes.status}`)
    }
    const searchData: any = await searchRes.json()
    const items = searchData.items || []

    if (items.length === 0) {
      throw new Error('No videos found on the channel.')
    }

    // Collect video IDs so we can fetch durations in one batch call.
    const videoIds = items.map((item: any) => item.id.videoId).join(',')

    // Step 2: Fetch contentDetails (for duration) and statistics.
    const videosUrl = new URL('https://www.googleapis.com/youtube/v3/videos')
    videosUrl.searchParams.set('key', youtubeApiKey)
    videosUrl.searchParams.set('id', videoIds)
    videosUrl.searchParams.set('part', 'contentDetails,snippet')

    const videosRes = await fetch(videosUrl.toString())
    if (!videosRes.ok) {
      throw new Error(`YouTube videos API returned ${videosRes.status}`)
    }
    const videosData: any = await videosRes.json()

    // Build a lookup map of video ID → duration
    const durationMap: Record<string, string> = {}
    for (const video of videosData.items || []) {
      durationMap[video.id] = formatIsoDuration(video.contentDetails?.duration || '')
    }

    // Step 3: Map the YouTube data into the Episode shape the frontend expects.
    const episodes = items.map((item: any, index: number) => {
      const videoId = item.id.videoId
      const snippet = item.snippet
      // Use the highest-quality thumbnail available
      const thumbnail =
        snippet.thumbnails?.maxres?.url ||
        snippet.thumbnails?.high?.url ||
        snippet.thumbnails?.medium?.url ||
        snippet.thumbnails?.default?.url ||
        ''

      return {
        id: index + 1,
        number: `EP ${String(items.length - index).padStart(3, '0')}`,
        title: snippet.title || '',
        description: snippet.description?.split('\n')[0] || '',
        thumbnail,
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
        spotifyUrl: '#',
        applePodcastsUrl: '#',
        duration: durationMap[videoId] || '',
      }
    })

    const json = JSON.stringify(episodes)

    // Cache the response
    youtubeCache = { data: json, timestamp: Date.now() }

    res.writeHead(200, {
      'Content-Type': 'application/json',
      'X-Cache': 'MISS',
    })
    res.end(json)
  } catch (err: any) {
    console.error('[YouTube API]', err.message || err)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: err.message || 'Failed to fetch YouTube data.' }))
  }
}

/**
 * Converts an ISO 8601 duration (e.g. "PT1H2M30S", "PT45M12S") into a
 * human-readable string like "1:02:30" or "45:12".
 */
function formatIsoDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return ''

  const hours = parseInt(match[1] || '0', 10)
  const minutes = parseInt(match[2] || '0', 10)
  const seconds = parseInt(match[3] || '0', 10)

  const pad = (n: number) => String(n).padStart(2, '0')

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`
  }
  return `${minutes}:${pad(seconds)}`
}
