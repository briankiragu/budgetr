// Import SolidJS interfaces...
import type { Component } from 'solid-js';

// Define the component.
const ProjectedIncomeDialog: Component = () => {
  // Create a template ref to the dialog.
  let dialogRef: HTMLDialogElement;

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
              class="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold"
              onClick={[handleDialogClose, 'close']}
            >
              X
            </button>
          </header>

          <article class="px-5 py-3 grid grid-cols-1 gap-4 text-sm text-gray-600 md:px-8 md:py-8">
            {/* Source */}
            <div class="col-span-1">
              <label for="source" class="flex flex-col">
                Source
                <input
                  type="text"
                  id="source"
                  name="source"
                  placeholder="E.g. Salary"
                  class="w-full rounded px-4 py-2 bg-gray-100 text-sm text-gray-700 tracking-tight focus:outline-none"
                  required
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
                    min="1"
                    placeholder="E.g. 65800"
                    class="w-full rounded px-4 py-2 bg-gray-100 text-sm text-gray-700 tracking-tight focus:outline-none"
                    required
                  />
                </label>
              </div>

              {/* Currency */}
              <div class="col-span-2">
                <label for="currency" class="flex flex-col">
                  Currency
                  <select
                    name="currency"
                    id="currency"
                    class="w-full rounded px-4 py-2 bg-gray-100 text-right text-sm text-gray-700 tracking-tight focus:outline-none"
                    required
                  >
                    <option value="ZAR">ZAR</option>
                    <option value="KES">KES</option>
                    <option value="USD">USD</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Description */}
            <div class="col-span-1">
              <label for="description" class="flex flex-col">
                Description
                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  placeholder="E.g. Salary payment for the month of February 2023."
                  class="w-full rounded-md px-4 py-2 bg-gray-100 text-sm text-gray-700 tracking-tight focus:outline-none"
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
