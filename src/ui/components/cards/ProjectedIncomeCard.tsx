import useFormatting from "@composables/useFormatting";
import type { Component } from "solid-js";
import { DEFAULT_CURRENCY } from "@lib/constants";

const ProjectedIncomeCard: Component<{ income: number }> = (props) => {
  // Get the methods from the composables.
  const { toPrice } = useFormatting();

  return (
    <div class="transition-shadow ease-in duration-300 h-full rounded-lg px-6 py-6 bg-indigo-600 dark:bg-indigo-900 flex flex-col gap-2 justify-between md:px-8 md:py-6 xl:px-6 hover:shadow-lg">
      <h1 class="flex justify-between text-sm text-white font-semibold tracking-tight leading-4 md:text-lg">
        Projected income
      </h1>
      <p class="truncate text-4xl text-indigo-50 tracking-tighter font-mono font-black">
        {toPrice(props.income, DEFAULT_CURRENCY)}
      </p>
    </div>
  );
};

export default ProjectedIncomeCard;
