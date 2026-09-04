import Link from 'next/link'
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
            </p>
            <a
              href="https://www.facebook.com/RFLakeshore"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              <Facebook className="h-4 w-4 text-accent" />
              RecoveryFest on the LakeShore
            </a>
          </div>

          {/* Quick Links */}
          <div>
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
              <li>
                <a
                  href="https://zeffy.com/en-US/donation-form/recovery-fest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Donate
                </a>
              </li>
            </ul>
          </div>

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
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-xs text-white/50 sm:flex-row sm:text-left">
          <p>&copy; {new Date().getFullYear()} Recovery Fest. All rights reserved.</p>
          <p>Wednesday, September 9, 2026 &middot; 3:00pm&ndash;6:00pm &middot; Free for everyone</p>
        </div>
      </div>
    </footer>
  )
}
