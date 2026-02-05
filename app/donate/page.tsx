'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Heart, Users, Gift, Calendar } from 'lucide-react'

export default function DonatePage() {
  const [donationType, setDonationType] = useState('one-time')
  const [amount, setAmount] = useState('50')
  const [customAmount, setCustomAmount] = useState('')

  const predefinedAmounts = ['25', '50', '100', '250', '500']

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-10" />
        <Image
          src="/donate-hero.jpg"
          alt="Support Recovery"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Make a Difference Today
          </h1>
          <p className="text-xl md:text-2xl text-balance">
            Your donation helps bring hope and healing to our community
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Donation Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-none">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-3xl text-foreground">Donate to Recovery Fest</CardTitle>
                  <p className="text-muted-foreground mt-2">
                    Every contribution makes a meaningful impact in supporting recovery and strengthening our community.
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <form className="space-y-8">
                    {/* Donation Type */}
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">Donation Type</Label>
                      <RadioGroup value={donationType} onValueChange={setDonationType} className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="one-time" id="one-time" />
                          <Label htmlFor="one-time" className="cursor-pointer">One-Time</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label htmlFor="monthly" className="cursor-pointer">Monthly</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Amount Selection */}
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">Select Amount</Label>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                        {predefinedAmounts.map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => {
                              setAmount(amt)
                              setCustomAmount('')
                            }}
                            className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
                              amount === amt && !customAmount
                                ? 'border-primary bg-primary text-white'
                                : 'border-border hover:border-primary'
                            }`}
                          >
                            ${amt}
                          </button>
                        ))}
                      </div>
                      <div>
                        <Label htmlFor="custom-amount" className="mb-2 block">Custom Amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input
                            id="custom-amount"
                            type="number"
                            placeholder="Enter custom amount"
                            value={customAmount}
                            onChange={(e) => {
                              setCustomAmount(e.target.value)
                              setAmount('')
                            }}
                            className="pl-8"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">Your Information</Label>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="first-name">First Name *</Label>
                            <Input id="first-name" required />
                          </div>
                          <div>
                            <Label htmlFor="last-name">Last Name *</Label>
                            <Input id="last-name" required />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input id="email" type="email" required />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" type="tel" />
                        </div>
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">Payment Information</Label>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="card-number">Card Number *</Label>
                          <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date *</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input id="cvv" placeholder="123" required />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Options */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="anonymous" />
                        <Label htmlFor="anonymous" className="cursor-pointer">
                          Make this donation anonymous
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="newsletter" />
                        <Label htmlFor="newsletter" className="cursor-pointer">
                          Subscribe to Recovery Fest updates
                        </Label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-secondary hover:bg-secondary/90 text-white text-lg"
                    >
                      Complete Donation of ${customAmount || amount || '0'}
                    </Button>

                    <p className="text-sm text-muted-foreground text-center">
                      Your donation is tax-deductible. Recovery Fest is a 501(c)3 nonprofit organization.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Impact Card */}
              <Card className="shadow-lg border-primary/20">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Your Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Gift className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">$25</p>
                      <p className="text-sm text-muted-foreground">Provides recovery resources and materials for 5 individuals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Gift className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">$50</p>
                      <p className="text-sm text-muted-foreground">Sponsors meals and refreshments for festival attendees</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Gift className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">$100</p>
                      <p className="text-sm text-muted-foreground">Helps fund entertainment and activities for families</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Gift className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">$250+</p>
                      <p className="text-sm text-muted-foreground">Supports outreach programs and community connections</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Why Donate Card */}
              <Card className="shadow-lg">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Why Donate?
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Recovery Fest is completely FREE for all attendees. Your generous donations ensure we can continue
                    providing live music, inspiring speakers, food, activities, and essential recovery resources to
                    thousands of community members each year. Together, we break stigma and build hope.
                  </p>
                </CardContent>
              </Card>

              {/* Event Info Card */}
              <Card className="shadow-lg bg-gradient-to-br from-primary to-primary/80 text-white">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-2">
                  <div>
                    <p className="font-semibold">Date</p>
                    <p className="text-sm">Thursday, September 9, 2026</p>
                  </div>
                  <div>
                    <p className="font-semibold">Time</p>
                    <p className="text-sm">3:00pm – 6:00pm</p>
                  </div>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-sm">The Salvation Army<br />104 Clover St<br />Holland, MI 49423</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Questions about donating or sponsorship opportunities?
                  </p>
                  <a
                    href="mailto:RecoveryFestMI@Gmail.com"
                    className="text-primary hover:underline font-medium"
                  >
                    RecoveryFestMI@Gmail.com
                  </a>
                  <p className="text-sm text-muted-foreground mt-4">
                    Or call us at:{' '}
                    <a href="tel:6163965284" className="text-primary hover:underline">
                      (616) 396-5284
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Thank You for Your Support
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every donation, no matter the size, makes a real difference in the lives of individuals and families
            affected by addiction. Your generosity helps us create a safe, welcoming environment where hope and healing
            can flourish. On behalf of everyone in the Recovery Fest community, thank you
            for believing in second chances and a brighter future.
          </p>
        </div>
      </section>
    </div>
  )
}
