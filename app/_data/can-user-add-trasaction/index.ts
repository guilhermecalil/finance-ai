import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrenceMonthTransactions } from "../get-current-month-transactions";

export const canUserAddTransaction = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado!");
  }

  const user = await clerkClient().users.getUser(userId);
  if (
    user.publicMetadata.subscriptionPlan === "premium" ||
    user.publicMetadata.subscriptionPlan === "essencial" ||
    user.publicMetadata.subscriptionPlan === "elite"
  ) {
    return true;
  }

  const currentMonthTransactions = await getCurrenceMonthTransactions();
  if (currentMonthTransactions >= 10) {
    return false;
  }

  return true;
};
