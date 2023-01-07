// Import interfaces...
import type { Component, JSXElement } from 'solid-js';
import type { IExpensePeriod, ITransaction } from '@/interfaces/budget';

// Import necessary composables...
import { toPrice, toTitle } from '@composables/useFormatting';

// Define the component.
const ActualSavings: Component<{
  period: IExpensePeriod;
  income: number;
  transactions: ITransaction[];
}> = (props) => {
  // Get the total amount of expenses.
  const expenses = (): number =>
    props.transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );

  // Determine how many transactions were actually savings.
  const savings = (): number =>
    props.transactions.reduce(
      (acc, transaction) =>
        transaction.nature === 'saving' ? acc + transaction.amount : acc,
      0
    );

  // Determine the total amount of money saved, as well as the total amount not expended.
  const surplus = (): number => props.income - expenses() + savings();

  // Calculate the percentage of the income that was saved and/or not expended.
  const percentage = (): number => (surplus() / props.income) * 100;

  // Check if the total amount saved is greater than 0.
  const improvement = (): boolean => surplus() > 0;

  // Create JSX emoji for the reaction.
  const emoji = (): JSXElement =>
    improvement() ? <span>🎉</span> : <span>😟</span>;

  // Define the JSX...
  return (
    <div class="h-full rounded-lg px-6 py-4 bg-green-400 flex flex-col justify-between items-end md:px-8 md:py-6">
      <div class="mb-2 flex flex-col">
        <h1 class="flex justify-end gap-2 text-md text-green-700 font-semibold tracking-tight leading-4 md:text-lg">
          {toTitle(props.period.range)} savings
          {emoji()}
        </h1>
        <h2 class="text-2xl text-green-50 tracking-tighter font-extrabold md:text-2xl">
          {toPrice(surplus(), 'ZAR')}
        </h2>
      </div>

      {/* Percentage saved */}
      <p class="text-6xl text-green-100 tracking-tighter font-extrabold md:text-6xl">
        {percentage().toFixed(1)}%
      </p>
    </div>
  );
};

// Export the component.
export default ActualSavings;
