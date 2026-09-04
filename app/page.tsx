'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, HeartHandshake, Navigation, PartyPopper, Sparkles, MapPin, AlertTriangle, Brain, Stethoscope, HeartPulse, Home as HomeIcon, Users } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { WaveDivider } from '@/components/wave-divider'
import { VenueMap } from '@/components/venue-map'
import { YouTubeEmbed } from '@/components/youtube-embed'
import { subscribeToNewsletter, sendContactMessage } from '@/app/actions/email'

const statCards = [
  {
    title: 'Ottawa County Substance Impact',
    body: 'Among underserved Ottawa County residents, 42.6% report that substance use or addiction has negatively impacted their lives or the lives of someone they know (2023 CHNA).',
    accent: 'primary' as const,
  },
  {
    title: 'Mental Health Crisis',
    body: 'Ottawa County residents reporting poor mental health has doubled since 2014. Mental health is now a top priority need identified in the 2024 Healthy Ottawa Plan.',
    accent: 'accent' as const,
  },
  {
    title: 'Healthcare Access Gap',
    body: '36.4% of non-white Ottawa County residents lack a personal healthcare provider, compared to 8.1% of white residents, highlighting critical disparities in access to care.',
    accent: 'secondary' as const,
  },
  {
    title: 'Health Perception',
    body: 'While 14.8% of Ottawa County adults report fair or poor health, this rises to 32.5% among underserved adults, showing the need for targeted community support.',
    accent: 'primary' as const,
  },
  {
    title: 'Housing Instability',
    body: "1 in 5 Ottawa County underserved adults didn't pay full rent or mortgage last year. Housing instability is directly linked to poor health outcomes and recovery challenges.",
    accent: 'accent' as const,
  },
  {
    title: 'Recovery Fest Community Impact',
    body: 'For 23 years, Recovery Fest has connected Ottawa County residents with free resources, support, and hope—addressing the critical needs identified in our community health assessments.',
    accent: 'secondary' as const,
  },
]

const accentStyles = {
  primary: 'border-primary/25 bg-primary/5 hover:border-primary/50',
  accent: 'border-accent/25 bg-accent/5 hover:border-accent/50',
  secondary: 'border-secondary/40 bg-secondary/10 hover:border-secondary/70',
}

const accentTextStyles = {
  primary: 'text-primary',
  accent: 'text-accent',
  secondary: 'text-secondary-foreground',
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [email, setEmail] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [emailLoading, setEmailLoading] = useState(false)

  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [contactMessage, setContactMessage] = useState('')
  const [contactLoading, setContactLoading] = useState(false)
  const [mapOpen, setMapOpen] = useState(false)
  const [mapZoom, setMapZoom] = useState(1)

  const slides = [
    '/images/slide1.jpg',
    '/images/slide2.jpg',
    '/images/slide3.jpg',
    '/images/slide4.jpg',
    '/images/slide5.jpg',
    '/images/slide6.jpg',
    '/images/slide7.jpg',
    '/images/slide8.jpg',
    '/images/slide9.jpg',
  ]

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const eventDate = new Date('2026-09-09T15:00:00').getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = eventDate - now

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Auto-advance slideshow
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(slideTimer)
  }, [slides.length])

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactLoading(true)
    setContactMessage('')

    const result = await sendContactMessage(contactForm)

    if (result.success) {
      setContactMessage(result.message || 'Thank you for your message!')
      setContactForm({ name: '', email: '', message: '' })
      setTimeout(() => setContactMessage(''), 5000)
    } else {
      setContactMessage(result.error || 'Something went wrong')
    }

    setContactLoading(false)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailLoading(true)
    setEmailMessage('')

    const result = await subscribeToNewsletter(email)

    if (result.success) {
      setEmailMessage(result.message || 'Thank you for subscribing!')
      setEmail('')
      setTimeout(() => setEmailMessage(''), 5000)
    } else {
      setEmailMessage(result.error || 'Something went wrong')
    }

    setEmailLoading(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const countdownUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  const stats = [
    {
      icon: AlertTriangle,
      color: 'from-primary to-primary/70',
      title: 'Ottawa County Substance Impact',
      body: 'Among underserved Ottawa County residents, 42.6% report that substance use or addiction has negatively impacted their lives or the lives of someone they know (2023 CHNA).',
    },
    {
      icon: Brain,
      color: 'from-accent to-accent/70',
      title: 'Mental Health Crisis',
      body: 'Ottawa County residents reporting poor mental health has doubled since 2014. Mental health is now a top priority need identified in the 2024 Healthy Ottawa Plan.',
    },
    {
      icon: Stethoscope,
      color: 'from-secondary to-secondary/70',
      title: 'Healthcare Access Gap',
      body: '36.4% of non-white Ottawa County residents lack a personal healthcare provider, compared to 8.1% of white residents, highlighting critical disparities in access to care.',
    },
    {
      icon: HeartPulse,
      color: 'from-primary to-accent',
      title: 'Health Perception',
      body: 'While 14.8% of Ottawa County adults report fair or poor health, this rises to 32.5% among underserved adults, showing the need for targeted community support.',
    },
    {
      icon: HomeIcon,
      color: 'from-secondary to-primary',
      title: 'Housing Instability',
      body: "1 in 5 Ottawa County underserved adults didn't pay full rent or mortgage last year. Housing instability is directly linked to poor health outcomes and recovery challenges.",
    },
    {
      icon: Users,
      color: 'from-accent to-secondary',
      title: 'Recovery Fest Community Impact',
      body: 'For 23 years, Recovery Fest has connected Ottawa County residents with free resources, support, and hope—addressing the critical needs identified in our community health assessments.',
    },
  ]

  return (
    <div className="w-full">
      {/* Banner Section */}
      <section className="bg-background px-4 py-6">
        <div className="container mx-auto max-w-7xl">
          <div className="relative h-32 w-full overflow-hidden rounded-2xl shadow-md transition-transform duration-300 hover:scale-[1.01] md:h-48">
            <Image
              src="/images/banner.jpg"
              alt="Recovery Fest - Invest in health, home, purpose, and community"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Hero Section with Image Background */}
      <section className="group relative flex min-h-[640px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-primary/92 via-primary/80 to-accent/85" />
        <div className="absolute inset-0 z-10 bg-grain opacity-20" />
        <Image
          src="/hero-recovery-hands.jpg"
          alt="Recovery Fest"
          fill
          className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
          priority
        />

        {/* Floating festival accents */}
        <PartyPopper className="absolute left-[8%] top-[18%] z-20 h-10 w-10 text-secondary/80 animate-float-slow" aria-hidden="true" />
        <Sparkles className="absolute right-[12%] top-[28%] z-20 h-8 w-8 text-secondary/70 animate-float-slower" aria-hidden="true" />
        <Sparkles className="absolute bottom-[22%] left-[15%] z-20 h-6 w-6 text-background/60 animate-float-slow" aria-hidden="true" />

        <div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center text-background">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-background/15 px-5 py-2 text-sm font-semibold uppercase tracking-widest backdrop-blur-sm animate-fade-in">
            23rd Annual &middot; Free Community Celebration
          </span>
          <h1 className="font-heading text-balance text-5xl font-extrabold leading-[1.05] drop-shadow-lg animate-fade-in-up md:text-7xl">
            Join us in celebration at Recovery Fest 2026
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-background/90 animate-fade-in-up delay-200 md:text-xl">
            September 9, 2026 &middot; The Salvation Army, Holland, MI &middot; 3:00–6:00pm
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row animate-fade-in-up delay-300">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-secondary px-8 text-base font-bold text-secondary-foreground shadow-lg shadow-secondary/30 transition-all hover:scale-105 hover:shadow-xl"
            >
              <Link href="https://zeffy.com/en-US/donation-form/recovery-fest" target="_blank" rel="noopener noreferrer">
                <HeartHandshake className="h-5 w-5" data-icon="inline-start" />
                Donate to Recovery Fest
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-background/40 bg-background/10 px-8 text-base font-bold text-background backdrop-blur-sm transition-all hover:scale-105 hover:bg-background/20"
            >
              <Link href="#location">
                <Navigation className="h-5 w-5" data-icon="inline-start" />
                Get Directions
              </Link>
            </Button>
          </div>
        </div>

        <WaveDivider color="var(--background)" />
      </section>

      {/* Road Closure Announcement */}
      <section className="bg-background px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <p className="mb-4 flex items-center justify-center gap-2 text-center text-xl font-extrabold uppercase tracking-wide text-destructive md:text-2xl">
            <AlertTriangle className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
            USE CHICAGO DRIVE TO TURN DOWN CLOVER AVE
            <AlertTriangle className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
          </p>
          <div className="overflow-hidden rounded-2xl border-2 border-destructive/25 bg-destructive/5 shadow-lg">
            <div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
              <div className="p-6 md:p-8">
                <p className="mb-3 text-sm font-bold uppercase tracking-wider text-destructive">Road Closure</p>
                <h2 className="mb-6 text-2xl font-bold leading-tight text-foreground md:text-3xl">
                  8th St., U.S. 31 to Chicago Dr., Holland, begins Sept. 8
                </h2>
                <dl className="grid gap-4 text-sm leading-relaxed text-foreground md:grid-cols-2">
                  <div><dt className="font-bold">WHAT</dt><dd>Permitted Road Closure</dd></div>
                  <div><dt className="font-bold">WHEN</dt><dd>Beginning Sept. 8, 2026</dd></div>
                  <div><dt className="font-bold">WHERE</dt><dd>8th St., U.S. 31 to Chicago Dr., Holland Twp.</dd></div>
                  <div><dt className="font-bold">WHY</dt><dd>Storm Sewer Work</dd></div>
                </dl>
                <div className="mt-6 border-t border-destructive/20 pt-6 text-sm leading-relaxed text-muted-foreground">
                  <p><strong className="text-foreground">BACKGROUND:</strong> 8th Street between U.S. 31 and Chicago Drive in Holland Township will be closed beginning Tuesday, September 8, 2026, for permitted storm sewer work.</p>
                  <p className="mt-4">This closure should last through Tuesday, September 15, 2026. Please note that all dates are tentative, and work is weather dependent.</p>
                  <p className="mt-4"><strong className="text-foreground">TRAFFIC IMPACT:</strong> The detour route is Chicago Dr. to U.S. 31.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMapZoom(1)
                  setMapOpen(true)
                }}
                className="group flex min-h-64 cursor-zoom-in flex-col items-center justify-center bg-destructive/10 p-4 text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-destructive/40 md:min-h-full"
                aria-label="Open road closure map for zooming"
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Salvation%20Army%20%2811-HDbNv5oCqs5QcAjb7WHSNGYe7jUwvq.jpg"
                  alt="Map showing the 8th Street road closure, Salvation Army, and Chicago Drive to U.S. 31 detour"
                  className="h-full max-h-[520px] w-full object-contain transition-transform group-hover:scale-[1.02]"
                />
                <span className="mt-3 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background">
                  Click map to zoom
                </span>
              </button>
            </div>
          </div>
          <Dialog open={mapOpen} onOpenChange={setMapOpen}>
            <DialogContent className="max-w-[calc(100%-1rem)] border-destructive/20 bg-background p-3 sm:max-w-6xl">
              <DialogHeader className="px-2 pt-1">
                <DialogTitle className="text-foreground">8th Street Road Closure Map</DialogTitle>
                <DialogDescription>Use the controls to zoom in on the closure and detour.</DialogDescription>
              </DialogHeader>
              <div className="max-h-[70vh] overflow-auto rounded-md bg-muted p-2">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Salvation%20Army%20%2811-HDbNv5oCqs5QcAjb7WHSNGYe7jUwvq.jpg"
                  alt="Detailed map showing the 8th Street road closure and detour route"
                  className="mx-auto block origin-top transition-transform duration-200"
                  style={{ width: `${mapZoom * 100}%`, maxWidth: 'none' }}
                />
              </div>
              <div className="flex items-center justify-center gap-3" aria-label="Map zoom controls">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setMapZoom((zoom) => Math.max(1, zoom - 0.25))}
                  disabled={mapZoom <= 1}
                >
                  <ZoomOut data-icon="inline-start" />
                  Zoom out
                </Button>
                <span className="min-w-16 text-center text-sm font-semibold text-foreground">{Math.round(mapZoom * 100)}%</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setMapZoom((zoom) => Math.min(3, zoom + 0.25))}
                  disabled={mapZoom >= 3}
                >
                  <ZoomIn data-icon="inline-start" />
                  Zoom in
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Main Event Announcement */}
      <section className="relative bg-gradient-to-b from-muted via-background to-background px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-block rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2 font-semibold text-primary-foreground shadow-md transition-transform duration-300 hover:scale-105">
            23rd Annual Event
          </div>
          <p className="animate-fade-in mb-12 text-xl leading-relaxed text-muted-foreground md:text-2xl">
            Mark your calendars! Recovery Fest is happening on{' '}
            <strong className="text-foreground">September 9, 2026</strong> at{' '}
            <strong className="text-foreground">The Salvation Army</strong> in Holland, MI. Join us for an
            event full of fun, food, family friendly activities, connection and valuable resources.
          </p>

          {/* Countdown Timer */}
          <div className="mx-auto grid max-w-xl grid-cols-4 gap-3">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' },
            ].map((item) => (
              <div
                key={item.label}
                className="cursor-pointer rounded-2xl border border-primary/15 bg-card p-4 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div key={item.value} className="mb-1 animate-count-pop font-heading text-3xl font-bold text-primary md:text-4xl">
                  {item.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent px-4 py-20 text-primary-foreground">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-5xl">
              Want to See What Recovery Fest is All About?
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-primary-foreground/85">
              Watch these videos to experience the joy, hope, and community that makes Recovery Fest such a special celebration. See highlights from past events and discover why this festival has been bringing people together for over two decades.
            </p>
          </div>

          <div className="mb-8 grid gap-8 md:grid-cols-2">
            <div className="space-y-4 transition-transform duration-300 hover:scale-[1.02]">
              <YouTubeEmbed
                videoId="9hybir7nolQ"
                title="Recovery Fest Highlights"
                className="rounded-2xl shadow-2xl ring-4 ring-background/20 transition-all duration-300 hover:ring-secondary/60"
              />
              <h3 className="text-center text-xl font-bold">Recovery Fest Highlights</h3>
            </div>

            <div className="space-y-4 transition-transform duration-300 hover:scale-[1.02]">
              <YouTubeEmbed
                videoId="ZSF2bYwcl_o"
                title="Recovery Fest Experience"
                className="rounded-2xl shadow-2xl ring-4 ring-background/20 transition-all duration-300 hover:ring-secondary/60"
              />
              <h3 className="text-center text-xl font-bold">Recovery Fest Experience</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Image Slideshow */}
      <section className="bg-background px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              Moments
            </span>
            <h2 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
              Experience the Joy
            </h2>
          </div>
          <div className="relative h-[400px] overflow-hidden rounded-2xl bg-foreground shadow-2xl ring-1 ring-border md:h-[500px]">
            {slides.map((slide, index) => (
              <div
                key={slide}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={slide || '/placeholder.svg'}
                  alt={`Recovery Fest moment ${index + 1}`}
                  fill
                  className="object-contain transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 transition-all hover:scale-110 hover:bg-background hover:shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 text-foreground" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 transition-all hover:scale-110 hover:bg-background hover:shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 text-foreground" />
            </button>
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 w-3 rounded-full transition-all ${
                    index === currentSlide ? 'scale-125 bg-secondary' : 'bg-background/50 hover:scale-110'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-r from-accent to-primary px-12 py-6 text-lg text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Link href="/gallery">View Photo Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Building Community Section */}
      <section className="relative bg-gradient-to-br from-primary/95 via-primary to-accent/90 px-4 py-20 text-primary-foreground">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-heading text-4xl font-bold transition-transform duration-300 hover:scale-[1.02] md:text-5xl">
            Building a Stronger Recovery Community
          </h2>
          <p className="text-center text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
            Since its beginning, <strong className="text-background">Recovery Fest</strong> has been a beacon of hope,
            connection, and support for those impacted by addiction and mental health challenges. More than just a
            celebration, this event serves as a powerful way to{' '}
            <strong className="text-secondary">break stigma, raise awareness, and connect individuals with essential
            recovery resources</strong>. Whether you&apos;re in recovery, supporting a loved one, or simply passionate about
            the cause, this festival is for everyone who believes in{' '}
            <strong className="text-background">healing, second chances, and a brighter future.</strong>
          </p>
        </div>
      </section>

      {/* Did You Know Stats */}
      <section className="bg-muted/40 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent">
              By the Numbers
            </span>
            <h2 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
              Did You Know?
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {statCards.map((card) => (
              <Card
                key={card.title}
                className={`card-lift rounded-2xl border-2 shadow-md transition-all duration-300 hover:shadow-xl ${accentStyles[card.accent]}`}
              >
                <CardContent className="p-6">
                  <h3 className={`mb-3 font-heading text-lg font-bold ${accentTextStyles[card.accent]}`}>{card.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="bg-background px-4 py-16">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="mb-4 font-heading text-5xl font-bold text-primary md:text-6xl">
            Support Recovery, Strengthen Community
          </h1>
          <h2 className="mb-6 font-heading text-3xl font-bold text-accent md:text-4xl">
            Your Support Makes Recovery Fest Possible
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            Recovery Fest is a <strong className="text-foreground">free community event</strong>, made possible by
            generous donations from individuals and local businesses who believe in the power of recovery. Your
            contributions help us provide <strong className="text-foreground">entertainment, educational materials,
            food, and outreach efforts</strong>—ensuring that this festival remains a{' '}
            <strong className="text-foreground">safe and welcoming space</strong> for all. Every donation strengthens
            our mission to support those on their recovery journey and bring life-changing resources to the community.
            Thank you for being part of this movement!
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-gradient-to-r from-primary to-accent px-8 text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            <Link href="https://zeffy.com/en-US/donation-form/recovery-fest" target="_blank" rel="noopener noreferrer">
              Donate to Recovery Fest
            </Link>
          </Button>
        </div>
      </section>

      {/* Sponsorship Section */}
      <section className="bg-secondary/10 px-4 py-16">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-heading text-4xl font-bold text-foreground md:text-5xl">
            Become a Sponsor of Recovery Fest
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
            Support the journey of recovery and make a lasting impact in our community by becoming a sponsor of
            Recovery Fest. Your partnership will help provide vital resources and raise awareness about recovery
            services while showcasing your commitment to positive social change. Together, we can foster hope,
            strength, and resilience.
          </p>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            For more information on sponsorship opportunities, send us a message below or reach out to us via email
            at{' '}
            <a href="mailto:RecoveryFestMI@Gmail.com" className="font-semibold text-primary hover:underline">
              RecoveryFestMI@Gmail.com
            </a>
            . We look forward to working with you!
          </p>
        </div>
      </section>

      {/* Event Details with Countdown */}
      <section className="relative bg-gradient-to-br from-primary to-accent px-4 py-20 text-primary-foreground">
        <h2 className="mb-12 text-center font-heading text-6xl font-black tracking-tight md:text-7xl">Join Us!</h2>

        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border-2 border-background/20 bg-background/10 p-8 text-center shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-secondary/60 hover:shadow-2xl">
              <h3 className="mb-3 font-heading text-4xl font-bold text-secondary md:text-5xl">When</h3>
              <p className="text-2xl font-bold leading-relaxed md:text-3xl">Wednesday, September 9, 2026</p>
            </div>
            <div className="rounded-2xl border-2 border-background/20 bg-background/10 p-8 text-center shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-secondary/60 hover:shadow-2xl">
              <h3 className="mb-3 font-heading text-4xl font-bold text-secondary md:text-5xl">Time</h3>
              <div className="text-center text-2xl font-bold leading-relaxed md:text-3xl">
                <p>3:00pm</p>
                <p className="mb-2 mt-2 text-xl md:text-2xl">to</p>
                <p>6:00pm</p>
              </div>
            </div>
            <div className="rounded-2xl border-2 border-background/20 bg-background/10 p-8 text-center shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-secondary/60 hover:shadow-2xl">
              <h3 className="mb-3 font-heading text-4xl font-bold text-secondary md:text-5xl">Where</h3>
              <p className="text-2xl font-bold leading-relaxed md:text-3xl">The Salvation Army<br /><span className="text-lg md:text-xl">104 Clover St<br />Holland, MI 49423</span></p>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-secondary to-secondary/80 p-8 text-center text-secondary-foreground shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <p className="font-heading text-4xl font-black md:text-5xl">Cost: FREE!</p>
          </div>
        </div>

        <WaveDivider color="var(--background)" flip />
      </section>

      {/* Venue Map & Directions */}
      <VenueMap />

      {/* Contact Form */}
      <section className="relative bg-gradient-to-br from-primary to-accent px-4 py-16 text-primary-foreground">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <MapPin className="mx-auto mb-3 h-8 w-8 text-secondary" />
            <h2 className="mb-2 font-heading text-4xl font-bold">
              Have a question or want to get involved?
            </h2>
            <p className="text-primary-foreground/85">Send us a message!</p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full rounded-xl bg-background text-foreground placeholder:text-muted-foreground"
                required
                disabled={contactLoading}
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full rounded-xl bg-background text-foreground placeholder:text-muted-foreground"
                required
                disabled={contactLoading}
              />
            </div>
            <div>
              <Textarea
                placeholder="Message"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                rows={6}
                className="w-full resize-none rounded-xl bg-background text-foreground placeholder:text-muted-foreground"
                required
                disabled={contactLoading}
              />
            </div>

            {contactMessage && (
              <p className={`text-sm ${contactMessage.includes('Thank') ? 'text-secondary' : 'text-destructive-foreground'}`}>
                {contactMessage}
              </p>
            )}

            <Button
              type="submit"
              disabled={contactLoading}
              className="w-full rounded-full bg-background font-semibold text-primary hover:bg-background/90"
            >
              {contactLoading ? 'Sending...' : 'Send'}
            </Button>
          </form>

          {/* Newsletter */}
          <div className="mt-12 rounded-2xl border border-background/20 bg-background/10 p-6 text-center backdrop-blur">
            <p className="mb-4 font-semibold">Want event updates in your inbox?</p>
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-xl bg-background text-foreground placeholder:text-muted-foreground"
                required
                disabled={emailLoading}
              />
              <Button
                type="submit"
                disabled={emailLoading}
                className="rounded-xl bg-secondary font-semibold text-secondary-foreground hover:bg-secondary/90"
              >
                {emailLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            {emailMessage && (
              <p className={`mt-3 text-sm ${emailMessage.includes('Thank') ? 'text-secondary' : 'text-destructive-foreground'}`}>
                {emailMessage}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
