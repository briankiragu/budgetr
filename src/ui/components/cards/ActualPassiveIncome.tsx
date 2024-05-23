import type { Component } from "solid-js";
import { ETransactionNature, type ITransaction } from "@interfaces/budget";
import useFormatting from "@composables/useFormatting";
import { DEFAULT_CURRENCY } from "@lib/constants";

const ActualPassiveIncome: Component<{
  totalCredits: number;
  creditTransactions: ITransaction[];
}> = (props) => {
  // Get the methods from the composables.
  const { toPrice } = useFormatting();

  // Get the total amount of passive credit transactions.
  const totalPassiveIncome = (): number =>
    props.creditTransactions
      .filter((txn) => txn.nature === ETransactionNature.PASSIVE)
      .reduce((acc, txn) => acc + txn.amount, 0);

  // Calculate the percentage difference between the projected and actual income.
  const percentage = (): number =>
    (totalPassiveIncome() / props.totalCredits) * 100 || 0;

  return (
    <div class="transition-shadow ease-in duration-300 h-full rounded-lg px-6 py-6 bg-cyan-700 flex flex-col justify-between items-end text-right md:px-5 md:py-6 2xl:px-6 hover:shadow-lg">
      <div class="mb-2 flex flex-col">
        <h1 class="flex justify-end gap-2 text-md text-white font-semibold tracking-tight leading-4 md:text-lg">
          Passive income
          {totalPassiveIncome() ? <span>🎉🎉</span> : <span>😐</span>}
        </h1>
        <h2 class="text-2xl text-cyan-100 tracking-tighter font-mono font-extrabold md:text-2xl">
          {toPrice(totalPassiveIncome(), DEFAULT_CURRENCY)}
        </h2>
      </div>

      {/* Percentage saved */}
      <p class="truncate text-7xl text-cyan-100 tracking-tighter font-mono font-black xl:text-8xl 2xl:text-9xl">
        {percentage().toFixed(1)}%
      </p>
    </div>
  );
};

export default ActualPassiveIncome;
