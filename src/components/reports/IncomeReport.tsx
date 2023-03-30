import { type Component, For, createSignal, createMemo } from 'solid-js';

// Import interfaces...
import type { ITransaction } from '@interfaces/budget';
import type { IStackedDataSet } from '@interfaces/datasets';

// Import composables..
import useDatasets from '@composables/useDatasets';
import useFormatting from '@composables/useFormatting';

// Define the component.
const IncomeReport: Component<{ income: ITransaction[] }> = ({ income }) => {
  // Define the interfaces
  // eslint-disable-next-line @typescript-eslint/naming-convention
  type IFilter = {
    id: string;
    title: string;
    symbol: string;
    isActive: boolean;
  };

  // Get the filters...
  const filters: IFilter[] = [
    { id: 'day', title: 'Today', symbol: 'd', isActive: false },
    { id: 'week', title: 'Week', symbol: '7D', isActive: false },
    { id: 'month', title: 'Month', symbol: '30D', isActive: false },
    { id: 'months', title: 'Months', symbol: 'm', isActive: false },
    { id: 'years', title: 'Years', symbol: 'y', isActive: true },
  ];

  // Currently active filter.
  const [activeFilterId, setActiveFilterId] = createSignal<string>('month');

  // Get the composable functions...
  const { stackByPeriod } = useDatasets();
  const { toTitle } = useFormatting();

  /**
   * Create the data to display as a memo of the transactions and filter value.
   *
   * @return {IStackedDataSet} Grouped dataset.
   */
  const dataset = createMemo<IStackedDataSet>(() =>
    stackByPeriod(income, activeFilterId(), ['salary', 'bonus'])
  );

  return (
    <div class="w-full h-full rounded-lg bg-gray-100 px-3 py-2 md:px-4 md:py-3 flex flex-col gap-2">
      {/* Title */}
      <h2 class="text-gray-600 font-semibold">Summary of income</h2>

      {/* Filters */}
      <div class="rounded border-gray-300 border flex justify-end text-sm text-gray-600 font-semibold">
        <For each={filters} fallback={<span>No filters</span>}>
          {(filter) => (
            <button
              class="transition-colors border-l px-3 py-1 cursor-pointer hover:bg-gray-300"
              classList={{ 'bg-gray-300': activeFilterId() === filter.id }}
              onClick={() => {
                setActiveFilterId(filter.id);
                console.dir(dataset());
              }}
            >
              {toTitle(filter.symbol)}
            </button>
          )}
        </For>
      </div>

      {/* Stacked Bar Chart */}
      <svg></svg>
    </div>
  );
};

export default IncomeReport;
