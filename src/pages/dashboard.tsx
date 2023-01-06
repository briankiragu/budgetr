// Import interfaces...
import type { Component } from 'solid-js';
import type {
  IExpensePeriod,
  IProjectedExpense,
  ITransaction,
} from '@interfaces/budget';

// Import the SolidJS modules...
import { createSignal, lazy } from 'solid-js';

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
    { source: 'salary', amount: 65800, currency: 'ZAR' },
    { source: 'bonus', amount: 14200, currency: 'ZAR' },
  ]);
  const [projectedExpenses] = createSignal<IProjectedExpense[]>([
    { source: 'tithe', type: 'percentage', amount: 10, currency: 'ZAR' },
    { source: 'tax', type: 'percentage', amount: 30, currency: 'ZAR' },
    { source: 'investment', type: 'percentage', amount: 10, currency: 'ZAR' },
    { source: 'rent', type: 'fixed', amount: 6500, currency: 'ZAR' },
  ]);

  // Actual income and expenses.
  const [income] = createSignal<ITransaction[]>([
    { source: 'salary', amount: 86400, currency: 'ZAR' },
  ]);
  const [expenses] = createSignal<ITransaction[]>([
    { source: 'rent', amount: 15700, currency: 'ZAR' },
    { source: 'consumables', amount: 4200, currency: 'ZAR' },
    { source: 'transport', amount: 1200, currency: 'ZAR' },
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
      <h1 class="mb-6 text-5xl font-semibold">At a glance</h1>

      {/* Summary */}
      <section class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-14">
        <section class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {/* Projected Income */}
          <ProjectedIncome period={period()} income={totalProjectedIncome()} />

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
    </>
  );
};

// Export the dashboard component.
export default Dashboard;
