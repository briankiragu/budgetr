import useFormatting from "@composables/useFormatting";
import useIdentity from "@composables/useIdentity";
import type { IProjectedCredit } from "@interfaces/budget";
import {
  ETransactionFrequencyPeriod,
  ETransactionNature,
  ETransactionType,
} from "@interfaces/budget";
import type { IProjectedCreditForm } from "@interfaces/forms";
import { DEFAULT_CURRENCY } from "@lib/constants";
import type { Component } from "solid-js";
import { For, Show } from "solid-js";
import { createStore } from "solid-js/store";

// Define the component.
const ProjectedCreditDialog: Component<{ natures: string[] }> = ({
  natures,
}) => {
  // Create a template ref to the dialog.
  let dialogRef: HTMLDialogElement;

  // Create a signal to hold the form state.
  const [state, setState] = createStore<IProjectedCreditForm>({
    nature: "",
    description: "",
    amount: 0,
    currency: DEFAULT_CURRENCY,
    frequencyRecurring: "true",
    frequencyValue: 1,
    frequencyUnit: ETransactionFrequencyPeriod.MONTH,
    frequencyStart: new Date().toISOString(),
    frequencyEnd: undefined,
  });

  // Get the identity method.
  const { generateUid } = useIdentity();

  // Get the formatting methods.
  const { toTitle } = useFormatting();

  // Get the display frequency.
  const showFrequency = (): boolean => state.frequencyRecurring === "true";

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

  const handleSubmission = (e: Event): void => {
    // Prevent the default form submission.
    e.preventDefault();

    // Format the state.
    const data: IProjectedCredit = {
      uid: generateUid(),
      refs: [],
      type: ETransactionType.CREDIT,
      nature: state.nature,
      amount: parseFloat(state.amount.toString()),
      currency: state.currency,
      description: state.description,
      frequency: {
        isRecurring: showFrequency(),
        value: showFrequency()
          ? parseInt(state.frequencyValue.toString(), 10)
          : undefined,
        period: showFrequency() ? state.frequencyUnit : undefined,
        start: state.frequencyStart,
        end: state.frequencyEnd,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
    };

    // Close the dialog.
    handleDialogClose("close");

    console.dir(data);

    // Reset the state.
    setState({
      nature: "",
      amount: 0,
      currency: DEFAULT_CURRENCY,
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
        class="h-14 w-14 rounded-full bg-indigo-700 text-sm text-indigo-50 transition-all ease-in hover:shadow-lg md:h-auto md:w-auto md:rounded-md md:px-6 md:py-2 md:text-base"
        onClick={handleDialogTrigger}
      >
        New
      </button>

      {/* Dialog */}
      <dialog
        ref={dialogRef!}
        id="ProjectedIncomeMegaDialog"
        modal-mode="mega"
        class="w-full rounded-md p-0 md:w-[50vw]"
      >
        <form method="dialog">
          <header class="flex items-center justify-between gap-4 px-5 py-3 shadow">
            <h3 class="text-2xl font-bold">Projected Income</h3>
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
              <label for="projected-income-source" class="flex flex-col">
                Source
                <select
                  id="projected-income-source"
                  name="projected-income-source"
                  value={state.nature}
                  class="w-full rounded bg-gray-100 px-4 py-2 text-sm tracking-tight text-gray-700 focus:outline-none"
                  required
                  onInput={[handleFormInput, "nature"]}
                >
                  <option value={ETransactionNature.PASSIVE}>
                    {toTitle(ETransactionNature.PASSIVE)}
                  </option>
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
              <label for="projected-income-description" class="flex flex-col">
                Description
                <input
                  id="projected-income-description"
                  name="projected-income-description"
                  value={state.description}
                  placeholder="E.g. Salary payment"
                  class="w-full rounded-md bg-gray-100 px-4 py-2 text-sm tracking-tight text-gray-700 focus:outline-none"
                  onInput={[handleFormInput, "description"]}
                />
              </label>
            </div>
            <hr />

            {/* Amount and currency */}
            <div class="col-span-1 grid grid-cols-6 gap-3 md:gap-6">
              {/* Amount */}
              <div class="col-span-4">
                <label for="projected-income-amount" class="flex flex-col">
                  Amount
                  <input
                    type="number"
                    id="projected-income-amount"
                    name="projected-income-amount"
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
                <label for="projected-income-currency" class="flex flex-col">
                  Currency
                  <select
                    id="projected-income-currency"
                    name="projected-income-currency"
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

            {/* Frequency */}
            <div class="col-span-1 grid grid-cols-6 gap-4">
              <h3 class="text-2xl font-semibold">Frequency</h3>

              {/* Recurring */}
              <div class="col-span-6">
                <small class="w-full text-sm text-gray-600">
                  Is this a recurring income stream?
                </small>

                <label
                  for="projected-income-frequency-recurring-yes"
                  class="flex items-center gap-2"
                >
                  <input
                    type="radio"
                    id="projected-income-frequency-recurring-yes"
                    name="projected-income-frequency-recurring"
                    value="true"
                    required
                    checked
                    onInput={[handleFormInput, "frequencyRecurring"]}
                  />
                  Yes
                </label>
                <label
                  for="projected-income-frequency-recurring-no"
                  class="flex items-center gap-2"
                >
                  <input
                    type="radio"
                    id="projected-income-frequency-recurring-no"
                    name="projected-income-frequency-recurring"
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
                      for="projected-income-frequency-value"
                      class="flex items-center gap-6"
                    >
                      Every
                      <input
                        type="number"
                        id="projected-income-frequency-value"
                        name="projected-income-value"
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
                      for="projected-income-frequency-unit"
                      class="flex items-center gap-2"
                    >
                      <select
                        id="projected-income-frequency-unit"
                        name="projected-income-unit"
                        value={state.frequencyUnit}
                        class="w-full rounded bg-gray-100 px-4 py-2 text-right text-sm tracking-tight text-gray-700 focus:outline-none"
                        required
                        onInput={[handleFormInput, "frequencyUnit"]}
                      >
                        <For each={Object.values(ETransactionFrequencyPeriod)}>
                          {(period) => (
                            <option value={period}>{toTitle(period)}</option>
                          )}
                        </For>
                      </select>
                    </label>
                  </div>
                </div>

                {/* Start Date */}
                <div class="col-span-6">
                  <label
                    for="projected-income-frequency-start"
                    class="flex flex-col"
                  >
                    Starting from
                    <input
                      type="datetime-local"
                      id="projected-income-frequency-start"
                      name="projected-income-start"
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
                    for="projected-income-frequency-end"
                    class="flex flex-col"
                  >
                    Ending on
                    <input
                      type="datetime-local"
                      id="projected-income-frequency-end"
                      name="projected-income-end"
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
                class="rounded-md bg-indigo-500 px-5 py-2 text-sm font-medium tracking-tight text-indigo-50"
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
export default ProjectedCreditDialog;
