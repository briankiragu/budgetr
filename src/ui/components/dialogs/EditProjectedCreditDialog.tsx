import ProjectedCreditForm from "@components/forms/ProjectedCreditForm";
import type { IProjectedCredit } from "@interfaces/budget";
import type { Component } from "solid-js";

// Define the component.
const EditProjectedCreditDialog: Component<{
  natures?: string[];
  credit: IProjectedCredit;
  submitHandler: (credit: IProjectedCredit) => Promise<void>;
}> = (props) => {
  // Create a ref.
  let dialogRef: HTMLDialogElement | undefined;

  // Create a function to open the dialog.
  const handleDialogShow = (): void => {
    dialogRef?.showModal();
  };

  // Create a function to close/cancel the dialog.
  const handleDialogClose = (reason: "close" | "cancel"): void => {
    // Close the dialog.
    dialogRef?.close(reason);
  };

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        class="group absolute top-3 right-3 bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-900 rounded-full size-9 lg:size-10 flex items-center justify-center transition focus:outline-none"
        onClick={() => handleDialogShow()}
      >
        <span class="material-symbols-outlined transition text-indigo-600 group-hover:text-indigo-50">
          edit
        </span>
      </button>

      {/* Dialog */}
      <dialog
        ref={dialogRef!}
        id="ProjectedIncomeMegaDialog"
        modal-mode="mega"
        class="w-full rounded-md p-0 md:w-[50vw] dark:bg-gray-800"
      >
        <ProjectedCreditForm
          natures={props.natures}
          credit={props.credit}
          closeHandler={handleDialogClose}
          submitHandler={props.submitHandler}
        />
      </dialog>
    </>
  );
};

// Export the component.
export default EditProjectedCreditDialog;
