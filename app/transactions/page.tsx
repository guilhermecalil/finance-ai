import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { DataTable } from "../_components/ui/data-table";
import { canUserAddTransaction } from "../_data/can-user-add-trasaction";
import { db } from "../_lib/prisma";
import { transactionColumns } from "./_columns";

const TransactionsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });

  const userCanAddTransaction = await canUserAddTransaction();

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 p-6">
        {/* TÍTULO E BOTÃO */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        </div>

        {/* Contêiner para rolagem horizontal com width ajustado */}
        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            {" "}
            {/* Definindo a largura mínima da tabela */}
            <DataTable
              columns={transactionColumns}
              data={JSON.parse(JSON.stringify(transactions))}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionsPage;
