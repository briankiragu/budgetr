import TransactionForm from "@components/forms/TransactionForm";
import type { IProjectedDebit } from "@interfaces/budget";
import { type IProjectedCredit, type ITransaction } from "@interfaces/budget";
import type { Component } from "solid-js";

// Define the component.
const NewTransactionDialog: Component<{
  natures: { credit: string[]; debit: string[] };
  credits: IProjectedCredit[];
  debits: IProjectedDebit[];
  submitHandler: (txn: ITransaction) => Promise<void>;
}> = (props) => {
  // Create a template ref to the dialog.
  let dialogRef: HTMLDialogElement;

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

  return (
    <>
      {/* Trigger */}
      <button
        class="flex items-center justify-center gap-1.5 h-14 w-14 rounded-full bg-rose-700 font-extrabold font-mono text-rose-50 transition-all ease-in hover:shadow-lg md:h-auto md:w-auto md:rounded-md md:px-6 md:py-2 md:text-base tracking-tighter focus:outline-none"
        onClick={handleDialogTrigger}
      >
        <span class="material-symbols-outlined font-bold text-2xl">
          attach_money
        </span>
        <span class="hidden lg:block">New Transaction</span>
      </button>

      {/* Dialog */}
      <dialog
        ref={dialogRef!}
        id="TransactionMegaDialog"
        modal-mode="mega"
        class="w-full rounded-md p-0 md:w-[50vw] dark:bg-gray-800"
      >
        <TransactionForm
          natures={props.natures}
          credits={props.credits}
          debits={props.debits}
          closeHandler={handleDialogClose}
          submitHandler={props.submitHandler}
        />
      </dialog>
    </>
  );
};

// Export the component.
export default NewTransactionDialog;
