import useFormatting from "@composables/useFormatting";
import { ETransactionNature, type ITransaction } from "@interfaces/budget";
import type { Component } from "solid-js";
import { DEFAULT_CURRENCY } from "@lib/constants";

const ActualSavings: Component<{
  totalCredits: number;
  totalDebits: number;
  debitTransactions: ITransaction[];
}> = (props) => {
  // Get the methods from the composables.
  const { toPrice } = useFormatting();

  // Get the difference between the total credits against total debits.
  const surplus = (): number => props.totalCredits - props.totalDebits;

  // Get the total amount of savings transactions.
  const savings = (): number =>
    props.debitTransactions
      .filter((txn) => txn.nature === ETransactionNature.SAVING)
      .reduce((acc, txn) => acc + txn.amount, 0);

  // Get the total savings.
  const totalSavings = () => surplus() + savings();

  // Calculate the percentage of the income that was saved and/or not expended.
  const percentage = (): number =>
    (totalSavings() / props.totalCredits) * 100 || 0;

  // Check if the total amount saved is greater than 0.
  const improvement = (): boolean => totalSavings() > 0;

  return (
    <div class="transition-shadow ease-in duration-300 h-full rounded-lg px-6 py-6 bg-green-700 dark:bg-green-900 flex flex-col justify-between items-end text-right md:px-5 md:py-6 2xl:px-6 hover:shadow-lg">
      <div class="mb-2 flex flex-col">
        <h1 class="flex justify-end gap-2 text-md text-white font-semibold tracking-tight leading-4 md:text-lg">
          Savings
          {improvement() ? <span>🎉</span> : <span>😐</span>}
        </h1>
        <h2 class="text-2xl text-green-300 tracking-tighter font-mono font-black md:text-2xl">
          {toPrice(totalSavings(), DEFAULT_CURRENCY)}
        </h2>
      </div>

      {/* Percentage saved */}
      <p class="truncate text-7xl text-green-100 tracking-tighter font-mono font-black xl:text-8xl 2xl:text-9xl">
        {percentage().toFixed(1)}%
      </p>
    </div>
  );
};

export default ActualSavings;
