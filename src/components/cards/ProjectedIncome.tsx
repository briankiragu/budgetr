// Import interfaces...
import type { Component } from 'solid-js';
import type { IExpensePeriod } from '@/interfaces/budget';

// Import necessary composables...
import { toPrice } from '@composables/useFormatting';

// Define the component.
const ProjectedIncome: Component<{ period: IExpensePeriod; income: number }> = (
  props
) => {
  // Return the component's JSX.
  return (
    <div class="h-full rounded-lg px-6 py-4 bg-indigo-400 flex flex-col justify-between md:px-8 md:py-6 xl:px-4">
      <h1 class="flex justify-between text-sm text-indigo-200 font-semibold tracking-tight leading-4 md:text-lg">
        Projected {props.period.range} income
      </h1>
      <p class="text-4xl text-indigo-50 tracking-tighter font-extrabold">
        {toPrice(props.income, 'ZAR')}
      </p>
    </div>
  );
};

// Export the component.
export default ProjectedIncome;
