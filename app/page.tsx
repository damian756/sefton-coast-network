"use client";

import { useState, FormEvent } from "react";

const SITES = [
  {
    number: "01",
    emoji: "🌊",
    name: "SouthportGuide",
    domain: "southportguide.co.uk",
    url: "https://www.southportguide.co.uk",
    description:
      "The definitive visitor guide to Southport — hotels, restaurants, events, things to do, and everything you need to plan a trip to one of England's great seaside towns. Home of The Open Championship 2026 hub.",
    tags: ["Tourism", "Events", "Accommodation", "The Open 2026"],
  },
  {
    number: "02",
    emoji: "🐿️",
    name: "FormbyGuide",
    domain: "formbyguide.co.uk",
    url: "https://www.formbyguide.co.uk",
    description:
      "Your complete guide to Formby — the National Trust pinewoods, red squirrel reserve, Formby Beach, the village, and the best places to eat. Everything a day tripper or weekend visitor needs, from a local who knows it.",
    tags: ["Nature", "Red Squirrels", "Beach", "Village"],
  },
  {
    number: "03",
    emoji: "⛳",
    name: "SeftonLinks",
    domain: "seftonlinks.com",
    url: "https://www.seftonlinks.com",
    description:
      "The world's greatest links golf corridor — six championship courses within ten miles of coastline. Course guides, conditions, tee time policies, golf break itineraries, and The Open 2026 at Royal Birkdale. Available in 20 languages.",
    tags: ["Golf Tourism", "Royal Birkdale", "Multilingual", "The Open"],
  },
  {
    number: "04",
    emoji: "🦜",
    name: "Sefton Coast Wildlife",
    domain: "seftoncoastwildlife.co.uk",
    url: "https://seftoncoastwildlife.co.uk",
    description:
      "Species guides, birdwatching, seasonal wildlife, and the best reserves on the Sefton Coast — including Marshside RSPB. Practical information for wildlife spotters, photographers, and anyone who wants to know what they're looking at.",
    tags: ["Wildlife", "Birdwatching", "RSPB", "Species Guides"],
  },
];

const VALUES = [
  {
    num: "01",
    title: "Independent",
    text: "No tourist board funding. No sponsored editorial. Revenue comes from affiliate commissions and featured listings — always disclosed. Our opinions are our own.",
  },
  {
    num: "02",
    title: "Local",
    text: "Written by people who live here. Not content farms. Not AI-generated listicles. Genuine knowledge of places we visit regularly and care about.",
  },
  {
    num: "03",
    title: "Useful",
    text: "Built for the visitor making a decision — where to stay, where to eat, when to go, what to expect. Practical first, inspirational second.",
  },
  {
    num: "04",
    title: "Ambitious",
    text: "The Sefton Coast is world-class. Royal Birkdale. Red squirrels. A Victorian seafront. We're building guides worthy of the places they cover.",
  },
];

export default function HomePage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          type: data.get("type"),
          message: data.get("message"),
        }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <header>
        <a href="/" className="logo">Sefton<span>Coast</span>.network</a>
        <nav>
          <a href="#mission">About</a>
          <a href="#sites">Our Sites</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag">Sefton Coast · Merseyside · England</div>
          <h1>
            Four guides.<br />
            <em>One coastline.</em><br />
            Properly covered.
          </h1>
          <p className="hero-body">
            Independent editorial guides to Southport, Formby, links golf, and the wildlife of the
            Sefton Coast. Built for visitors who want to make the most of one of England's most
            underrated stretches of coastline.
          </p>
          <a href="#sites" className="hero-cta">
            Explore the Network
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
        <div className="hero-right">
          <div className="coordinate-grid" />
          <div className="geo-text">
            <div className="geo-coords">53.6451° N, 3.0067° W</div>
            <div className="geo-name">Sefton<br />Coast</div>
          </div>
          <div className="stat-pills">
            <div className="stat-pill">
              <span className="stat-pill-num">4</span>
              <span className="stat-pill-label">Independent Guides</span>
            </div>
            <div className="stat-pill">
              <span className="stat-pill-num">22mi</span>
              <span className="stat-pill-label">Of Coastline</span>
            </div>
            <div className="stat-pill">
              <span className="stat-pill-num">2026</span>
              <span className="stat-pill-label">The Open Returns</span>
            </div>
          </div>
          <svg className="coastline-svg" viewBox="0 0 800 200" preserveAspectRatio="none">
            <path d="M0,120 C50,90 100,140 180,110 C240,85 280,130 360,100 C420,75 480,125 560,95 C620,70 680,115 800,85 L800,200 L0,200 Z" fill="rgba(168,196,204,0.3)" />
            <path d="M0,150 C60,120 130,160 200,135 C270,110 320,155 400,125 C460,100 530,145 610,115 C670,90 730,130 800,105 L800,200 L0,200 Z" fill="rgba(61,107,122,0.2)" />
          </svg>
        </div>
      </section>

      {/* MISSION */}
      <section className="mission" id="mission">
        <div className="mission-label">Our Purpose</div>
        <div className="mission-text">
          <h2>The Sefton Coast deserves <strong>better than it gets</strong> online.</h2>
          <p>
            Royal Birkdale is consistently ranked among the world's top five golf courses. Formby's
            red squirrel reserve draws visitors from across the country. Southport hosts world-class
            events and has a Victorian seafront that rivals anywhere in England. Yet online, the
            Sefton Coast is covered by generic aggregators, outdated directories, and tourist board
            content written for nobody in particular.
          </p>
          <p>
            The Sefton Coast Network exists to change that. Four independent editorial guides, each
            covering a specific audience, each built with genuine local knowledge, each maintained by
            people who actually know the places they write about.
          </p>
          <p>
            We are independent. We are not funded by local authorities or tourism boards. We earn
            revenue through affiliate commissions and featured listings, disclosed clearly on every
            site. Our editorial independence is non-negotiable.
          </p>
        </div>
      </section>

      {/* SITES */}
      <section className="sites" id="sites">
        <div className="sites-header">
          <h2>The Network</h2>
          <span>Four properties · One geography</span>
        </div>
        <div className="sites-grid">
          {SITES.map((site) => (
            <a
              key={site.domain}
              href={site.url}
              className="site-card"
              target="_blank"
              rel="noopener"
            >
              <div className="site-number">{site.number}</div>
              <span className="site-icon">{site.emoji}</span>
              <div className="site-name">{site.name}</div>
              <div className="site-domain">{site.domain}</div>
              <p className="site-desc">{site.description}</p>
              <div className="site-tags">
                {site.tags.map((tag) => (
                  <span key={tag} className="site-tag">{tag}</span>
                ))}
              </div>
              <span className="site-arrow">↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="values">
        <div className="values-header">
          <h2>What we stand for</h2>
        </div>
        <div className="values-grid">
          {VALUES.map((v) => (
            <div key={v.num} className="value-item">
              <div className="value-num">{v.num}</div>
              <div className="value-title">{v.title}</div>
              <p className="value-text">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="contact-left">
          <h2>Work with the network</h2>
          <p>
            We work with local businesses, tourism organisations, and partners who share our
            commitment to the Sefton Coast. Featured listings, partnership opportunities, press
            enquiries, and everything in between.
          </p>
          <a href="mailto:hello@seftoncoast.network" className="contact-email">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="3" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.25" />
              <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.25" />
            </svg>
            hello@seftoncoast.network
          </a>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" name="name" placeholder="Your name" required />
            <input type="email" name="email" placeholder="Email address" required />
          </div>
          <select name="type" defaultValue="">
            <option value="" disabled>Enquiry type</option>
            <option>Featured listing</option>
            <option>Partnership opportunity</option>
            <option>Press or media</option>
            <option>Advertising</option>
            <option>General enquiry</option>
          </select>
          <textarea name="message" placeholder="Tell us about your enquiry..." />
          <button
            type="submit"
            className="form-submit"
            disabled={status === "sending" || status === "sent"}
          >
            {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : status === "error" ? "Failed — try again" : "Send Enquiry →"}
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Sefton<span>Coast</span>.network</div>
        <div className="footer-links">
          {SITES.map((s) => (
            <a key={s.domain} href={s.url} target="_blank" rel="noopener">
              {s.name}
            </a>
          ))}
        </div>
        <div className="footer-copy">© {new Date().getFullYear()} Sefton Coast Network. Published by Churchtown Media Ltd.</div>
      </footer>
    </>
  );
}
