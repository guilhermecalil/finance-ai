import { auth, clerkClient } from "@clerk/nextjs/server";
import { isMatch } from "date-fns";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import { canUserAddTransaction } from "../_data/can-user-add-trasaction";
import { getDashboard } from "../_data/get-dashboard";
import AiReportButton from "./_components/ai-report-button";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import TransactionPieChart from "./_components/transaction-pie-chart";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }

  const dashboard = await getDashboard(month);
  const userCanAddTransaction = await canUserAddTransaction();
  const user = await clerkClient().users.getUser(userId);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen w-full flex-col gap-6 p-4 md:p-6">
        {/* HEADER */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h1 className="text-xl font-bold md:text-2xl">Dashboard</h1>
          <div className="flex flex-wrap items-center gap-3">
            <AiReportButton
              month={month}
              hasPremiumPlan={
                user.publicMetadata.subscriptionPlan === "premium"
              }
            />
            <TimeSelect />
          </div>
        </div>

        {/* CONTEÚDO DO DASHBOARD */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-6">
            {/* Cards de Receita, Investido, Despesas */}
            <SummaryCards
              month={month}
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />

            {/* GRÁFICOS - RESPONSIVO */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="w-full">
                <TransactionPieChart {...dashboard} />
              </div>
              <div className="w-full">
                <ExpensesPerCategory
                  expensesPerCategory={dashboard.totalExpensePerCategory}
                />
              </div>
            </div>
          </div>

          {/* ÚLTIMAS TRANSAÇÕES */}
          <div className="w-full pb-10">
            <LastTransactions lastTransactions={dashboard.lastTransactions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
