import useFormatting from "@composables/useFormatting";
import type { Component } from "solid-js";
import { DEFAULT_CURRENCY } from "@lib/constants";

const ActualExpensesCard: Component<{
  income: number;
  projected: number;
  actual: number;
}> = (props) => {
  // Get the methods from the composables.
  const { toPrice } = useFormatting();

  // Check if any expenses were recorded.
  const hasExpenses = (): boolean => props.actual > 0;

  // Calculate the difference between the actual income.
  const lessThanIncome = (): boolean => props.actual < props.income;

  // Calculate the difference between the projected expenses.
  const lessThanBudget = (): boolean => props.actual < props.projected;

  return (
    <div class="transition-shadow ease-in duration-300 h-full rounded-lg px-6 py-6 bg-teal-700 dark:bg-teal-900 flex flex-col gap-2 justify-between md:px-8 md:py-6 xl:px-6 hover:shadow-lg">
      <h1 class="flex justify-between text-sm text-white font-semibold tracking-tight leading-4 md:text-lg">
        Actual expenses
        {!hasExpenses() && <span>🎉🎉</span>}
        {hasExpenses() && lessThanIncome() && lessThanBudget() && (
          <span>🎉🎉</span>
        )}
        {hasExpenses() && lessThanIncome() && !lessThanBudget() && (
          <span>🎉</span>
        )}
        {hasExpenses() && !lessThanIncome() && lessThanBudget() && (
          <span>🎉</span>
        )}
        {hasExpenses() && !lessThanIncome() && !lessThanBudget() && (
          <span>💔</span>
        )}
      </h1>

      <p class="truncate text-4xl text-teal-50 tracking-tighter font-mono font-black">
        {toPrice(props.actual, DEFAULT_CURRENCY)}
      </p>
    </div>
  );
};

export default ActualExpensesCard;
