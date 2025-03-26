import { clerkClient } from "@clerk/nextjs/server";
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
    apiVersion: "2024-10-28.acacia",
  });

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  switch (event.type) {
    case "invoice.paid": {
      const { customer, subscription } = event.data.object;

      // Garantir que subscription seja uma string (ID)
      const subscriptionId =
        typeof subscription === "string" ? subscription : subscription?.id;

      if (!subscriptionId) {
        return NextResponse.error();
      }

      // Buscar detalhes da assinatura no Stripe
      const subscriptionDetails =
        await stripe.subscriptions.retrieve(subscriptionId);

      const clerkUserId = subscriptionDetails.metadata?.clerk_user_id;
      if (!clerkUserId) {
        return NextResponse.error();
      }

      // Pegando o plano adquirido
      const priceId = subscriptionDetails.items.data[0]?.price.id;

      let subscriptionPlan = null; // Padrão para evitar erro

      if (priceId === process.env.STRIPE_PREMIUM_PLAN_PRICE_ID) {
        subscriptionPlan = "premium";
      } else if (priceId === process.env.STRIPE_ELITE_PLAN_PRICE_ID) {
        subscriptionPlan = "elite";
      } else if (priceId === process.env.STRIPE_ESSENCIAL_PLAN_PRICE_ID) {
        subscriptionPlan = "essencial";
      }

      await clerkClient.users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: customer,
          stripeSubscriptionId: subscriptionId, // Agora garantido como string
        },
        publicMetadata: {
          subscriptionPlan,
        },
      });

      break;
    }

    case "customer.subscription.deleted": {
      // Remover plano do usuário
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id,
      );

      const clerkUserId = subscription.metadata?.clerk_user_id;
      if (!clerkUserId) {
        return NextResponse.error();
      }

      await clerkClient.users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: null,
          stripeSubscriptionId: null,
        },
        publicMetadata: {
          subscriptionPlan: null,
        },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
};
