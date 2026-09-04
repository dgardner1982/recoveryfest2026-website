'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  AlertTriangle,
  Calendar,
  Clock,
  MapPin,
  Star,
  PartyPopper,
  Users,
  Stethoscope,
  Brain,
  HomeIcon,
  HeartPulse,
  Sparkles,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { VenueMap } from '@/components/venue-map'
import { sendContactMessage } from '@/app/actions/email'

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

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
      {/* Hero Section with Video Background */}
      <section className="relative flex items-center justify-center overflow-hidden">
        <div className="bg-hero-gradient absolute inset-0 z-10 opacity-90" />
        <div className="bg-dot-grid absolute inset-0 z-10 opacity-40" />
        <Image
          src="/hero-recovery-hands.jpg"
          alt="Recovery Fest"
          fill
          className="object-cover mix-blend-luminosity"
          priority
        />
        <div className="relative z-20 mx-auto flex min-h-[640px] max-w-4xl flex-col items-center justify-center px-4 py-24 text-center text-white">
          <span className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-secondary ring-1 ring-white/25">
            <Sparkles className="h-3.5 w-3.5" />
            23rd Annual &middot; Free Community Event
          </span>
          <h1 className="animate-fade-in text-balance text-5xl font-extrabold leading-tight md:text-7xl">
            Join Us in Celebration at <span className="text-secondary">Recovery Fest</span> 2026
          </h1>
          <p className="animate-fade-in mt-6 max-w-2xl text-balance text-lg text-white/85 md:text-xl">
            A day of hope, healing, and community &mdash; free music, food, family activities, and vital
            recovery resources for everyone in Holland, MI.
          </p>
          <div className="animate-fade-in mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="btn-shine bg-secondary text-secondary-foreground px-8 py-6 text-base font-bold shadow-xl shadow-secondary/40 hover:-translate-y-0.5 hover:bg-secondary/90"
            >
              <Link href="https://zeffy.com/en-US/donation-form/recovery-fest" target="_blank" rel="noopener noreferrer">
                Donate Now
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="glass-panel px-8 py-6 text-base font-bold text-white hover:bg-white/20 hover:text-white"
            >
              <Link href="/gallery">View Photo Gallery</Link>
            </Button>
          </div>

          {/* Quick info chips */}
          <div className="glass-panel animate-fade-in mt-12 grid w-full max-w-3xl grid-cols-1 gap-4 rounded-2xl p-5 text-left sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 shrink-0 text-secondary" />
              <div>
                <p className="text-xs uppercase tracking-wide text-white/70">Date</p>
                <p className="text-sm font-bold">Sept 9, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 shrink-0 text-secondary" />
              <div>
                <p className="text-xs uppercase tracking-wide text-white/70">Time</p>
                <p className="text-sm font-bold">3&ndash;6 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-secondary" />
              <div>
                <p className="text-xs uppercase tracking-wide text-white/70">Where</p>
                <p className="text-sm font-bold">Salvation Army, Holland</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="bg-background px-4 py-10">
        <div className="container mx-auto max-w-6xl">
          <div className="card-pop relative h-32 w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-border md:h-48">
            <Image
              src="/images/banner.jpg"
              alt="Recovery Fest - Invest in health, home, purpose, and community"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Road Closure Announcement */}
      <section className="bg-background px-4 py-6">
        <div className="container mx-auto max-w-6xl">
          <p className="mb-4 flex items-center justify-center gap-2 text-center text-xl font-extrabold uppercase tracking-wide text-red-700 md:text-2xl">
            <Star className="h-5 w-5 shrink-0 fill-red-600 text-red-600" />
            Use Chicago Drive to Turn Down Clover Ave
            <Star className="h-5 w-5 shrink-0 fill-red-600 text-red-600" />
          </p>
          <div className="overflow-hidden rounded-2xl border-2 border-red-200 bg-red-50 shadow-lg">
            <div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
              <div className="p-6 md:p-8">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-red-700">
                  <AlertTriangle className="h-4 w-4" />
                  Road Closure
                </div>
                <h2 className="mb-6 text-2xl font-bold leading-tight text-red-950 md:text-3xl">
                  8th St., U.S. 31 to Chicago Dr., Holland, begins Sept. 8
                </h2>
                <dl className="grid gap-4 text-sm leading-relaxed text-red-950 md:grid-cols-2">
                  <div><dt className="font-bold">WHAT</dt><dd>Permitted Road Closure</dd></div>
                  <div><dt className="font-bold">WHEN</dt><dd>Beginning Sept. 8, 2026</dd></div>
                  <div><dt className="font-bold">WHERE</dt><dd>8th St., U.S. 31 to Chicago Dr., Holland Twp.</dd></div>
                  <div><dt className="font-bold">WHY</dt><dd>Storm Sewer Work</dd></div>
                </dl>
                <div className="mt-6 border-t border-red-200 pt-6 text-sm leading-relaxed text-red-950">
                  <p><strong>BACKGROUND:</strong> 8th Street between U.S. 31 and Chicago Drive in Holland Township will be closed beginning Tuesday, September 8, 2026, for permitted storm sewer work.</p>
                  <p className="mt-4">This closure should last through Tuesday, September 15, 2026. Please note that all dates are tentative, and work is weather dependent.</p>
                  <p className="mt-4"><strong>TRAFFIC IMPACT:</strong> The detour route is Chicago Dr. to U.S. 31.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMapZoom(1)
                  setMapOpen(true)
                }}
                className="group flex min-h-64 cursor-zoom-in flex-col items-center justify-center bg-red-100 p-4 text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-400 md:min-h-full"
                aria-label="Open road closure map for zooming"
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Salvation%20Army%20%2811-HDbNv5oCqs5QcAjb7WHSNGYe7jUwvq.jpg"
                  alt="Map showing the 8th Street road closure, Salvation Army, and Chicago Drive to U.S. 31 detour"
                  className="h-full max-h-[520px] w-full object-contain transition-transform group-hover:scale-[1.02]"
                />
                <span className="mt-3 rounded-full bg-red-950 px-4 py-2 text-sm font-semibold text-white">
                  Click map to zoom
                </span>
              </button>
            </div>
          </div>
          <Dialog open={mapOpen} onOpenChange={setMapOpen}>
            <DialogContent className="max-w-[calc(100%-1rem)] border-red-200 bg-red-50 p-3 sm:max-w-6xl">
              <DialogHeader className="px-2 pt-1">
                <DialogTitle className="text-red-950">8th Street Road Closure Map</DialogTitle>
                <DialogDescription>Use the controls to zoom in on the closure and detour.</DialogDescription>
              </DialogHeader>
              <div className="max-h-[70vh] overflow-auto rounded-md bg-red-100 p-2">
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
                <span className="min-w-16 text-center text-sm font-semibold text-red-950">{Math.round(mapZoom * 100)}%</span>
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

      {/* Main Event Announcement + Countdown */}
      <section className="bg-muted/40 px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-bold text-white shadow-md">
            <PartyPopper className="h-4 w-4" />
            23rd Annual Event
          </span>
          <p className="animate-fade-in mb-12 text-xl leading-relaxed text-muted-foreground md:text-2xl">
            Mark your calendars! Recovery Fest is happening on{' '}
            <strong className="text-foreground">September 9, 2026</strong> at{' '}
            <strong className="text-foreground">The Salvation Army</strong> in Holland, MI. Join us for an
            event full of fun, food, family friendly activities, connection and valuable resources.
          </p>

          {/* Countdown Timer */}
          <div className="mx-auto grid max-w-xl grid-cols-4 gap-3">
            {countdownUnits.map((unit) => (
              <div
                key={unit.label}
                className="card-pop bg-hero-gradient transform cursor-default rounded-2xl p-4 text-center text-white shadow-lg"
              >
                <div className="mb-1 text-3xl font-extrabold md:text-4xl">{unit.value}</div>
                <div className="text-xs uppercase tracking-wider opacity-90">{unit.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-dot-grid bg-hero-gradient px-4 py-20">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="animate-fade-in mb-4 text-3xl font-extrabold text-white md:text-5xl">
              Want to See What Recovery Fest is All About?
            </h2>
            <p className="animate-fade-in mx-auto max-w-3xl text-lg leading-relaxed text-white/80">
              Watch these videos to experience the joy, hope, and community that makes Recovery Fest such
              a special celebration. See highlights from past events and discover why this festival has
              been bringing people together for over two decades.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="ring-white/30 relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl ring-4 transition-all duration-300 hover:ring-secondary">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/9hybir7nolQ?autoplay=0"
                  title="Recovery Fest Highlights"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                />
              </div>
              <h3 className="text-center text-xl font-bold text-white">Recovery Fest Highlights</h3>
            </div>

            <div className="space-y-4">
              <div className="ring-white/30 relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl ring-4 transition-all duration-300 hover:ring-secondary">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/ZSF2bYwcl_o?autoplay=0"
                  title="Recovery Fest Experience"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                />
              </div>
              <h3 className="text-center text-xl font-bold text-white">Recovery Fest Experience</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Image Slideshow */}
      <section className="bg-background px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-extrabold text-foreground md:text-5xl">Experience the Joy</h2>
            <div className="divider-accent mx-auto mt-4" />
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
                  className="object-contain"
                />
              </div>
            ))}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 transition-all hover:scale-110 hover:bg-white hover:shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 text-foreground" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 transition-all hover:scale-110 hover:bg-white hover:shadow-lg"
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
                    index === currentSlide ? 'scale-125 bg-secondary' : 'bg-white/50 hover:scale-110'
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
              className="btn-shine bg-gradient-to-r from-primary to-accent px-12 py-6 text-lg text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Link href="/gallery">View Photo Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Building Community Section */}
      <section className="bg-vivid-gradient px-4 py-20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-4xl font-extrabold text-white md:text-5xl">
            Building a Stronger Recovery Community
          </h2>
          <p className="text-center text-lg leading-relaxed text-white/85 md:text-xl">
            Since its beginning, <strong className="text-white">Recovery Fest</strong> has been a beacon of
            hope, connection, and support for those impacted by addiction and mental health challenges. More
            than just a celebration, this event serves as a powerful way to{' '}
            <strong className="text-secondary">
              break stigma, raise awareness, and connect individuals with essential recovery resources
            </strong>
            . Whether you&apos;re in recovery, supporting a loved one, or simply passionate about the cause,
            this festival is for everyone who believes in{' '}
            <strong className="text-white">healing, second chances, and a brighter future.</strong>
          </p>
        </div>
      </section>

      {/* Did You Know Stats */}
      <section className="bg-muted/40 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-extrabold text-foreground md:text-5xl">Did You Know?</h2>
            <div className="divider-accent mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.title} className="card-pop overflow-hidden border-border bg-card">
                  <div className={`h-1.5 w-full bg-gradient-to-r ${stat.color}`} />
                  <CardContent className="p-6">
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-md`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mb-3 text-lg font-bold text-foreground">{stat.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{stat.body}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="bg-background px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-gradient-brand mb-4 text-4xl font-extrabold md:text-6xl">
            Support Recovery, Strengthen Community
          </h2>
          <p className="mb-6 text-2xl font-bold text-foreground/80">Your Support Makes Recovery Fest Possible</p>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            Recovery Fest is a <strong className="text-foreground">free community event</strong>, made
            possible by generous donations from individuals and local businesses who believe in the power
            of recovery. Your contributions help us provide{' '}
            <strong className="text-foreground">entertainment, educational materials, food, and outreach
            efforts</strong>
            &mdash;ensuring that this festival remains a{' '}
            <strong className="text-foreground">safe and welcoming space</strong> for all. Every donation
            strengthens our mission to support those on their recovery journey and bring life-changing
            resources to the community. Thank you for being part of this movement!
          </p>
          <Button
            asChild
            size="lg"
            className="btn-shine bg-gradient-to-r from-primary to-accent px-8 py-6 text-base font-bold text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl"
          >
            <Link href="https://zeffy.com/en-US/donation-form/recovery-fest" target="_blank" rel="noopener noreferrer">
              Donate to Recovery Fest
            </Link>
          </Button>
        </div>
      </section>

      {/* Sponsorship Section */}
      <section className="bg-muted/40 px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-extrabold text-foreground md:text-5xl">
            Become a Sponsor of Recovery Fest
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
            Support the journey of recovery and make a lasting impact in our community by becoming a
            sponsor of Recovery Fest. Your partnership will help provide vital resources and raise
            awareness about recovery services while showcasing your commitment to positive social change.
            Together, we can foster hope, strength, and resilience.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            For more information on sponsorship opportunities, send us a message below or reach out to us
            via email at{' '}
            <a href="mailto:RecoveryFestMI@Gmail.com" className="font-semibold text-primary hover:underline">
              RecoveryFestMI@Gmail.com
            </a>
            . We look forward to working with you!
          </p>
        </div>
      </section>

      {/* Event Details */}
      <section className="bg-hero-gradient bg-dot-grid px-4 py-20 text-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-5xl font-black tracking-tight md:text-7xl">Join Us!</h2>

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="card-pop glass-panel rounded-2xl p-8 text-center">
              <Calendar className="mx-auto mb-3 h-10 w-10 text-secondary" />
              <h3 className="mb-3 text-2xl font-bold text-secondary">When</h3>
              <p className="text-xl font-bold leading-relaxed">Wednesday, September 9, 2026</p>
            </div>
            <div className="card-pop glass-panel rounded-2xl p-8 text-center">
              <Clock className="mx-auto mb-3 h-10 w-10 text-secondary" />
              <h3 className="mb-3 text-2xl font-bold text-secondary">Time</h3>
              <div className="text-xl font-bold leading-relaxed">
                <p>3:00pm</p>
                <p className="my-1 text-base font-normal opacity-80">to</p>
                <p>6:00pm</p>
              </div>
            </div>
            <div className="card-pop glass-panel rounded-2xl p-8 text-center">
              <MapPin className="mx-auto mb-3 h-10 w-10 text-secondary" />
              <h3 className="mb-3 text-2xl font-bold text-secondary">Where</h3>
              <p className="text-xl font-bold leading-relaxed">
                The Salvation Army
                <br />
                <span className="text-base font-normal opacity-90">
                  104 Clover St
                  <br />
                  Holland, MI 49423
                </span>
              </p>
            </div>
          </div>

          <div className="card-pop mx-auto max-w-sm rounded-2xl bg-gradient-to-r from-secondary to-secondary/80 p-8 text-center text-secondary-foreground shadow-xl">
            <p className="text-4xl font-black md:text-5xl">Cost: FREE!</p>
          </div>
        </div>
      </section>

      {/* Venue Map & Directions */}
      <VenueMap />

      {/* Contact Form */}
      <section className="bg-vivid-gradient px-4 py-20 text-white">
        <div className="container mx-auto max-w-2xl">
          <h2 className="mb-4 text-center text-4xl font-extrabold text-white">
            Have a question or want to get involved?
          </h2>
          <p className="mb-8 text-center text-white/85">Send us a message!</p>

          <form onSubmit={handleContactSubmit} className="glass-panel space-y-6 rounded-2xl p-8">
            <div>
              <Input
                type="text"
                placeholder="Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full bg-white text-foreground placeholder:text-muted-foreground"
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
                className="w-full bg-white text-foreground placeholder:text-muted-foreground"
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
                className="w-full resize-none bg-white text-foreground placeholder:text-muted-foreground"
                required
                disabled={contactLoading}
              />
            </div>

            {contactMessage && (
              <p className={`text-sm ${contactMessage.includes('Thank') ? 'text-green-100' : 'text-red-100'}`}>
                {contactMessage}
              </p>
            )}

            <Button
              type="submit"
              disabled={contactLoading}
              className="btn-shine w-full bg-white font-bold text-primary hover:bg-white/90"
            >
              {contactLoading ? 'Sending...' : 'Send'}
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
