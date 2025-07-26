import { isMatch } from "date-fns";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "app/api/auth/[...nextauth]/authOptions";
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
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }

  const dashboard = await getDashboard(month);
  const userCanAddTransaction = await canUserAddTransaction();

  const subscriptionPlan = session.user.subscriptionPlan ?? "free"; // <- Se você salvar isso no JWT/user

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen w-full flex-col gap-6 p-4 md:p-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h1 className="text-xl font-bold md:text-2xl">Dashboard</h1>
          <div className="flex flex-wrap items-center gap-3">
            <AiReportButton
              month={month}
              hasPremiumPlan={["premium", "elite", "essencial"].includes(
                subscriptionPlan,
              )}
            />
            <TimeSelect />
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-6">
            <SummaryCards
              month={month}
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />
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

          <div className="w-full pb-10">
            <LastTransactions lastTransactions={dashboard.lastTransactions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
