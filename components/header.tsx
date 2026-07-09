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
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RF%20LOGO%202024%20%281%29-PCDajyfjQAzNQOeo4vY2wJqpJ5Jzyy.jpg"
              alt="Recovery Fest Logo"
              width={120}
              height={60}
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Button asChild size="lg" className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild size="lg" className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all">
              <Link href="/gallery">Gallery</Link>
            </Button>
            <Button asChild size="lg" className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all">
              <Link href="/tshirt-contest">Design Contest</Link>
            </Button>
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all">
              <Link href="https://zeffy.com/en-US/donation-form/recovery-fest" target="_blank" rel="noopener noreferrer">Donate Now</Link>
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
            <Button asChild size="sm" className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all">
              <Link href="/tshirt-contest" onClick={() => setMobileMenuOpen(false)}>
                Design Contest
              </Link>
            </Button>
            <Button asChild size="sm" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all">
              <Link href="https://zeffy.com/en-US/donation-form/recovery-fest" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
                Donate Now
              </Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
