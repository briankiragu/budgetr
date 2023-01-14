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
        class="w-full rounded-md p-0"
      >
        <form method="dialog">
          <header class="shadow px-5 py-3 flex justify-between items-center">
            <h3 class="text-2xl font-bold">Projected Income</h3>
            <button
              class="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold"
              onClick={[handleDialogClose, 'close']}
            >
              X
            </button>
          </header>

          <article class="px-5 py-3">...</article>

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
