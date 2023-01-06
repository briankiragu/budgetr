// Import interfaces...
import type { Component } from 'solid-js';
import type {
  IExpensePeriod,
  IProjectedTransaction,
  ITransaction,
} from '@interfaces/budget';

// Import the SolidJS modules...
import { createSignal, lazy } from 'solid-js';
import TransactionsSheet from '@/components/tables/TransactionsSheet';

// Import the components...
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
const ActualSavings = lazy(
  async () => await import('@components/cards/ActualSavings')
);

// Define the dashboard component.
const Dashboard: Component = () => {
  // Define the period.
  const [period] = createSignal<IExpensePeriod>({
    range: 'monthly',
    start: new Date('2023-02-01'),
    end: new Date('2023-03-31'),
  });

  // Projected income and expenses.
  const [projectedIncome] = createSignal<ITransaction[]>([
    {
      source: 'salary',
      amount: 65800,
      currency: 'ZAR',
      date: new Date(),
      nature: 'income',
    },
    {
      source: 'bonus',
      amount: 14200,
      currency: 'ZAR',
      date: new Date(),
      nature: 'income',
    },
  ]);
  const [projectedExpenses] = createSignal<IProjectedTransaction[]>([
    {
      source: 'tithe',
      type: 'percentage',
      amount: 10,
      currency: 'ZAR',
      date: new Date(),
      nature: 'investment',
    },
    {
      source: 'tax',
      type: 'percentage',
      amount: 30,
      currency: 'ZAR',
      date: new Date(),
      nature: 'expense',
    },
    {
      source: 'investment',
      type: 'percentage',
      amount: 10,
      currency: 'ZAR',
      date: new Date(),
      nature: 'investment',
    },
    {
      source: 'rent',
      type: 'fixed',
      amount: 6500,
      currency: 'ZAR',
      date: new Date(),
      nature: 'expense',
    },
  ]);

  // Actual income and expenses.
  const [income] = createSignal<ITransaction[]>([
    {
      source: 'bonus',
      amount: 86400,
      currency: 'ZAR',
      date: new Date(),
      nature: 'income',
      description: 'Relocation bonus from AWS Development Centre',
    },
  ]);
  const [expenses] = createSignal<ITransaction[]>([
    {
      source: 'rent',
      amount: 15700,
      currency: 'ZAR',
      date: new Date(),
      nature: 'expense',
      description:
        "First month's rent, deposit, service charge and application fee for the new apartment",
    },
    {
      source: 'consumables',
      amount: 4200,
      currency: 'ZAR',
      date: new Date(),
      nature: 'expense',
    },
    {
      source: 'transport',
      amount: 1200,
      currency: 'ZAR',
      date: new Date(),
      nature: 'expense',
    },
  ]);

  // Calculate the total projected income.
  const totalProjectedIncome = (): number =>
    projectedIncome().reduce((acc, stream) => acc + stream.amount, 0);

  // Calculate the total projected expenses.
  // TODO: This should be resolved in a SolidJS way...
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

  // Define the dashboard component's template.
  return (
    <>
      {/* Summary */}
      <div>
        <h1 class="mb-6 text-gray-800 text-5xl font-extrabold">At a glance</h1>

        <section class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-14">
          <section class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
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
          </section>

          {/* Actual Savings */}
          <ActualSavings
            period={period()}
            income={totalIncome()}
            expenses={totalExpenses()}
          />
        </section>
      </div>

      <hr class="my-8" />

      {/* Transactions */}
      <div>
        <h1 class="mb-6 text-3xl text-gray-800 font-bold tracking-tight">
          Transactions
        </h1>

        <TransactionsSheet transactions={expenses()} />
      </div>
    </>
  );
};

// Export the dashboard component.
export default Dashboard;
