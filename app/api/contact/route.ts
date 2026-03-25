import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Message from "@/lib/models/Message";

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
  try {
    // Connect to MongoDB
    await connectDB();

    const body = (await req.json()) as ContactBody;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const subject = body.subject?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    // Save message to MongoDB
    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! ✨",
      messageId: newMessage._id,
      timestamp: newMessage.createdAt,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
