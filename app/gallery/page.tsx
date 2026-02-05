import Image from 'next/image'
import { Card } from '@/components/ui/card'

export default function GalleryPage() {
  const galleryImages = [
    { src: '/gallery/image1.jpg', alt: 'Resource table with volunteers connecting with attendees', id: 1 },
    { src: '/gallery/image2.jpg', alt: 'Community ACCESS Line volunteer assisting attendee', id: 2 },
    { src: '/gallery/image3.jpg', alt: 'Recovery Fest volunteers with banner on building', id: 3 },
    { src: '/gallery/image4.jpg', alt: 'Screen printing station volunteer at Recovery Fest', id: 4 },
    { src: '/gallery/image5.jpg', alt: 'Recovery Fest banner displayed on venue', id: 5 },
    { src: '/gallery/image6.jpg', alt: 'Indoor resource fair with attendees and volunteers', id: 6 },
    { src: '/gallery/image7.jpg', alt: 'Attendee receiving Recovery Fest t-shirt', id: 7 },
    { src: '/gallery/image8.jpg', alt: 'Busy resource fair with many community members', id: 8 },
    { src: '/gallery/image9.jpg', alt: 'Two attendees networking outside at Recovery Fest', id: 9 },
    { src: '/gallery/image10.jpg', alt: 'Family enjoying resources at Recovery Fest table', id: 10 },
    { src: '/gallery/image11.jpg', alt: 'Volunteer speaking with passion at Recovery Fest', id: 11 },
    { src: '/gallery/image12.jpg', alt: 'Two men networking outside venue', id: 12 },
    { src: '/gallery/image13.jpg', alt: 'Person playing cornhole game at Recovery Fest', id: 13 },
    { src: '/gallery/image14.jpg', alt: 'Recovery resources and beaded bracelets at table', id: 14 },
    { src: '/gallery/image15.jpg', alt: 'Community member conversing with resource provider', id: 15 },
    { src: '/gallery/image16.jpg', alt: 'Young attendee holding Recovery Fest 2024 t-shirt', id: 16 },
    { src: '/gallery/image17.jpg', alt: 'Safe Harbor and Samaritas community resource tables', id: 17 },
    { src: '/gallery/image18.jpg', alt: 'Tree of Remembrance interactive display at Recovery Fest', id: 18 },
    { src: '/gallery/image19.jpg', alt: 'Community ACCESS Line 211 representative at table', id: 19 },
    { src: '/gallery/image20.jpg', alt: 'Screen printing volunteer creating Recovery Fest merchandise', id: 20 },
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
                <div className="relative h-80 bg-gray-900 flex items-center justify-center">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-contain p-2"
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
