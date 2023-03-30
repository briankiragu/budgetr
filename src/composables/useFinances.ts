import {
  ETransactionType,
  type IIncomeStream,
  type ITransaction,
  EProjectedExpenseCategory,
} from '@interfaces/budget';
import type { IUser } from '@interfaces/user';

export default (user: IUser) => {
  // Extract the transactions.
  const {transactions} = user.budget
  
  // Get the income transactions.
  const income: ITransaction[] = transactions.filter(
    (txn) => txn.nature === ETransactionType.CREDIT
  );

  // Get the expense transactions.
  const expenses: ITransaction[] = transactions.filter(
    (txn) => txn.nature === ETransactionType.DEBIT
  );

  // Calculate the total projected income.
  const totalProjectedIncome: number = income.reduce(
    (acc, stream) => acc + stream.amount,
    0
  );

  // Calculate the total projected expenses.
  const totalProjectedExpenses: number = user.budget.expenses.reduce(
    (acc, expense) => {
      if (expense.category === EProjectedExpenseCategory.PERCENTAGE) {
        return acc + totalProjectedIncome * (expense.amount / 100);
      }

    return acc + expense.amount;
  }, 0);

  // Get the income transactions.
  const actualIncome: ITransaction[] = transactions.filter(
    (txn) => txn.nature === ETransactionType.CREDIT
  );

  // Get the expense transactions.
  const actualExpenses: ITransaction[] = transactions.filter(
    (txn) => txn.nature === ETransactionType.DEBIT
  );

  // Calculate the total actual income.
  const totalActualIncome: number = actualIncome.reduce(
    (acc, stream) => acc + stream.amount,
    0
  );

  // Calculate the total actual expenses.
  const totalActualExpenses: number = actualExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  // Get the list of projected income streams and their fulfillments
  // (whether they were received or not).
  const incomeStreams: IIncomeStream[] = user.budget.income.map((stream) => ({
    projected: stream,
    // Check if it was fulfilled in the actual income transaction.
    actual: income.filter((transaction) =>
      transaction.refs.includes(stream.uid)
    ),
  }));

  return {
    projectedIncome: income,
    projectedExpenses: expenses,
    totalProjectedIncome,
    totalProjectedExpenses,
    transactions,
    actualIncome,
    actualExpenses,
    totalActualIncome,
    totalActualExpenses,
  };
};
