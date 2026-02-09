'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
    console.log('[v0] Contact submit handler called!')
    alert('[v0] Contact form submitted! Check the console.')
    setContactLoading(true)
    setContactMessage('')
    
    console.log('[v0] Submitting contact form:', contactForm)
    const result = await sendContactMessage(contactForm)
    console.log('[v0] Contact result:', result)
    
    if (result.success) {
      setContactMessage(result.message || 'Thank you for your message!')
      setContactForm({ name: '', email: '', message: '' })
      // Clear message after 5 seconds
      setTimeout(() => setContactMessage(''), 5000)
    } else {
      setContactMessage(result.error || 'Something went wrong')
    }
    
    setContactLoading(false)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Newsletter submit handler called!')
    alert('[v0] Newsletter form submitted! Check the console.')
    setEmailLoading(true)
    setEmailMessage('')
    
    console.log('[v0] Submitting newsletter form:', email)
    const result = await subscribeToNewsletter(email)
    console.log('[v0] Newsletter result:', result)
    
    if (result.success) {
      setEmailMessage(result.message || 'Thank you for subscribing!')
      setEmail('')
      // Clear message after 5 seconds
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

  return (
    <div className="w-full">
      {/* Banner Section */}
      <section className="relative w-full bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 py-8 px-4 border-b-4 border-secondary">
        <div className="container mx-auto max-w-5xl">
          <div className="relative w-full h-32 md:h-48">
            <Image
              src="/images/banner.jpg"
              alt="Recovery Fest - Invest in health, home, purpose, and community"
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Hero Section with Video Background */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-blue-600/85 to-cyan-600/90 z-10" />
        <Image
          src="/hero-recovery.jpg"
          alt="Recovery Fest"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance drop-shadow-lg">
            Support Recovery, Strengthen Community
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-balance font-medium">
            Donate to Recovery Fest Today!
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all text-lg px-10 py-6 font-bold">
            <Link href="https://zeffy.com/en-US/donation-form/recovery-fest-on-the-lakeshore" target="_blank" rel="noopener noreferrer">Donate to Recovery Fest</Link>
          </Button>
        </div>
      </section>

      {/* Main Event Announcement */}
      <section className="py-20 px-4 bg-gradient-to-b from-white via-purple-50 to-white">
        <div className="container mx-auto max-w-4xl text-center">
          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-3 max-w-xl mx-auto mb-8">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-lg p-4 text-center shadow-lg">
              <div className="text-3xl md:text-4xl font-bold mb-1">{timeLeft.days}</div>
              <div className="text-xs uppercase tracking-wider opacity-90">Days</div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-lg p-4 text-center shadow-lg">
              <div className="text-3xl md:text-4xl font-bold mb-1">{timeLeft.hours}</div>
              <div className="text-xs uppercase tracking-wider opacity-90">Hours</div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-lg p-4 text-center shadow-lg">
              <div className="text-3xl md:text-4xl font-bold mb-1">{timeLeft.minutes}</div>
              <div className="text-xs uppercase tracking-wider opacity-90">Minutes</div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-lg p-4 text-center shadow-lg">
              <div className="text-3xl md:text-4xl font-bold mb-1">{timeLeft.seconds}</div>
              <div className="text-xs uppercase tracking-wider opacity-90">Seconds</div>
            </div>
          </div>
          <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full mb-6 font-semibold">
            23rd Annual Event
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600">
            Join Us for Recovery Fest!
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Mark your calendars! <strong className="text-foreground">Recovery Fest</strong> is happening on{' '}
            <strong className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">September 9, 2026</strong> at{' '}
            <strong className="text-foreground">The Salvation Army</strong> in Holland, MI. Join us for an event full of fun, food, family friendly activities, connection and valuable resources.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Watch Now
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-balance mb-4">
              Want to See What Recovery Fest is All About?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Watch these videos to experience the joy, hope, and community that makes Recovery Fest such a special celebration. See highlights from past events and discover why this festival has been bringing people together for over two decades.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all">
              <Link href="/gallery">View Photo Gallery</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl ring-4 ring-white">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/9hybir7nolQ"
                  title="Recovery Fest Highlights"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                />
              </div>
              <h3 className="text-xl font-bold text-center text-foreground">Recovery Fest Highlights</h3>
            </div>

            <div className="space-y-4">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl ring-4 ring-white">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/ZSF2bYwcl_o"
                  title="Recovery Fest Experience"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                />
              </div>
              <h3 className="text-xl font-bold text-center text-foreground">Recovery Fest Experience</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Image Slideshow */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-cyan-600 to-blue-600">
            Experience the Joy
          </h2>
          <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl ring-4 ring-gray-100 bg-gray-900">
            {slides.map((slide, index) => (
              <div
                key={slide}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={slide || "/placeholder.svg"}
                  alt={`Recovery Fest moment ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 text-foreground" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 text-foreground" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Building Community Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 via-cyan-50 to-blue-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-cyan-600 to-blue-600">
            Building a Stronger Recovery Community
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
            Since its beginning, <strong className="text-foreground">Recovery Fest</strong> has been a beacon of hope,
            connection, and support for those impacted by addiction and mental health challenges. More than just a
            celebration, this event serves as a powerful way to{' '}
            <strong className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">break stigma, raise awareness, and connect individuals with essential
            recovery resources</strong>. Whether you're in recovery, supporting a loved one, or simply passionate about
            the cause, this festival is for everyone who believes in{' '}
            <strong className="text-foreground">healing, second chances, and a brighter future.</strong>
          </p>
        </div>
      </section>

      {/* Did You Know Stats */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-50 via-white to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Did You Know?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border-2 border-purple-100 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-3 text-foreground">Ottawa County Substance Impact</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Among underserved Ottawa County residents, 42.6% report that substance abuse or addiction has
                  negatively impacted their lives or the lives of someone they know (2023 CHNA).
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-cyan-100 hover:border-cyan-300 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-3 text-foreground">Mental Health Crisis</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ottawa County residents reporting poor mental health has doubled since 2014. Mental health is now
                  a top priority need identified in the 2024 Healthy Ottawa Plan.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-blue-100 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-3 text-foreground">Healthcare Access Gap</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  36.4% of non-white Ottawa County residents lack a personal healthcare provider, compared to 8.1%
                  of white residents, highlighting critical disparities in access to care.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-green-100 hover:border-green-300 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-3 text-foreground">Health Perception</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  While 14.8% of Ottawa County adults report fair or poor health, this rises to 32.5% among
                  underserved adults, showing the need for targeted community support.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-yellow-100 hover:border-yellow-300 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-3 text-foreground">Housing Instability</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  1 in 5 Ottawa County underserved adults didn't pay full rent or mortgage last year. Housing
                  instability is directly linked to poor health outcomes and recovery challenges.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-purple-100 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-3 text-foreground">Recovery Fest Community Impact</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  For 23 years, Recovery Fest has connected Ottawa County residents with free resources, support,
                  and hope—addressing the critical needs identified in our community health assessments.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Your Support Makes Recovery Fest Possible
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Recovery Fest is a <strong className="text-foreground">free community event</strong>, made possible by
            generous donations from individuals and local businesses who believe in the power of recovery. Your
            contributions help us provide <strong className="text-foreground">entertainment, educational materials,
            food, and outreach efforts</strong>—ensuring that this festival remains a{' '}
            <strong className="text-foreground">safe and welcoming space</strong> for all. Every donation strengthens
            our mission to support those on their recovery journey and bring life-changing resources to the community.
            Thank you for being part of this movement!
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all">
            <Link href="https://zeffy.com/en-US/donation-form/recovery-fest-on-the-lakeshore" target="_blank" rel="noopener noreferrer">Donate to Recovery Fest</Link>
          </Button>
        </div>
      </section>

      {/* Sponsorship Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Become a Sponsor of Recovery Fest
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Support the journey of recovery and make a lasting impact in our community by becoming a sponsor of
            Recovery Fest. Your partnership will help provide vital resources and raise awareness about recovery
            services while showcasing your commitment to positive social change. Together, we can foster hope,
            strength, and resilience.
          </p>
          <p className="text-base text-muted-foreground mb-8">
            For more information on sponsorship opportunities, send us a message below or reach out to us via email
            at <a href="mailto:RecoveryFestMI@Gmail.com" className="text-primary hover:underline">
              RecoveryFestMI@Gmail.com
            </a>. We look forward to working with you!
          </p>
        </div>
      </section>

      {/* Event Details with Countdown */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-6xl md:text-7xl font-black mb-12 text-center" style={{
            textShadow: '2px 2px 0px rgba(0,0,0,0.3), -2px -2px 0px rgba(255,255,255,0.2), 3px 3px 0px rgba(0,0,0,0.2)',
            letterSpacing: '0.05em'
          }}>Join Us!</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center bg-white/10 backdrop-blur rounded-lg p-8 border-2 border-white/20">
              <h3 className="text-2xl font-bold mb-3 text-yellow-300">When</h3>
              <p className="text-xl leading-relaxed">Thursday, September 9, 2026</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur rounded-lg p-8 border-2 border-white/20">
              <h3 className="text-2xl font-bold mb-3 text-yellow-300">Time</h3>
              <p className="text-xl leading-relaxed">3:00pm – 6:00pm</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur rounded-lg p-8 border-2 border-white/20">
              <h3 className="text-2xl font-bold mb-3 text-yellow-300">Where</h3>
              <p className="text-xl leading-relaxed">The Salvation Army<br /><span className="text-lg">104 Clover St<br />Holland, MI 49423</span></p>
            </div>
          </div>

          <div className="text-center bg-gradient-to-r from-yellow-400 to-orange-400 text-primary rounded-lg p-8 shadow-lg">
            <p className="text-4xl md:text-5xl font-black">Cost: FREE!</p>
          </div>
        </div>
      </section>

      {/* Venue Map & Directions */}
      <VenueMap />

      {/* Contact Form */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold mb-6 text-center text-white">
            Have a question or want to get involved?
          </h2>
          <p className="text-center text-white/90 mb-8">Send us a message!</p>
          
          <form onSubmit={handleContactSubmit} className="space-y-6">
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
              className="w-full bg-white text-purple-600 hover:bg-white/90 font-semibold"
            >
              {contactLoading ? 'Sending...' : 'Send'}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-foreground text-white border-t">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <p className="font-semibold">Recovery Fest 2026</p>
              <p className="text-sm text-white/80">Building a stronger, connected recovery community</p>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-sm text-white/80 mb-2">Questions?</p>
              <a href="tel:6164945545" className="text-lg font-semibold hover:text-white/80 transition">
                (616) 494-5545
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
