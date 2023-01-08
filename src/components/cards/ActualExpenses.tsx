// Import interfaces...
import { Component, Show, Switch, Match } from 'solid-js';
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
  // Calculate the difference between the actual income.
  const lessThanIncome = (): boolean => props.actual < props.income;

  // Calculate the difference between the projected expenses.
  const lessThanBudget = (): boolean => props.actual < props.projected;

  // Return the component's JSX.
  return (
    <div class="transition-shadow ease-in duration-300 h-full rounded-lg px-6 py-6 bg-teal-400 flex flex-col gap-2 justify-between md:px-8 md:py-6 xl:px-4 hover:shadow-lg">
      <h1 class="flex justify-between text-sm text-teal-100 font-semibold tracking-tight leading-4 md:text-lg">
        Actual {props.period.range} expenses
        <Switch fallback={<span>😟</span>}>
          <Match when={lessThanIncome() && lessThanBudget()}>
            <span>🎉🎉</span>
          </Match>
          <Match when={lessThanIncome() && !lessThanBudget()}>
            <span>🎉</span>
          </Match>
          <Match when={!lessThanIncome() && lessThanBudget()}>
            <span>🎉</span>
          </Match>
        </Switch>
      </h1>

      <p class="text-4xl text-teal-50 tracking-tighter font-extrabold">
        {toPrice(props.actual, 'ZAR')}
      </p>
    </div>
  );
};

// Export the component.
export default ActualExpenses;
