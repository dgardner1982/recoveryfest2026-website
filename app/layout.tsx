import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Baloo_2 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _baloo = Baloo_2({ subsets: ["latin"], variable: "--font-heading-loaded", weight: ["500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: 'Recovery Fest 2026',
  description: 'Join us for the 23rd Annual Recovery Fest on September 9, 2026 at The Salvation Army in Holland, MI. A day of celebration, hope, and community for those in recovery.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#5b21b6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
<<<<<<< HEAD
    <html lang="en" className="bg-background">
=======
    <html lang="en" className={`bg-background ${_baloo.variable}`}>
>>>>>>> 7f9520f47a7b56e31741f9d9d614407a497ce2f8
      <body className={`font-sans antialiased`}>
        <Header />
        <main className="min-h-screen overflow-x-hidden">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
