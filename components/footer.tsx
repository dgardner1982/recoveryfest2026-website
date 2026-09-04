import Link from 'next/link'
import { Facebook, Mail, MapPin, Phone, HeartHandshake } from 'lucide-react'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Photo Gallery' },
  { href: 'https://zeffy.com/en-US/donation-form/recovery-fest', label: 'Donate', external: true },
]

export function Footer() {
  return (
    <footer className="bg-dot-grid relative border-t border-white/10 bg-navy-deep text-white">
      <div className="container mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* About */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-md">
                <HeartHandshake className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold">Recovery Fest</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/70">
              A free community celebration bringing hope, connection, and vital resources to
              those impacted by addiction and mental health challenges in the Holland,
              MI area &mdash; 23 years strong.
            </p>
            <a
              href="https://www.facebook.com/RFLakeshore"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-secondary"
            >
              <Facebook className="h-4 w-4" />
              RecoveryFest on the LakeShore
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-secondary">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Event */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-secondary">
              Get In Touch
            </h3>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <span>
                  The Salvation Army
                  <br />
                  104 Clover St, Holland, MI 49423
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-secondary" />
                <a href="tel:6164945545" className="transition-colors hover:text-white">
                  (616) 494-5545
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-secondary" />
                <a href="mailto:RecoveryFestMI@Gmail.com" className="transition-colors hover:text-white">
                  RecoveryFestMI@Gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Recovery Fest. All rights reserved.</p>
          <p>Wednesday, September 9, 2026 &middot; 3:00pm&ndash;6:00pm &middot; Free Admission</p>
        </div>
      </div>
    </footer>
  )
}
