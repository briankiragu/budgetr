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
      <dialog ref={dialogRef} id="MegaDialog" modal-mode="mega">
        <form method="dialog">
          <header>
            <h3>Projected Income</h3>
            <button onClick={[handleDialogClose, 'close']}>X</button>
          </header>

          <article>...</article>

          <footer>
            <menu>
              <button
                autofocus
                type="reset"
                onClick={[handleDialogClose, 'cancel']}
              >
                Cancel
              </button>
              <button type="submit" value="confirm">
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
