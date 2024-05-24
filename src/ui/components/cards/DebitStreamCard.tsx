import useFormatting from "@composables/useFormatting";
import type { ITransaction } from "@interfaces/budget";
import type { Component } from "solid-js";

const DebitStreamCard: Component<{ item: ITransaction }> = (props) => {
  // Get the methods from the composables.
  const { toPrice, toTitle } = useFormatting();

  return (
    <div class="transition-shadow ease-in rounded-lg px-6 py-4 bg-teal-400 flex flex-col justify-between md:px-8 md:py-6 xl:px-5 hover:shadow-lg">
      <h1 class="mb-1 flex flex-col justify-between text-md text-teal-700 font-medium tracking-tight leading-3 md:text-md">
        {toTitle(props.item.nature)}
        <small class="text-sm text-teal-600">
          {toTitle(props.item.description?.toLowerCase() ?? "")}
        </small>
      </h1>
      <p class="text-3xl text-teal-50 tracking-tighter font-mono font-extrabold md:text-2xl">
        {toPrice(props.item.amount, props.item.currency)}
      </p>
    </div>
  );
};

export default DebitStreamCard;
