import EditProjectedCreditDialog from "@components/dialogs/EditProjectedCreditDialog";
import useFormatting from "@composables/useFormatting";
import type { ICreditStream, IProjectedCredit } from "@interfaces/budget";
import type { Component } from "solid-js";

const CreditStreamCard: Component<{
  stream: ICreditStream;
  natures?: string[];
  submitHandler: (credit: IProjectedCredit) => Promise<void>;
}> = (props) => {
  // Get the methods from the composables.
  const { toPrice, toTitle } = useFormatting();

  // Calculate the total amount of this credit stream that was fulfilled.
  const fulfilled = (): number =>
    props.stream.actual.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );

  // Calculate the fulfillment progress.
  const progress = (): number =>
    (fulfilled() / props.stream.projected.amount) * 100;

  return (
    <div class="relative transition-shadow ease-in p-6 rounded-lg bg-indigo-600 dark:bg-indigo-800 flex flex-col gap-2 lg:pb-6 lg:pt-4 justify-between hover:shadow-lg">
      <EditProjectedCreditDialog
        natures={props.natures}
        credit={props.stream.projected}
        submitHandler={props.submitHandler}
      />

      <div class="flex flex-col">
        <h1 class="text-md text-white font-bold tracking-tight leading-3 md:text-lg">
          {toTitle(props.stream.projected.nature)}
        </h1>
        <small class="text-sm italic text-indigo-100">
          {props.stream.projected.description}
        </small>
      </div>

      {/* Income stream projected amount */}
      <p class="text-3xl text-indigo-50 tracking-tighter font-mono font-extrabold md:text-2xl">
        {toPrice(
          props.stream.projected.amount,
          props.stream.projected.currency,
        )}
      </p>

      {/* Income stream fulfillment progress */}
      <div class="overflow-hidden rounded-full bg-gray-200">
        <div
          class="h-1 rounded-full bg-green-600"
          style={`width: ${progress()}%`}
        ></div>
      </div>
    </div>
  );
};

export default CreditStreamCard;
