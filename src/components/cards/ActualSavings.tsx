// Import SolidJS interfaces...
import type { Component } from 'solid-js';

// Import SolidJS modules...
import { Show } from 'solid-js';

// Import necessary composables...
import { toPrice } from '@composables/useFormatting';

// Define the component.
const ActualSavings: Component<{ amount: number }> = (props) => {
  // Check if the amount is greater than 0.
  const improvement = (): boolean => props.amount > 0;

  // Define the JSX...
  return (
    <div class="rounded-lg px-6 py-4 bg-teal-400 md:px-8 md:py-6">
      <h1 class="flex justify-between text-md text-teal-700 font-semibold tracking-tight md:text-lg">
        Savings
        <Show when={improvement()}>
          <span>🎉</span>
        </Show>
      </h1>
      <p class="text-2xl text-teal-50 tracking-tighter font-extrabold md:text-4xl">
        {toPrice(props.amount, 'ZAR')}
      </p>
    </div>
  );
};

// Export the component.
export default ActualSavings;
