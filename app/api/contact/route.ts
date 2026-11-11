import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { ENQUIRY_EMAIL, ENQUIRY_TYPES, DEFAULT_ENQUIRY_TYPE } from "@/lib/contact";

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

    await prisma.enquiry.create({
      data: { name, email, enquiryType, message },
    });

    const resend = getResend();
    if (resend) {
      await resend.emails.send({
        from: "Sefton Coast Network <hello@seftoncoast.network>",
        to: [ENQUIRY_EMAIL],
        subject: `New enquiry: ${enquiryType} from ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Type:</strong> ${enquiryType}</p><p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send enquiry" }, { status: 500 });
  }
}
