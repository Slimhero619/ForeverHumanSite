import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ApplicationSection from './ApplicationSection'
import SelectableOption from './SelectableOption'
import ApplicationSuccess from './ApplicationSuccess'
import Button from '../../ui/Button'
import { Send, AlertCircle } from 'lucide-react'

const SERVICE_PARAM_MAP: Record<string, string> = {
  launch: 'Creator Launch',
  build: 'Creator Build',
  partner: 'Creator Partner',
}

const PLATFORM_OPTIONS = [
  'Twitch',
  'YouTube',
  'TikTok',
  'Instagram',
  'Discord Community',
  'Other',
  'Not creating yet',
]

interface OptionItem {
  label: string
  value: string
}

const STAGE_OPTIONS: OptionItem[] = [
  { label: "I'm planning to start", value: 'Planning to start' },
  { label: 'I recently started', value: 'Recently started' },
  { label: "I'm streaming/creating consistently", value: 'Creating consistently' },
  { label: 'I already have an active community', value: 'Active community' },
  { label: "I'm trying to rebuild or grow what I already have", value: 'Rebuilding or growing' },
]

const HELP_OPTIONS: OptionItem[] = [
  { label: 'Creator mindset', value: 'Creator mindset' },
  { label: 'Accountability & consistency', value: 'Accountability & consistency' },
  { label: 'Content direction', value: 'Content direction' },
  { label: 'Streaming workflow', value: 'Streaming workflow' },
  { label: 'Discord setup', value: 'Discord setup' },
  { label: 'Community structure', value: 'Community structure' },
  { label: 'Bots & commands', value: 'Bots & commands' },
  { label: 'Automation', value: 'Automation' },
  { label: 'Technical setup', value: 'Technical setup' },
  { label: 'Growth strategy', value: 'Growth strategy' },
  { label: "I'm not sure yet", value: 'Not sure yet' },
]

interface ServiceOption {
  title: string
  value: string
  description: string
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    title: 'Creator Launch',
    value: 'Creator Launch',
    description: 'Help me get the foundation built.',
  },
  {
    title: 'Creator Build',
    value: 'Creator Build',
    description: 'Help me build the creator and the systems together.',
  },
  {
    title: 'Creator Partner',
    value: 'Creator Partner',
    description: 'I want ongoing strategy, accountability, and technical support.',
  },
  {
    title: "I'm not sure yet",
    value: 'Not sure yet',
    description: 'Help me figure out what makes sense.',
  },
]

interface FormErrors {
  fullName?: string
  email?: string
  creatorStage?: string
  helpAreas?: string
  goals?: string
  serviceInterest?: string
}

function CreatorApplicationForm() {
  const [searchParams] = useSearchParams()
  const initialServiceParam = searchParams.get('service')?.toLowerCase() || ''
  const mappedInitialService = SERVICE_PARAM_MAP[initialServiceParam] || ''

  // Track entry point separately from final serviceInterest
  const [entryPoint] = useState<string>(
    mappedInitialService || 'General Creator Application'
  )

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [channelName, setChannelName] = useState('')
  const [platforms, setPlatforms] = useState<string[]>([])
  const [channelLink, setChannelLink] = useState('')
  const [creatorStage, setCreatorStage] = useState('')
  const [helpAreas, setHelpAreas] = useState<string[]>([])
  const [goals, setGoals] = useState('')
  const [obstacles, setObstacles] = useState('')
  const [serviceInterest, setServiceInterest] = useState(mappedInitialService)
  const [website, setWebsite] = useState('') // Honeypot field

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  function togglePlatform(platform: string) {
    setPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    )
  }

  function toggleHelpArea(value: string) {
    setHelpAreas((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    )
  }

  function validate(): boolean {
    const newErrors: FormErrors = {}

    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.'
    }

    if (!email.trim() || !email.includes('@')) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!creatorStage) {
      newErrors.creatorStage = 'Please select which best describes where you are right now.'
    }

    if (helpAreas.length === 0) {
      newErrors.helpAreas = "Please select at least one area you'd like help with."
    }

    if (!goals.trim()) {
      newErrors.goals = 'Please share what you are trying to build over the next 3–6 months.'
    }

    if (!serviceInterest) {
      newErrors.serviceInterest = 'Please select a level of support.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitError(null)

    if (!validate()) return

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/creator-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          creatorName: channelName,
          platforms,
          profileLink: channelLink,
          creatorStage,
          helpNeeded: helpAreas,
          goal: goals,
          blockers: obstacles,
          serviceInterest,
          entryPoint,
          website,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit application.')
      }

      setIsSubmitted(true)
      window.scrollTo({ top: 100, behavior: 'smooth' })
    } catch (err: any) {
      console.error('[Creator Application Submit Error]', err.message || err)
      setSubmitError("We couldn't submit your application right now. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return <ApplicationSuccess entryPoint={entryPoint} serviceInterest={serviceInterest} />
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Honeypot Field */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        className="hidden"
        aria-hidden="true"
        autoComplete="off"
      />

      {/* 01. About You */}
      <ApplicationSection
        number="01"
        title="About You"
        description="Basic contact information so I know who I'm connecting with."
        required
      >
        <div className="space-y-5">
          <div>
            <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
              Full Name <span className="text-accent">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value)
                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }))
              }}
              placeholder="Drake Watson"
              className={`w-full bg-bg border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent transition-colors ${
                errors.fullName ? 'border-red-500/80' : 'border-border'
              }`}
            />
            {errors.fullName && (
              <p className="text-xs text-red-400 mt-1.5">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
              Email <span className="text-accent">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
              }}
              placeholder="drake@example.com"
              className={`w-full bg-bg border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent transition-colors ${
                errors.email ? 'border-red-500/80' : 'border-border'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="channelName" className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
              Creator / Channel Name <span className="text-secondary/60 font-normal lowercase">(optional)</span>
            </label>
            <input
              id="channelName"
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="SlimZZ / Forever Human"
              className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>
      </ApplicationSection>

      {/* 02. Where You Create */}
      <ApplicationSection
        number="02"
        title="Where You Create"
        description="Where are you currently creating?"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {PLATFORM_OPTIONS.map((platform) => (
            <SelectableOption
              key={platform}
              label={platform}
              type="checkbox"
              selected={platforms.includes(platform)}
              onClick={() => togglePlatform(platform)}
            />
          ))}
        </div>

        <div>
          <label htmlFor="channelLink" className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            Channel / Profile Link <span className="text-secondary/60 font-normal lowercase">(optional)</span>
          </label>
          <input
            id="channelLink"
            type="url"
            value={channelLink}
            onChange={(e) => setChannelLink(e.target.value)}
            placeholder="https://youtube.com/@yourchannel or twitch.tv/yourname"
            className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </ApplicationSection>

      {/* 03. Where You Are */}
      <ApplicationSection
        number="03"
        title="Where You Are"
        description="Which best describes where you are right now?"
        required
        error={errors.creatorStage}
      >
        <div className="space-y-3">
          {STAGE_OPTIONS.map((stage) => (
            <SelectableOption
              key={stage.value}
              label={stage.label}
              type="radio"
              selected={creatorStage === stage.value}
              onClick={() => {
                setCreatorStage(stage.value)
                if (errors.creatorStage) setErrors((prev) => ({ ...prev, creatorStage: undefined }))
              }}
            />
          ))}
        </div>
      </ApplicationSection>

      {/* 04. What You Need Help With */}
      <ApplicationSection
        number="04"
        title="What You Need Help With"
        description="What would you like help with? Select all that apply."
        required
        error={errors.helpAreas}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {HELP_OPTIONS.map((option) => (
            <SelectableOption
              key={option.value}
              label={option.label}
              type="checkbox"
              selected={helpAreas.includes(option.value)}
              onClick={() => {
                toggleHelpArea(option.value)
                if (errors.helpAreas) setErrors((prev) => ({ ...prev, helpAreas: undefined }))
              }}
            />
          ))}
        </div>
      </ApplicationSection>

      {/* 05. The Bigger Picture */}
      <ApplicationSection
        number="05"
        title="The Bigger Picture"
        description="Help me understand your vision, direction, and challenges."
        required
        error={errors.goals}
      >
        <div className="space-y-6">
          <div>
            <label htmlFor="goals" className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
              What are you trying to build over the next 3–6 months? <span className="text-accent">*</span>
            </label>
            <textarea
              id="goals"
              rows={4}
              value={goals}
              onChange={(e) => {
                setGoals(e.target.value)
                if (errors.goals) setErrors((prev) => ({ ...prev, goals: undefined }))
              }}
              placeholder="Tell me what success would look like for you, what you're currently working toward, and anything you think I should understand about your goals."
              className={`w-full bg-bg border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent transition-colors leading-relaxed ${
                errors.goals ? 'border-red-500/80' : 'border-border'
              }`}
            />
          </div>

          <div>
            <label htmlFor="obstacles" className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
              What's getting in the way right now? <span className="text-secondary/60 font-normal lowercase">(optional)</span>
            </label>
            <textarea
              id="obstacles"
              rows={3}
              value={obstacles}
              onChange={(e) => setObstacles(e.target.value)}
              placeholder="Consistency, confidence, technical problems, direction, community growth, time, etc."
              className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent transition-colors leading-relaxed"
            />
          </div>
        </div>
      </ApplicationSection>

      {/* 06. Service Interest */}
      <ApplicationSection
        number="06"
        title="Service Interest"
        description="Which level of support sounds closest to what you're looking for?"
        required
        error={errors.serviceInterest}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SERVICE_OPTIONS.map((opt) => (
            <SelectableOption
              key={opt.value}
              label={opt.title}
              description={opt.description}
              type="radio"
              selected={serviceInterest === opt.value}
              onClick={() => {
                setServiceInterest(opt.value)
                if (errors.serviceInterest) setErrors((prev) => ({ ...prev, serviceInterest: undefined }))
              }}
            />
          ))}
        </div>
      </ApplicationSection>

      {/* Submit Button & Disclaimer */}
      <div className="pt-4 text-center space-y-4">
        <Button
          onClick={() => {}}
          variant="primary"
          icon={<Send size={16} />}
          className="w-full sm:w-auto min-w-[260px] py-4 text-base font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>

        {submitError && (
          <div className="flex items-center justify-center gap-1.5 text-red-400 text-sm font-medium pt-2">
            <AlertCircle size={16} />
            <span>{submitError}</span>
          </div>
        )}

        <p className="text-xs text-secondary/70">
          No pressure. This helps me understand what you're building before we talk.
        </p>
      </div>
    </form>
  )
}

export default CreatorApplicationForm
