import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { getCurrenceMonthTransactions } from "../get-current-month-transactions";

export const canUserAddTransaction = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado!");
  }

  const plan = session.user.subscriptionPlan ?? "free";

  // Verifica plano
  if (["premium", "essencial", "elite"].includes(plan)) {
    return true;
  }

  const currentMonthTransactions = await getCurrenceMonthTransactions();
  if (currentMonthTransactions >= 10) {
    return false;
  }

  return true;
};
