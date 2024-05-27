import useDate from "@composables/useDate";
import {
  EProjectedExpenseCategory,
  ETransactionType,
  type ICreditStream,
  type IDebitStream,
  type IFinances,
  type IPeriod,
  type IProjectedCredit,
  type IProjectedDebit,
  type ITransaction,
} from "@interfaces/budget";
import type { IUser } from "@interfaces/user";
import { isAfter, isBefore } from "date-fns";

export default ({
  period,
  user,
}: {
  period: IPeriod;
  user?: IUser;
}): IFinances => {
  // Extract the budget.
  const { credits, debits, transactions } = user
    ? user.budget
    : { credits: [], debits: [], transactions: [] };

  const isBetweenRange = (date: string, period: IPeriod) =>
    isAfter(new Date(date), period.start) &&
    isBefore(new Date(date), period.end);

  const isWithinPeriod = (txn: IProjectedCredit, period: IPeriod) => {
    // Get the freuqency period, value, start and end dates.
    const frequencyPeriod = txn.frequency.period;
    const frequencyValue = txn.frequency.value;

    const startDate: Date = new Date(txn.frequency.start);
    const endDate: Date | null = txn.frequency.end
      ? new Date(txn.frequency.end)
      : null;

    if (
      txn.frequency.isRecurring === true &&
      frequencyValue !== null &&
      frequencyPeriod !== null
    ) {
      // If ongoing, that is, doesn't have an end specified or
      // it's end is not before the period start.
      const isOngoing = endDate === null || isAfter(startDate, period.start);

      // If the recurrence falls within the period.
      const recurrsWithinPeriod =
        isOngoing &&
        // Get the number of units between the period end and
        // the start date of the item.
        [
          ...Array(
            useDate()[`${frequencyPeriod}Diff`](new Date(), startDate) + 2,
          ).keys(),
        ]
          // Convert them to dates; each index value is added as a unit
          .map((index) => useDate()[`${frequencyPeriod}Add`](startDate, index))
          // Remove the values that do not align with the period.
          .filter((_, index) => index % frequencyValue === 0)
          // Return true if any value falls within the period range.
          .some((date) => isBetweenRange(date.toISOString(), period));

      // Return the computation.
      return recurrsWithinPeriod;
    }

    // If it is not recurring but within the period.
    return isAfter(startDate, period.start);
  };

  const projectedCredits: IProjectedCredit[] = credits.filter((credit) =>
    isWithinPeriod(credit, period),
  );

  const projectedDebits: IProjectedDebit[] = debits.filter((debit) =>
    isWithinPeriod(debit, period),
  );

  // Get the credit transactions.
  const creditTransactions: ITransaction[] = transactions
    .filter((txn) => isBetweenRange(txn.publishedAt, period))
    .filter((txn) => txn.type === ETransactionType.CREDIT);

  // Get the debit transactions.
  const debitTransactions: ITransaction[] = transactions
    .filter((txn) => isBetweenRange(txn.publishedAt, period))
    .filter((txn) => txn.type === ETransactionType.DEBIT);

  // Calculate the total projected credit.
  const totalProjectedCredits: number = projectedCredits.reduce(
    (acc, stream) => acc + stream.amount,
    0,
  );

  // Calculate the total projected debits.
  const totalProjectedDebits: number = projectedDebits.reduce((acc, debit) => {
    if (debit.category === EProjectedExpenseCategory.PERCENTAGE) {
      // In a case where the debit references specific credits.
      const totalReferencedIncome = credits
        .filter((credit) => debit.refs.includes(credit.uid))
        .reduce((acc, credit) => acc + credit.amount, 0);

      return acc + totalReferencedIncome * (debit.amount / 100);
    }

    return acc + debit.amount;
  }, 0);

  // Calculate the total actual credit.
  const totalActualCredits: number = creditTransactions.reduce(
    (acc, stream) => acc + stream.amount,
    0,
  );

  // Calculate the total actual debits.
  const totalActualDebits: number = debitTransactions.reduce(
    (acc, debit) => acc + debit.amount,
    0,
  );

  // Get the list of projected credit streams and their fulfillments
  // (whether they were received or not).
  const creditStreams: ICreditStream[] = projectedCredits.map((credit) => ({
    projected: credit,
    // Check if it was fulfilled in the actual credit transaction.
    actual: creditTransactions.filter((transaction) =>
      transaction.refs.includes(credit.uid),
    ),
  }));

  // Get the list of projected debit streams and their fulfillments
  // (whether they were received or not).
  const debitStreams: IDebitStream[] = Object.entries(
    Object.groupBy(projectedDebits, ({ nature }) => nature),
  )
    .filter(([, values]) => values)
    .map(([, values]) => {
      const refs = (values as IProjectedDebit[]).map((value) => value.uid);
      return {
        projected: values as IProjectedDebit[],
        actual: debitTransactions.filter((transaction) =>
          transaction.refs.some((ref) => refs?.includes(ref)),
        ),
      };
    })
    .flat();

  return {
    projectedCredits,
    projectedDebits,

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
