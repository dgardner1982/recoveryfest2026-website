'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-48 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-48 h-48 flex-shrink-0">
              <Image
                src="/images/recovery-fest-logo.png"
                alt="Recovery Fest Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-base font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/gallery" className="text-base font-medium hover:text-primary transition-colors">
              Gallery
            </Link>
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all">
              <Link href="https://zeffy.com/en-US/donation-form/recovery-fest-on-the-lakeshore" target="_blank" rel="noopener noreferrer">Donate Now</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-4 border-t">
            <Link
              href="/"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/gallery"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Button asChild size="sm" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all">
              <Link href="https://zeffy.com/en-US/donation-form/recovery-fest-on-the-lakeshore" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
                Donate Now
              </Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
