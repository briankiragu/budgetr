// Import interfaces...
import type { Component } from 'solid-js';

// Import SolidJS modules...
import { Show } from 'solid-js';

// Import necessary composables...
import { toPrice } from '@composables/useFormatting';

// Define the component.
const ActualExpenses: Component<{ projected: number; actual: number }> = (
  props
) => {
  // Calculate the difference between the projected and actual income.
  const improvement = (): boolean => props.actual < props.projected;

  // Return the component's JSX.
  return (
    <div class="rounded-lg px-6 py-4 bg-teal-400 md:px-8 md:py-6">
      <h1 class="flex justify-between text-md text-teal-100 font-semibold tracking-tight md:text-lg">
        Actual Expenses
        <Show when={improvement()}>
          <span>🎉</span>
        </Show>
      </h1>
      <p class="text-2xl text-teal-50 tracking-tighter font-extrabold md:text-4xl">
        {toPrice(props.projected, 'ZAR')}
      </p>
    </div>
  );
};

// Export the component.
export default ActualExpenses;
