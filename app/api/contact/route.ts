import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, enquiryType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await prisma.enquiry.create({
      data: { name, email, enquiryType: enquiryType ?? "General enquiry", message },
    });

    const resend = getResend();
    if (resend) {
      await resend.emails.send({
        from: "Sefton Coast Network <hello@seftoncoast.network>",
        to: ["hello@seftoncoast.network"],
        subject: `New enquiry: ${enquiryType ?? "General"} from ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Type:</strong> ${enquiryType}</p><p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send enquiry" }, { status: 500 });
  }
}
