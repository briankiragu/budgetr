// Import interfaces...
import type { Component } from 'solid-js';
import type {
  IExpensePeriod,
  IIncomeStream,
  IProjectedExpense,
  IProjectedIncome,
  ITransaction,
} from '@interfaces/budget';

// Import the SolidJS modules...
import { createSignal, createResource, lazy, For } from 'solid-js';

// Import the necessary composables...
import {
  addProjectedIncome,
  getActualExpenses,
  getActualIncome,
  getProjectedExpenses,
  getProjectedIncome,
} from '@composables/useData';

// Import the components...
const ProjectedIncomeDialog = lazy(
  async () => await import('@components/dialogs/ProjectedIncomeDialog')
);
const ProjectedExpenseDialog = lazy(
  async () => await import('@components/dialogs/ProjectedExpenseDialog')
);
const TransactionDialog = lazy(
  async () => await import('@components/dialogs/TransactionDialog')
);
const ProjectedIncome = lazy(
  async () => await import('@components/cards/ProjectedIncome')
);
const ProjectedExpenses = lazy(
  async () => await import('@components/cards/ProjectedExpenses')
);
const ActualIncome = lazy(
  async () => await import('@components/cards/ActualIncome')
);
const ActualExpenses = lazy(
  async () => await import('@components/cards/ActualExpenses')
);
const ActualInvestments = lazy(
  async () => await import('@components/cards/ActualInvestments')
);
const ActualSavings = lazy(
  async () => await import('@components/cards/ActualSavings')
);
const IncomeStream = lazy(
  async () => await import('@components/cards/IncomeStream')
);
const TransactionsSheet = lazy(
  async () => await import('@components/tables/TransactionsSheet')
);

// Define the dashboard component.
const Dashboard: Component = () => {
  // Create a single to store the user ID.
  const [userId] = createSignal('chariskiragu');

  // Define the period.
  const [period] = createSignal<IExpensePeriod>({
    range: 'monthly',
    start: new Date('2023-02-01'),
    end: new Date('2023-03-31'),
  });

  // Create a resource to handle the projected and actual income.
  const [projectedIncome] = createResource<IProjectedIncome[]>(
    userId,
    getProjectedIncome
  );

  // Create a resource to handle the projected and actual income.
  const [projectedExpenses] = createResource<IProjectedExpense[]>(
    userId,
    getProjectedExpenses
  );

  // Create a resource to handle the projected and actual income.
  const [income] = createResource<ITransaction[]>(userId, getActualIncome);

  // Create a resource to handle the projected and actual income.
  const [expenses] = createResource<ITransaction[]>(userId, getActualExpenses);

  // Calculate the total projected income.
  const totalProjectedIncome = (): number =>
    projectedIncome().reduce((acc, stream) => acc + stream.amount, 0);

  // Calculate the total projected expenses.
  const totalProjectedExpenses = (): number =>
    projectedExpenses().reduce((acc, expense) => {
      if (expense.type === 'percentage') {
        return acc + totalProjectedIncome() * (expense.amount / 100);
      }
      return acc + expense.amount;
    }, 0);

  // Calculate the total actual income.
  const totalIncome = (): number =>
    income().reduce((acc, stream) => acc + stream.amount, 0);

  // Calculate the total actual expenses.
  const totalExpenses = (): number =>
    expenses().reduce((acc, expense) => acc + expense.amount, 0);

  // Get the list of projected income streams and their fulfillments
  // (whether they were received or not).
  const streams = (): IIncomeStream[] =>
    projectedIncome() !== undefined
      ? projectedIncome().map((stream) => ({
          projected: stream,
          // Check if it was fulfilled in the actual income transaction.
          actual:
            income() !== undefined
              ? income().filter((transaction) =>
                  transaction.refs?.includes(stream.uid)
                )
              : [],
        }))
      : [];

  const addIncome = async (data: IProjectedIncome): Promise<void> => {
    console.dir(data);
    // Add the projected income to the database.
    await addProjectedIncome(userId(), data);
  };

  // Define the dashboard component's template.
  return (
    <>
      {/* Summary */}
      <div>
        <h1 class="mb-6 text-gray-800 text-5xl font-extrabold">At a glance</h1>

        <section class="grid grid-cols-1 gap-4 items-stretch md:grid-cols-4 md:gap-6">
          <section class="col-span-1 grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2 md:gap-6">
            {/* Projected Income */}
            <ProjectedIncome
              period={period()}
              income={totalProjectedIncome()}
            />

            {/* Projected Expenses */}
            <ProjectedExpenses
              period={period()}
              income={totalProjectedIncome()}
              expenses={totalProjectedExpenses()}
            />
            <hr class="block md:hidden my-2" />

            {/* Actual Income */}
            <ActualIncome
              period={period()}
              projected={totalProjectedIncome()}
              actual={totalIncome()}
            />

            {/* Actual Expenses */}
            <ActualExpenses
              period={period()}
              income={totalIncome()}
              projected={totalProjectedExpenses()}
              actual={totalExpenses()}
            />
            <hr class="block md:hidden my-2" />
          </section>

          {/* Actual Savings */}
          <div class="col-span-1">
            <ActualSavings
              period={period()}
              income={totalIncome()}
              transactions={expenses()}
            />
          </div>

          {/* Actual Investments */}
          <div class="col-span-1">
            <ActualInvestments
              period={period()}
              income={totalIncome()}
              transactions={expenses()}
            />
          </div>
        </section>
      </div>
      <hr class="my-8" />

      {/* Income streams */}
      <section>
        <h1 class="mb-6 text-4xl text-gray-800 font-bold tracking-tight">
          Income Streams
        </h1>

        <div class="grid grid-cols-1 gap-5 md:grid-cols-5">
          <For each={streams()}>
            {(stream) => (
              <div class="col-span-1">
                <IncomeStream stream={stream} />
              </div>
            )}
          </For>
        </div>
      </section>
      <hr class="my-8" />

      {/* Transactions */}
      <section class="pb-6">
        <div class="mb-8 flex justify-between items-center">
          <h1 class="text-3xl text-gray-800 font-bold tracking-tight">
            Transactions
          </h1>

          {/* Transaction actions */}
          <div class="fixed bottom-4 right-4 flex flex-col gap-1 md:static md:flex-row md:gap-2">
            <ProjectedIncomeDialog onSubmit={addIncome} />
            <ProjectedExpenseDialog />
            <TransactionDialog />
          </div>
        </div>

        {/* List all transactions */}
        <div class="rounded bg-gray-100 p-4">
          <TransactionsSheet transactions={[...income(), ...expenses()]} />
        </div>
      </section>
    </>
  );
};

// Export the dashboard component.
export default Dashboard;
