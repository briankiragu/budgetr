// Import the enums...
import {
  ETransactionType,
  type IProjectedIncome,
  type ITransaction,
} from '@interfaces/budget';

// Import the SolidJS modules...
import { For, Show } from 'solid-js';
import { createStore } from 'solid-js/store';

// Import interfaces...
import type { Component } from 'solid-js';
import type { IProjectedExpense } from '@interfaces/budget';
import type { ITransactionForm } from '@interfaces/forms';
import useFormatting from '@composables/useFormatting';
import useIdentity from '@composables/useIdentity';

// Define the component.
const NewTransactionDialog: Component<{
  streams: IProjectedIncome[];
  expenses: IProjectedExpense[];
}> = ({ streams, expenses }) => {
  // Create a template ref to the dialog.
  let dialogRef: HTMLDialogElement;

  // Create a signal to hold the form state.
  const [state, setState] = createStore<ITransactionForm>({
    refs: [],
    nature: '',
    amount: 10,
    currency: 'ZAR',
    description: '',
  });

  const references = (): ITransaction[] =>
    [...streams, ...expenses].filter((txn) => txn.nature === state.nature);

  // Get the composables
  const { toPrice, toTitle } = useFormatting();
  const { generateUid } = useIdentity();

  // Create a function to handle the dialog trigger.
  const handleDialogTrigger = (): void => {
    // Open the dialog.
    dialogRef.showModal();
  };

  // Create a function to handle the dialog close/cancel.
  const handleDialogClose = (reason: 'close' | 'cancel'): void => {
    // Close the dialog.
    dialogRef.close(reason);
  };

  const handleFormInput = (field: string, event: Event): void => {
    // Get the value from the event.
    const { value } = event.target as HTMLInputElement;

    // Update the state.
    setState({ [field]: value });
  };

  const handleFormChecked = (field: 'refs', event: Event): void => {
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

      // Update the state.
      setState({ [field]: clone });
    } else {
      // Add it.
      clone.push(value);

      // Update the state.
      setState({ [field]: clone });
    }
  };

  const handleSubmission = (e: Event): void => {
    // Prevent the default form submission.
    e.preventDefault();

    // Format the state.
    const data: ITransaction = {
      uid: generateUid(),
      refs: state.refs,
      nature: state.nature,
      amount: parseFloat(state.amount.toString()),
      type: ETransactionType.CREDIT,
      currency: state.currency,
      description: state.description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Close the dialog.
    handleDialogClose('close');

    // Reset the state.
    setState({
      refs: [],
      nature: '',
      amount: 0,
      currency: 'ZAR',
      description: '',
    });
  };

  return (
    <>
      {/* Trigger */}
      <button
        class="transition-all ease-in w-14 h-14 rounded-full bg-rose-700 text-rose-50 text-sm md:w-auto md:h-auto md:px-6 md:py-2 md:rounded-md md:text-base hover:shadow-lg"
        onClick={handleDialogTrigger}
      >
        New
      </button>

      {/* Dialog */}
      <dialog
        ref={dialogRef}
        id="TransactionMegaDialog"
        modal-mode="mega"
        class="w-full rounded-md p-0 md:w-[50vw]"
      >
        <form method="dialog">
          <header class="shadow px-5 py-3 flex gap-4 justify-between items-center">
            <h3 class="text-2xl font-bold">Transaction</h3>
            <button
              class="transition-colors w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-semibold hover:bg-gray-200"
              onClick={[handleDialogClose, 'close']}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
              </svg>
            </button>
          </header>

          <article class="h-[60vh] overflow-y-scroll px-7 py-4 grid grid-cols-1 gap-4 text-sm text-gray-600 md:px-8 md:py-8">
            {/* Source */}
            <div class="col-span-1">
              <label for="new-transaction-source" class="flex flex-col">
                Source
                <input
                  type="text"
                  id="new-transaction-source"
                  name="new-transaction-source"
                  value={state.nature}
                  placeholder="E.g. Salary"
                  class="w-full rounded px-4 py-2 bg-gray-100 text-sm text-gray-700 tracking-tight focus:outline-none"
                  required
                  onInput={[handleFormInput, 'source']}
                />
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
                  class="w-full rounded px-4 py-2 bg-gray-100 text-sm text-gray-700 tracking-tight focus:outline-none"
                  required
                  onInput={[handleFormInput, 'nature']}
                >
                  <option value={ETransactionType.CREDIT}>
                    {toTitle(ETransactionType.CREDIT)}
                  </option>
                  <option value={ETransactionType.CREDIT}>
                    {toTitle(ETransactionType.CREDIT)}
                  </option>
                  <option value={ETransactionType.CREDIT}>
                    {toTitle(ETransactionType.CREDIT)}
                  </option>
                  <option value={ETransactionType.DEBIT}>
                    {toTitle(ETransactionType.DEBIT)}
                  </option>
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
                    class="w-full rounded px-4 py-2 bg-gray-100 text-sm text-gray-700 tracking-tight focus:outline-none"
                    required
                    onInput={[handleFormInput, 'amount']}
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
                    class="w-full rounded px-4 py-2 bg-gray-100 text-right text-sm text-gray-700 tracking-tight focus:outline-none"
                    required
                    onInput={[handleFormInput, 'currency']}
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
                    <label
                      for={`refs-${txn.uid}`}
                      class="col-span-1 flex gap-2"
                    >
                      <input
                        type="checkbox"
                        id={`refs-${txn.uid}`}
                        name="refs"
                        value={txn.uid}
                        checked={state.refs.includes(txn.uid)}
                        onInput={[handleFormChecked, 'refs']}
                      />
                      {toTitle(txn.nature)} (
                      <Show
                        when={
                          (txn as IProjectedExpense).type ===
                          ETransactionType.DEBIT
                        }
                        fallback={toPrice(txn.amount, txn.currency ?? '')}
                      >
                        {txn.amount}%
                      </Show>
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
                  class="w-full rounded-md px-4 py-2 bg-gray-100 text-sm text-gray-700 tracking-tight focus:outline-none"
                  onInput={[handleFormInput, 'description']}
                />
              </label>
            </div>
          </article>

          <footer>
            <menu class="border-t px-5 py-3 flex justify-between">
              <button
                autofocus
                type="reset"
                onClick={[handleDialogClose, 'cancel']}
                class="rounded-md px-5 py-2 bg-gray-100 text-sm text-gray-700 font-medium tracking-tight"
              >
                Cancel
              </button>
              <button
                type="submit"
                value="confirm"
                class="rounded-md px-5 py-2 bg-rose-500 text-sm text-rose-50 font-medium tracking-tight"
                onClick={(e) => {
                  handleSubmission(e);
                }}
              >
                Confirm
              </button>
            </menu>
          </footer>
        </form>
      </dialog>
    </>
  );
};

// Export the component.
export default NewTransactionDialog;
