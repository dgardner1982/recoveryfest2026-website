import Image from 'next/image'
import { Card } from '@/components/ui/card'

export default function GalleryPage() {
  // Add your gallery images here - example: { src: '/gallery/image1.jpg', alt: 'Description', id: 1 }
  const galleryImages: { src: string; alt: string; id: number }[] = []

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
        <div className="container mx-auto max-w-6xl text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance drop-shadow-lg">
            Recovery Fest Photo Gallery
          </h1>
          <p className="text-xl md:text-2xl text-balance">
            Celebrating moments of hope, community, and recovery
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map((image) => (
              <Card 
                key={image.id} 
                className="overflow-hidden bg-white border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="relative aspect-square">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Join Us at Recovery Fest 2026
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Be part of the celebration and help us create more memories like these
          </p>
        </div>
      </section>
    </div>
  )
}
