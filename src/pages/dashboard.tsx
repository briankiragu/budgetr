// Import interfaces...
import type { Component } from 'solid-js';
import type { IProjectedExpense, ITransaction } from '@interfaces/budget';

// Import the SolidJS modules...
import { createSignal } from 'solid-js';

// Import the components...
import ProjectedIncome from '@components/cards/ProjectedIncome';
import ProjectedExpenses from '@components/cards/ProjectedExpenses';
import ActualIncome from '@components/cards/ActualIncome';
import ActualExpenses from '@components/cards/ActualExpenses';
import ActualSavings from '@/components/cards/ActualSavings';

// Define the dashboard component.
const Dashboard: Component = () => {
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

  // Calculate the savings.
  const savings = (): number => totalIncome() - totalExpenses();

  // Define the dashboard component's template.
  return (
    <>
      <h1 class="mb-6 text-5xl font-semibold">At a glance</h1>

      {/* Summary */}
      <section class="flex flex-col gap-10">
        <section class="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
          {/* Projected Income */}
          <ProjectedIncome income={totalProjectedIncome()} />

          {/* Projected Expenses */}
          <ProjectedExpenses expenses={totalProjectedExpenses()} />
        </section>

        <section class="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
          {/* Actual Income */}
          <ActualIncome
            projected={totalProjectedIncome()}
            actual={totalIncome()}
          />

          {/* Actual Expenses */}
          <ActualExpenses
            projected={totalProjectedExpenses()}
            actual={totalExpenses()}
          />

          {/* Actual Savings */}
          <ActualSavings amount={savings()} />
        </section>
      </section>
    </>
  );
};

// Export the dashboard component.
export default Dashboard;
