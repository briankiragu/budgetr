import TheNavbar from "@components/TheNavbar";
import ActualExpensesCard from "@components/cards/ActualExpensesCard";
import ActualIncomeCard from "@components/cards/ActualIncomeCard";
import ActualPassiveIncomeCard from "@components/cards/ActualPassiveIncomeCard";
import ActualSavingsCard from "@components/cards/ActualSavingsCard";
import CreditStreamCard from "@components/cards/CreditStreamCard";
import ProjectedExpensesCard from "@components/cards/ProjectedExpensesCard";
import ProjectedIncomeCard from "@components/cards/ProjectedIncomeCard";
import NewProjectedCreditDialog from "@components/dialogs/NewProjectedCreditDialog";
import NewTransactionDialog from "@components/dialogs/NewTransactionDialog";
import TransactionsSheet from "@components/tables/TransactionSheet";
import useFirestore from "@composables/firebase/useFirestore";
import useFinances from "@composables/useFinances";
import {
  ETransactionFrequencyPeriod,
  type IFinances,
  type IPeriod,
  type IProjectedCredit,
  type ITransaction,
} from "@interfaces/budget";
import type { IUser } from "@interfaces/user";
import { DEFAULT_USER_ID } from "@lib/constants";
import { endOfMonth, startOfMonth } from "date-fns";
import {
  Show,
  createEffect,
  createResource,
  createSignal,
  type Component,
} from "solid-js";
import { createStore } from "solid-js/store";
// import ProjectedDebitDialog from "@components/dialogs/ProjectedDebitDialog";

const App: Component = () => {
  // Extract the firestore functions.
  const { addProjectedCredit, addTransaction, getUser, updateOrCreateUser } =
    useFirestore();

  // Define the period.
  const [period] = createStore<IPeriod>({
    range: ETransactionFrequencyPeriod.MONTH,
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  });

  // Define the user.
  const [userId] = createSignal<string | undefined>(DEFAULT_USER_ID);
  const [user, { refetch }] = createResource(userId, getUser);

  // Define the user finances.
  const [finances, setFinances] = createStore<IFinances>({
    projectedCredits: [],
    projectedDebits: [],
    totalProjectedCredits: 0,
    totalProjectedDebits: 0,
    totalActualCredits: 0,
    totalActualDebits: 0,
    creditTransactions: [],
    debitTransactions: [],
    creditStreams: [],
    debitStreams: [],
  });

  const createProjectedCredit = async (
    credit: IProjectedCredit,
  ): Promise<void> => {
    if (userId()) {
      addProjectedCredit(userId()!, credit);

      // Refetch the user data.
      refetch();
    }
  };

  const updateProjectedCredit = async (
    credit: IProjectedCredit,
  ): Promise<void> => {
    if (user()) {
      // From the user object, replace the edited credit.
      const credits: IProjectedCredit[] = [
        ...(user()!.budget.credits.filter((crdt) => crdt.uid !== credit.uid) ||
          []),
        credit,
      ];

      // Add it back to the user.
      const updatedUser: IUser = {
        username: user()!.username,
        config: user()!.config,
        budget: { ...user()!.budget, credits },
      };

      // Make the request to Firebase.
      updateOrCreateUser(updatedUser, userId());

      // Refetch the user data.
      refetch();
    }
  };

  const createNewTransaction = async (txn: ITransaction): Promise<void> => {
    if (userId()) {
      addTransaction(userId()!, txn);

      // Refetch the user data.
      refetch();
    }
  };

  const updateTransaction = async (
    transaction: ITransaction,
  ): Promise<void> => {
    if (user()) {
      // From the user object, replace the edited transaction.
      const transactions: ITransaction[] = [
        ...(user()!.budget.transactions.filter(
          (txn) => txn.uid !== transaction.uid,
        ) || []),
        transaction,
      ];

      // Add it back to the user.
      const updatedUser: IUser = {
        username: user()!.username,
        config: user()!.config,
        budget: { ...user()!.budget, transactions },
      };

      // Make the request to Firebase.
      updateOrCreateUser(updatedUser, userId());

      // Refetch the user data.
      refetch();
    }
  };

  createEffect(() => {
    if (!user.loading) {
      setFinances(useFinances({ period, user: user() }));
    }
  });

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
              <ProjectedIncomeCard income={finances.totalProjectedCredits} />

              {/* Projected Expenses */}
              <ProjectedExpensesCard
                income={finances.totalProjectedCredits}
                expenses={finances.totalProjectedDebits}
              />
              <hr class="md:hidden dark:border-rose-500" />

              {/* Actual Income */}
              <ActualIncomeCard
                projected={finances.totalProjectedCredits}
                actual={finances.totalActualCredits}
              />

              {/* Actual Expenses */}
              <ActualExpensesCard
                projected={finances.totalProjectedCredits}
                income={finances.totalActualCredits}
                actual={finances.totalActualDebits}
              />
              <hr class="md:hidden dark:border-rose-500" />
            </div>

            {/* Actual Savings */}
            <div class="col-span-1">
              <ActualSavingsCard
                totalCredits={finances.totalActualCredits}
                totalDebits={finances.totalActualDebits}
                debitTransactions={finances.debitTransactions}
              />
            </div>

            {/* Actual Investments */}
            <div class="col-span-1">
              <ActualPassiveIncomeCard
                totalCredits={finances.totalActualCredits}
                creditTransactions={finances.creditTransactions}
              />
            </div>
          </div>

          {/* Income streams */}
          <div class="lg:min-h-52 flex flex-col gap-2">
            <h1 class="text-4xl dark:text-white text-gray-800 font-extrabold tracking-tight">
              Income Streams
            </h1>

            <div class="grid grid-cols-1 gap-5 md:grid-cols-5">
              {finances.creditStreams.map((stream) => (
                <div class="col-span-1">
                  <CreditStreamCard
                    stream={stream}
                    natures={user()?.config.natures.credit}
                    submitHandler={updateProjectedCredit}
                  />
                </div>
              ))}

              {/* New Projected Income Trigger & Dialog*/}
              <NewProjectedCreditDialog
                natures={user()?.config.natures.credit}
                submitHandler={createProjectedCredit}
              />
            </div>
          </div>
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
                {/* <ProjectedDebitDialog
                  natures={user()?.config.natures.debit}
                  credits={user()?.budget.credits}
                /> */}
                <Show when={user()}>
                  <NewTransactionDialog
                    natures={user()!.config.natures}
                    credits={finances.projectedCredits}
                    debits={finances.projectedDebits}
                    submitHandler={createNewTransaction}
                  />
                </Show>
              </div>
            </div>

            {/* List all transactions */}
            <div class="rounded-xl bg-gray-100 dark:bg-gray-800 p-4">
              <TransactionsSheet
                natures={user()!.config.natures}
                credits={finances.projectedCredits}
                debits={finances.projectedDebits}
                transactions={[
                  ...(finances.creditTransactions ?? []),
                  ...(finances.debitTransactions ?? []),
                ]}
                submitHandler={updateTransaction}
              />
            </div>
          </section>
        </section>
      </main>
    </>
  );
};

export default App;
