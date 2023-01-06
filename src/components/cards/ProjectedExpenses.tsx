// Import interfaces...
import type { Component } from 'solid-js';

// Import necessary composables...
import { toPrice } from '@composables/useFormatting';

// Define the component.
const ProjectedExpenses: Component<{ expenses: number }> = (props) => {
  // Return the component's JSX.
  return (
    <div class="rounded-lg px-6 py-4 bg-teal-400 md:px-8 md:py-6">
      <h1 class="text-md text-teal-100 font-semibold tracking-tight md:text-lg">
        Projected Expenses
      </h1>
      <p class="text-2xl text-teal-50 tracking-tighter font-extrabold md:text-4xl">
        {toPrice(props.expenses, 'ZAR')}
      </p>
    </div>
  );
};

// Export the component.
export default ProjectedExpenses;
