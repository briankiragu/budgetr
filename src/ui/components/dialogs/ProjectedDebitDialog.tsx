import useFormatting from "@composables/useFormatting";
import useIdentity from "@composables/useIdentity";
import {
  EProjectedExpenseCategory,
  ETransactionFrequencyPeriod,
  type IProjectedCredit,
} from "@interfaces/budget";
import type { IProjectedDebitForm } from "@interfaces/forms";
import type { Component } from "solid-js";
import { For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { DEFAULT_CURRENCY } from "@lib/constants";

// Define the component.
const ProjectedDebitDialog: Component<{
  natures: string[];
  credits: IProjectedCredit[];
}> = ({ natures, credits }) => {
  // Create a template ref to the dialog.
  let dialogRef: HTMLDialogElement;

  // Create a signal to hold the form state.
  const [state, setState] = createStore<IProjectedDebitForm>({
    refs: credits.map((stream) => stream.uid),
    nature: "",
    description: "",
    category: EProjectedExpenseCategory.FIXED,
    amount: 10,
    currency: DEFAULT_CURRENCY,
    frequencyRecurring: "true",
    frequencyUnit: ETransactionFrequencyPeriod.MONTH,
    frequencyValue: 1,
    frequencyStart: new Date().toISOString(),
    frequencyEnd: undefined,
  });

  const isPercentage = (): boolean =>
    state.category === EProjectedExpenseCategory.PERCENTAGE;
  const showFrequency = (): boolean => state.frequencyRecurring === "true";
  const calculatedAmount = (): number =>
    credits
      .filter((stream) => state.refs.includes(stream.uid))
      .reduce((acc, stream) => acc + stream.amount, 0) *
    (state.amount / 100);

  // Get the composables
  const { toPrice, toTitle } = useFormatting();
  useIdentity();

  // Create a function to handle the dialog trigger.
  const handleDialogTrigger = (): void => {
    // Open the dialog.
    dialogRef.showModal();
  };

  // Create a function to handle the dialog close/cancel.
  const handleDialogClose = (reason: "close" | "cancel"): void => {
    // Close the dialog.
    dialogRef.close(reason);
  };

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
    console.dir(state);

    // Close the dialog.
    handleDialogClose("close");

    // Reset the state.
    setState({
      refs: credits.map((credit) => credit.uid),
      category: EProjectedExpenseCategory.FIXED,
      amount: 0,
      currency: DEFAULT_CURRENCY,
      nature: "",
      description: "",
      frequencyRecurring: "true",
      frequencyValue: 1,
      frequencyUnit: ETransactionFrequencyPeriod.MONTH,
      frequencyStart: new Date().toISOString(),
      frequencyEnd: undefined,
    });
  };

  return (
    <>
      {/* Trigger */}
      <button
        class="h-14 w-14 rounded-full bg-teal-700 text-sm text-teal-50 transition-all ease-in hover:shadow-lg md:h-auto md:w-auto md:rounded-md md:px-6 md:py-2 md:text-base"
        onClick={handleDialogTrigger}
      >
        New
      </button>

      {/* Dialog */}
      <dialog
        ref={dialogRef!}
        id="ProjectedExpenseMegaDialog"
        modal-mode="mega"
        class="w-full rounded-md p-0 md:w-[50vw]"
      >
        <form method="dialog">
          <header class="flex items-center justify-between gap-4 px-5 py-3 shadow">
            <h3 class="text-2xl font-bold">Projected Expense</h3>
            <button
              class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-700 transition-colors hover:bg-gray-200"
              onClick={[handleDialogClose, "close"]}
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

          <article class="grid h-[60vh] grid-cols-1 gap-4 overflow-y-scroll px-7 py-4 text-sm text-gray-600 md:px-8 md:py-8">
            {/* Source */}
            <div class="col-span-1">
              <label for="projected-credit-source" class="flex flex-col">
                Nature
                <select
                  id="projected-credit-source"
                  name="projected-credit-source"
                  value={state.nature}
                  class="w-full rounded bg-gray-100 px-4 py-2 text-sm tracking-tight text-gray-700 focus:outline-none"
                  required
                  onInput={[handleFormInput, "nature"]}
                >
                  <For each={natures}>
                    {(nature) => (
                      <option value={nature}>{toTitle(nature)}</option>
                    )}
                  </For>
                </select>
              </label>
            </div>

            {/* Description */}
            <div class="col-span-1">
              <label for="projected-credit-description" class="flex flex-col">
                Description
                <input
                  id="projected-credit-description"
                  name="projected-credit-description"
                  value={state.description}
                  placeholder="E.g. Rent payment for the month."
                  class="w-full rounded-md bg-gray-100 px-4 py-2 text-sm tracking-tight text-gray-700 focus:outline-none"
                  onInput={[handleFormInput, "description"]}
                />
              </label>
            </div>
            <hr />

            {/* Type - Fixed or Percentage */}
            <div class="col-span-1">
              <label for="projected-credit-category" class="flex flex-col">
                Type
                <select
                  id="projected-credit-category"
                  name="projected-credit-category"
                  value={state.category}
                  class="w-full rounded bg-gray-100 px-4 py-2 text-sm tracking-tight text-gray-700 focus:outline-none"
                  required
                  onInput={[handleFormInput, "category"]}
                >
                  <For each={Object.values(EProjectedExpenseCategory)}>
                    {(category) => (
                      <option value={category}>{toTitle(category)}</option>
                    )}
                  </For>
                </select>
              </label>
            </div>

            {/* Amount and currency */}
            <div class="col-span-1 grid grid-cols-6 gap-3 md:gap-6">
              {/* Amount */}
              <div class="col-span-4">
                <label for="projected-credit-amount" class="flex flex-col">
                  Amount
                  <input
                    type="number"
                    id="projected-credit-amount"
                    name="projected-credit-amount"
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
              <Show when={!isPercentage()}>
                <div class="col-span-2">
                  <label for="projected-credit-currency" class="flex flex-col">
                    Currency
                    <select
                      id="projected-credit-currency"
                      name="projected-credit-currency"
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
              </Show>
            </div>

            <hr />

            {/* References & Total */}
            <Show when={isPercentage()}>
              <div class="col-span-1 grid grid-cols-6 gap-4">
                <h3 class="text-2xl font-semibold">References</h3>

                {/* References */}
                <div class="col-span-6 flex flex-col gap-1">
                  <For each={credits}>
                    {(stream) => (
                      <label
                        for={`refs-${stream.uid}`}
                        class="col-span-1 flex gap-2"
                      >
                        <input
                          type="checkbox"
                          id={`refs-${stream.uid}`}
                          name="refs"
                          value={stream.uid}
                          checked={state.refs.includes(stream.uid)}
                          onInput={[handleFormChecked, "refs"]}
                        />
                        {toTitle(stream.nature)} (
                        {toPrice(stream.amount, stream.currency ?? "")})
                      </label>
                    )}
                  </For>
                </div>

                {/* Show total */}
                <div class="col-span-6">
                  <h3 class="text-xl font-semibold">Total</h3>
                  <span class="text-sm font-medium text-gray-400">
                    {toPrice(calculatedAmount(), state.currency)}
                  </span>
                </div>
              </div>
            </Show>

            <hr />

            {/* Frequency */}
            <div class="col-span-1 grid grid-cols-6 gap-4">
              <h3 class="text-2xl font-semibold">Frequency</h3>

              {/* Recurring */}
              <div class="col-span-6">
                <small class="w-full text-sm text-gray-600">
                  Is this a recurring credit?
                </small>

                <label
                  for="projected-credit-frequency-recurring-yes"
                  class="flex items-center gap-2"
                >
                  <input
                    type="radio"
                    id="projected-credit-frequency-recurring-yes"
                    name="projected-credit-frequency-recurring"
                    value="true"
                    required
                    checked
                    onInput={[handleFormInput, "frequencyRecurring"]}
                  />
                  Yes
                </label>
                <label
                  for="projected-credit-frequency-recurring-no"
                  class="flex items-center gap-2"
                >
                  <input
                    type="radio"
                    id="projected-credit-frequency-recurring-no"
                    name="projected-credit-frequency-recurring"
                    value="false"
                    required
                    onInput={[handleFormInput, "frequencyRecurring"]}
                  />
                  No
                </label>
              </div>

              <Show
                when={showFrequency()}
                fallback={
                  <div class="col-span-6">
                    <label
                      for="projected-income-expected-date"
                      class="flex flex-col"
                    >
                      Expected on
                      <input
                        type="datetime-local"
                        id="projected-income-expected-date"
                        name="projected-income-expected-date"
                        value={state.frequencyStart}
                        class="w-full rounded-md bg-gray-100 px-4 py-2 text-sm tracking-tight text-gray-700 focus:outline-none"
                        required
                        onInput={[handleFormInput, "frequencyStart"]}
                      />
                    </label>
                  </div>
                }
              >
                {/* Value and Unit */}
                <div class="col-span-6 grid grid-cols-3 items-center justify-between gap-3 md:gap-6">
                  {/* Value */}
                  <div class="col-span-2">
                    <label
                      for="projected-credit-frequency-value"
                      class="flex items-center gap-6"
                    >
                      Every
                      <input
                        type="number"
                        id="projected-credit-frequency-value"
                        name="projected-credit-value"
                        value={state.frequencyValue}
                        min="1"
                        step="1"
                        class="w-full rounded-md bg-gray-100 px-4 py-2 text-sm tracking-tight text-gray-700 focus:outline-none"
                        required
                        onInput={[handleFormInput, "frequencyValue"]}
                      />
                    </label>
                  </div>

                  {/* Unit */}
                  <div class="col-span-1">
                    <label
                      for="projected-credit-frequency-value"
                      class="flex items-center gap-2"
                    >
                      <select
                        id="projected-credit-frequency-unit"
                        name="projected-credit-unit"
                        value={state.frequencyUnit}
                        class="w-full rounded bg-gray-100 px-4 py-2 text-right text-sm tracking-tight text-gray-700 focus:outline-none"
                        required
                        onInput={[handleFormInput, "frequencyUnit"]}
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

                {/* Start Date */}
                <div class="col-span-6">
                  <label
                    for="projected-credit-frequency-start"
                    class="flex flex-col"
                  >
                    Starting from
                    <input
                      type="datetime-local"
                      id="projected-credit-frequency-start"
                      name="projected-credit-start"
                      value={state.frequencyStart}
                      class="w-full rounded-md bg-gray-100 px-4 py-2 text-sm tracking-tight text-gray-700 focus:outline-none"
                      required
                      onInput={[handleFormInput, "frequencyStart"]}
                    />
                  </label>
                </div>

                {/* End Date */}
                <div class="col-span-6">
                  <label
                    for="projected-credit-frequency-end"
                    class="flex flex-col"
                  >
                    Ending on
                    <input
                      type="datetime-local"
                      id="projected-credit-frequency-end"
                      name="projected-credit-end"
                      value={state.frequencyEnd}
                      class="w-full rounded-md bg-gray-100 px-4 py-2 text-sm tracking-tight text-gray-700 focus:outline-none"
                      onInput={[handleFormInput, "frequencyEnd"]}
                    />
                  </label>
                </div>
              </Show>
            </div>
          </article>

          <footer>
            <menu class="flex justify-between border-t px-5 py-3">
              <button
                autofocus
                type="reset"
                onClick={[handleDialogClose, "cancel"]}
                class="rounded-md bg-gray-100 px-5 py-2 text-sm font-medium tracking-tight text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                value="confirm"
                class="rounded-md bg-teal-500 px-5 py-2 text-sm font-medium tracking-tight text-teal-50"
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
export default ProjectedDebitDialog;
