/// <reference types="node" />
import { Client } from '@notionhq/client'
import type { IncomingMessage, ServerResponse } from 'node:http'

// Valid Notion Option Sets
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

// Helper to parse JSON body from incoming HTTP request stream
async function getRequestBody(req: IncomingMessage): Promise<any> {
  if ('body' in req && typeof (req as any).body === 'object' && (req as any).body !== null) {
    return (req as any).body
  }
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
      if (body.length > 50000) {
        reject(new Error('Payload size exceeded limit'))
      }
    })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        reject(new Error('Invalid JSON payload'))
      }
    })
    req.on('error', (err) => reject(err))
  })
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  // Reject non-POST requests
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }))
    return
  }

  try {
    const data = await getRequestBody(req)

    // Honeypot Protection: If 'website' field is populated, return generic 200 without writing to Notion
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

    // Basic Format & Size Restrictions
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

    // Credentials Check
    const token = process.env.NOTION_CREATOR_TOKEN
    const databaseId = process.env.NOTION_CREATOR_DATABASE_ID

    if (!token || !databaseId) {
      console.error('[Creator Application API] Notion environment variables missing.')
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: 'Service error. Please try again later.' }))
      return
    }

    // Call Notion SDK to create page
    const notion = new Client({ auth: token })

    await notion.pages.create({
      parent: { type: 'data_source_id', data_source_id: databaseId },
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
    console.error('[Creator Application API Error]', {
      code: err.code || 'UNKNOWN',
      message: err.message || String(err),
      status: err.status || err.statusCode || undefined,
    })
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: false, error: 'Failed to process application.' }))
  }
}
