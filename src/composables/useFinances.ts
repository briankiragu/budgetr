import {
  ETransactionType,
  EProjectedExpenseCategory,
  type ICreditStream,
  type ITransaction,
  type IBudget,
  type IDebitStream,
} from '@interfaces/budget';

export default (budget: IBudget) => {
  // Extract the transactions.
  const { credits, debits, transactions } = budget;

  // Calculate the total projected credit.
  const totalProjectedCredits: number = credits.reduce(
    (acc, stream) => acc + stream.amount,
    0
  );

  // Calculate the total projected debits.
  const totalProjectedDebits: number = debits.reduce((acc, debit) => {
    if (debit.category === EProjectedExpenseCategory.PERCENTAGE) {
      let totalReferencedIncome = totalProjectedCredits;

      // In a case where the debit references the total credits.
      if (!debit.refs.length || !debit.refs.includes('all')) {
        // In a case where the debit references specific credits.
        totalReferencedIncome = credits
          .filter((credit) => debit.refs.includes(credit.uid))
          .reduce((acc, credit) => acc + credit.amount, 0);
      }

      return acc + totalReferencedIncome * (debit.amount / 100);
    }

    return acc + debit.amount;
  }, 0);

  // Get the credit transactions.
  const creditTransactions: ITransaction[] = transactions.filter(
    (txn) => txn.type === ETransactionType.CREDIT
  );

  // Get the debit transactions.
  const debitTransactions: ITransaction[] = transactions.filter(
    (txn) => txn.type === ETransactionType.DEBIT
  );

  // Calculate the total actual credit.
  const totalActualCredits: number = creditTransactions.reduce(
    (acc, stream) => acc + stream.amount,
    0
  );

  // Calculate the total actual debits.
  const totalActualDebits: number = debitTransactions.reduce(
    (acc, debit) => acc + debit.amount,
    0
  );

  // Get the list of projected credit streams and their fulfillments
  // (whether they were received or not).
  const creditStreams: ICreditStream[] = credits.map((credit) => ({
    projected: credit,
    // Check if it was fulfilled in the actual credit transaction.
    actual: creditTransactions.filter((transaction) =>
      transaction.refs.includes(credit.uid)
    ),
  }));

  // Get the list of projected debit streams and their fulfillments
  // (whether they were received or not).
  const debitStreams: IDebitStream[] = debits.map((debit) => ({
    projected: debit,
    // Check if it was fulfilled in the actual debit transaction.
    actual: debitTransactions.filter((transaction) =>
      transaction.refs.includes(debit.uid)
    ),
  }));

  return {
    totalProjectedCredits,
    totalProjectedDebits,
    totalActualCredits,
    totalActualDebits,
    creditTransactions,
    debitTransactions,
    creditStreams,
    debitStreams,
  };
};
