import {
  ETransactionNature,
  type IBudget,
  type ITransaction,
} from '@interfaces/budget';

export default (budget: IBudget) => {
  // Get the items from the user object.
  const { income, expenses, transactions } = budget;

  // Calculate the total projected income.
  const totalProjectedIncome: number = income.reduce(
    (acc, stream) => acc + stream.amount,
    0
  );

  // Calculate the total projected expenses.
  const totalProjectedExpenses: number = expenses.reduce((acc, expense) => {
    if (expense.type === 'percentage') {
      return acc + totalProjectedIncome * (expense.amount / 100);
    }

    return acc + expense.amount;
  }, 0);

  // Get the income transactions.
  const actualIncome: ITransaction[] = transactions.filter(
    (txn) => txn.nature === ETransactionNature.Income
  );

  // Get the expense transactions.
  const actualExpenses: ITransaction[] = transactions.filter(
    (txn) => txn.nature === ETransactionNature.Expense
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
