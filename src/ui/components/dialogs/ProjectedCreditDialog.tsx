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
const ProjectedCreditDialog: Component<{
  natures?: string[];
  handler: (credit: IProjectedCredit) => Promise<void>;
}> = (props) => {
  // Create a ref.
  let dialogRef: HTMLDialogElement | undefined;

  // Get the identity method.
  const { generateUid } = useIdentity();

  // Get the formatting methods.
  const { toTitle } = useFormatting();

  // Create a signal to hold the form state.
  const [state, setState] = createStore<IProjectedCreditForm>({
    nature: ETransactionNature.PASSIVE,
    description: "",
    amount: 0,
    currency: DEFAULT_CURRENCY,
    frequencyRecurring: "true",
    frequencyValue: 1,
    frequencyUnit: ETransactionFrequencyPeriod.MONTH,
    frequencyStart: new Date().toISOString(),
    frequencyEnd: undefined,
  });

  // Get the display frequency.
  const showFrequency = (): boolean => state.frequencyRecurring === "true";

  // Create a function to open the dialog.
  const handleDialogShow = (): void => {
    dialogRef?.showModal();
  };

  // Create a function to close/cancel the dialog.
  const handleDialogClose = (reason: "close" | "cancel"): void => {
    // Close the dialog.
    dialogRef?.close(reason);
  };

  const handleFormInput = (field: string, event: Event): void => {
    // Get the value from the event.
    const { value } = event.target as HTMLInputElement;

    // Update the state.
    setState({ [field]: value });
  };

  const handleSubmission = async (e: Event): Promise<void> => {
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
        value:
          showFrequency() && state.frequencyValue ? state.frequencyValue : null,
        period:
          showFrequency() && state.frequencyUnit ? state.frequencyUnit : null,
        start: state.frequencyStart,
        end: state.frequencyEnd ?? null,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
    };

    // Call the handler.
    await props.handler(data);

    // Reset the state.
    setState({
      nature: ETransactionNature.PASSIVE,
      amount: 0,
      currency: DEFAULT_CURRENCY,
      description: "",
      frequencyRecurring: "true",
      frequencyValue: 1,
      frequencyUnit: ETransactionFrequencyPeriod.MONTH,
      frequencyStart: new Date().toISOString(),
      frequencyEnd: undefined,
    });

    // Close the dialog.
    handleDialogClose("close");
  };

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        class="group min-h-36 border-2 border-dashed hover:border-solid transition border-gray-400 hover:border-gray-100 rounded-lg flex items-center justify-center focus:outline-none"
        onClick={() => handleDialogShow()}
      >
        <span class="material-symbols-outlined text-3xl text-gray-500 font-bold group-hover:text-gray-100 transition">
          add
        </span>
      </button>

      {/* Dialog */}
      <dialog
        ref={dialogRef!}
        id="ProjectedIncomeMegaDialog"
        modal-mode="mega"
        class="w-full rounded-md p-0 md:w-[50vw] dark:bg-gray-800"
      >
        <form method="dialog">
          <header class="flex items-center justify-between gap-4 px-5 py-3 shadow">
            <h3 class="text-2xl font-extrabold tracking-tight">
              Projected Income
            </h3>
            <button
              class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => handleDialogClose("close")}
            >
              <span class="material-symbols-outlined">close</span>{" "}
            </button>
          </header>

          <article class="grid h-[70vh] grid-cols-1 gap-4 overflow-y-scroll px-6 py-3 text-sm text-gray-600 dark:text-gray-100">
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
                  <For each={props.natures}>
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
                    <option value="KES">KES</option>
                    <option value="ZAR">ZAR</option>
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
