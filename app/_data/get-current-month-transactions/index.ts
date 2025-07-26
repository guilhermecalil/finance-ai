import { db } from "@/app/_lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { endOfMonth, startOfMonth } from "date-fns";
import { getServerSession } from "next-auth";

export const getCurrenceMonthTransactions = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Usuário não encontrado!");
  }

  return db.transaction.count({
    where: {
      userId: session.user.id,
      createdAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  });
};
