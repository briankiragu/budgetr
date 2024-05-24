import useFormatting from "@composables/useFormatting";
import type { ICreditStream } from "@interfaces/budget";
import type { Component } from "solid-js";

const CreditStreamCard: Component<{ stream: ICreditStream }> = (props) => {
  // Get the methods from the composables.
  const { toPrice, toTitle } = useFormatting();

  // Calculate the total amount of this income stream that was fulfilled.
  const fulfilled = (): number =>
    props.stream.actual.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );

  // Calculate the fulfillment progress.
  const progress = (): number =>
    (fulfilled() / props.stream.projected.amount) * 100;

  return (
    <div class="transition-shadow ease-in rounded-lg px-6 py-4 bg-indigo-600 dark:bg-indigo-800 flex flex-col gap-2 justify-between md:px-8 md:py-6 xl:px-5 hover:shadow-lg">
      <div class="flex flex-col">
        <h1 class="mb-1 text-md text-white font-bold tracking-tight leading-3 md:mb-0 md:text-lg">
          {toTitle(props.stream.projected.nature)}
        </h1>
        <small class="text-sm italic text-indigo-100">
          {props.stream.projected.description}
        </small>
      </div>

      {/* Income stream projected amount */}
      <p class="text-3xl text-indigo-50 tracking-tighter font-mono font-extrabold md:text-2xl">
        {toPrice(fulfilled(), props.stream.projected.currency)}
      </p>

      {/* Income stream fulfillment progress */}
      <div class="overflow-hidden rounded-full bg-gray-200">
        <div
          class="h-1 rounded-full bg-gradient-to-r from-green-600 to-blue-900"
          style={`width: ${progress()}%`}
        ></div>
      </div>
    </div>
  );
};

export default CreditStreamCard;
