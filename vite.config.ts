import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { Client } from '@notionhq/client'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const token = env.NOTION_TOKEN
  const databaseId = env.NOTION_DATABASE_ID

  return {
    plugins: [
      react(),
      tailwindcss(),
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
      }
    ],
  }
})
