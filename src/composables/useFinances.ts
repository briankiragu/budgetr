import {
  ETransactionNature,
  type IIncomeStream,
  type ITransaction,
} from '@interfaces/budget';
import type { IUser } from '@interfaces/user';

export default (user: IUser) => {
  // Get the income transactions.
  const income: ITransaction[] = user.budget.transactions.filter(
    (txn) => txn.nature === ETransactionNature.Income
  );

  // Get the expense transactions.
  const expenses: ITransaction[] = user.budget.transactions.filter(
    (txn) => txn.nature === ETransactionNature.Expense
  );

  // Calculate the total projected income.
  const totalProjectedIncomeCard: number = user.budget.income.reduce(
    (acc, stream) => acc + stream.amount,
    0
  );

  // Calculate the total projected expenses.
  const totalProjectedExpenses: number = user.budget.expenses.reduce(
    (acc, expense) => {
      if (expense.type === 'percentage') {
        return acc + totalProjectedIncomeCard * (expense.amount / 100);
      }

      return acc + expense.amount;
    },
    0
  );

  // Calculate the total actual income.
  const totalIncome: number = income.reduce(
    (acc, stream) => acc + stream.amount,
    0
  );

  // Calculate the total actual expenses.
  const totalExpenses: number = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  // Get the list of projected income streams and their fulfillments
  // (whether they were received or not).
  const incomeStreams: IIncomeStream[] = user.budget.income.map((stream) => ({
    projected: stream,
    // Check if it was fulfilled in the actual income transaction.
    actual: income.filter((transaction) =>
      transaction.refs?.includes(stream.uid)
    ),
  }));

  return {
    income,
    expenses,
    totalProjectedIncomeCard,
    totalProjectedExpenses,
    totalIncome,
    totalExpenses,
    incomeStreams,
    projectedIncome: user.budget.income,
    projectedExpenses: user.budget.expenses,
    transactions: user.budget.transactions,
  };
};
