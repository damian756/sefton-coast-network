import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

const SITES = [
  {
    number: "01",
    emoji: "🌊",
    name: "SouthportGuide",
    domain: "southportguide.co.uk",
    url: "https://www.southportguide.co.uk/",
    description:
      "The definitive visitor guide to Southport — hotels, restaurants, events, things to do, and everything you need to plan a trip to one of England's great seaside towns. Home of The Open Championship 2026 hub.",
    tags: ["Tourism", "Events", "Accommodation", "The Open 2026"],
  },
  {
    number: "02",
    emoji: "🐿️",
    name: "FormbyGuide",
    domain: "formbyguide.co.uk",
    url: "https://www.formbyguide.co.uk/",
    description:
      "Your complete guide to Formby — the National Trust pinewoods, red squirrel reserve, Formby Beach, the village, and the best places to eat. Everything a day tripper or weekend visitor needs, from a local who knows it.",
    tags: ["Nature", "Red Squirrels", "Beach", "Village"],
  },
  {
    number: "03",
    emoji: "⛳",
    name: "SeftonLinks",
    domain: "seftonlinks.com",
    url: "https://www.seftonlinks.com/",
    description:
      "The world's greatest links golf corridor — six championship courses within ten miles of coastline. Course guides, conditions, tee time policies, golf break itineraries, and The Open 2026 at Royal Birkdale. Available in 20 languages.",
    tags: ["Golf", "Tourism", "Royal Birkdale", "Multilingual", "The Open"],
  },
  {
    number: "04",
    emoji: "🦜",
    name: "Sefton Coast Wildlife",
    domain: "seftoncoastwildlife.co.uk",
    url: "https://seftoncoastwildlife.co.uk/",
    description:
      "Species guides, birdwatching, seasonal wildlife, and the best reserves on the Sefton Coast — including Marshside RSPB. Practical information for wildlife spotters, photographers, and anyone who wants to know what they're looking at.",
    tags: ["Wildlife", "Birdwatching", "RSPB", "Species Guides"],
  },
];

const PILLARS = [
  {
    number: "01",
    title: "Independent",
    body: "No tourist board funding. No sponsored editorial. Revenue comes from affiliate commissions and featured listings — always disclosed. Our opinions are our own.",
  },
  {
    number: "02",
    title: "Local",
    body: "Written by people who live here. Not content farms. Not AI-generated listicles. Genuine knowledge of places we visit regularly and care about.",
  },
  {
    number: "03",
    title: "Useful",
    body: "Built for the visitor making a decision — where to stay, where to eat, when to go, what to expect. Practical first, inspirational second.",
  },
  {
    number: "04",
    title: "Ambitious",
    body: "The Sefton Coast is world-class. Royal Birkdale. Red squirrels. A Victorian seafront. We're building guides worthy of the places they cover.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0c1220] text-slate-200">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/60 bg-[#0c1220]/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight text-white">
            SeftonCoast<span className="text-teal-400">.network</span>
          </span>
          <a
            href="#work-with-us"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Work with us
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-teal-400 tracking-widest uppercase mb-6 font-mono">
            Sefton Coast · Merseyside · England
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-10 max-w-3xl">
            Four guides.
            <br />
            One coastline.
            <br />
            <span className="text-teal-400">Properly covered.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mb-10 leading-relaxed">
            Independent editorial guides to Southport, Formby, links golf, and the wildlife of the
            Sefton Coast. Built for visitors who want to make the most of one of England's most
            underrated stretches of coastline.
          </p>
          <a
            href="#network"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white text-sm font-medium px-5 py-2.5 rounded transition-colors"
          >
            Explore the Network
          </a>

          {/* Stats strip */}
          <div className="mt-16 flex flex-wrap gap-8 border-t border-slate-800 pt-8">
            {[
              { value: "4", label: "Independent Guides" },
              { value: "22mi", label: "Of Coastline" },
              { value: "2026", label: "The Open Returns" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
            <div className="ml-auto self-end">
              <p className="text-xs font-mono text-slate-600">53.6451° N, 3.0067° W</p>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose */}
      <section className="py-20 px-6 bg-slate-900/40">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-teal-400 tracking-widest uppercase mb-4 font-mono">Our Purpose</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 max-w-2xl">
            The Sefton Coast deserves better than it gets online.
          </h2>
          <div className="max-w-2xl text-slate-400 leading-relaxed space-y-4 text-sm">
            <p>
              Royal Birkdale is consistently ranked among the world's top five golf courses. Formby's
              red squirrel reserve draws visitors from across the country. Southport hosts world-class
              events and has a Victorian seafront that rivals anywhere in England. Yet online, the
              Sefton Coast is covered by generic aggregators, outdated directories, and tourist board
              content written for nobody in particular.
            </p>
            <p>
              The Sefton Coast Network exists to change that. Four independent editorial guides — each
              covering a specific audience, each built with genuine local knowledge, each maintained by
              people who actually know the places they write about.
            </p>
            <p>
              We are independent. We are not funded by local authorities or tourism boards. We earn
              revenue through affiliate commissions and featured listings — disclosed clearly on every
              site. Our editorial independence is non-negotiable.
            </p>
          </div>
        </div>
      </section>

      {/* The Network */}
      <section id="network" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-teal-400 tracking-widest uppercase mb-2 font-mono">The Network</p>
          <p className="text-sm text-slate-500 mb-12">Four properties · One geography</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SITES.map((site) => (
              <Link
                key={site.domain}
                href={site.url}
                target="_blank"
                rel="noopener"
                className="group block bg-slate-900/60 border border-slate-800 hover:border-teal-700/50 rounded-xl p-6 transition-all hover:bg-slate-900"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-mono text-slate-600">{site.number}</span>
                  <span className="text-xl">{site.emoji}</span>
                </div>
                <h3 className="text-white font-semibold mb-1 group-hover:text-teal-300 transition-colors">
                  {site.name}
                </h3>
                <p className="text-xs text-teal-500 mb-3 font-mono">{site.domain}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{site.description}</p>
                <div className="flex flex-wrap gap-2">
                  {site.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-teal-500 text-xs mt-4 group-hover:text-teal-300 transition-colors">
                  Visit ↗
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What we stand for */}
      <section className="py-20 px-6 bg-slate-900/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-12">What we stand for</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PILLARS.map((p) => (
              <div key={p.number}>
                <p className="text-xs font-mono text-slate-600 mb-3">{p.number}</p>
                <h3 className="text-white font-semibold mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work with us */}
      <section id="work-with-us" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3">Work with the network</h2>
          <p className="text-slate-400 text-sm mb-8 max-w-lg">
            We work with local businesses, tourism organisations, and partners who share our
            commitment to the Sefton Coast. Featured listings, partnership opportunities, press
            enquiries, and everything in between.
          </p>
          <a
            href="mailto:hello@seftoncoast.network"
            className="text-teal-400 hover:text-teal-300 text-sm font-mono transition-colors block mb-8"
          >
            hello@seftoncoast.network
          </a>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Sefton Coast Network. Published by Churchtown Media Ltd.</p>
          <div className="flex gap-6">
            {SITES.map((s) => (
              <Link
                key={s.domain}
                href={s.url}
                target="_blank"
                rel="noopener"
                className="hover:text-slate-400 transition-colors"
              >
                {s.domain}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
