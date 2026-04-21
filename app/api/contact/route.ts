import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

const turnstileToken = formData.get("cf-turnstile-response");

const verify = await fetch(
  "https://challenges.cloudflare.com/turnstile/v0/siteverify",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY!,
      response: turnstileToken as string,
    }),
  }
);

const result = await verify.json();

if (!result.success) {
  return new Response("Bot detected", { status: 403 });
}

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "joey.r.jordan@live.com",
      subject: `New Arcade Inquiry from ${name}`,
      replyTo: email as string,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    return new Response("Success", { status: 200 });
  } catch (error) {
    return new Response("Error sending email", { status: 500 });
  }
}