'use client'

import Link from 'next/link'
<<<<<<< HEAD
import { usePathname } from 'next/navigation'
=======
import Image from 'next/image'
>>>>>>> 7f9520f47a7b56e31741f9d9d614407a497ce2f8
import { Button } from '@/components/ui/button'
import { Menu, X, HeartHandshake } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
]

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/tshirt-contest', label: 'T-Shirt Contest' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
<<<<<<< HEAD
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
=======
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
>>>>>>> 7f9520f47a7b56e31741f9d9d614407a497ce2f8
                Donate Now
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
<<<<<<< HEAD
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-primary/10 md:hidden"
=======
            className="rounded-full p-2 text-foreground hover:bg-primary/10 md:hidden"
>>>>>>> 7f9520f47a7b56e31741f9d9d614407a497ce2f8
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
<<<<<<< HEAD
          <nav className="space-y-1 border-t border-primary/10 py-4 md:hidden">
=======
          <nav className="flex flex-col gap-2 border-t border-border/60 py-4 md:hidden">
>>>>>>> 7f9520f47a7b56e31741f9d9d614407a497ce2f8
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
<<<<<<< HEAD
                className="block rounded-lg px-2 py-3 text-sm font-bold uppercase tracking-wide text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
=======
                className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
>>>>>>> 7f9520f47a7b56e31741f9d9d614407a497ce2f8
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
<<<<<<< HEAD
              size="lg"
              className="btn-shine mt-2 w-full bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-bold shadow-lg"
=======
              className="mt-2 w-full rounded-full bg-gradient-to-r from-secondary to-secondary/80 font-bold text-secondary-foreground shadow-md"
>>>>>>> 7f9520f47a7b56e31741f9d9d614407a497ce2f8
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
