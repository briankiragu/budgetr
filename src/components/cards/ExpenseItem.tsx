// Import interfaces...
import type { Component } from 'solid-js';
import type { ITransaction } from '@/interfaces/budget';

// Import necessary composables...
import { toPrice, toTitle } from '@composables/useFormatting';

// Define the component.
const ExpenseItem: Component<{ stream: ITransaction }> = (props) => {
  // Return the component's JSX.
  return (
    <div class="transition-shadow ease-in rounded-lg px-6 py-4 bg-teal-400 flex flex-col justify-between md:px-8 md:py-6 xl:px-5 hover:shadow-lg">
      <h1 class="mb-1 flex flex-col justify-between text-md text-teal-700 font-medium tracking-tight  leading-3 md:text-md">
        {toTitle(props.stream.source)}
        <small class="text-sm text-teal-600">
          {toTitle(props.stream.description?.toLowerCase() ?? '')}
        </small>
      </h1>
      <p class="text-3xl text-teal-50 tracking-tighter font-extrabold md:text-2xl">
        {toPrice(props.stream.amount, props.stream.currency)}
      </p>
    </div>
  );
};

// Export the component.
export default ExpenseItem;
