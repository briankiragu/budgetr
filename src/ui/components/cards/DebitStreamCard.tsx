// import EditProjectedDebitDialog from "@components/dialogs/EditProjectedDebitDialog";
import useFormatting from "@composables/useFormatting";
import type { IDebitStream, IProjectedDebit } from "@interfaces/budget";
import type { Component } from "solid-js";

const DebitStreamCard: Component<{
  stream: IDebitStream;
  natures?: string[];
  submitHandler: (credit: IProjectedDebit) => Promise<void>;
}> = (props) => {
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
    (fulfilled() /
      props.stream.projected.reduce((acc, debit) => acc + debit.amount, 0)) *
    100;

  return (
    <div class="relative transition-shadow ease-in p-6 rounded-lg bg-teal-600 dark:bg-teal-800 flex flex-col gap-2 lg:pb-6 lg:pt-4 justify-between hover:shadow-lg">
      {/* <EditProjectedDebitDialog
        natures={props.natures}
        credit={props.stream.projected}
        submitHandler={props.submitHandler}
      /> */}

      <div class="flex flex-col">
        <h1 class="text-md text-white font-bold tracking-tight leading-3 md:text-lg">
          {toTitle(props.stream.projected.at(0)?.nature)}
        </h1>
      </div>

      {/* Income stream projected amount */}
      <p class="text-wrap flex items-end justify-between gap-2 text-3xl text-teal-50 tracking-tighter font-mono font-extrabold md:text-2xl">
        <span>
          {toPrice(fulfilled(), props.stream.projected.at(0)?.currency)}
        </span>
        {/* <span class="text-sm">({progress().toFixed(0)}%)</span> */}
      </p>

      {/* Income stream fulfillment progress */}
      <div class="overflow-hidden rounded-full bg-gray-200">
        <div
          class="h-1 rounded-full bg-red-400"
          style={`width: ${progress()}%`}
        ></div>
      </div>
    </div>
  );
};

export default DebitStreamCard;
