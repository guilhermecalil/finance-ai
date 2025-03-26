"use client";

import { Button } from "@/app/_components/ui/button";
import { useUser } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";

const AcquirePlanButton = ({
  planType,
}: {
  planType: "premium" | "elite" | "essencial";
}) => {
  const { user } = useUser();

  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout(planType);

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key not found");
    }

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );

    if (!stripe) {
      throw new Error("Stripe not found");
    }

    await stripe.redirectToCheckout({ sessionId });
  };

  // Verifica se o usuário tem o plano correspondente ao botão
  const hasThisPlan = user?.publicMetadata.subscriptionPlan === planType;

  if (hasThisPlan) {
    return (
      <Button className="w-full rounded-full font-bold" variant="link">
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
        >
          Gerenciar plano
        </Link>
      </Button>
    );
  }

  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlanClick}
    >
      Adquirir plano
    </Button>
  );
};

export default AcquirePlanButton;
