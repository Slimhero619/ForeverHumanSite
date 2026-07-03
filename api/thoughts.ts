import { Client } from '@notionhq/client'
import type { IncomingMessage, ServerResponse } from 'http'

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

  const token = process.env.NOTION_TOKEN
  const databaseId = process.env.NOTION_DATABASE_ID

  if (!token || !databaseId) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Notion credentials are not configured.' }))
    return
  }

  try {
    const notion = new Client({ auth: token })
    // Using the modern dataSources.query endpoint for Notion SDK v5+
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

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(thoughts))
  } catch (error: any) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: error.message || 'Failed to query Notion database.' }))
  }
}
