import ProjectedDebitForm from "@components/forms/ProjectedDebitForm";
import {
  type IProjectedCredit,
  type IProjectedDebit,
} from "@interfaces/budget";
import type { Component } from "solid-js";

// Define the component.
const ProjectedDebitDialog: Component<{
  natures?: string[];
  credits: IProjectedCredit[];
  debit?: IProjectedDebit;
  submitHandler: (debit: IProjectedDebit) => Promise<void>;
}> = (props) => {
  // Create a template ref to the dialog.
  let dialogRef: HTMLDialogElement;

  // Create a function to handle the dialog trigger.
  const handleDialogShow = (): void => {
    // Open the dialog.
    dialogRef.showModal();
  };

  // Create a function to handle the dialog close/cancel.
  const handleDialogClose = (reason: "close" | "cancel"): void => {
    // Close the dialog.
    dialogRef.close(reason);
  };

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        class="group flex items-center justify-center transition focus:outline-none"
        onClick={() => handleDialogShow()}
      >
        <span class="material-symbols-outlined transition dark:text-gray-700 text-gray-600 dark:hover:text-gray-200">
          edit
        </span>
      </button>

      {/* Dialog */}
      <dialog
        ref={dialogRef!}
        id="ProjectedExpenseMegaDialog"
        modal-mode="mega"
        class="w-full rounded-md p-0 md:w-[50vw]"
      >
        <ProjectedDebitForm
          natures={props.natures}
          credits={props.credits}
          debit={props.debit}
          submitHandler={props.submitHandler}
          closeHandler={handleDialogClose}
        />
      </dialog>
    </>
  );
};

// Export the component.
export default ProjectedDebitDialog;
