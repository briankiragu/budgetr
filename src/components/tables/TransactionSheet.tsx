// Import interfaces...
import type { Component } from 'solid-js';
import type { ITransaction } from '@interfaces/budget';

// Import the SolidJS modules...
import { createSignal, For } from 'solid-js';

// Import the necessary composables...
import useFormatting from '@composables/useFormatting';

// Define the component.
const TransactionsSheet: Component<{ transactions: ITransaction[] }> = (
  props
) => {
  // Get the composable functions
  const { toPrice, toTitle } = useFormatting();

  // Create a list of all the sources based on the transactions.
  const sources = (): string[] =>
    Array.from(
      new Set(
        props.transactions.map((transaction) => transaction.nature)
      ).values()
    );

  // Create a signal to hold the filter(s).
  const [sourceFilter, setSourceFilter] = createSignal<string>('all');
  const [natureFilter, setNatureFilter] = createSignal<string>('all');

  // Create a signal to hold the sorting fields.
  const [sortBy, setSortBy] = createSignal<string>('date-asc');

  // Create a derived signal to hold the filtered transactions.
  const filteredTransactions = (): ITransaction[] =>
    props.transactions
      // If the source filter is set to "all", return all transactions.
      .filter((transaction) =>
        sourceFilter() === 'all' ? true : transaction.nature === sourceFilter()
      )
      // If the nature filter is set to "all", return all transactions.
      .filter((transaction) =>
        natureFilter() === 'all' ? true : transaction.nature === natureFilter()
      )
      // Sort the transactions by date (desc by default).
      .sort((a, b) => {
        // Declare a varible that will hold the sorting value.
        let sortingValue = 0;

        // Sort the transactions based on the sortBy() signal.
        switch (sortBy()) {
          case 'date-asc':
            sortingValue =
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime();
            break;

          case 'amount-desc':
            sortingValue = b.amount - a.amount;
            break;

          case 'amount-asc':
            sortingValue = a.amount - b.amount;
            break;

          default:
            sortingValue =
              new Date(a.updated_at).getTime() -
              new Date(b.updated_at).getTime();
            break;
        }

        // Return the sorting value.
        return sortingValue;
      });

  // Define the JSX.
  return (
    <div class="flex flex-col gap-6">
      {/* Filters */}
      <div class="flex flex-wrap gap-4 justify-between items-center">
        {/* Filters */}
        <div class="flex justify-between items-center gap-6">
          {/* Filter by source */}
          <label
            for="transaction-sheet-filter-source"
            class="flex flex-col text-sm text-gray-500"
          >
            Filter by source:
            <select
              id="transaction-sheet-filter-source"
              class="border border-gray-100 rounded-md px-3 py-2 bg-gray-200 text-gray-700 text-sm focus-visible:outline-none"
              onInput={(event) =>
                setSourceFilter((event.target as HTMLSelectElement).value)
              }
            >
              <option value="all">All</option>
              <For each={sources()}>
                {(source) => <option value={source}>{toTitle(source)}</option>}
              </For>
            </select>
          </label>

          {/* Filter by date */}
          <label
            for="transaction-sheet-filter-nature"
            class="flex flex-col text-sm text-gray-500"
          >
            Filter by nature:
            <select
              id="transaction-sheet-filter-nature"
              class="border border-gray-100 rounded-md px-3 py-2 bg-gray-200 text-gray-700 text-sm focus-visible:outline-none"
              onInput={(event) =>
                setNatureFilter((event.target as HTMLSelectElement).value)
              }
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="investment">Investment</option>
              <option value="saving">Saving</option>
              <option value="expense">Expense</option>
            </select>
          </label>
        </div>

        {/* Sort By */}
        <label
          for="transaction-sheet-sort-by"
          class="flex flex-col text-sm text-gray-500"
        >
          Sort by:
          <select
            id="transaction-sheet-sort-by"
            class="border border-gray-100 rounded-md px-3 py-2 bg-gray-200 text-gray-700 text-sm focus-visible:outline-none"
            onInput={(event) =>
              setSortBy((event.target as HTMLSelectElement).value)
            }
          >
            <option value="date-desc">Date (Latest)</option>
            <option value="date-asc">Date (Earliest)</option>
            <option value="amount-desc">Amount (Highest)</option>
            <option value="amount-asc">Amount (Lowest)</option>
          </select>
        </label>
      </div>

      {/* Transaction ledger */}
      <ul class="flex flex-col gap-2">
        <For each={filteredTransactions()}>
          {(transaction) => (
            <li class="transition-all ease-in rounded-md px-5 py-4 bg-gray-200 grid grid-cols-5 gap-4 items-center text-gray-700 tracking-tighter md:px-8 md:grid-cols-12 hover:shadow-lg hover:bg-gray-700 hover:text-gray-50">
              {/* Source */}
              <p class="col-span-2 text-lg font-semibold truncate">
                {toTitle(transaction.nature)}
              </p>

              {/* Description */}
              <p class="hidden col-span-1 text-sm text-gray-400 md:inline-grid md:col-span-4">
                {transaction.description}
              </p>

              {/* Date */}
              <p class="hidden col-span-2 text-right text-sm text-gray-400 font-medium md:inline-grid">
                {new Date(transaction.updated_at).toUTCString()}
              </p>

              {/* Nature */}
              <p class="hidden col-span-1 text-right text-sm text-gray-400 font-medium md:inline-grid">
                {toTitle(transaction.nature)}
              </p>

              {/* Amount and Currency */}
              <p class="col-span-3 text-right text-md font-extrabold md:text-xl">
                {toPrice(transaction.amount, transaction.currency)}
              </p>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

// Export the component.
export default TransactionsSheet;
