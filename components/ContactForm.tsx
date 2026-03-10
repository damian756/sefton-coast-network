"use client";

import { useState } from "react";

const ENQUIRY_TYPES = [
  "Featured listing",
  "Partnership opportunity",
  "Press or media",
  "Advertising",
  "General enquiry",
];

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", enquiryType: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", enquiryType: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="text-emerald-400 text-sm">
        Thanks. We will be in touch at {form.email || "your email"}.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="bg-slate-800 border border-slate-700 rounded px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
        />
        <input
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="bg-slate-800 border border-slate-700 rounded px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
        />
      </div>
      <select
        value={form.enquiryType}
        onChange={(e) => setForm({ ...form, enquiryType: e.target.value })}
        className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
      >
        <option value="">Enquiry type</option>
        {ENQUIRY_TYPES.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <textarea
        placeholder="Your message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        required
        rows={4}
        className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 resize-none"
      />
      {status === "error" && (
        <p className="text-red-400 text-sm">Something went wrong. Try emailing hello@seftoncoast.network directly.</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white text-sm font-medium px-6 py-2.5 rounded transition-colors"
      >
        {status === "sending" ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
