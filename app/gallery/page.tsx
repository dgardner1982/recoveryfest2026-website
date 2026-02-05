import Image from 'next/image'
import { Card } from '@/components/ui/card'

export default function GalleryPage() {
  // Real Recovery Fest photos - 19 unique images
  const galleryImages = [
    { src: '/gallery/image1.jpg', alt: 'Recovery Fest branded stickers with logo', id: 1 },
    { src: '/gallery/image2.jpg', alt: 'Community member smiling at Recovery Fest', id: 2 },
    { src: '/gallery/image3.jpg', alt: 'Resource table with volunteers helping attendees', id: 3 },
    { src: '/gallery/image4.jpg', alt: 'Tree of Remembrance interactive display', id: 4 },
    { src: '/gallery/image5.jpg', alt: 'Holland Police Paw Patrol vehicle with families', id: 5 },
    { src: '/gallery/image6.jpg', alt: 'Recovery Fest venue exterior with banner', id: 6 },
    { src: '/gallery/image7.jpg', alt: 'Attendee receiving recovery resources and materials', id: 7 },
    { src: '/gallery/image8.jpg', alt: 'Person adding name to Tree of Remembrance', id: 8 },
    { src: '/gallery/image9.jpg', alt: 'Indoor resource fair with multiple organizations', id: 9 },
    { src: '/gallery/image10.jpg', alt: 'Recovery Fest wristbands close-up', id: 10 },
    { src: '/gallery/image11.jpg', alt: 'Volunteer doing screen printing at Recovery Fest', id: 11 },
    { src: '/gallery/image12.jpg', alt: 'Community members connecting at outdoor event', id: 12 },
    { src: '/gallery/image13.jpg', alt: 'Volunteers at resource table by windows', id: 13 },
    { src: '/gallery/image14.jpg', alt: 'Emotional moment with hug at resource table', id: 14 },
    { src: '/gallery/image15.jpg', alt: 'Crowded indoor resource fair with mental health messaging', id: 15 },
    { src: '/gallery/image16.jpg', alt: 'Young person holding Recovery Fest 2024 t-shirt', id: 16 },
    { src: '/gallery/image17.jpg', alt: 'Safe Harbor volunteer talking with attendees', id: 17 },
    { src: '/gallery/image18.jpg', alt: 'Reach for Recovery table with volunteers', id: 18 },
    { src: '/gallery/image19.jpg', alt: '211 Community ACCESS Line resource table', id: 19 },
  ]

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
