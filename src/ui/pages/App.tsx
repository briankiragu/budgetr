import TheNavbar from "@components/TheNavbar";
import ActualExpenses from "@components/cards/ActualExpenses";
import ActualIncome from "@components/cards/ActualIncome";
import ActualSavings from "@components/cards/ActualSavings";
import CreditStream from "@components/cards/CreditStream";
import ProjectedExpensesCard from "@components/cards/ProjectedExpensesCard";
import ProjectedIncomeCard from "@components/cards/ProjectedIncomeCard";
// import NewTransactionDialog from "@components/dialogs/NewTransactionDialog";
import ProjectedCreditDialog from "@components/dialogs/ProjectedCreditDialog";
import ProjectedDebitDialog from "@components/dialogs/ProjectedDebitDialog";
import TransactionsSheet from "@components/tables/TransactionSheet";
import useFinances from "@composables/useFinances";
import { ETransactionFrequencyPeriod, type IPeriod } from "@interfaces/budget";
import { endOfMonth, startOfMonth } from "date-fns";
import { type Component } from "solid-js";
import ActualPassiveIncome from "../components/cards/ActualPassiveIncome";

// Import the data.
import user from "../../data/users";

// Define the period.
const period: IPeriod = {
  range: ETransactionFrequencyPeriod.MONTH,
  start: startOfMonth(new Date()),
  end: endOfMonth(new Date()),
};

// Create a user finances object.
const {
  totalProjectedCredits,
  totalProjectedDebits,
  totalActualCredits,
  totalActualDebits,
  creditStreams,
  creditTransactions,
  debitTransactions,
} = useFinances(user.budget, period);

const App: Component = () => {
  return (
    <>
      {/* Navigation bar */}
      <header class="sticky top-0 z-10">
        <TheNavbar />
      </header>

      {/* Main content */}
      <main class="flex flex-col gap-8 py-6 px-8 lg:gap-6">
        {/* At a glance */}
        <section class="flex flex-col gap-6 lg:gap-8">
          <h1 class="text-gray-800 text-6xl font-black dark:text-white">
            This month
          </h1>

          <div class="grid grid-cols-1 gap-4 items-stretch md:grid-cols-4 md:gap-6">
            <div class="col-span-1 grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2 md:gap-6">
              <hr class="my-2 md:hidden dark:border-rose-500" />
              {/* Projected Income */}
              <ProjectedIncomeCard income={totalProjectedCredits} />

              {/* Projected Expenses */}
              <ProjectedExpensesCard
                income={totalProjectedCredits}
                expenses={totalProjectedDebits}
              />
              <hr class="md:hidden dark:border-rose-500" />

              {/* Actual Income */}
              <ActualIncome
                projected={totalProjectedCredits}
                actual={totalActualCredits}
              />

              {/* Actual Expenses */}
              <ActualExpenses
                projected={totalProjectedCredits}
                income={totalActualCredits}
                actual={totalActualDebits}
              />
              <hr class="md:hidden dark:border-rose-500" />
            </div>

            {/* Actual Savings */}
            <div class="col-span-1">
              <ActualSavings
                totalCredits={totalActualCredits}
                totalDebits={totalActualDebits}
                debitTransactions={debitTransactions}
              />
            </div>

            {/* Actual Investments */}
            <div class="col-span-1">
              <ActualPassiveIncome
                totalCredits={totalActualCredits}
                creditTransactions={creditTransactions}
              />
            </div>
          </div>

          {/* Income streams */}
          <section class="flex flex-col gap-2">
            <h1 class="text-4xl dark:text-white text-gray-800 font-extrabold tracking-tight">
              Income Streams
            </h1>

            <div class="grid grid-cols-1 gap-5 md:grid-cols-5">
              {creditStreams.map((stream) => (
                <div class="col-span-1">
                  <CreditStream stream={stream} />
                </div>
              ))}
            </div>
          </section>
        </section>
        <hr class="dark:border-rose-500" />

        {/* Reports */}
        <section class="flex flex-col gap-8">
          {/* Transactions */}
          <section class="flex flex-col gap-4">
            <div class="flex justify-between items-center">
              <h2 class="text-5xl dark:text-white text-gray-800 font-extrabold tracking-tight">
                Transactions
              </h2>

              {/* Transaction actions */}
              <div class="fixed bottom-4 right-4 flex flex-col gap-1 md:static md:flex-row md:gap-2">
                <ProjectedCreditDialog natures={user.config.natures.credit} />
                <ProjectedDebitDialog
                  natures={user.config.natures.debit}
                  credits={user.budget.credits}
                />
                {/* <NewTransactionDialog
              streams={projectedIncome}
              expenses={projectedExpenses}
              client:visible
            /> */}
              </div>
            </div>

            {/* List all transactions */}
            <div class="rounded-xl bg-gray-100 dark:bg-gray-700 p-4">
              <TransactionsSheet
                transactions={[...creditTransactions, ...debitTransactions]}
              />
            </div>
          </section>
        </section>
      </main>
    </>
  );
};

export default App;
