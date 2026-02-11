'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Navigation } from 'lucide-react'

export function VenueMap() {
  const venueAddress = '104 Clover St, Holland, MI 49423'
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venueAddress)}`
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.8!2d-86.1089!3d42.7875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8819909c0b8c8c8b%3A0x1234567890abcdef!2s104%20Clover%20St%2C%20Holland%2C%20MI%2049423!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus`

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-8 text-center text-foreground" style={{textShadow: '2px 2px 0 rgba(0,0,0,0.1), -1px -1px 0 rgba(255,255,255,0.3)'}}>
          Location & Directions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-lg border-none">
              <div className="relative w-full h-[450px]">
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Venue Location Map"
                  className="absolute inset-0"
                />
              </div>
            </Card>
          </div>

          {/* Venue Information */}
          <div className="space-y-6">
            <Card className="shadow-lg border-primary/20">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-xl flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Venue Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">The Salvation Army</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    104 Clover St<br />
                    Holland, MI 49423
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Event Date & Time</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Thursday, September 9, 2026</strong><br />
                    3:00pm – 6:00pm
                  </p>
                </div>

                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Navigation className="h-4 w-4" />
                    Get Directions
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Parking & Accessibility</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3 text-base text-muted-foreground">
                  <li>• Free parking available on-site</li>
                  <li>• Wheelchair accessible venue</li>
                  <li>• ADA compliant facilities</li>
                  <li>• Family-friendly environment</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-muted">
              <CardContent className="p-6">
                <p className="text-base text-muted-foreground">
                  <strong className="text-lg text-foreground">Need help finding us?</strong><br />
                  <span className="text-base">Call us at{' '}
                    <a
                      href="tel:6164945545"
                      className="text-primary hover:underline font-semibold"
                    >
                      (616) 494-5545
                    </a>
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
