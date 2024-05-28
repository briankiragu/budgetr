// import EditProjectedDebitDialog from "@components/dialogs/EditProjectedDebitDialog";
import useFormatting from "@composables/useFormatting";
import type { IDebitStream, IProjectedDebit } from "@interfaces/budget";
import { For, Show, createSignal, type Component } from "solid-js";

const DebitStreamCard: Component<{
  stream: IDebitStream;
  natures?: string[];
  submitHandler: (credit: IProjectedDebit) => Promise<void>;
}> = (props) => {
  // Get the methods from the composables.
  const { toPrice, toTitle } = useFormatting();

  // Is the debit stream expanded.
  const [isExpanded, setIsExpanded] = createSignal<boolean>(false);

  // Calculate the total amount of this debit stream that was projected.
  const projected = (): number =>
    props.stream.projected.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );

  // Calculate the total amount of this debit stream that was fulfilled.
  const fulfilled = (): number =>
    props.stream.actual.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );

  // Calculate the fulfillment progress.
  const progress = (): number => (fulfilled() / projected()) * 100;

  return (
    <div class="relative">
      <div class="transition-shadow ease-in p-6 rounded-lg bg-teal-600 dark:bg-teal-800 flex flex-col gap-2 lg:pb-6 lg:pt-4 justify-between hover:shadow-lg">
        {/* <EditProjectedDebitDialog
        natures={props.natures}
        credit={props.stream.projected}
        submitHandler={props.submitHandler}
      /> */}
        <button
          type="button"
          class="group flex items-center transition justify-center absolute top-2 right-2 size-9 hover:bg-gray-600/40 rounded-full"
          onClick={() => setIsExpanded(!isExpanded())}
        >
          <span class="material-symbols-outlined transition text-gray-600 group-hover:text-gray-300">
            unfold_more
          </span>
        </button>

        <div class="flex flex-col">
          <h1 class="text-md text-white font-bold tracking-tight leading-3 md:text-lg">
            {toTitle(props.stream.projected.at(0)?.nature)}
          </h1>
        </div>

        {/* Income stream projected amount */}
        <p class="text-wrap flex items-end justify-between gap-2 text-3xl text-teal-50 tracking-tighter font-mono font-extrabold md:text-2xl">
          <span>
            {toPrice(projected(), props.stream.projected.at(0)?.currency)}
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

      {/* Breakdown */}
      <Show when={isExpanded()}>
        <ul class="flex flex-col gap-1 relative -top-4 p-2 pt-6 -z-10 transition rounded-b-lg bg-teal-200">
          <For each={props.stream.projected}>
            {(debit) => (
              <li class="flex justify-between items-center gap-2 text-sm bg-green-300 text-green-900 px-4 py-2 rounded-md">
                <span class="">{debit.description}</span>
                <span class="font-mono">
                  {toPrice(debit.amount, debit.currency)}
                </span>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
};

export default DebitStreamCard;
