"use server";

import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

export const createStripeCheckout = async (
  planType: "premium" | "elite" | "essencial",
) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });

  // Mapeia o plano selecionado para o ID correto
  const planPrices: Record<string, string | undefined> = {
    premium: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
    elite: process.env.STRIPE_ELITE_PLAN_PRICE_ID,
    essencial: process.env.STRIPE_ESSENCIAL_PLAN_PRICE_ID,
  };

  const selectedPlanPriceId = planPrices[planType];

  if (!selectedPlanPriceId) {
    throw new Error("Plano inválido");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: process.env.APP_URL,
    cancel_url: process.env.APP_URL,
    subscription_data: {
      metadata: {
        clerk_user_id: userId,
      },
    },
    line_items: [
      {
        price: selectedPlanPriceId,
        quantity: 1,
      },
    ],
  });

  return { sessionId: session.id };
};
