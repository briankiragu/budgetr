import ProjectedDebitForm from "@components/forms/ProjectedDebitForm";
import type { IProjectedCredit, IProjectedDebit } from "@interfaces/budget";
import type { Component } from "solid-js";

// Define the component.
const NewProjectedDebitDialog: Component<{
  natures?: string[];
  credits: IProjectedCredit[];
  debit?: IProjectedDebit;
  submitHandler: (debit: IProjectedDebit) => Promise<void>;
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
        class="group h-32 border-2 bg-gray-300 hover:shadow-lg dark:bg-gray-800/60 border-dashed hover:border-solid transition border-gray-400 hover:border-gray-100 rounded-lg flex items-center justify-center focus:outline-none"
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
        <ProjectedDebitForm
          natures={props.natures}
          credits={props.credits}
          submitHandler={props.submitHandler}
          closeHandler={handleDialogClose}
        />
      </dialog>
    </>
  );
};

// Export the component.
export default NewProjectedDebitDialog;
