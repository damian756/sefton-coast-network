// What a visitor sees on the site (mailto links, printed address). Changing the
// public address is this one line.
export const DISPLAY_EMAIL = "hello@seftoncoast.network";

// Where every enquiry form delivers (the `to`). Damian, 11 Nov 2026: one inbox
// for the Churchtown Media site and all five Sefton Coast sites.
export const DELIVERY_EMAIL = "damian@churchtownmedia.co.uk";

export const ENQUIRY_TYPES = [
  "Featured listing",
  "Partnership opportunity",
  "Press or media",
  "Advertising",
  "General enquiry",
] as const;

export const DEFAULT_ENQUIRY_TYPE = "General enquiry";

// Sender. seftoncoast.network has no Resend DNS records yet, so mail sent FROM it
// fails. Southport Guide's domain is verified in Resend, so we send from its
// noreply address. Change this back to hello@seftoncoast.network once
// seftoncoast.network is verified in Resend.
export const FROM_EMAIL = "Sefton Coast Network <noreply@southportguide.co.uk>";

const EMAIL_RE = /^[^\s@<>,]+@[^\s@<>,]+\.[^\s@<>,]+$/;

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && EMAIL_RE.test(value);
}

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const oneLine = (value: unknown) => String(value ?? "").replace(/[\r\n]+/g, " ");

export function buildEnquiryEmail(input: {
  name: string;
  email: string;
  type: string;
  message: string;
}) {
  return {
    from: FROM_EMAIL,
    to: [DELIVERY_EMAIL],
    replyTo: isValidEmail(input.email) ? input.email : undefined,
    subject: `New enquiry: ${oneLine(input.type)} from ${oneLine(input.name)}`,
    html:
      `<p><strong>Name:</strong> ${escapeHtml(input.name)}</p>` +
      `<p><strong>Email:</strong> ${escapeHtml(input.email)}</p>` +
      `<p><strong>Type:</strong> ${escapeHtml(input.type)}</p>` +
      `<p><strong>Message:</strong><br>${escapeHtml(input.message).replace(/\r?\n/g, "<br>")}</p>`,
  };
}

// Logs the error's name and message only: never the enquirer's details.
export function logSendError(error: unknown) {
  const e = (error ?? {}) as { name?: unknown; message?: unknown };
  console.error("Enquiry email failed:", String(e.name ?? "Error"), String(e.message ?? ""));
}
