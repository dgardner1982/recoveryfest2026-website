import Link from 'next/link'
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
            </p>
            <a
              href="https://www.facebook.com/RFLakeshore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-background/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-background/20"
            >
              <Facebook className="h-4 w-4" />
              RecoveryFest on the LakeShore
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-widest text-secondary">Explore</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li><Link href="/" className="transition-colors hover:text-secondary">Home</Link></li>
              <li><Link href="/gallery" className="transition-colors hover:text-secondary">Photo Gallery</Link></li>
              <li><Link href="/tshirt-contest" className="transition-colors hover:text-secondary">T-Shirt Contest</Link></li>
              <li>
                <a
                  href="https://zeffy.com/en-US/donation-form/recovery-fest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-secondary"
                >
                  Donate
                </a>
              </li>
            </ul>
          </div>

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
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-background/15 pt-6 text-xs text-background/60 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Recovery Fest. All rights reserved.</p>
          <p>Made with hope, in Holland, MI.</p>
        </div>
      </div>
    </footer>
  )
}
