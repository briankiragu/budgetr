import useFormatting from "@composables/useFormatting";
import type { Component } from "solid-js";
import { DEFAULT_CURRENCY } from "@lib/constants";

const ProjectedExpensesCard: Component<{
  income: number;
  expenses: number;
}> = (props) => {
  // Get the methods from the composables.
  const { toPrice } = useFormatting();

  // Check if the expenses are greater than or equal to the income.
  const overdrawn = (): boolean => props.expenses > props.income;

  return (
    <div class="transition-shadow ease-in duration-300 h-full rounded-lg px-6 py-6 bg-teal-700 dark:bg-teal-900 flex flex-col gap-2 justify-between md:px-8 md:py-6 xl:px-6 hover:shadow-lg">
      <h1 class="flex justify-between text-sm text-white font-semibold tracking-tight leading-4 md:text-lg">
        Projected expenses
        {overdrawn() ? <span>❗</span> : <span>🎉</span>}
      </h1>
      <p class="truncate text-4xl text-teal-50 tracking-tighter font-mono font-black">
        {toPrice(props.expenses, DEFAULT_CURRENCY)}
      </p>
    </div>
  );
};

export default ProjectedExpensesCard;
