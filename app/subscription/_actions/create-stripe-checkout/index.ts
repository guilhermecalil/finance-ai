"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import Stripe from "stripe";

export const createStripeCheckout = async (
  planType: "premium" | "elite" | "essencial",
) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado");
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-02-24.acacia",
  });

  const planPrices: Record<string, string | undefined> = {
    premium: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
    elite: process.env.STRIPE_ELITE_PLAN_PRICE_ID,
    essencial: process.env.STRIPE_ESSENCIAL_PLAN_PRICE_ID,
  };

  const selectedPlanPriceId = planPrices[planType];

  if (!selectedPlanPriceId) {
    throw new Error("Plano inválido");
  }

  const sessionStripe = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: process.env.APP_URL,
    cancel_url: process.env.APP_URL,
    subscription_data: {
      metadata: {
        user_id: session.user.id,
      },
    },
    line_items: [
      {
        price: selectedPlanPriceId,
        quantity: 1,
      },
    ],
  });

  return { sessionId: sessionStripe.id };
};
