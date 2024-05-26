import useFormatting from "@composables/useFormatting";
import useIdentity from "@composables/useIdentity";
import {
  EProjectedExpenseCategory,
  ETransactionType,
  type IProjectedCredit,
  type IProjectedDebit,
  type ITransaction,
} from "@interfaces/budget";
import type { ITransactionForm } from "@interfaces/forms";
import { DEFAULT_CURRENCY } from "@lib/constants";
import { For, type Component } from "solid-js";
import { createStore } from "solid-js/store";

const TransactionForm: Component<{
  natures: { credit: string[]; debit: string[] };
  credits: IProjectedCredit[];
  debits: IProjectedDebit[];
  transaction?: ITransaction;
  closeHandler: (reason: "close" | "cancel") => void;
  submitHandler: (txn: ITransaction) => Promise<void>;
}> = (props) => {
  // Get the composables
  const { toPrice, toTitle } = useFormatting();
  const { generateUid } = useIdentity();

  // Create a signal to hold the form state.
  const [state, setState] = createStore<ITransactionForm>({
    refs: props.transaction?.refs || [],
    type: props.transaction?.type || ETransactionType.DEBIT,
    nature: props.transaction?.nature || "",
    amount: props.transaction?.amount || 10,
    currency: props.transaction?.currency || DEFAULT_CURRENCY,
    description: props.transaction?.description || "",
  });

  // Get the natures.
  const allNatures = () => props.natures[state.type];

  // Get the references.
  const references = (): IProjectedCredit[] | IProjectedDebit[] =>
    [...props.credits, ...props.debits].filter(
      (txn) => txn.type === state.type && txn.nature === state.nature,
    );

  const handleFormInput = (field: string, event: Event): void => {
    // Get the value from the event.
    const { value } = event.target as HTMLInputElement;

    // Update the state.
    setState({ [field]: value });
  };

  const handleFormChecked = (field: "refs", event: Event): void => {
    // Get the value from the event.
    const { value } = event.target as HTMLInputElement;

    // Create a clone of the array.
    const clone = [...state[field]];

    // Check if the value exists in the array.
    const index = clone.indexOf(value);

    // If the value exists, remove it.
    if (index > -1) {
      // Remove the value from the clone.
      clone.splice(index, 1);
    } else {
      // Add it.
      clone.push(value);
    }

    // Update the state.
    setState({ [field]: clone });
  };

  const handleSubmission = (e: Event): void => {
    // Prevent the default form submission.
    e.preventDefault();

    // Format the state.
    const data: ITransaction = {
      uid: props.transaction?.uid ?? generateUid(),
      refs: state.refs,
      nature: state.nature,
      amount: parseFloat(state.amount.toString()),
      type: state.type,
      currency: state.currency,
      description: state.description,
      createdAt: props.transaction?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: props.transaction?.publishedAt ?? new Date().toISOString(),
    };

    // Submit the data.
    props.submitHandler(data);

    // Close the dialog.
    props.closeHandler("close");

    // Reset the state.
    setState({
      refs: props.transaction?.refs || [],
      type: props.transaction?.type || ETransactionType.DEBIT,
      nature: props.transaction?.nature || "",
      amount: props.transaction?.amount || 10,
      currency: props.transaction?.currency || DEFAULT_CURRENCY,
      description: props.transaction?.description || "",
    });
  };

  return (
    <form method="dialog">
      <header class="flex items-center justify-between gap-4 px-5 py-3 shadow">
        <h3 class="text-2xl font-bold">Transaction</h3>
        <button
          class="group flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-current"
          onClick={[props.closeHandler, "close"]}
        >
          <span class="material-symbols-outlined transition text-indigo-600 group-hover:text-indigo-50">
            close
          </span>
        </button>
      </header>

      <article class="grid h-[60vh] grid-cols-1 gap-4 overflow-y-scroll px-7 py-4 text-sm text-gray-600 md:px-8 md:py-8 dark:text-gray-50">
        {/* Type */}
        <div class="col-span-1">
          <label for="new-transaction-type" class="flex flex-col">
            Type
            <select
              id="new-transaction-type"
              name="new-transaction-type"
              value={state.type}
              class="w-full rounded bg-gray-100 px-4 py-2 text-sm tracking-tight text-gray-700 focus:outline-none"
              required
              onInput={[handleFormInput, "type"]}
            >
              <option value={ETransactionType.CREDIT}>
                {toTitle(ETransactionType.CREDIT)}
              </option>
              <option value={ETransactionType.DEBIT}>
                {toTitle(ETransactionType.DEBIT)}
              </option>
            </select>
          </label>
        </div>

        {/* Nature */}
        <div class="col-span-1">
          <label for="new-transaction-nature" class="flex flex-col">
            Nature
            <select
              id="new-transaction-nature"
              name="new-transaction-nature"
              value={state.nature}
              class="w-full rounded bg-gray-100 px-4 py-2 text-sm tracking-tight text-gray-700 focus:outline-none"
              required
              onInput={[handleFormInput, "nature"]}
            >
              <For each={allNatures()}>
                {(nature) => <option value={nature}>{toTitle(nature)}</option>}
              </For>
            </select>
          </label>
        </div>

        {/* Amount and currency */}
        <div class="col-span-1 grid grid-cols-6 gap-3 md:gap-6">
          {/* Amount */}
          <div class="col-span-4">
            <label for="new-transaction-amount" class="flex flex-col">
              Amount
              <input
                type="number"
                id="new-transaction-amount"
                name="new-transaction-amount"
                value={state.amount}
                min="1"
                placeholder="E.g. 65800"
                class="w-full rounded bg-gray-100 px-4 py-2 text-sm tracking-tight text-gray-700 focus:outline-none"
                required
                onInput={[handleFormInput, "amount"]}
              />
            </label>
          </div>

          {/* Currency */}
          <div class="col-span-2">
            <label for="new-transaction-currency" class="flex flex-col">
              Currency
              <select
                id="new-transaction-currency"
                name="new-transaction-currency"
                value={state.currency}
                class="w-full rounded bg-gray-100 px-4 py-2 text-right text-sm tracking-tight text-gray-700 focus:outline-none"
                required
                onInput={[handleFormInput, "currency"]}
              >
                <option value="ZAR">ZAR</option>
                <option value="KES">KES</option>
                <option value="USD">USD</option>
              </select>
            </label>
          </div>
        </div>

        <hr />

        {/* References & Total */}
        <div class="col-span-1 grid grid-cols-6 gap-4">
          <h3 class="text-2xl font-semibold">References</h3>

          {/* References */}
          <div class="col-span-6 flex flex-col gap-1">
            <For each={references()}>
              {(txn) => (
                <label for={`refs-${txn.uid}`} class="col-span-1 flex gap-2">
                  <input
                    type="checkbox"
                    id={`refs-${txn.uid}`}
                    name="refs"
                    value={txn.uid}
                    checked={state.refs.includes(txn.uid)}
                    onInput={[handleFormChecked, "refs"]}
                  />
                  {toTitle(txn.description ?? txn.nature)} (
                  {(txn as IProjectedDebit).category ===
                  EProjectedExpenseCategory.PERCENTAGE
                    ? `${txn.amount}%`
                    : toPrice(txn.amount, txn.currency ?? "")}
                  )
                </label>
              )}
            </For>
          </div>
        </div>

        <hr />

        {/* Description */}
        <div class="col-span-1">
          <label for="new-transaction-description" class="flex flex-col">
            Description
            <textarea
              id="new-transaction-description"
              name="new-transaction-description"
              value={state.description}
              rows="5"
              placeholder="E.g. Salary payment for the month of February 2023."
              class="w-full rounded-md bg-gray-100 px-4 py-2 text-sm tracking-tight text-gray-700 focus:outline-none"
              onInput={[handleFormInput, "description"]}
            />
          </label>
        </div>
      </article>

      <footer>
        <menu class="flex justify-between border-t px-5 py-3">
          <button
            autofocus
            type="reset"
            onClick={[props.closeHandler, "cancel"]}
            class="rounded-md bg-gray-100 px-5 py-2 text-sm font-medium tracking-tight text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            value="confirm"
            class="rounded-md bg-rose-500 px-5 py-2 text-sm font-medium tracking-tight text-rose-50"
            onClick={(e) => {
              handleSubmission(e);
            }}
          >
            Confirm
          </button>
        </menu>
      </footer>
    </form>
  );
};

export default TransactionForm;
