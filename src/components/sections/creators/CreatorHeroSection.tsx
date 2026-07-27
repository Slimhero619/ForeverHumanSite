import { Sparkles, ArrowRight, ShieldCheck, Cpu, Compass } from 'lucide-react'
import Button from '../../ui/Button'
import AnimatedSection from '../../ui/AnimatedSection'

function CreatorHeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-bg overflow-hidden border-b border-border/60">
      {/* Restrained Creator Background Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column — Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm">
                <Sparkles size={13} className="text-sky-400" />
                <span>FOR CREATORS</span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.05}>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-primary uppercase leading-[0.95] mb-6">
                Build More <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent">
                  Than a Stream.
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-lg md:text-xl text-accent font-medium tracking-wide mb-4 max-w-2xl">
                Mindset, systems, and strategy for creators who want to build something real.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <p className="text-secondary text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                Forever Human helps emerging creators build the person and the platform behind their content — combining creator development, strategy, community systems, and hands-on technical support.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <Button href="/creators/apply" variant="primary" icon={<ArrowRight size={16} />}>
                  Start Building
                </Button>
                <Button href="#pillars" variant="secondary">
                  See How It Works
                </Button>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column — Abstract Creator OS Visual Panel */}
          <div className="lg:col-span-5">
            <AnimatedSection delay={0.25}>
              <div className="relative group">
                {/* Outer Glow frame */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent/20 via-sky-500/20 to-accent/20 blur-md opacity-70 group-hover:opacity-100 transition duration-500" />

                {/* Main Glass Panel */}
                <div className="relative bg-card/90 border border-border rounded-xl overflow-hidden shadow-2xl backdrop-blur-md p-6">
                  
                  {/* Top Bar Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <div className="text-[11px] font-mono tracking-wider text-secondary/70 uppercase">
                      FOREVER HUMAN // CREATOR OS
                    </div>
                  </div>

                  {/* System Status Pill */}
                  <div className="flex items-center justify-between bg-bg/80 border border-border/80 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                      </span>
                      <span className="text-xs font-mono text-primary font-medium tracking-wide">CREATOR DEVELOPMENT SYSTEM</span>
                    </div>
                    <span className="text-[10px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded">ACTIVE</span>
                  </div>

                  {/* 3 Abstract System Nodes */}
                  <div className="space-y-3">
                    
                    {/* Node 1: Mindset & Discipline */}
                    <div className="bg-bg/60 border border-border rounded-lg p-3.5 flex items-start gap-3 hover:border-accent/40 transition-colors">
                      <div className="p-2 rounded-md bg-accent/10 border border-accent/20 text-accent">
                        <ShieldCheck size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-primary">01. Creator Mindset & Discipline</div>
                        <div className="text-[11px] text-secondary mt-0.5">Confidence, habits & personal accountability</div>
                      </div>
                    </div>

                    {/* Node 2: Systems & Bots */}
                    <div className="bg-bg/60 border border-border rounded-lg p-3.5 flex items-start gap-3 hover:border-sky-500/40 transition-colors">
                      <div className="p-2 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-400">
                        <Cpu size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-primary">02. Community & Automation</div>
                        <div className="text-[11px] text-secondary mt-0.5">Discord architecture, custom bots & workflows</div>
                      </div>
                    </div>

                    {/* Node 3: Strategy & Platform Growth */}
                    <div className="bg-bg/60 border border-border rounded-lg p-3.5 flex items-start gap-3 hover:border-accent/40 transition-colors">
                      <div className="p-2 rounded-md bg-accent/10 border border-accent/20 text-accent">
                        <Compass size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-primary">03. Positioning & Strategy</div>
                        <div className="text-[11px] text-secondary mt-0.5">Content planning & sustainable growth roadmap</div>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Stats Footer Bar */}
                  <div className="mt-5 pt-4 border-t border-border/80 flex items-center justify-between text-[11px] text-secondary">
                    <span>STATUS: READY TO BUILD</span>
                    <span className="text-accent font-mono">100% INTENTIONAL</span>
                  </div>

                </div>
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </section>
  )
}

export default CreatorHeroSection
