// Import interfaces...
import type { Component } from 'solid-js';

// Import SolidJS modules...
import { Show } from 'solid-js';

// Import necessary composables...
import { toPrice } from '@composables/useFormatting';

// Define the component.
const ActualIncome: Component<{ projected: number; actual: number }> = (
  props
) => {
  // Calculate the difference between the projected and actual income.
  const improvement = (): boolean => props.actual > props.projected;

  // Return the component's JSX.
  return (
    <div class="rounded-lg px-6 py-4 bg-indigo-400 md:px-8 md:py-6">
      <h1 class="flex justify-between text-md text-indigo-200 font-semibold tracking-tight md:text-lg">
        Actual Income
        <Show when={improvement()}>
          <span>🎉</span>
        </Show>
      </h1>
      <p class="text-2xl text-indigo-50 tracking-tighter font-extrabold md:text-4xl">
        {toPrice(props.actual, 'ZAR')}
      </p>
    </div>
  );
};

// Export the component.
export default ActualIncome;
