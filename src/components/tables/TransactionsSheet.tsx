// Import interfaces...
import type { Component } from 'solid-js';
import type { ITransaction } from '@/interfaces/budget';

// Import the SolidJS modules...
import { For } from 'solid-js';

// Import the necessary composables...
import { toPrice, toTitle } from '@/composables/useFormatting';

// Define the component.
const TransactionsSheet: Component<{ transactions: ITransaction[] }> = (
  props
) => {
  // Define the JSX.
  return (
    <ul class="flex flex-col gap-2">
      <For each={props.transactions}>
        {(transaction) => (
          <li class="transition-all ease-in rounded-md px-5 py-4 bg-teal-100 grid grid-cols-5 gap-4 items-center text-teal-700 tracking-tighter md:px-8 md:grid-cols-12  hover:shadow-lg hover:bg-teal-200">
            {/* Source */}
            <h3 class="col-span-2 text-lg font-semibold truncate">
              {toTitle(transaction.source)}
            </h3>

            {/* Description */}
            <p class="hidden col-span-1 text-sm text-teal-400 md:inline-grid md:col-span-4">
              {transaction.description}
            </p>

            {/* Date */}
            <p class="hidden col-span-2 text-right text-sm text-teal-600 font-medium md:inline-grid">
              {new Date(transaction.date).toUTCString()}
            </p>

            {/* Nature */}
            <p class="hidden col-span-2 text-right text-sm text-teal-600 font-medium md:inline-grid">
              {toTitle(transaction.nature)}
            </p>

            {/* Amount and Currency */}
            <p class="col-span-2 text-right text-md font-extrabold md:text-xl">
              {toPrice(transaction.amount, transaction.currency)}
            </p>
          </li>
        )}
      </For>
    </ul>
  );
};

// Export the component.
export default TransactionsSheet;
