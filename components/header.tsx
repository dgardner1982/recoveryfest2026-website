'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X, HeartHandshake } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/tshirt-contest', label: 'T-Shirt Contest' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-secondary" />
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02]">
            <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-primary/20 sm:h-14 sm:w-14">
              <Image
                src="/images/recovery-fest-logo.png"
                alt="Recovery Fest logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="font-heading text-xl font-bold tracking-tight text-primary">Recovery Fest</span>
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Est. 2003 &middot; Holland, MI</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                asChild
                variant="ghost"
                className="rounded-full px-4 font-semibold text-foreground hover:bg-primary/10 hover:text-primary"
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
            <Button
              asChild
              className="ml-2 rounded-full bg-gradient-to-r from-secondary to-secondary/80 px-6 font-bold text-secondary-foreground shadow-md shadow-secondary/30 transition-all hover:scale-105 hover:shadow-lg"
            >
              <Link href="https://zeffy.com/en-US/donation-form/recovery-fest" target="_blank" rel="noopener noreferrer">
                <HeartHandshake className="h-4 w-4" data-icon="inline-start" />
                Donate Now
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="rounded-full p-2 text-foreground hover:bg-primary/10 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="flex flex-col gap-2 border-t border-border/60 py-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="mt-2 w-full rounded-full bg-gradient-to-r from-secondary to-secondary/80 font-bold text-secondary-foreground shadow-md"
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
