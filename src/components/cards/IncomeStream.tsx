// Import interfaces...
import type { Component } from 'solid-js';
import type { ITransaction } from '@/interfaces/budget';

// Import necessary composables...
import { toPrice, toTitle } from '@composables/useFormatting';

// Define the component.
const IncomeStream: Component<{ stream: ITransaction }> = (props) => {
  // Return the component's JSX.
  return (
    <div class="rounded-lg px-6 py-4 bg-indigo-400 flex flex-col justify-between md:px-8 md:py-6 xl:px-5">
      <h1 class="flex flex-col justify-between text-md text-indigo-200 font-medium tracking-tight  leading-3 md:text-lg">
        {toTitle(props.stream.source)}
        <small class="text-sm text-indigo-600">
          {toTitle(props.stream.description?.toLowerCase() ?? '')}
        </small>
      </h1>
      <p class="text-3xl text-indigo-50 tracking-tighter font-extrabold md:text-2xl">
        {toPrice(props.stream.amount, props.stream.currency)}
      </p>
    </div>
  );
};

// Export the component.
export default IncomeStream;
