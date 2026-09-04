'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Navigation, Facebook } from 'lucide-react'

export function VenueMap() {
  const venueAddress = '104 Clover St, Holland, MI 49423'
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venueAddress)}`
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(venueAddress)}&z=15&output=embed`

  return (
    <section id="location" className="relative bg-background px-4 py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            Get There
          </span>
          <h2 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
            Location &amp; Directions
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden rounded-2xl border-none shadow-xl ring-1 ring-border">
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
            <Card className="rounded-2xl border-primary/20 shadow-lg card-lift">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MapPin className="h-5 w-5 text-primary" />
                  Venue Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div>
                  <h3 className="mb-2 text-lg font-bold text-foreground">The Salvation Army</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    104 Clover St<br />
                    Holland, MI 49423
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold text-foreground">Event Date &amp; Time</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Wednesday, September 9, 2026</strong><br />
                    3:00pm – 6:00pm
                  </p>
                </div>

                <Button
                  asChild
                  className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
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

            <Card className="rounded-2xl shadow-lg card-lift">
              <CardHeader>
                <CardTitle className="font-heading text-2xl font-bold text-accent">Parking &amp; Accessibility</CardTitle>
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

            <Card className="rounded-2xl bg-muted shadow-lg">
              <CardContent className="space-y-4 p-6">
                <p className="text-base text-muted-foreground">
                  <strong className="text-lg text-foreground">Need help finding us?</strong><br />
                  <span className="text-base">Call us at{' '}
                    <a
                      href="tel:6164945545"
                      className="font-semibold text-primary hover:underline"
                    >
                      (616) 494-5545
                    </a>
                  </span>
                </p>
                <a
                  href="https://www.facebook.com/RFLakeshore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary transition-colors hover:text-primary/80"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="font-medium">RecoveryFest on the LakeShore | Facebook</span>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
