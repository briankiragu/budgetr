import useFormatting from "@composables/useFormatting";
import useIdentity from "@composables/useIdentity";
import {
  EProjectedExpenseCategory,
  ETransactionFrequencyPeriod,
  ETransactionType,
  type IProjectedCredit,
  type IProjectedDebit,
} from "@interfaces/budget";
import type { IProjectedDebitForm } from "@interfaces/forms";
import { DEFAULT_CURRENCY } from "@lib/constants";
import { For, Show, type Component } from "solid-js";
import { createStore } from "solid-js/store";

const ProjectedDebitForm: Component<{
  natures?: string[];
  credits: IProjectedCredit[];
  debit?: IProjectedDebit;
  closeHandler: (reason: "close" | "cancel") => void;
  submitHandler: (debit: IProjectedDebit) => Promise<void>;
}> = (props) => {
  // Get the composables
  const { generateUid } = useIdentity();
  const { toPrice, toTitle } = useFormatting();

  // Create a signal to hold the form state.
  const [state, setState] = createStore<IProjectedDebitForm>({
    refs: props.debit?.refs || [],
    nature: props.debit?.nature || "",
    description: props.debit?.description || "",
    category: props.debit?.category || EProjectedExpenseCategory.FIXED,
    amount: props.debit?.amount || 10,
    currency: props.debit?.currency || DEFAULT_CURRENCY,
    frequencyRecurring: props.debit
      ? `${props.debit?.frequency.isRecurring}`
      : "true",
    frequencyUnit:
      props.debit?.frequency.period || ETransactionFrequencyPeriod.MONTH,
    frequencyValue: props.debit?.frequency.value || 1,
    frequencyStart: props.debit?.frequency.start || new Date().toISOString(),
    frequencyEnd: props.debit?.frequency.end || undefined,
  });

  const isPercentage = (): boolean =>
    state.category === EProjectedExpenseCategory.PERCENTAGE;

  const showFrequency = (): boolean => state.frequencyRecurring === "true";

  const calculatedAmount = (): number =>
    props.credits
      .filter((stream) => state.refs.includes(stream.uid))
      .reduce((acc, stream) => acc + stream.amount, 0) *
    (state.amount / 100);

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

  const handleSubmission = async (e: Event): Promise<void> => {
    // Prevent the default form submission.
    e.preventDefault();

    // Format the state.
    const data: IProjectedDebit = {
      uid: props.debit?.uid ?? generateUid(),
      type: ETransactionType.DEBIT,
      refs: state.refs,
      nature: state.nature,
      category: state.category,
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
      createdAt: props.debit?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
    };

    // Call the handler.
    await props.submitHandler(data);

    // Reset the state.
    setState({
      refs: props.debit?.refs || [],
      nature: props.debit?.nature || "",
      description: props.debit?.description || "",
      category: props.debit?.category || EProjectedExpenseCategory.PERCENTAGE,
      amount: props.debit?.amount || 10,
      currency: props.debit?.currency || DEFAULT_CURRENCY,
      frequencyRecurring: props.debit
        ? `${props.debit?.frequency.isRecurring}`
        : "true",
      frequencyUnit:
        props.debit?.frequency.period || ETransactionFrequencyPeriod.MONTH,
      frequencyValue: props.debit?.frequency.value || 1,
      frequencyStart: props.debit?.frequency.start || new Date().toISOString(),
      frequencyEnd: props.debit?.frequency.end || undefined,
    });

    // Close the dialog.
    props.closeHandler("close");
  };

  return (
    <form method="dialog">
      <header class="flex items-center justify-between gap-4 px-5 py-3 shadow">
        <h3 class="text-2xl font-bold">Projected Expense</h3>
        <button
          class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-700 transition-colors hover:bg-gray-200"
          onClick={[props.closeHandler, "close"]}
        >
          <span class="material-symbols-outlined">close</span>
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
              <For each={props.natures}>
                {(nature) => <option value={nature}>{toTitle(nature)}</option>}
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
                  <option value="KES">KES</option>
                  <option value="ZAR">ZAR</option>
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
              <For each={props.credits}>
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
                    {stream.description}(
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
              <label for="projected-credit-frequency-end" class="flex flex-col">
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
            onClick={[props.closeHandler, "cancel"]}
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
  );
};

export default ProjectedDebitForm;
