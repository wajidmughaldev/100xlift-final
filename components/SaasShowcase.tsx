'use client';

// import { ChevronDown, Github, Linkedin, Twitter, Zap, Code2, Smartphone } from 'lucide-react';

export default function SaasShowcase() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">FlowContent</h1>
            <p className="text-gray-400 text-sm">Responsive SaaS Showcase</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-2">AVAILABLE FOR HIRE</p>
            <div className="flex gap-3">
              {/* <Github className="w-5 h-5 cursor-pointer hover:text-purple-400" /> */}
              {/* <Linkedin className="w-5 h-5 cursor-pointer hover:text-purple-400" /> */}
              {/* <Twitter className="w-5 h-5 cursor-pointer hover:text-purple-400" /> */}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Phone Mockups */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Meet Our Team Phone */}
            <div className="bg-purple-400 rounded-3xl p-6 flex items-center justify-center h-96">
              <div className="bg-black rounded-2xl p-4 w-full h-full flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-400 rounded-full mx-auto mb-4" />
                  <h3 className="font-bold text-white mb-2">Meet Our Team</h3>
                  <p className="text-xs text-gray-300 mb-4">Expert team of creators</p>
                  <button className="bg-purple-500 text-white px-4 py-2 rounded text-sm font-semibold">
                    View Profiles
                  </button>
                </div>
              </div>
            </div>

            {/* Why Integrations Phone */}
            <div className="bg-purple-400 rounded-3xl p-6 flex items-center justify-center h-96">
              <div className="bg-black rounded-2xl p-4 w-full h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white mb-3 text-sm">Why Integrations Matter for Marketing</h3>
                  <div className="space-y-2 text-xs text-gray-300">
                    <p>✓ Streamlined workflows</p>
                    <p>✓ Automated campaigns</p>
                    <p>✓ Better analytics</p>
                  </div>
                </div>
                <div className="bg-gray-700 h-24 rounded" />
              </div>
            </div>

            {/* Lead the Future Phone */}
            <div className="bg-purple-400 rounded-3xl p-6 flex items-center justify-center h-96">
              <div className="bg-black rounded-2xl p-4 w-full h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white mb-2 text-sm">Lead the Future of Content Marketing</h3>
                  <p className="text-xs text-gray-300 mb-4">Discover next-level strategies</p>
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded text-xs font-semibold">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop vs Mobile Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">SaaS lives on desktop, but it sells on mobile.</h2>
              <p className="text-gray-400 mb-4">
                Most decision-makers first encounter your product on a phone while commuting or between meetings. If that first touchpoint feels broken, you lose the lead. This showcased demonstrates how FlowContent adapts the entire SaaS journey—from the high-level promise to the deep product UI—across every screen size.
              </p>
              {/* <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300">
                Learn More <ChevronDown className="w-4 h-4" />
              </button> */}
              <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300">
                Learn More 
              </button>
            </div>

            <div className="bg-gray-900 rounded-lg p-6">
              <p className="text-sm font-semibold text-lime-400 mb-4">Technology Tools Used</p>
              <div className="space-y-3">
                {['Next.js', 'React', 'Tailwind CSS', 'TypeScript'].map((tool) => (
                  <div key={tool} className="flex items-center justify-between bg-black rounded p-3">
                    <span className="text-sm text-gray-300">{tool}</span>
                    <div className="flex gap-2">
                      {/* <Code2 className="w-4 h-4 text-lime-400" /> */}
                      {/* <Code2 className="w-4 h-4 text-lime-400" /> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Responsive Highlights */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6">Responsive Highlights:</h3>
            <ul className="space-y-3">
              {[
                'The value proposition and primary CTA stay above the fold on all devices, ensuring immediate visibility.',
                'The value proposition and primary CTA stay above the fold on all devices, ensuring immediate visibility.',
                'The value proposition and primary CTA stay above the fold on all devices, ensuring immediate visibility clarity.'
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-lime-400 text-xl">●</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Secondary Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-purple-400 rounded-3xl p-6 h-80">
                <div className="bg-black rounded-2xl h-full flex items-center justify-center">
                  <div className="text-center">
                    {/* <Smartphone className="w-8 h-8 text-purple-400 mx-auto mb-4" /> */}
                    <p className="text-white text-sm font-semibold">Mobile Showcase {i}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Meet Our Team Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-purple-400 rounded-3xl p-8 h-96 flex items-center justify-center">
              <div className="bg-black rounded-2xl w-full h-full flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-blue-400 rounded-full mb-4" />
                <h3 className="font-bold text-white mb-1">John Maradona</h3>
                <p className="text-xs text-gray-300 mb-6">Lead Designer & Founder</p>
                <div className="flex gap-3">
                  {/* <Github className="w-4 h-4 text-purple-400 cursor-pointer" /> */}
                  {/* <Linkedin className="w-4 h-4 text-purple-400 cursor-pointer" /> */}
                  {/* <Twitter className="w-4 h-4 text-purple-400 cursor-pointer" /> */}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-4">SaaS lives on desktop, but it sells on mobile.</h3>
              <p className="text-gray-400 mb-6">
                Most decision-makers first encounter your product on a phone while commuting or between meetings. If that first touchpoint feels broken, you lose the lead. This showcase demonstrates how FlowContent adapts the entire SaaS journey—from the high-level promise to the deep product UI—across every screen size.
              </p>
              <button className="flex items-center gap-2 text-lime-400 hover:text-lime-300 w-fit">
                {/* <Zap className="w-4 h-4" /> */}
                Contact
              </button>
            </div>
          </div>

          {/* Other Projects */}
          <div>
            <h3 className="text-2xl font-bold text-lime-400 mb-8">Other Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-purple-400 rounded-2xl p-4 h-72">
                  <div className="bg-black rounded-lg h-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                    <div className="text-center">
                      {/* <Smartphone className="w-6 h-6 text-purple-400 mx-auto mb-3" /> */}
                      <p className="text-white text-sm font-semibold">Project {i}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4 mt-16">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-500">
          <p>© 2024 FlowContent. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-purple-400">Privacy</a>
            <a href="#" className="hover:text-purple-400">Terms</a>
            <a href="#" className="hover:text-purple-400">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
