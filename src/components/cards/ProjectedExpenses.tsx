// Import interfaces...
import type { Component, JSXElement } from 'solid-js';
import type { IExpensePeriod } from '@/interfaces/budget';

// Import necessary composables...
import { toPrice } from '@composables/useFormatting';

// Define the component.
const ProjectedExpenses: Component<{
  period: IExpensePeriod;
  income: number;
  expenses: number;
}> = (props) => {
  // Check if the expenses are greater than or equal to the income.
  const overdrawn = (): boolean => props.expenses >= props.income;

  // Create JSX emoji for the reaction.
  const emoji = (): JSXElement =>
    overdrawn() ? <span>😱</span> : <span>👌</span>;

  // Return the component's JSX.
  return (
    <div class="rounded-lg px-6 py-4 bg-teal-400 md:px-8 md:py-6">
      <h1 class="flex justify-between text-md text-teal-100 font-semibold tracking-tight leading-4 md:text-lg">
        Projected {props.period.range} expenses
        {emoji()}
      </h1>
      <p class="text-2xl text-teal-50 tracking-tighter font-extrabold md:text-4xl">
        {toPrice(props.expenses, 'ZAR')}
      </p>
    </div>
  );
};

// Export the component.
export default ProjectedExpenses;
