// Import interfaces...
import type { Component, JSXElement } from 'solid-js';
import type { IExpensePeriod } from '@/interfaces/budget';

// Import necessary composables...
import { toPrice } from '@composables/useFormatting';

// Define the component.
const ActualExpenses: Component<{
  period: IExpensePeriod;
  income: number;
  projected: number;
  actual: number;
}> = (props) => {
  // Calculate the difference between the projected and actual income.
  const improvement = (): boolean =>
    props.actual < props.income && props.actual < props.projected;

  // Create JSX emoji for the reaction.
  const emoji = (): JSXElement =>
    improvement() ? <span>🎉</span> : <span>😟</span>;

  // Return the component's JSX.
  return (
    <div class="rounded-lg px-6 py-4 bg-teal-400 md:px-8 md:py-6">
      <h1 class="flex justify-between text-md text-teal-100 font-semibold tracking-tight leading-4 md:text-lg">
        Actual {props.period.range} expenses
        {emoji()}
      </h1>
      <p class="text-2xl text-teal-50 tracking-tighter font-extrabold md:text-4xl">
        {toPrice(props.actual, 'ZAR')}
      </p>
    </div>
  );
};

// Export the component.
export default ActualExpenses;
