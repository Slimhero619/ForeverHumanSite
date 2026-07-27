import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { Client } from '@notionhq/client'

// ─── YouTube API Cache ───────────────────────────────────────────────────────
// In-memory cache for YouTube responses. Stores the serialized JSON and a
// timestamp so we can skip redundant API calls within the TTL window.
// To change the cache duration, modify YOUTUBE_CACHE_TTL_MS below.
const YOUTUBE_CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes
let youtubeCache: { data: string; timestamp: number } | null = null

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const token = env.NOTION_TOKEN
  const databaseId = env.NOTION_DATABASE_ID

  // YouTube credentials — read from env, NEVER prefixed with VITE_ so they
  // stay server-side only and are never bundled into client code.
  const youtubeApiKey = env.YOUTUBE_API_KEY
  const youtubeChannelId = env.YOUTUBE_CHANNEL_ID

  const creatorToken = env.NOTION_CREATOR_TOKEN
  const creatorDatabaseId = env.NOTION_CREATOR_DATABASE_ID

  return {
    plugins: [
      react(),
      tailwindcss(),

      // ─── Notion Creator Applications API Middleware ────────────────────
      {
        name: 'api-creator-application-middleware',
        configureServer(server) {
          server.middlewares.use('/api/creator-application', async (req, res) => {
            if (req.method === 'OPTIONS') {
              res.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
              })
              res.end()
              return
            }

            if (req.method !== 'POST') {
              res.writeHead(405, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }))
              return
            }

            let bodyStr = ''
            req.on('data', (chunk) => {
              bodyStr += chunk.toString()
            })

            req.on('end', async () => {
              try {
                const data = bodyStr ? JSON.parse(bodyStr) : {}

                // Honeypot Protection
                if (data.website && typeof data.website === 'string' && data.website.trim() !== '') {
                  res.writeHead(200, { 'Content-Type': 'application/json' })
                  res.end(JSON.stringify({ success: true }))
                  return
                }

                // Server-Side Field Validation
                const fullName = typeof data.fullName === 'string' ? data.fullName.trim() : ''
                const email = typeof data.email === 'string' ? data.email.trim() : ''
                const creatorName = typeof data.creatorName === 'string' ? data.creatorName.trim() : ''
                const profileLink = typeof data.profileLink === 'string' ? data.profileLink.trim() : ''
                const creatorStage = typeof data.creatorStage === 'string' ? data.creatorStage.trim() : ''
                const goal = typeof data.goal === 'string' ? data.goal.trim() : ''
                const blockers = typeof data.blockers === 'string' ? data.blockers.trim() : ''
                const serviceInterest = typeof data.serviceInterest === 'string' ? data.serviceInterest.trim() : ''
                const entryPoint = typeof data.entryPoint === 'string' ? data.entryPoint.trim() : ''

                const platforms = Array.isArray(data.platforms) ? data.platforms : []
                const helpNeeded = Array.isArray(data.helpNeeded) ? data.helpNeeded : []

                const VALID_STAGES = new Set([
                  'Planning to start',
                  'Recently started',
                  'Creating consistently',
                  'Active community',
                  'Rebuilding or growing',
                ])
                const VALID_HELP = new Set([
                  'Creator mindset',
                  'Accountability & consistency',
                  'Content direction',
                  'Streaming workflow',
                  'Discord setup',
                  'Community structure',
                  'Bots & commands',
                  'Automation',
                  'Technical setup',
                  'Growth strategy',
                  'Not sure yet',
                ])
                const VALID_SERVICES = new Set([
                  'Creator Launch',
                  'Creator Build',
                  'Creator Partner',
                  'Not sure yet',
                ])
                const VALID_ENTRY_POINTS = new Set([
                  'Creator Launch',
                  'Creator Build',
                  'Creator Partner',
                  'General Creator Application',
                ])
                const VALID_PLATFORMS = new Set([
                  'Twitch',
                  'YouTube',
                  'TikTok',
                  'Instagram',
                  'Discord Community',
                  'Other',
                  'Not creating yet',
                ])

                const isEmailValid = email.length > 3 && email.length < 254 && email.includes('@')
                const isNameValid = fullName.length > 0 && fullName.length <= 100
                const isStageValid = VALID_STAGES.has(creatorStage)
                const isServiceValid = VALID_SERVICES.has(serviceInterest)
                const isEntryPointValid = VALID_ENTRY_POINTS.has(entryPoint)
                const isGoalValid = goal.length > 0 && goal.length <= 2000
                const isHelpValid = helpNeeded.length > 0 && helpNeeded.every((item: string) => VALID_HELP.has(item))
                const isPlatformsValid = platforms.every((item: string) => VALID_PLATFORMS.has(item))

                if (
                  !isNameValid ||
                  !isEmailValid ||
                  !isStageValid ||
                  !isServiceValid ||
                  !isEntryPointValid ||
                  !isGoalValid ||
                  !isHelpValid ||
                  !isPlatformsValid
                ) {
                  res.writeHead(400, { 'Content-Type': 'application/json' })
                  res.end(JSON.stringify({ success: false, error: 'Invalid application data.' }))
                  return
                }

                if (!creatorToken || !creatorDatabaseId) {
                  res.writeHead(500, { 'Content-Type': 'application/json' })
                  res.end(JSON.stringify({ success: false, error: 'Notion credentials are not configured.' }))
                  return
                }

                const notion = new Client({ auth: creatorToken })
                await notion.pages.create({
                  parent: { database_id: creatorDatabaseId },
                  properties: {
                    'Status': { select: { name: 'New' } },
                    'Full Name': { title: [{ text: { content: fullName } }] },
                    'Email': { email: email },
                    'Creator Name': { rich_text: [{ text: { content: creatorName } }] },
                    'Platforms': { multi_select: platforms.map((p: string) => ({ name: p })) },
                    'Profile Link': profileLink ? { url: profileLink } : { url: null },
                    'Creator Stage': { select: { name: creatorStage } },
                    'Help Needed': { multi_select: helpNeeded.map((h: string) => ({ name: h })) },
                    '3–6 Month Goal': { rich_text: [{ text: { content: goal } }] },
                    'Current Blockers': { rich_text: [{ text: { content: blockers } }] },
                    'Service Interest': { select: { name: serviceInterest } },
                    'Entry Point': { select: { name: entryPoint } },
                  },
                })

                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ success: true }))
              } catch (err: any) {
                console.error('[Creator Application Dev API]', err.message || err)
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ success: false, error: err.message || 'Failed to process application.' }))
              }
            })
          })
        }
      },

      // ─── Notion Thoughts API ─────────────────────────────────────────
      {
        name: 'api-thoughts-middleware',
        configureServer(server) {
          server.middlewares.use('/api/thoughts', async (req, res) => {
            if (req.method === 'OPTIONS') {
              res.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
              })
              res.end()
              return
            }

            if (!token || !databaseId) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: 'Notion credentials are not configured.' }))
              return
            }

            try {
              const notion = new Client({ auth: token })
              const response = await notion.dataSources.query({
                data_source_id: databaseId,
                filter: {
                  property: 'Status',
                  select: {
                    equals: 'Published',
                  },
                },
                sorts: [
                  {
                    property: 'Date',
                    direction: 'descending',
                  },
                ],
              })

              const getPropertyValue = (properties: any, name: string) => {
                const key = Object.keys(properties).find(k => k.toLowerCase() === name.toLowerCase())
                return key ? properties[key] : null
              }

              const thoughts = response.results.map((page: any) => {
                const props = page.properties

                const titleProp = getPropertyValue(props, 'title')
                const title = titleProp?.title?.[0]?.plain_text || titleProp?.rich_text?.[0]?.plain_text || ''

                const dateProp = getPropertyValue(props, 'date')
                const date = dateProp?.date?.start || ''

                const catProp = getPropertyValue(props, 'category')
                const category = catProp?.select?.name || catProp?.rich_text?.[0]?.plain_text || ''

                const slugProp = getPropertyValue(props, 'slug')
                const slug = slugProp?.rich_text?.[0]?.plain_text || slugProp?.title?.[0]?.plain_text || ''

                const excerptProp = getPropertyValue(props, 'excerpt')
                const excerpt = excerptProp?.rich_text?.[0]?.plain_text || ''

                const featProp = getPropertyValue(props, 'featured')
                const featured = featProp?.checkbox || false

                return {
                  id: page.id,
                  title,
                  date,
                  category,
                  slug,
                  excerpt,
                  featured,
                }
              })

              res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              })
              res.end(JSON.stringify(thoughts))
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: err.message || 'Failed to query Notion database.' }))
            }
          })
        }
      },

      // ─── YouTube Episodes API ────────────────────────────────────────
      // SERVER-SIDE ONLY: This middleware proxies the YouTube Data API v3
      // so that the API key is never exposed to the browser.
      //
      // Endpoint:  GET /api/youtube
      // Returns:   JSON array of Episode-shaped objects (newest first).
      //            The client uses index 0 as the "Latest Episode" (featured)
      //            and indices 1–6 as the "Latest Episodes" grid.
      //
      // To change the featured episode logic:
      //   - Currently the newest video (index 0) is always featured.
      //   - To pin a specific video, move it to index 0 in the response
      //     array or add a query parameter like ?featured=VIDEO_ID.
      //
      // Cache:     Responses are cached in-memory for 30 minutes.
      //            See YOUTUBE_CACHE_TTL_MS at the top of this file.
      {
        name: 'api-youtube-middleware',
        configureServer(server) {
          server.middlewares.use('/api/youtube', async (req, res) => {
            // Handle CORS preflight
            if (req.method === 'OPTIONS') {
              res.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
              })
              res.end()
              return
            }

            // Fail fast if credentials aren't configured
            if (!youtubeApiKey || !youtubeChannelId) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: 'YouTube credentials are not configured.' }))
              return
            }

            // ── Return cached data if still fresh ──
            if (youtubeCache && Date.now() - youtubeCache.timestamp < YOUTUBE_CACHE_TTL_MS) {
              res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
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

              // ── Cache the response ──
              youtubeCache = { data: json, timestamp: Date.now() }

              res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'X-Cache': 'MISS',
              })
              res.end(json)
            } catch (err: any) {
              console.error('[YouTube API]', err.message || err)
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: err.message || 'Failed to fetch YouTube data.' }))
            }
          })
        },
      },
    ],
  }
})

// ─── Helpers ───────────────────────────────────────────────────────────────────

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

