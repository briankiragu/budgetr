// Import SolidJS interfaces...
import { generateUID } from '@/composables/useIdentity';
import {
  ETransactionFrequencyUnit,
  ETransactionNature,
  IProjectedIncome,
} from '@/interfaces/budget';
import type { Component } from 'solid-js';
import { Show } from 'solid-js';

// Import the SolidJS modules...
import { createStore } from 'solid-js/store';

// Define the component.
const ProjectedIncomeDialog: Component<{
  onSubmit: Function;
}> = (props) => {
  // Create a template ref to the dialog.
  let dialogRef: HTMLDialogElement;

  // Create a signal to hold the form state.
  const [state, setState] = createStore({
    source: '',
    amount: 0,
    currency: 'ZAR',
    description: '',
    frequencyRecurring: '',
    frequencyValue: 1,
    frequencyUnit: 'month',
    frequencyStart: new Date().toISOString(),
    frequencyEnd: undefined,
  });

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
    const value = (event.target as HTMLInputElement).value;

    // Update the state.
    setState({ [field]: value });
  };

  const handleSubmission = (e: Event): void => {
    // Prevent the default form submission.
    e.preventDefault();

    // Format the state.
    const data: IProjectedIncome = {
      uid: generateUID(),
      refs: null,
      source: state.source,
      nature: ETransactionNature.Income,
      amount: parseFloat(state.amount.toString()),
      currency: state.currency,
      description: state.description,
      frequency: {
        recurring: ['on', 'true'].includes(state.frequencyRecurring),
        value: parseInt(state.frequencyValue.toString(), 10),
        unit: state.frequencyUnit as ETransactionFrequencyUnit,
        start: state.frequencyStart,
        end: state.frequencyEnd,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Call the parent's on submit function.
    props.onSubmit(data);

    // Close the dialog.
    handleDialogClose('close');
  };

  return (
    <>
      {/* Trigger */}
      <button
        class="transition-all ease-in w-14 h-14 rounded-full bg-indigo-500 text-indigo-50 text-sm md:w-auto md:h-auto md:px-6 md:py-2 md:rounded-md md:text-base hover:shadow-lg"
        onClick={handleDialogTrigger}
      >
        New
      </button>

      {/* Dialog */}
      <dialog
        ref={dialogRef}
        id="MegaDialog"
        modal-mode="mega"
        class="w-full rounded-md md:w-[50vw]"
      >
        <form method="dialog">
          <header class="shadow px-5 py-3 flex gap-4 justify-between items-center">
            <h3 class="text-2xl font-bold">Projected Income</h3>
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
              <label for="source" class="flex flex-col">
                Source
                <input
                  type="text"
                  id="source"
                  name="source"
                  value={state.source}
                  placeholder="E.g. Salary"
                  class="w-full rounded px-4 py-2 bg-gray-100 text-sm text-gray-700 tracking-tight focus:outline-none"
                  required
                  onInput={[handleFormInput, 'source']}
                />
              </label>
            </div>

            {/* Amount and currency */}
            <div class="col-span-1 grid grid-cols-6 gap-3 md:gap-6">
              {/* Amount */}
              <div class="col-span-4">
                <label for="amount" class="flex flex-col">
                  Amount
                  <input
                    type="number"
                    id="amount"
                    name="amount"
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
                <label for="currency" class="flex flex-col">
                  Currency
                  <select
                    id="currency"
                    name="currency"
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

            {/* Frequency */}
            <div class="col-span-1 grid grid-cols-6 gap-4">
              <h3 class="text-2xl font-semibold">Frequency</h3>

              {/* Recurring */}
              <div class="col-span-6">
                <label for="recurring" class="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id="recurring"
                    name="recurring"
                    required
                    onInput={[handleFormInput, 'frequencyRecurring']}
                  />
                  This is a recurring income stream.
                </label>
              </div>

              <Show when={state.frequencyRecurring}>
                {/* Value and Unit */}
                <div class="col-span-6 grid grid-cols-3 gap-3 justify-between items-center md:gap-6">
                  {/* Value */}
                  <div class="col-span-2">
                    <label
                      for="frequency-value"
                      class="flex gap-6 items-center"
                    >
                      Every
                      <input
                        type="number"
                        id="frequency-value"
                        name="value"
                        value={state.frequencyValue}
                        min="1"
                        step="1"
                        class="w-full rounded-md px-4 py-2 bg-gray-100 text-sm text-gray-700 tracking-tight focus:outline-none"
                        required
                        onInput={[handleFormInput, 'frequencyValue']}
                      />
                    </label>
                  </div>

                  {/* Unit */}
                  <div class="col-span-1">
                    <label
                      for="frequency-value"
                      class="flex gap-2 items-center"
                    >
                      <select
                        id="frequency-unit"
                        name="unit"
                        value={state.frequencyUnit}
                        class="w-full rounded px-4 py-2 bg-gray-100 text-right text-sm text-gray-700 tracking-tight focus:outline-none"
                        required
                        onInput={[handleFormInput, 'frequencyUnit']}
                      >
                        <option value="day">days</option>
                        <option value="week">weeks</option>
                        <option value="month" selected>
                          months
                        </option>
                        <option value="year">years</option>
                      </select>
                    </label>
                  </div>
                </div>
              </Show>

              {/* Start Date */}
              <div class="col-span-6">
                <label for="frequency-start" class="flex flex-col">
                  Starting from
                  <input
                    type="datetime-local"
                    id="frequency-start"
                    name="start"
                    value={state.frequencyStart}
                    class="w-full rounded-md px-4 py-2 bg-gray-100 text-sm text-gray-700 tracking-tight focus:outline-none"
                    required
                    onInput={[handleFormInput, 'frequencyStart']}
                  />
                </label>
              </div>

              {/* End Date */}
              <div class="col-span-6">
                <label for="frequency-end" class="flex flex-col">
                  Ending on
                  <input
                    type="datetime-local"
                    id="frequency-end"
                    name="end"
                    value={state.frequencyEnd}
                    class="w-full rounded-md px-4 py-2 bg-gray-100 text-sm text-gray-700 tracking-tight focus:outline-none"
                    onInput={[handleFormInput, 'frequencyEnd']}
                  />
                </label>
              </div>
            </div>

            <hr />

            {/* Description */}
            <div class="col-span-1">
              <label for="description" class="flex flex-col">
                Description
                <textarea
                  id="description"
                  name="description"
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
                class="rounded-md px-5 py-2 bg-indigo-500 text-sm text-indigo-50 font-medium tracking-tight"
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
export default ProjectedIncomeDialog;
