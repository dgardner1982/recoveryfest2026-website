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
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4 py-2">
          {/* Wordmark */}
          <Link href="/" className="group flex items-center gap-2.5" onClick={() => setMobileMenuOpen(false)}>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-105">
              <HeartHandshake className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-bold tracking-tight text-foreground">Recovery Fest</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
                Holland, MI &middot; 2026
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
                    'group relative py-2 text-sm font-semibold tracking-wide transition-colors',
                    isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary',
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute -bottom-0.5 left-0 h-0.5 w-full origin-left rounded-full bg-secondary transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </Link>
              )
            })}
            <Button
              asChild
              size="lg"
              className="btn-shine bg-secondary font-bold text-secondary-foreground shadow-md shadow-secondary/30 transition-all hover:-translate-y-0.5 hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/40"
            >
              <Link href="https://zeffy.com/en-US/donation-form/recovery-fest" target="_blank" rel="noopener noreferrer">
                Donate Now
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="rounded-md p-2 text-foreground transition-colors hover:bg-muted md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="animate-fade-in space-y-1 border-t border-border/60 py-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block rounded-md px-3 py-2.5 text-sm font-semibold transition-colors',
                  pathname === link.href ? 'bg-muted text-primary' : 'text-foreground/80 hover:bg-muted hover:text-primary',
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              size="lg"
              className="mt-2 w-full bg-secondary font-bold text-secondary-foreground shadow-md hover:bg-secondary/90"
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
