import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Camera } from 'lucide-react'

export default function GalleryPage() {
  const galleryImages = [
    { src: '/gallery/image1.jpg', alt: 'Resource table with volunteers connecting with attendees', id: 1 },
    { src: '/gallery/image2.jpg', alt: 'Community ACCESS Line volunteer assisting attendee', id: 2 },
    { src: '/gallery/image3.jpg', alt: 'Recovery Fest volunteers with banner on building', id: 3 },
    { src: '/gallery/image4.jpg', alt: 'Screen printing station volunteer at Recovery Fest', id: 4 },
    { src: '/gallery/image5.jpg', alt: 'Recovery Fest banner displayed on venue', id: 5 },
    { src: '/gallery/image6.jpg', alt: 'Indoor resource fair with attendees and volunteers', id: 6 },
    { src: '/gallery/image7.jpg', alt: 'Attendee receiving Recovery Fest t-shirt', id: 7 },
    { src: '/gallery/image9.jpg', alt: 'Two attendees networking outside at Recovery Fest', id: 9 },
    { src: '/gallery/image10.jpg', alt: 'Family enjoying resources at Recovery Fest table', id: 10 },
    { src: '/gallery/image11.jpg', alt: 'Volunteer speaking with passion at Recovery Fest', id: 11 },
    { src: '/gallery/image12.jpg', alt: 'Two men networking outside venue', id: 12 },
    { src: '/gallery/image13.jpg', alt: 'Person playing cornhole game at Recovery Fest', id: 13 },
    { src: '/gallery/image14.jpg', alt: 'Recovery resources and beaded bracelets at table', id: 14 },
    { src: '/gallery/image15.jpg', alt: 'Community member conversing with resource provider', id: 15 },
    { src: '/gallery/image16.jpg', alt: 'Young attendee holding Recovery Fest 2024 t-shirt', id: 16 },
    { src: '/gallery/image17.jpg', alt: 'Safe Harbor and Samaritas community resource tables', id: 17 },
    { src: '/gallery/image19.jpg', alt: 'Community ACCESS Line 211 representative at table', id: 19 },
    { src: '/gallery/image20.jpg', alt: 'Screen printing volunteer creating Recovery Fest merchandise', id: 20 },
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-hero-gradient bg-dot-grid relative overflow-hidden px-4 py-24">
        <div className="container relative z-10 mx-auto max-w-6xl text-center text-white">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-secondary ring-1 ring-white/25">
            <Camera className="h-3.5 w-3.5" />
            Photo Gallery
          </span>
          <h1 className="mb-6 text-balance text-5xl font-extrabold md:text-6xl">
            Recovery Fest Photo Gallery
          </h1>
          <p className="text-balance text-xl text-white/85 md:text-2xl">
            Celebrating moments of hope, community, and recovery
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="bg-background px-4 py-16">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {galleryImages.map((image) => (
              <Card
                key={image.id}
                className="card-pop group overflow-hidden border-border"
              >
                <div className="relative flex h-80 items-center justify-center bg-foreground">
                  <Image
                    src={image.src || '/placeholder.svg'}
                    alt={image.alt}
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-muted/40 px-4 py-16">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-gradient-brand mb-6 text-3xl font-extrabold md:text-4xl">
            Join Us at Recovery Fest 2026
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Be part of the celebration and help us create more memories like these
          </p>
          <Button
            asChild
            size="lg"
            className="btn-shine bg-gradient-to-r from-primary to-accent px-8 py-6 text-base font-bold text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl"
          >
            <Link href="/">Learn More</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
