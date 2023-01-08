// Import interfaces...
import type { Component } from 'solid-js';
import type { IIncomeStream } from '@/interfaces/budget';

// Import necessary composables...
import { toPrice, toTitle } from '@composables/useFormatting';

// Define the component.
const IncomeStream: Component<{ stream: IIncomeStream }> = (props) => {
  // Calculate the total amount of this income stream that was fulfilled.
  const fulfilled = (): number =>
    props.stream.actual.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );

  // Calculate the fulfillment progress.
  const progress = (): number =>
    (fulfilled() / props.stream.projected.amount) * 100;

  // Return the component's JSX.
  return (
    <div class="transition-shadow ease-in rounded-lg px-6 py-4 bg-indigo-400 flex flex-col gap-2 justify-between md:px-8 md:py-6 xl:px-5 hover:shadow-lg">
      <div class="flex flex-col">
        <h1 class="mb-1 text-md text-indigo-200 font-medium tracking-tight leading-3 md:mb-0 md:text-lg">
          {toTitle(props.stream.projected.source)}
        </h1>
        <small class="text-sm text-indigo-600">
          {toTitle(props.stream.projected.description?.toLowerCase() ?? '')}
        </small>
      </div>

      {/* Income stream projected amount */}
      <p class="text-3xl text-indigo-50 tracking-tighter font-extrabold md:text-2xl">
        {toPrice(
          props.stream.projected.amount,
          props.stream.projected.currency
        )}
      </p>

      {/* Income stream fulfillment progress */}
      <progress
        id={`income-stream-${props.stream.projected.uid}`}
        class="w-full h-1 rounded-xl"
        value={fulfilled()}
        max={props.stream.projected.amount}
      >
        {progress()}
      </progress>
    </div>
  );
};

// Export the component.
export default IncomeStream;
