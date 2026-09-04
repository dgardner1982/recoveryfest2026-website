'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X, HeartHandshake } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/90 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-3">
            <span className="bg-hero-gradient flex h-11 w-11 items-center justify-center rounded-2xl shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              <HeartHandshake className="h-6 w-6 text-white" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-extrabold tracking-tight text-foreground">
                Recovery <span className="text-gradient-brand">Fest</span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
                Holland, MI · 2026
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'group relative py-2 text-sm font-bold uppercase tracking-wide transition-colors',
                    isActive ? 'text-primary' : 'text-foreground/70 hover:text-primary',
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute -bottom-0.5 left-0 h-0.5 w-full origin-left rounded-full bg-gradient-to-r from-primary to-accent transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </Link>
              )
            })}
            <Button
              asChild
              size="lg"
              className="btn-shine bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-bold shadow-lg shadow-secondary/30 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Link href="https://zeffy.com/en-US/donation-form/recovery-fest" target="_blank" rel="noopener noreferrer">
                Donate Now
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-primary/10 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="space-y-1 border-t border-primary/10 py-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-2 py-3 text-sm font-bold uppercase tracking-wide text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              size="lg"
              className="btn-shine mt-2 w-full bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-bold shadow-lg"
            >
              <Link
                href="https://zeffy.com/en-US/donation-form/recovery-fest"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Donate Now
              </Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
