import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import {
  ENQUIRY_TYPES,
  DEFAULT_ENQUIRY_TYPE,
  isValidEmail,
  buildEnquiryEmail,
  logSendError,
} from "@/lib/contact";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;
    // The home page form sends `type`; ContactForm sends `enquiryType`. Accept both.
    const rawType = body.enquiryType ?? body.type;
    const enquiryType: string = (ENQUIRY_TYPES as readonly string[]).includes(rawType)
      ? rawType
      : DEFAULT_ENQUIRY_TYPE;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    await prisma.enquiry.create({
      data: { name, email, enquiryType, message },
    });

    // The enquiry is stored above, so a failed email never fails the visitor.
    const resend = getResend();
    if (resend) {
      try {
        const { error } = await resend.emails.send(
          buildEnquiryEmail({ name, email, type: enquiryType, message }),
        );
        if (error) logSendError(error);
      } catch (err) {
        logSendError(err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send enquiry" }, { status: 500 });
  }
}
