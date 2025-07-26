import { db } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.error();
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.error();
  }

  const text = await request.text();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-02-24.acacia",
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Erro no webhook:", err);
    return NextResponse.error();
  }

  switch (event.type) {
    case "invoice.paid": {
      const { customer, subscription } = event.data.object;
      const subscriptionId =
        typeof subscription === "string" ? subscription : subscription?.id;

      if (!subscriptionId) return NextResponse.error();

      const subscriptionDetails =
        await stripe.subscriptions.retrieve(subscriptionId);
      const userId = subscriptionDetails.metadata?.user_id;

      if (!userId) return NextResponse.error();

      const priceId = subscriptionDetails.items.data[0]?.price.id;

      let subscriptionPlan = null;
      if (priceId === process.env.STRIPE_PREMIUM_PLAN_PRICE_ID) {
        subscriptionPlan = "premium";
      } else if (priceId === process.env.STRIPE_ELITE_PLAN_PRICE_ID) {
        subscriptionPlan = "elite";
      } else if (priceId === process.env.STRIPE_ESSENCIAL_PLAN_PRICE_ID) {
        subscriptionPlan = "essencial";
      }

      await db.user.update({
        where: { id: userId },
        data: {
          stripeCustomerId:
            typeof customer === "string" ? customer : customer?.id,
          stripeSubscriptionId: subscriptionId,
          subscriptionPlan,
        },
      });

      break;
    }

    case "customer.subscription.deleted": {
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id,
      );

      const userId = subscription.metadata?.user_id;
      if (!userId) return NextResponse.error();

      await db.user.update({
        where: { id: userId },
        data: {
          stripeCustomerId: null,
          stripeSubscriptionId: null,
          subscriptionPlan: null,
        },
      });

      break;
    }
  }

  return NextResponse.json({ received: true });
};
