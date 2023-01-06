// Import interfaces...
import type { Component, JSXElement } from 'solid-js';
import type { IExpensePeriod } from '@/interfaces/budget';

// Import necessary composables...
import { toPrice, toTitle } from '@composables/useFormatting';

// Define the component.
const ActualSavings: Component<{
  period: IExpensePeriod;
  income: number;
  expenses: number;
}> = (props) => {
  // Calculate the difference between the projected and actual income.
  const savings = (): number => props.income - props.expenses;

  // Calculate the percentage difference between the projected and actual income.
  const percentage = (): number => (savings() / props.income) * 100;

  // Check if the amount is greater than 0.
  const improvement = (): boolean => props.income > props.expenses;

  // Create JSX emoji for the reaction.
  const emoji = (): JSXElement =>
    improvement() ? <span>🎉</span> : <span>😟</span>;

  // Define the JSX...
  return (
    <div class="rounded-lg px-6 py-4 bg-green-400 flex flex-col justify-between items-end md:px-8 md:py-6">
      <div class="mb-2 flex flex-col">
        <h1 class="flex justify-end gap-2 text-md text-teal-700 font-semibold tracking-tight leading-4 md:text-lg">
          {toTitle(props.period.range)} savings
          {emoji()}
        </h1>
        <h2 class="text-2xl text-green-50 tracking-tighter font-extrabold md:text-2xl">
          {toPrice(savings(), 'ZAR')}
        </h2>
      </div>

      {/* Percentage saved */}
      <p class="text-6xl text-green-100 tracking-tighter font-extrabold md:text-9xl">
        {percentage().toFixed(1)}%
      </p>
    </div>
  );
};

// Export the component.
export default ActualSavings;
