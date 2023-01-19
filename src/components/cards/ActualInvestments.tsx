// Import interfaces...
import type { Component, JSXElement } from 'solid-js';
import type { IExpensePeriod, ITransaction } from '@interfaces/budget';

// Import necessary composables...
import { toPrice, toTitle } from '@composables/useFormatting';

// Define the component.
const ActualSavings: Component<{
  period: IExpensePeriod;
  income: number;
  transactions: ITransaction[];
}> = (props) => {
  // Determine how many transactions were actually investments.
  const investment = (): number =>
    props.transactions.reduce(
      (acc, transaction) =>
        transaction.nature === 'investment' ? acc + transaction.amount : acc,
      0
    );

  // Calculate the percentage difference between the projected and actual income.
  const percentage = (): number => (investment() / props.income) * 100;

  // Create JSX emoji for the reaction.
  const emoji = (): JSXElement =>
    investment() > 0 ? <span>🎉🎉</span> : <span>🔻</span>;

  // Define the JSX...
  return (
    <div class="transition-shadow ease-in duration-300 h-full rounded-lg px-6 py-6 bg-cyan-400 flex flex-col justify-between items-end text-right md:px-8 md:py-6 hover:shadow-lg">
      <div class="mb-2 flex flex-col">
        <h1 class="flex justify-end gap-2 text-md text-cyan-700 font-semibold tracking-tight leading-4 md:text-lg">
          {toTitle(props.period.range)} investment
          {emoji()}
        </h1>
        <h2 class="text-2xl text-cyan-50 tracking-tighter font-extrabold md:text-2xl">
          {toPrice(investment(), 'ZAR')}
        </h2>
      </div>

      {/* Percentage saved */}
      <p class="text-7xl text-cyan-100 tracking-tighter font-extrabold">
        {percentage().toFixed(1)}%
      </p>
    </div>
  );
};

// Export the component.
export default ActualSavings;
