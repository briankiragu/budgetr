import EditTransactionDialog from "@components/dialogs/EditTransactionDialog";
import useFormatting from "@composables/useFormatting";
import type {
  IProjectedCredit,
  IProjectedDebit,
  ITransaction,
} from "@interfaces/budget";
import type { Component } from "solid-js";
import { For, createSignal } from "solid-js";

// Define the component.
const TransactionsSheet: Component<{
  natures: { credit: string[]; debit: string[] };
  credits: IProjectedCredit[];
  debits: IProjectedDebit[];
  submitHandler: (txn: ITransaction) => Promise<void>;
  transactions: ITransaction[];
}> = (props) => {
  // Get the composable functions
  const { toPrice, toTitle } = useFormatting();

  // Create a list of all the sources based on the transactions.
  const sources = (): string[] =>
    Array.from(
      new Set(
        props.transactions.map((transaction) => transaction.nature),
      ).values(),
    ).sort();

  // Create a signal to hold the filter(s).
  const [natureFilter, setNatureFilter] = createSignal<string>("all");

  // Create a signal to hold the sorting fields.
  const [sortBy, setSortBy] = createSignal<string>("date-asc");

  // Create a derived signal to hold the filtered transactions.
  const filteredTransactions = (): ITransaction[] =>
    props.transactions
      // If the source filter is set to "all", return all transactions.
      .filter((transaction) =>
        natureFilter() === "all" ? true : transaction.nature === natureFilter(),
      )
      // If the nature filter is set to "all", return all transactions.
      .filter((transaction) =>
        natureFilter() === "all" ? true : transaction.nature === natureFilter(),
      )
      // Sort the transactions by date (desc by default).
      .sort((a, b) => {
        // Declare a varible that will hold the sorting value.
        let sortingValue = 0;

        // Sort the transactions based on the sortBy() signal.
        switch (sortBy()) {
          case "date-asc":
            sortingValue =
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            break;

          case "amount-desc":
            sortingValue = b.amount - a.amount;
            break;

          case "amount-asc":
            sortingValue = a.amount - b.amount;
            break;

          default:
            sortingValue =
              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
            break;
        }

        // Return the sorting value.
        return sortingValue;
      });

  // Define the JSX.
  return (
    <div class="flex min-h-[25vh] flex-col gap-6">
      {/* Filters */}
      <div class="flex flex-wrap items-center justify-between gap-4">
        {/* Filters */}
        <div class="flex items-center justify-between gap-6">
          {/* Filter by source */}
          <label
            for="transaction-sheet-filter-source"
            class="flex flex-col text-sm text-gray-900 dark:text-gray-50 font-medium"
          >
            Filter by nature:
            <select
              id="transaction-sheet-filter-source"
              class="rounded-md border border-gray-100 bg-gray-200 dark:text-gray-900 px-3 py-2 text-sm focus-visible:outline-none"
              onInput={(event) =>
                setNatureFilter((event.target as HTMLSelectElement).value)
              }
            >
              <option value="all">All</option>
              <For each={sources()}>
                {(source) => <option value={source}>{toTitle(source)}</option>}
              </For>
            </select>
          </label>
        </div>

        {/* Sort By */}
        <label
          for="transaction-sheet-sort-by"
          class="flex flex-col text-sm text-gray-900 font-medium dark:text-gray-50"
        >
          Sort by:
          <select
            id="transaction-sheet-sort-by"
            class="rounded-md border border-gray-100 bg-gray-200 px-3 py-2 text-sm focus-visible:outline-none dark:text-gray-900"
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
            <li class="group grid grid-cols-5 items-center lg:gap-6 rounded-md bg-gray-200 px-5 py-4 tracking-tighter text-gray-700 transition-all ease-in hover:bg-gray-700 hover:text-gray-50 hover:shadow-lg md:grid-cols-12 md:px-8">
              {/* Nature */}
              <p class="col-span-6 truncate text-xl font-bold">
                {transaction.description}
              </p>

              {/* Description */}
              <p class="col-span-1 hidden text-sm text-gray-400 md:inline-grid">
                {toTitle(transaction.nature)}
              </p>

              {/* Date */}
              <p class="col-span-2 hidden text-right text-sm font-medium text-gray-400 md:inline-grid">
                {new Date(transaction.updatedAt).toUTCString()}
              </p>

              {/* Type */}
              <p class="col-span-1 hidden text-right text-sm font-medium text-gray-400 md:inline-grid">
                {toTitle(transaction.type)}
              </p>

              {/* Amount and Currency */}
              <div class="col-span-5 lg:col-span-2 flex justify-between items-center">
                <p class="group-hover:text-gray-400 text-md lg:truncate text-right text-gray-600 font-mono font-extrabold md:text-xl">
                  {toPrice(transaction.amount, transaction.currency)}
                </p>

                <EditTransactionDialog
                  natures={props.natures}
                  credits={props.credits}
                  debits={props.debits}
                  transaction={transaction}
                  submitHandler={props.submitHandler}
                />
              </div>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

// Export the component.
export default TransactionsSheet;
