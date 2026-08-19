import { NextRequest, NextResponse } from "next/server";

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "eunyeon040321@gmail.com";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface NotifyOrderBody {
  customer: { name: string; email: string; phone: string; address: string };
  items: OrderItem[];
  totalPrice: number;
  currency: string;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Email service isn't configured yet — fail quietly so checkout still completes.
    return NextResponse.json(
      { ok: false, reason: "RESEND_API_KEY not configured" },
      { status: 200 }
    );
  }

  const body: NotifyOrderBody = await request.json();
  const { customer, items, totalPrice, currency } = body;
  const symbol = currency === "KRW" ? "₩" : "$";

  const itemLines = items
    .map(
      (item) =>
        `- ${item.name} × ${item.quantity} — ${symbol}${(item.price * item.quantity).toLocaleString("en-US")}`
    )
    .join("\n");

  const emailText = `New order received on eunyeon.

Customer: ${customer.name}
Email: ${customer.email}
Phone: ${customer.phone}
Address: ${customer.address}

Items:
${itemLines}

Total: ${symbol}${totalPrice.toLocaleString("en-US")}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "eunyeon Orders <onboarding@resend.dev>",
        to: [NOTIFY_EMAIL],
        subject: `New Order — ${symbol}${totalPrice.toLocaleString("en-US")}`,
        text: emailText,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ ok: false, reason: errText }, { status: 200 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, reason: String(error) },
      { status: 200 }
    );
  }
}
