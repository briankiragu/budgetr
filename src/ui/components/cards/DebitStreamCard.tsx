import EditProjectedDebitDialog from "@components/dialogs/EditProjectedDebitDialog";
import NewProjectedDebitDialog from "@components/dialogs/NewProjectedDebitDialog";
import useFormatting from "@composables/useFormatting";
import {
  EProjectedExpenseCategory,
  type IDebitStream,
  type IProjectedCredit,
  type IProjectedDebit,
} from "@interfaces/budget";
import { For, Show, createSignal, type Component } from "solid-js";

const DebitStreamCard: Component<{
  stream: IDebitStream;
  credits: IProjectedCredit[];
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
      <div
        class={`transition-shadow ease-in p-6 ${isExpanded() ? "rounded-t-lg" : "rounded-lg"} min-h-32 bg-teal-600 dark:bg-teal-800 flex flex-col gap-2 lg:pb-6 lg:pt-4 justify-between hover:shadow-lg`}
      >
        <div class="absolute top-2 right-2 flex items-center">
          <button
            type="button"
            class="group flex items-center transition justify-center size-9 hover:bg-gray-600/40 rounded-full focus:outline-none"
            onClick={() => setIsExpanded(!isExpanded())}
          >
            <span class="material-symbols-outlined transition dark:text-gray-500 text-gray-600 group-hover:text-gray-300">
              {isExpanded() ? "unfold_less" : "unfold_more"}
            </span>
          </button>
        </div>

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
        </p>

        {/* Income stream fulfillment progress */}
        <div class="overflow-hidden rounded-full bg-gray-200">
          <div
            class={`h-1 rounded-full ${progress() > 100 ? "bg-red-500" : "bg-green-600"}`}
            style={`width: ${progress()}%`}
          ></div>
        </div>
      </div>

      {/* Breakdown */}
      <Show when={isExpanded()}>
        <ul class="flex flex-col gap-1 relative p-2 transition rounded-b-lg bg-teal-200">
          <For each={props.stream.projected}>
            {(debit) => (
              <li class="group min-h-12 flex justify-between items-center gap-2 text-sm bg-green-300 dark:bg-green-400 text-green-900 dark:text-gray-900 px-4 py-2 rounded-md">
                <span class="w-28">{debit.description}</span>
                <div class="flex items-center">
                  <span class="font-mono group-hover:hidden">
                    {debit.category === EProjectedExpenseCategory.PERCENTAGE
                      ? `${debit.amount}%`
                      : toPrice(debit.amount, debit.currency)}
                  </span>
                  <div class="hidden group-hover:block">
                    <EditProjectedDebitDialog
                      natures={props.natures}
                      credits={props.credits}
                      debit={debit}
                      submitHandler={props.submitHandler}
                    />
                  </div>
                </div>
              </li>
            )}
          </For>

          {/* New Debit */}
          <NewProjectedDebitDialog
            nature={props.stream.projected.at(0)?.nature}
            credits={props.credits}
            submitHandler={props.submitHandler}
          />
        </ul>
      </Show>
    </div>
  );
};

export default DebitStreamCard;
