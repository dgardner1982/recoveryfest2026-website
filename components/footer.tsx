import Link from 'next/link'
<<<<<<< HEAD
import { HeartHandshake, Phone, Mail, MapPin, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-foreground text-white">
      <div className="bg-hero-gradient h-1.5 w-full" />
      <div className="container mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="bg-hero-gradient flex h-10 w-10 items-center justify-center rounded-xl shadow-lg shadow-primary/30">
                <HeartHandshake className="h-5 w-5 text-white" />
              </span>
              <span className="text-lg font-extrabold tracking-tight">
                Recovery <span className="text-gradient-brand">Fest</span>
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/70">
              Building a stronger, connected recovery community. A free celebration of hope, healing, and
              second chances&mdash;now in its 23rd year in Holland, MI.
=======
import Image from 'next/image'
import { Facebook, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-foreground text-background">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-background/20">
                <Image src="/images/recovery-fest-logo.png" alt="Recovery Fest logo" fill className="object-cover" />
              </div>
              <span className="font-heading text-2xl font-bold">Recovery Fest</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-background/70">
              Building a stronger, connected recovery community—one free, family-friendly festival at a time.
              Twenty-three years of hope, connection, and celebration in Holland, MI.
>>>>>>> 7f9520f47a7b56e31741f9d9d614407a497ce2f8
            </p>
            <a
              href="https://www.facebook.com/RFLakeshore"
              target="_blank"
              rel="noopener noreferrer"
<<<<<<< HEAD
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              <Facebook className="h-4 w-4 text-accent" />
=======
              className="inline-flex items-center gap-2 rounded-full bg-background/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-background/20"
            >
              <Facebook className="h-4 w-4" />
>>>>>>> 7f9520f47a7b56e31741f9d9d614407a497ce2f8
              RecoveryFest on the LakeShore
            </a>
          </div>

          {/* Quick Links */}
          <div>
<<<<<<< HEAD
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-secondary">Explore</h3>
            <ul className="space-y-3 text-sm text-white/75">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="transition-colors hover:text-white">
                  Photo Gallery
                </Link>
              </li>
=======
            <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-widest text-secondary">Explore</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li><Link href="/" className="transition-colors hover:text-secondary">Home</Link></li>
              <li><Link href="/gallery" className="transition-colors hover:text-secondary">Photo Gallery</Link></li>
              <li><Link href="/tshirt-contest" className="transition-colors hover:text-secondary">T-Shirt Contest</Link></li>
>>>>>>> 7f9520f47a7b56e31741f9d9d614407a497ce2f8
              <li>
                <a
                  href="https://zeffy.com/en-US/donation-form/recovery-fest"
                  target="_blank"
                  rel="noopener noreferrer"
<<<<<<< HEAD
                  className="transition-colors hover:text-white"
=======
                  className="transition-colors hover:text-secondary"
>>>>>>> 7f9520f47a7b56e31741f9d9d614407a497ce2f8
                >
                  Donate
                </a>
              </li>
            </ul>
          </div>

<<<<<<< HEAD
          {/* Contact / Event Info */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-secondary">Get in Touch</h3>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  The Salvation Army
                  <br />
                  104 Clover St, Holland, MI 49423
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a href="tel:6164945545" className="transition-colors hover:text-white">
                  (616) 494-5545
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a href="mailto:RecoveryFestMI@Gmail.com" className="transition-colors hover:text-white">
                  RecoveryFestMI@Gmail.com
                </a>
              </li>
=======
          {/* Contact */}
          <div>
            <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-widest text-secondary">Get in Touch</h3>
            <ul className="space-y-3 text-sm text-background/80">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <a href="tel:6164945545" className="transition-colors hover:text-secondary">(616) 494-5545</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <a href="mailto:RecoveryFestMI@Gmail.com" className="break-all transition-colors hover:text-secondary">
                  RecoveryFestMI@Gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <span>The Salvation Army<br />104 Clover St, Holland, MI 49423</span>
              </li>
>>>>>>> 7f9520f47a7b56e31741f9d9d614407a497ce2f8
            </ul>
          </div>
        </div>

<<<<<<< HEAD
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-xs text-white/50 sm:flex-row sm:text-left">
          <p>&copy; {new Date().getFullYear()} Recovery Fest. All rights reserved.</p>
          <p>Wednesday, September 9, 2026 &middot; 3:00pm&ndash;6:00pm &middot; Free for everyone</p>
=======
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-background/15 pt-6 text-xs text-background/60 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Recovery Fest. All rights reserved.</p>
          <p>Made with hope, in Holland, MI.</p>
>>>>>>> 7f9520f47a7b56e31741f9d9d614407a497ce2f8
        </div>
      </div>
    </footer>
  )
}
