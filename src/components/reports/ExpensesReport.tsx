import { type Component, For, createSignal, createMemo } from 'solid-js';

// Import interfaces...
import type { ITransaction } from '@interfaces/budget';
import type { IStackedDataSet } from '@interfaces/datasets';

// Import composables..
import useDatasets from '@composables/useDatasets';
import useFormatting from '@composables/useFormatting';

// Import components...
import StackedBarChart from '@components/charts/StackedBarChart';

// Define the component.
const ExpensesReport: Component<{ expenses: ITransaction[] }> = ({
  expenses,
}) => {
  // Get the composable functions...
  const { filters, stackByPeriod } = useDatasets();
  const { toTitle } = useFormatting();

  // Currently active filter.
  const [activeFilterId, setActiveFilterId] = createSignal<string>('month');

  /**
   * Create the data to display as a memo of the transactions and filter value.
   *
   * @return {IStackedDataSet} Grouped dataset.
   */
  const dataset = createMemo<IStackedDataSet>(() =>
    stackByPeriod(expenses, activeFilterId(), ['rent', 'transport'])
  );

  return (
    <div class="w-full h-full rounded-lg bg-gray-100 px-3 py-2 md:px-4 md:py-3 flex flex-col justify-between gap-2">
      {/* Title */}
      <h2 class="text-gray-600 font-semibold">Summary of expenses</h2>

      {/* Filters */}
      <div class="rounded border-gray-300 border flex justify-end text-sm text-gray-600 font-semibold">
        <For each={filters} fallback={<span>No filters</span>}>
          {(filter) => (
            <button
              title={filter.title}
              class="transition-colors border-l px-3 py-1 cursor-pointer hover:bg-gray-300"
              classList={{ 'bg-gray-300': activeFilterId() === filter.id }}
              onClick={() => {
                setActiveFilterId(filter.id);
              }}
            >
              {toTitle(filter.symbol)}
            </button>
          )}
        </For>
      </div>

      {/* Stacked Bar Chart */}
      <StackedBarChart dataset={dataset()} />
    </div>
  );
};

export default ExpensesReport;
