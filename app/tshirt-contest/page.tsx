'use client';

import { useState, useEffect } from 'react';
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
    name: 'Sobar Recovery Community Center',
    addresses: [
      { address: '347 Hoover Blvd, Holland, MI 49423', coords: '347 Hoover Boulevard Holland MI 49423' },
    ],
  },
  {
    name: 'Recovery Court',
    addresses: [
      { address: '414 Washington St. Suite 300 Grand Haven, MI 49417', coords: '414 Washington Street Suite 300 Grand Haven MI 49417' },
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
    <div className="inline-block bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-2 border-green-200">
      <p className="text-xs font-bold text-green-700 mb-2">Time Left to Submit Entry</p>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div>
          <p className="text-xl font-bold text-green-600">{timeLeft.days}</p>
          <p className="text-xs text-green-700">Days</p>
        </div>
        <div>
          <p className="text-xl font-bold text-green-600">{String(timeLeft.hours).padStart(2, '0')}</p>
          <p className="text-xs text-green-700">Hours</p>
        </div>
        <div>
          <p className="text-xl font-bold text-green-600">{String(timeLeft.minutes).padStart(2, '0')}</p>
          <p className="text-xs text-green-700">Mins</p>
        </div>
        <div>
          <p className="text-xl font-bold text-green-600">{String(timeLeft.seconds).padStart(2, '0')}</p>
          <p className="text-xs text-green-700">Secs</p>
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
    <main className="min-h-screen bg-white overflow-hidden pt-0">
      {/* Hero Section */}
      <section className="relative w-full py-0 px-4 bg-gradient-to-b from-blue-50 to-white pt-2">
        <div className="max-w-6xl mx-auto">
          {/* Logo and Title with Event Details */}
          <div className="flex items-center justify-between gap-6 mb-2">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RF%20LOGO%202024%20%281%29-yMPvnByCZ2CfYNpvBemsnBhDKR33e9.jpg" 
                alt="Recovery Fest Logo" 
                className="w-56 h-auto md:w-72"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>

            {/* Middle: Recovery Fest Logo/Title */}
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-bold mb-0 leading-none">
                <span className="text-green-500">Recovery</span>
                <span className="text-cyan-500"> Fest</span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-700 font-bold leading-none mt-2 text-center">
                T-Shirt Design Contest
              </p>
            </div>

            {/* Right: Event Details and Countdown */}
            <div className="text-right flex flex-col items-end gap-3 flex-shrink-0">
              <div className="text-sm font-semibold text-gray-800">
                <p className="text-lg font-bold">September 9</p>
                <p className="text-base">3:00 - 6:00 PM</p>
                <p className="text-base">The Salvation Army</p>
                <p className="text-base">128 Clover Street</p>
                <p className="text-base">Holland, MI</p>
              </div>
              <CountdownTimer targetDate={new Date('2026-08-21T17:00:00').getTime()} />
            </div>
          </div>


        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-0">
        {/* Instructions */}
        <div className="mb-6 text-center">
          <p className="text-2xl md:text-3xl text-gray-700 font-bold whitespace-nowrap">Please Read Instructions Carefully and Learn How to Submit Your Design Below.</p>
        </div>

        {/* Contest Details Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {/* What is it */}
          <div
            className="card-hover bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200 cursor-pointer text-center"
            onMouseEnter={() => setHoveredCard('what')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3 className="text-2xl font-bold text-blue-700 mb-3">What is it?</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              A community design contest celebrating recovery! Create a design about recovery and it could be printed on t-shirts for Recovery Fest.
            </p>
            {hoveredCard === 'what' && (
              <div className="mt-4 pt-4 border-t border-blue-200 text-base text-blue-600 font-semibold">
                → Winner gets featured at the event!
              </div>
            )}
          </div>

          {/* Design Requirements */}
          <div
            className="card-hover bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200 cursor-pointer text-center"
            onMouseEnter={() => setHoveredCard('requirements')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3 className="text-2xl font-bold text-green-700 mb-3">Design Requirements</h3>
            <ul className="text-lg text-gray-700 space-y-2 inline-block text-left">
              <li>• 8½&quot; × 11&quot; format</li>
              <li>• Black or blue ink only</li>
              <li>• Black pencil acceptable</li>
              <li>• Recovery-themed</li>
            </ul>
            {hoveredCard === 'requirements' && (
              <div className="mt-4 pt-4 border-t border-green-200 text-base text-green-600 font-semibold">
                → Cardstock available at drop-off locations
              </div>
            )}
          </div>
        </div>

        {/* Design Ideas and Event Location */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {/* Design Ideas */}
          <div
            className="card-hover bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200 cursor-pointer text-center"
            onMouseEnter={() => setHoveredCard('ideas')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3 className="text-2xl font-bold text-purple-700 mb-3">Design Ideas</h3>
            <p className="text-lg text-gray-700 mb-3">Show us your vision of recovery:</p>
            <ul className="text-base text-gray-700 space-y-2 inline-block text-left">
              <li>• What recovery looks like to you</li>
              <li>• What recovery has done for you</li>
              <li>• What recovery means to you</li>
            </ul>
            {hoveredCard === 'ideas' && (
              <div className="mt-4 pt-4 border-t border-purple-200 text-base text-purple-600 font-semibold">
                → The possibilities are endless!
              </div>
            )}
          </div>

          {/* Event Location */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-6 border-2 border-cyan-200 card-hover text-center">
            <div>
              <h3 className="text-2xl font-bold text-cyan-700 mb-3">Event Location</h3>
              <p className="text-xl font-semibold text-gray-700 mb-1">The Salvation Army</p>
              <p className="text-lg text-gray-600 mb-1">128 Clover Street</p>
              <p className="text-lg text-gray-600 mb-4">Holland, MI</p>
              <p className="text-base text-gray-500">All submissions will be displayed at Recovery Fest</p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-8">
          <h3 className="font-bold text-2xl text-red-800 mb-3 underline">★ IMPORTANT ★</h3>
          <ul className="text-lg text-gray-700 space-y-2">
            <li>✓ Write your <span className="font-semibold">name and contact info on the back</span> of your design</li>
            <li>✓ One submission per person</li>
            <li>✓ Design must be Recovery-related in some way</li>
            <li>✓ Must use black/blue ink or black pencil only</li>
          </ul>
        </div>

        {/* Timeline Section */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 mb-10 border-2 border-yellow-200">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Important Dates</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center card-hover">
              <div className="inline-block bg-white rounded-full p-4 mb-4 border-4 border-yellow-500">
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Entries Due</h3>
              <p className="text-2xl font-bold text-blue-600">August 21</p>
              <p className="text-gray-600">by 5:00 PM</p>
            </div>

            <div className="text-center card-hover">
              <div className="inline-block bg-white rounded-full p-4 mb-4 border-4 border-green-500">
                <Star className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Winner Announced</h3>
              <p className="text-2xl font-bold text-green-600">August 31</p>
              <p className="text-gray-600">Winner will be contacted directly</p>
            </div>

            <div className="text-center card-hover">
              <div className="inline-block bg-white rounded-full p-4 mb-4 border-4 border-purple-500">
                <Heart className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Recovery Fest Event</h3>
              <p className="text-2xl font-bold text-purple-600">September 9</p>
              <p className="text-gray-600">3:00 - 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* How to Submit */}
        <div className="bg-gradient-to-r from-green-50 to-cyan-50 rounded-lg p-6 mb-10 border-2 border-green-200">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-800">How to Submit</h2>
          <div className="grid grid-cols-1 gap-4">
            {/* In Person */}
            <div className="card-hover bg-white rounded-lg p-6 border border-gray-200 flex items-center gap-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl mb-2 text-gray-800">In Person</h3>
                <p className="text-lg text-red-600 mb-2 font-bold uppercase">(CLICK ORGANIZATION FOR ADDRESS)</p>
                <p className="text-lg text-gray-600 mb-2 font-semibold">Drop off at:</p>
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
                      className="text-green-600 hover:text-green-700 cursor-pointer font-semibold hover:underline transition-colors"
                    >
                      {displayName}
                    </li>
                  );
                })}
              </ul>
              </div>
            </div>

            {/* Electronic */}
            <div className="card-hover bg-white rounded-lg p-6 border border-gray-200 flex items-center gap-6">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-cyan-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl mb-2 text-gray-800">Electronic</h3>
                <p className="text-lg text-gray-600 mb-2">Send digital designs or photos of your artwork to:</p>
                <p className="font-sans text-lg font-semibold bg-gray-100 p-3 rounded text-gray-900 break-all hover:bg-gray-200 transition-colors">
                  cmhcustomerservices@miottawa.org
                </p>
              </div>
              <button
                onClick={handleSubmitClick}
                className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-bold py-3 px-4 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer flex-shrink-0"
              >
                ✎ Submit Your Design
              </button>
            </div>

            {/* Mail */}
            <div className="card-hover bg-white rounded-lg p-6 border border-gray-200 flex items-center gap-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl mb-2 text-gray-800">Mail</h3>
                <p className="text-lg text-gray-600 mb-1">Send to:</p>
                <p className="text-lg font-semibold text-gray-800">CMH Customer Services</p>
                <p className="text-lg text-gray-600">12265 James Street</p>
                <p className="text-lg text-gray-600">Holland, MI 49424</p>
                <p className="text-sm text-gray-500 mt-2">Try not to fold your artwork!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit CTA */}
        <div id="submit" className="text-center py-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Ready to Share Your Vision?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Submit your recovery-inspired t-shirt design by August 21 at 5 PM
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSubmitClick}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Email Your Design
            </button>
            <button
              onClick={() => setShowDropOffModal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Find a Drop-Off Location
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">Recovery Fest</h3>
          <p className="text-blue-100 mb-4">Invest in health, home, purpose, and community</p>
          <p className="text-sm text-blue-200">September 9, 2025 | 3-6 PM | The Salvation Army</p>
          <p className="text-xs text-blue-300 mt-4">128 Clover Street, Holland, MI</p>
        </div>
      </footer>

      {/* Drop-Off Locations Modal */}
      {showDropOffModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full shadow-2xl max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Drop-Off Locations</h2>
            <p className="text-gray-600 mb-6">Click an organization to view addresses and get directions:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {locations.map((location) => (
                <button
                  key={location.name}
                  onClick={() => {
                    setSelectedLocation(location);
                    setShowDropOffModal(false);
                  }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 p-4 rounded-lg border border-purple-200 transition-all duration-300 text-left hover:shadow-lg"
                >
                  <p className="font-semibold text-gray-800">{location.name}</p>
                  <p className="text-xs text-purple-600 mt-1">Click for addresses →</p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowDropOffModal(false)}
              className="w-full py-2 px-4 rounded-lg font-semibold bg-gray-300 hover:bg-gray-400 text-gray-800 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Location Modal */}
      {selectedLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedLocation.name}</h2>
            <p className="text-gray-600 mb-6">Select an address to open in maps:</p>
            
            <div className="space-y-3 mb-6">
              {selectedLocation.addresses.map((addr, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOpenMaps(addr.coords)}
                  className="w-full bg-gradient-to-r from-green-50 to-cyan-50 hover:from-green-100 hover:to-cyan-100 p-4 rounded-lg border border-green-200 transition-all duration-300 text-left"
                >
                  <p className="font-semibold text-gray-800">{addr.address}</p>
                  <p className="text-xs text-green-600 mt-1">Click to open in maps →</p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setSelectedLocation(null)}
              className="w-full py-2 px-4 rounded-lg font-semibold bg-gray-300 hover:bg-gray-400 text-gray-800 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Submission Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Submit Your Design</h2>
            <p className="text-gray-600 mb-6">
              Send your recovery-inspired t-shirt design (PDF, JPEG, PNG, or Word document) to:
            </p>
            
            <div className="bg-gradient-to-r from-green-50 to-cyan-50 p-4 rounded-lg mb-6 border border-green-200">
              <p className="text-center font-mono text-lg font-bold text-gray-800">
                cmhcustomerservices@miottawa.org
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
              <p className="text-sm text-gray-700 mb-2 font-semibold">Don&apos;t forget to include:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Your name and contact information</li>
                <li>• Your design file (PDF, JPEG, PNG, or Word)</li>
                <li>• Submission deadline: August 21 at 5 PM</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopyEmail}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {copied ? 'Copied!' : 'Copy Email'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 px-4 rounded-lg font-semibold bg-gray-300 hover:bg-gray-400 text-gray-800 transition-all duration-300"
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
