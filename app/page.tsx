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
  Sparkles,
  HeartHandshake,
  Users,
  Stethoscope,
  Home as HomeIcon,
  ShieldAlert,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Mail,
  ChevronDown,
  Star,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { VenueMap } from '@/components/venue-map'
import { subscribeToNewsletter, sendContactMessage } from '@/app/actions/email'

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

  const stats = [
    {
      icon: ShieldAlert,
      title: 'Ottawa County Substance Impact',
      description:
        'Among underserved Ottawa County residents, 42.6% report that substance use or addiction has negatively impacted their lives or the lives of someone they know (2023 CHNA).',
    },
    {
      icon: Users,
      title: 'Mental Health Crisis',
      description:
        'Ottawa County residents reporting poor mental health has doubled since 2014. Mental health is now a top priority need identified in the 2024 Healthy Ottawa Plan.',
    },
    {
      icon: Stethoscope,
      title: 'Healthcare Access Gap',
      description:
        '36.4% of non-white Ottawa County residents lack a personal healthcare provider, compared to 8.1% of white residents, highlighting critical disparities in access to care.',
    },
    {
      icon: HeartHandshake,
      title: 'Health Perception',
      description:
        'While 14.8% of Ottawa County adults report fair or poor health, this rises to 32.5% among underserved adults, showing the need for targeted community support.',
    },
    {
      icon: HomeIcon,
      title: 'Housing Instability',
      description:
        "1 in 5 Ottawa County underserved adults didn't pay full rent or mortgage last year. Housing instability is directly linked to poor health outcomes and recovery challenges.",
    },
    {
      icon: Sparkles,
      title: 'Recovery Fest Community Impact',
      description:
        'For 23 years, Recovery Fest has connected Ottawa County residents with free resources, support, and hope—addressing the critical needs identified in our community health assessments.',
    },
  ]

  const countdownItems = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section with Video Background */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-navy-deep/95 via-primary/85 to-navy/90" />
        <div className="bg-dot-grid absolute inset-0 z-10 opacity-40" />
        <Image
          src="/hero-recovery-hands.jpg"
          alt="Recovery Fest"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 mx-auto flex min-h-[92vh] max-w-4xl flex-col items-center justify-center px-4 py-20 text-center text-white">
          <span className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-secondary ring-1 ring-white/20 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            23rd Annual &middot; Free Community Event
          </span>
          <h1 className="animate-fade-up delay-100 text-shadow-soft text-balance text-5xl font-extrabold leading-[1.05] md:text-7xl">
            Join us in celebration at <span className="text-secondary">Recovery Fest</span> 2026
          </h1>
          <p className="animate-fade-up delay-200 mt-6 max-w-2xl text-balance text-lg text-white/85 md:text-xl">
            September 9, 2026 &middot; The Salvation Army, Holland, MI &middot; Free for everyone
          </p>
          <div className="animate-fade-up delay-300 mt-9 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="btn-shine bg-secondary px-8 py-6 text-base font-bold text-secondary-foreground shadow-xl shadow-black/20 hover:-translate-y-0.5 hover:bg-secondary/90"
            >
              <Link href="https://zeffy.com/en-US/donation-form/recovery-fest" target="_blank" rel="noopener noreferrer">
                Donate to Recovery Fest
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="glass-panel border-white/30 px-8 py-6 text-base font-bold text-white hover:-translate-y-0.5 hover:bg-white/15 hover:text-white"
            >
              <Link href="/gallery">View Photo Gallery</Link>
            </Button>
          </div>
        </div>
        <ChevronDown className="animate-scroll-cue absolute bottom-6 left-1/2 z-20 h-7 w-7 -translate-x-1/2 text-white/70" />
      </section>

      {/* Event Banner Image */}
      <section className="bg-background px-4 py-8">
        <div className="container mx-auto max-w-7xl">
          <div className="card-lift relative h-32 w-full overflow-hidden rounded-2xl border border-border shadow-md md:h-48">
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
      <section className="bg-background px-4 py-12">
        <div className="container mx-auto max-w-6xl">
          <p className="mb-4 flex items-center justify-center gap-2 text-center text-xl font-extrabold uppercase tracking-wide text-red-700 md:text-2xl">
            <Star className="h-5 w-5 shrink-0 fill-red-600 text-red-600" />
            USE CHICAGO DRIVE TO TURN DOWN CLOVER AVE
            <Star className="h-5 w-5 shrink-0 fill-red-600 text-red-600" />
          </p>
          <div className="overflow-hidden rounded-2xl border-2 border-red-200 bg-red-50 shadow-lg">
            <div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
              <div className="p-6 md:p-8">
                <p className="mb-3 text-sm font-bold uppercase tracking-wider text-red-700">Road Closure</p>
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
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-secondary/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-secondary-foreground/80">
            <Calendar className="h-3.5 w-3.5 text-secondary" />
            23rd Annual Event
          </span>
          <p className="mb-12 text-xl leading-relaxed text-muted-foreground md:text-2xl">
            Mark your calendars! Recovery Fest is happening on{' '}
            <strong className="text-foreground">September 9, 2026</strong> at{' '}
            <strong className="text-foreground">The Salvation Army</strong> in Holland, MI. Join us for an event
            full of fun, food, family friendly activities, connection and valuable resources.
          </p>

          {/* Countdown Timer */}
          <div className="mx-auto grid max-w-xl grid-cols-4 gap-3 md:gap-4">
            {countdownItems.map((item) => (
              <div
                key={item.label}
                className="card-lift rounded-2xl bg-primary p-4 text-center text-primary-foreground shadow-lg md:p-6"
              >
                <div className="mb-1 text-3xl font-extrabold tabular-nums md:text-4xl">{item.value}</div>
                <div className="text-xs uppercase tracking-wider text-white/75">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-dot-grid bg-navy-deep px-4 py-20">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Want to See What Recovery Fest is All About?
            </h2>
            <div className="divider-accent mx-auto mt-4" />
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
              Watch these videos to experience the joy, hope, and community that makes Recovery Fest such a
              special celebration. See highlights from past events and discover why this festival has been
              bringing people together for over two decades.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="card-lift relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/15">
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
              <div className="card-lift relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/15">
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
            <h2 className="text-4xl font-bold text-foreground md:text-5xl">Experience the Joy</h2>
            <div className="divider-accent mx-auto mt-4" />
          </div>
          <div className="relative h-[400px] overflow-hidden rounded-2xl bg-navy-deep shadow-2xl ring-1 ring-border md:h-[500px]">
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
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/85 p-2 transition-all hover:scale-110 hover:bg-white hover:shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 text-foreground" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/85 p-2 transition-all hover:scale-110 hover:bg-white hover:shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 text-foreground" />
            </button>
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    index === currentSlide ? 'w-6 bg-secondary' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-10 text-center">
            <Button
              asChild
              size="lg"
              className="btn-shine bg-primary px-10 py-6 text-lg font-bold shadow-lg hover:-translate-y-0.5 hover:bg-primary/90"
            >
              <Link href="/gallery">View Photo Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Building Community Section */}
      <section className="bg-gradient-to-br from-primary to-navy-deep px-4 py-20 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Building a Stronger Recovery Community</h2>
          <div className="divider-accent mx-auto mt-4" />
          <p className="mt-8 text-lg leading-relaxed text-white/80 md:text-xl">
            Since its beginning, <strong className="text-white">Recovery Fest</strong> has been a beacon of hope,
            connection, and support for those impacted by addiction and mental health challenges. More than just a
            celebration, this event serves as a powerful way to{' '}
            <strong className="text-secondary">
              break stigma, raise awareness, and connect individuals with essential recovery resources
            </strong>
            . Whether you&apos;re in recovery, supporting a loved one, or simply passionate about the cause, this
            festival is for everyone who believes in{' '}
            <strong className="text-white">healing, second chances, and a brighter future.</strong>
          </p>
        </div>
      </section>

      {/* Did You Know Stats */}
      <section className="bg-muted/40 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold text-foreground md:text-5xl">Did You Know?</h2>
            <div className="divider-accent mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.title} className="card-lift border-border shadow-sm">
                  <CardContent className="p-6">
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mb-3 text-lg font-bold text-foreground">{stat.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="bg-background px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                <HeartHandshake className="h-3.5 w-3.5" />
                Support Recovery
              </span>
              <h2 className="text-4xl font-bold leading-tight text-foreground md:text-5xl">
                Your Support Makes Recovery Fest Possible
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Recovery Fest is a <strong className="text-foreground">free community event</strong>, made
                possible by generous donations from individuals and local businesses who believe in the power of
                recovery. Your contributions help us provide{' '}
                <strong className="text-foreground">entertainment, educational materials, food, and outreach
                efforts</strong>
                —ensuring that this festival remains a{' '}
                <strong className="text-foreground">safe and welcoming space</strong> for all.
              </p>
              <Button
                asChild
                size="lg"
                className="btn-shine mt-8 bg-primary px-8 py-6 text-base font-bold shadow-lg hover:-translate-y-0.5 hover:bg-primary/90"
              >
                <Link href="https://zeffy.com/en-US/donation-form/recovery-fest" target="_blank" rel="noopener noreferrer">
                  Donate to Recovery Fest
                </Link>
              </Button>
            </div>
            <div className="card-lift rounded-2xl bg-primary p-8 text-primary-foreground shadow-xl md:p-10">
              <p className="text-lg leading-relaxed text-white/90">
                Every donation strengthens our mission to support those on their recovery journey and bring
                life-changing resources to the community. Thank you for being part of this movement!
              </p>
              <div className="mt-6 flex items-center gap-2 text-secondary">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-bold uppercase tracking-wider">23 Years of Community Impact</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Section */}
      <section className="bg-muted/40 px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-foreground md:text-5xl">Become a Sponsor of Recovery Fest</h2>
          <div className="divider-accent mx-auto mt-4" />
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            Support the journey of recovery and make a lasting impact in our community by becoming a sponsor of
            Recovery Fest. Your partnership will help provide vital resources and raise awareness about recovery
            services while showcasing your commitment to positive social change. Together, we can foster hope,
            strength, and resilience.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            For more information on sponsorship opportunities, send us a message below or reach out to us via
            email at{' '}
            <a href="mailto:RecoveryFestMI@Gmail.com" className="font-semibold text-primary hover:underline">
              RecoveryFestMI@Gmail.com
            </a>
            . We look forward to working with you!
          </p>
        </div>
      </section>

      {/* Event Details */}
      <section className="bg-gradient-to-br from-primary to-navy-deep px-4 py-20 text-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-5xl font-black tracking-tight md:text-7xl">Join Us!</h2>

          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="card-lift glass-panel rounded-2xl p-8 text-center">
              <Calendar className="mx-auto mb-3 h-8 w-8 text-secondary" />
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-secondary">When</h3>
              <p className="text-xl font-bold leading-relaxed md:text-2xl">Wednesday, September 9, 2026</p>
            </div>
            <div className="card-lift glass-panel rounded-2xl p-8 text-center">
              <Clock className="mx-auto mb-3 h-8 w-8 text-secondary" />
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-secondary">Time</h3>
              <p className="text-xl font-bold leading-relaxed md:text-2xl">3:00pm &ndash; 6:00pm</p>
            </div>
            <div className="card-lift glass-panel rounded-2xl p-8 text-center">
              <MapPin className="mx-auto mb-3 h-8 w-8 text-secondary" />
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-secondary">Where</h3>
              <p className="text-xl font-bold leading-relaxed md:text-2xl">
                The Salvation Army
                <br />
                <span className="text-base font-semibold md:text-lg">104 Clover St, Holland, MI 49423</span>
              </p>
            </div>
          </div>

          <div className="card-lift mx-auto flex max-w-sm items-center justify-center gap-3 rounded-2xl bg-secondary p-8 text-secondary-foreground shadow-xl">
            <Ticket className="h-8 w-8" />
            <p className="text-4xl font-black md:text-5xl">FREE!</p>
          </div>
        </div>
      </section>

      {/* Venue Map & Directions */}
      <VenueMap />

      {/* Newsletter + Contact */}
      <section className="bg-gradient-to-br from-primary to-navy-deep px-4 py-20 text-white">
        <div className="container mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          {/* Newsletter */}
          <div className="glass-panel rounded-2xl p-8">
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/20 text-secondary">
              <Mail className="h-5 w-5" />
            </span>
            <h2 className="text-2xl font-bold text-white">Stay in the loop</h2>
            <p className="mt-2 text-sm text-white/75">
              Get event updates and reminders straight to your inbox.
            </p>
            <form onSubmit={handleEmailSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-foreground placeholder:text-muted-foreground"
                required
                disabled={emailLoading}
              />
              <Button
                type="submit"
                disabled={emailLoading}
                className="shrink-0 bg-secondary font-bold text-secondary-foreground hover:bg-secondary/90"
              >
                {emailLoading ? 'Sending...' : 'Subscribe'}
              </Button>
            </form>
            {emailMessage && (
              <p className={`mt-3 text-sm ${emailMessage.includes('Thank') ? 'text-emerald-200' : 'text-red-200'}`}>
                {emailMessage}
              </p>
            )}
          </div>

          {/* Contact Form */}
          <div className="glass-panel rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white">Have a question?</h2>
            <p className="mt-2 text-sm text-white/75">Send us a message and we&apos;ll get back to you.</p>

            <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
              <Input
                type="text"
                placeholder="Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full bg-white text-foreground placeholder:text-muted-foreground"
                required
                disabled={contactLoading}
              />
              <Input
                type="email"
                placeholder="Email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full bg-white text-foreground placeholder:text-muted-foreground"
                required
                disabled={contactLoading}
              />
              <Textarea
                placeholder="Message"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                rows={4}
                className="w-full resize-none bg-white text-foreground placeholder:text-muted-foreground"
                required
                disabled={contactLoading}
              />

              {contactMessage && (
                <p className={`text-sm ${contactMessage.includes('Thank') ? 'text-emerald-200' : 'text-red-200'}`}>
                  {contactMessage}
                </p>
              )}

              <Button
                type="submit"
                disabled={contactLoading}
                className="w-full bg-secondary font-bold text-secondary-foreground hover:bg-secondary/90"
              >
                {contactLoading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
