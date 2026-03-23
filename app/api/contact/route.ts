import { NextResponse } from "next/server";

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  const body = (await req.json()) as ContactBody;
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { success: false, error: "All fields are required." },
      { status: 400 },
    );
  }

  if (subject.length < 3) {
    return NextResponse.json(
      { success: false, error: "Subject should be at least 3 characters long." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { success: false, error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  if (message.length < 15) {
    return NextResponse.json(
      { success: false, error: "Message should be at least 15 characters long." },
      { status: 400 },
    );
  }

  // In production, store in MongoDB and/or send via provider like Resend/Nodemailer.
  await new Promise((resolve) => setTimeout(resolve, 400));

  return NextResponse.json({ success: true, message: "Message sent successfully." });
}
