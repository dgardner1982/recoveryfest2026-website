import Image from 'next/image'
import { Card } from '@/components/ui/card'

export default function GalleryPage() {
  // Real Recovery Fest photos - 19 unique images repeated to create 40-photo gallery
  const galleryImages = [
    { src: '/gallery/image1.jpg', alt: 'Recovery Fest branded stickers with logo' },
    { src: '/gallery/image2.jpg', alt: 'Community member smiling at Recovery Fest' },
    { src: '/gallery/image3.jpg', alt: 'Resource table with volunteers helping attendees' },
    { src: '/gallery/image4.jpg', alt: 'Tree of Remembrance interactive display' },
    { src: '/gallery/image5.jpg', alt: 'Holland Police Paw Patrol vehicle with families' },
    { src: '/gallery/image6.jpg', alt: 'Recovery Fest venue exterior with banner' },
    { src: '/gallery/image7.jpg', alt: 'Attendee receiving recovery resources and materials' },
    { src: '/gallery/image8.jpg', alt: 'Person adding name to Tree of Remembrance' },
    { src: '/gallery/image9.jpg', alt: 'Indoor resource fair with multiple organizations' },
    { src: '/gallery/image10.jpg', alt: 'Recovery Fest wristbands close-up' },
    { src: '/gallery/image11.jpg', alt: 'Volunteer doing screen printing at Recovery Fest' },
    { src: '/gallery/image12.jpg', alt: 'Community members connecting at outdoor event' },
    { src: '/gallery/image13.jpg', alt: 'Volunteers at resource table by windows' },
    { src: '/gallery/image14.jpg', alt: 'Emotional moment with hug at resource table' },
    { src: '/gallery/image15.jpg', alt: 'Crowded indoor resource fair with mental health messaging' },
    { src: '/gallery/image16.jpg', alt: 'Young person holding Recovery Fest 2024 t-shirt' },
    { src: '/gallery/image17.jpg', alt: 'Safe Harbor volunteer talking with attendees' },
    { src: '/gallery/image18.jpg', alt: 'Reach for Recovery table with volunteers' },
    { src: '/gallery/image19.jpg', alt: '211 Community ACCESS Line resource table' },
  ]

  // Create array of 40 images by repeating the base images
  const allImages = Array.from({ length: 40 }, (_, i) => ({
    ...galleryImages[i % 19],
    id: i + 1,
  }))

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
            {allImages.map((image) => (
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
