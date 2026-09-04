'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, MapPin, FileText, Mail, Star, Heart } from 'lucide-react';

const locations = [
  {
    name: 'Community Mental Health',
    addresses: [
      { address: '12265 James St. Holland, MI 49424', coords: '12265 James Street Holland MI 49424' },
      { address: '1111 Fulton Street, Grand Haven, MI 49424', coords: '1111 Fulton Street Grand Haven MI 49424' },
    ],
  },
  {
    name: 'Reach for Recovery',
    addresses: [
      { address: '483 Century Ln Holland, MI 49423', coords: '483 Century Lane Holland MI 49423' },
      { address: '700 Washington Ave Suite 220 Grand Haven 49417', coords: '700 Washington Avenue Suite 220 Grand Haven MI 49417' },
    ],
  },
  {
    name: 'Arbor Circle',
    addresses: [
      { address: '412 Century Ln, Holland, MI 49423', coords: '412 Century Lane Holland MI 49423' },
    ],
  },
  {
    name: 'Sobar Recovery Community Center',
    addresses: [
      { address: '347 Hoover Blvd, Holland, MI 49423', coords: '347 Hoover Boulevard Holland MI 49423' },
    ],
  },
  {
    name: '58th District Court Probation',
    addresses: [
      { address: '85 W 8th St. Holland, MI 49423', coords: '85 West 8th Street Holland MI 49423' },
    ],
  },
  {
    name: 'Samaritas',
    addresses: [
      { address: '2450 Van Ommen Dr Suite C Holland MI 49424', coords: '2450 Van Ommen Drive Suite C Holland MI 49424' },
    ],
  },
];

function CountdownTimer({ targetDate }: { targetDate: number }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="inline-block rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5 p-4 shadow-lg">
      <p className="mb-2 text-xs font-bold text-accent">Time Left to Submit Entry</p>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div>
          <p className="text-xl font-bold text-accent">{timeLeft.days}</p>
          <p className="text-xs text-accent/80">Days</p>
        </div>
        <div>
          <p className="text-xl font-bold text-accent">{String(timeLeft.hours).padStart(2, '0')}</p>
          <p className="text-xs text-accent/80">Hours</p>
        </div>
        <div>
          <p className="text-xl font-bold text-accent">{String(timeLeft.minutes).padStart(2, '0')}</p>
          <p className="text-xs text-accent/80">Mins</p>
        </div>
        <div>
          <p className="text-xl font-bold text-accent">{String(timeLeft.seconds).padStart(2, '0')}</p>
          <p className="text-xs text-accent/80">Secs</p>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ name: string; addresses: any[] } | null>(null);
  const [showDropOffModal, setShowDropOffModal] = useState(false);

  const handleSubmitClick = () => {
    setShowModal(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('cmhcustomerservices@miottawa.org');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenMaps = (address: string) => {
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background pt-0">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-primary/5 to-background px-4 py-0 pt-2">
        <div className="mx-auto max-w-6xl">
          {/* Logo and Title with Event Details */}
          <div className="mb-2 flex items-center justify-between gap-6">
            {/* Left: Logo */}
            <Link href="/" className="flex-shrink-0 transition-opacity hover:opacity-80">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RF%20LOGO%202024%20%281%29-yMPvnByCZ2CfYNpvBemsnBhDKR33e9.jpg" 
                alt="Recovery Fest Logo" 
                className="w-56 h-auto md:w-72"
                style={{ mixBlendMode: 'multiply' }}
              />
            </Link>

            {/* Middle: Recovery Fest Logo/Title */}
            <div className="-ml-20 flex-shrink-0">
              <h1 className="mb-0 font-heading text-5xl font-bold leading-none text-primary md:text-6xl">
                Recovery Fest
              </h1>
              <p className="mt-2 text-center text-2xl font-bold leading-none text-muted-foreground md:text-3xl">
                T-Shirt Design Contest
              </p>
            </div>

            {/* Right: Event Details and Countdown */}
            <div className="flex flex-shrink-0 flex-col items-end gap-3 text-right">
              <div className="text-sm font-semibold text-foreground">
                <p className="text-lg font-bold">September 9</p>
                <p className="text-base">3:00 - 6:00 PM</p>
                <a 
                  href="https://maps.google.com/?q=The+Salvation+Army,+104+Clover+Street,+Holland,MI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base transition-colors hover:text-primary hover:underline cursor-pointer"
                >
                  <p className="text-base">The Salvation Army</p>
                  <p className="text-base">104 Clover Street</p>
                  <p className="text-base">Holland, MI</p>
                </a>
              </div>
              <CountdownTimer targetDate={new Date('2026-08-21T17:00:00').getTime()} />
            </div>
          </div>


        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-4 py-0">
        {/* Instructions */}
        <p className="mb-6 text-center text-2xl font-bold text-muted-foreground md:text-3xl">Please Read Instructions Carefully and Learn How to Submit Your Design Below.</p>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {/* What is it */}
          <div
            className="card-hover card-lift cursor-pointer rounded-2xl border-2 border-primary/25 bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center shadow-lg"
            onMouseEnter={() => setHoveredCard('what')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3 className="mb-3 font-heading text-3xl font-bold text-primary">What is it?</h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A community design contest celebrating recovery! Create a design about recovery and it could be printed on t-shirts for Recovery Fest.
            </p>
            {hoveredCard === 'what' && (
              <div className="mt-4 border-t border-primary/20 pt-4 text-base font-semibold text-primary">
                → Winner gets featured at the event!
              </div>
            )}
          </div>

          {/* Design Requirements */}
          <div
            className="card-hover card-lift cursor-pointer rounded-2xl border-2 border-accent/25 bg-gradient-to-br from-accent/10 to-accent/5 p-6 text-center shadow-lg"
            onMouseEnter={() => setHoveredCard('requirements')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3 className="mb-3 font-heading text-3xl font-bold text-accent">Design Requirements</h3>
            <ul className="inline-block space-y-2 text-left text-lg text-muted-foreground">
              <li>• 8½&quot; × 11&quot; format</li>
              <li>• Black or blue ink only</li>
              <li>• Black pencil acceptable</li>
              <li>• Recovery-themed</li>
            </ul>
            {hoveredCard === 'requirements' && (
              <div className="mt-4 border-t border-accent/20 pt-4 text-base font-semibold text-accent">
                → Cardstock available at drop-off locations
              </div>
            )}
          </div>
        </div>

        {/* Design Ideas and Event Location */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {/* Design Ideas */}
          <div
            className="card-hover card-lift cursor-pointer rounded-2xl border-2 border-secondary/40 bg-gradient-to-br from-secondary/15 to-secondary/5 p-6 text-center shadow-lg"
            onMouseEnter={() => setHoveredCard('ideas')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3 className="mb-3 font-heading text-3xl font-bold text-secondary-foreground">Design Ideas</h3>
            <p className="mb-3 text-lg text-muted-foreground">Show us your vision of recovery:</p>
            <ul className="inline-block space-y-2 text-left text-lg text-muted-foreground">
              <li>• What recovery looks like to you</li>
              <li>• What recovery has done for you</li>
              <li>• What recovery means to you</li>
            </ul>
            {hoveredCard === 'ideas' && (
              <div className="mt-4 border-t border-secondary/30 pt-4 text-base font-semibold text-secondary-foreground">
                → The possibilities are endless!
              </div>
            )}
          </div>

          {/* Event Location */}
          <div className="card-hover card-lift rounded-2xl border-2 border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-6 text-center shadow-lg">
            <div>
              <h3 className="mb-3 font-heading text-3xl font-bold text-primary">Event Location</h3>
              <p className="mb-1 text-xl font-semibold text-foreground">The Salvation Army</p>
                <p className="mb-1 text-lg text-muted-foreground">104 Clover Street</p>
              <p className="mb-4 text-lg text-muted-foreground">Holland, MI</p>
              <p className="text-base text-muted-foreground">All submissions will be displayed at Recovery Fest</p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mb-8 rounded-2xl border-l-4 border-destructive bg-destructive/5 p-4 shadow-lg">
          <h3 className="mb-3 text-center font-heading text-4xl font-bold text-destructive underline">★ IMPORTANT ★</h3>
          <ul className="space-y-2 text-lg font-bold uppercase text-foreground">
            <li>✓ Write your <span className="font-semibold">name and contact info on the back</span> of your design</li>
            <li className="underline">✓ Must use black/blue ink or black pencil only, no color please</li>
            <li>✓ One submission per person</li>
            <li>✓ Design must be Recovery-related in some way</li>
          </ul>
        </div>

        {/* Timeline Section */}
        <div className="mb-10 rounded-2xl border-2 border-secondary/40 bg-gradient-to-r from-secondary/15 to-secondary/5 p-6 shadow-lg">
          <h2 className="mb-6 text-center font-heading text-3xl font-bold text-foreground">Important Dates</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card-hover text-center">
              <div className="mb-4 inline-block rounded-full border-4 border-secondary bg-card p-4">
                <Clock className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">Entries Due</h3>
              <p className="text-2xl font-bold text-primary">August 21</p>
              <p className="text-muted-foreground">by 5:00 PM</p>
            </div>

            <div className="card-hover text-center">
              <div className="mb-4 inline-block rounded-full border-4 border-accent bg-card p-4">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">Winner Announced</h3>
              <p className="text-2xl font-bold text-accent">August 31</p>
              <p className="text-muted-foreground">Winner will be contacted directly</p>
            </div>

            <div className="card-hover text-center">
              <div className="mb-4 inline-block rounded-full border-4 border-primary bg-card p-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">Recovery Fest Event</h3>
              <p className="text-2xl font-bold text-primary">September 9</p>
              <p className="text-muted-foreground">3:00 - 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* How to Submit */}
        <div className="mb-10 rounded-2xl border-2 border-primary/25 bg-gradient-to-r from-primary/10 to-accent/5 p-6 shadow-lg">
          <h2 className="mb-6 text-center font-heading text-4xl font-bold text-foreground md:text-5xl">How to Submit</h2>
          <div className="grid grid-cols-1 gap-4">
            {/* In Person */}
            <div className="card-hover card-lift flex items-center gap-6 rounded-2xl border border-border bg-card p-6 shadow-md">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 font-heading text-4xl font-bold text-foreground">In Person</h3>
                <p className="mb-2 text-lg font-bold uppercase text-destructive">(CLICK ORGANIZATION FOR ADDRESS)</p>
                <p className="mb-2 text-lg font-semibold text-muted-foreground">Drop off at:</p>
                <ul className="text-lg space-y-1">
                {locations.map((location) => {
                  let displayName = location.name;
                  if (location.name === 'Sobar Recovery Community Center') {
                    displayName = (
                      <>
                        • Sobar Recovery Community<br/>
                        &nbsp;&nbsp;&nbsp;Center
                      </>
                    );
                  } else if (location.name === '58th District Court Probation') {
                    displayName = (
                      <>
                        • 58th District Court<br/>
                        &nbsp;&nbsp;&nbsp;Probation
                      </>
                    );
                  } else {
                    displayName = `• ${displayName}`;
                  }
                  return (
                    <li
                      key={location.name}
                      onClick={() => setSelectedLocation(location)}
                      className="cursor-pointer font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
                    >
                      {displayName}
                    </li>
                  );
                })}
              </ul>
              </div>
            </div>

            {/* Electronic */}
            <div className="card-hover card-lift flex items-center gap-6 rounded-2xl border border-border bg-card p-6 shadow-md">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 font-heading text-4xl font-bold text-foreground">Electronic</h3>
                <p className="mb-2 text-lg text-muted-foreground">Send digital designs or photos of your artwork to:</p>
                <p className="break-all rounded-lg bg-muted p-3 font-sans text-lg font-semibold text-foreground transition-colors hover:bg-muted/70">
                  cmhcustomerservices@miottawa.org
                </p>
              </div>
              <button
                onClick={handleSubmitClick}
                className="flex-shrink-0 cursor-pointer rounded-full bg-gradient-to-r from-primary to-accent px-4 py-3 text-lg font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105"
              >
                ✎ SUBMIT YOUR DESIGN
              </button>
            </div>

            {/* Mail */}
            <div className="card-hover card-lift flex items-center gap-6 rounded-2xl border border-border bg-card p-6 shadow-md">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 font-heading text-4xl font-bold text-foreground">Mail</h3>
                <p className="mb-1 text-lg text-muted-foreground">Send to:</p>
                <p className="text-lg font-semibold text-foreground">CMH Customer Services</p>
                <p className="text-lg text-muted-foreground">12265 James Street</p>
                <p className="text-lg text-muted-foreground">Holland, MI 49424</p>
                <p className="mt-2 text-base font-semibold text-foreground underline">Try not to fold your artwork!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Box */}
        <div className="mb-8 rounded-2xl border-2 border-primary/25 bg-primary/5 p-6 text-center">
          <p className="text-lg font-semibold text-foreground">
            For Questions, contact Daniel Gardner at <a href="mailto:dgardner@miottawa.org" className="font-bold text-primary underline hover:text-primary/80">dgardner@miottawa.org</a>
          </p>
        </div>

        {/* Submit CTA */}
        <div id="submit" className="text-center py-6">
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Ready to Share Your Vision?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Submit your recovery-inspired t-shirt design by August 21 at 5 PM
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={handleSubmitClick}
              className="cursor-pointer rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary/90"
            >
              Email Your Design
            </button>
            <button
              onClick={() => setShowDropOffModal(true)}
              className="cursor-pointer rounded-full bg-gradient-to-r from-secondary to-secondary/80 px-8 py-4 text-lg font-bold text-secondary-foreground shadow-lg transition-all duration-300 hover:scale-105"
            >
              Find a Drop-Off Location
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 bg-gradient-to-r from-primary to-accent py-8 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h3 className="mb-2 font-heading text-2xl font-bold">Recovery Fest</h3>
          <p className="mb-4 text-primary-foreground/85">Invest in health, home, purpose, and community</p>
          <p className="text-sm text-primary-foreground/75">September 9, 2026 | 3-6 PM | The Salvation Army</p>
                <p className="mt-4 text-xs text-primary-foreground/60">104 Clover Street, Holland, MI</p>
        </div>
      </footer>

      {/* Drop-Off Locations Modal */}
      {showDropOffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm">
          <div className="max-h-96 w-full max-w-2xl overflow-y-auto rounded-2xl bg-card p-8 shadow-2xl">
            <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">Drop-Off Locations</h2>
            <p className="mb-6 text-muted-foreground">Click an organization to view addresses and get directions:</p>
            
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {locations.map((location) => (
                <button
                  key={location.name}
                  onClick={() => {
                    setSelectedLocation(location);
                    setShowDropOffModal(false);
                  }}
                  className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-left transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:shadow-lg"
                >
                  <p className="font-semibold text-foreground">{location.name}</p>
                  <p className="mt-1 text-xs text-primary">Click for addresses →</p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowDropOffModal(false)}
              className="w-full rounded-full bg-muted px-4 py-2 font-semibold text-foreground transition-all duration-300 hover:bg-muted/70"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Location Modal */}
      {selectedLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-2xl">
            <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">{selectedLocation.name}</h2>
            <p className="mb-6 text-muted-foreground">Select an address to open in maps:</p>
            
            <div className="mb-6 space-y-3">
              {selectedLocation.addresses.map((addr, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOpenMaps(addr.coords)}
                  className="w-full rounded-xl border border-accent/20 bg-accent/5 p-4 text-left transition-all duration-300 hover:border-accent/40 hover:bg-accent/10"
                >
                  <p className="font-semibold text-foreground">{addr.address}</p>
                  <p className="mt-1 text-xs text-accent">Click to open in maps →</p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setSelectedLocation(null)}
              className="w-full rounded-full bg-muted px-4 py-2 font-semibold text-foreground transition-all duration-300 hover:bg-muted/70"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Submission Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-2xl">
            <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">Submit Your Design</h2>
            <p className="mb-6 text-muted-foreground">
              Send your recovery-inspired t-shirt design (PDF, JPEG, PNG, or Word document) to:
            </p>
            
            <div className="mb-6 rounded-xl border border-accent/20 bg-accent/5 p-4">
              <p className="text-center font-mono text-lg font-bold text-foreground">
                cmhcustomerservices@miottawa.org
              </p>
            </div>

            <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="mb-2 text-sm font-semibold text-foreground">Don&apos;t forget to include:</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Your name and contact information</li>
                <li>• Your design file (PDF, JPEG, PNG, or Word)</li>
                <li>• Submission deadline: August 21 at 5 PM</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopyEmail}
                className={`flex-1 rounded-full px-4 py-2 font-semibold transition-all duration-300 ${
                  copied
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {copied ? 'Copied!' : 'Copy Email'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-full bg-muted px-4 py-2 font-semibold text-foreground transition-all duration-300 hover:bg-muted/70"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
