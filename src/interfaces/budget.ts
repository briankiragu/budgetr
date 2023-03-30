/* eslint-disable @typescript-eslint/naming-convention */

export enum ETransactionNature {
  Income = 'income',
  Investment = 'investment',
  Saving = 'saving',
  Expense = 'expense',
}

export enum ETransactionFrequencyUnit {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
}

export enum ETransactionType {
  Fixed = 'fixed',
  Percentage = 'percentage',
}

export type ITransaction = {
  uid: string;
  refs: string[] | undefined;
  source: string;
  amount: number;
  currency: string | undefined;
  nature: ETransactionNature;
  description: string | undefined;
  createdAt: string;
  updatedAt: string;
};

export type IProjectedIncome = {
  frequency: {
    recurring: boolean;
    value: number | undefined;
    unit: ETransactionFrequencyUnit | undefined;
    start: string;
    end: string | undefined;
  };
} & ITransaction;

export type IProjectedExpense = {
  type: ETransactionType;
} & IProjectedIncome;

export type IIncomeStream = {
  projected: IProjectedIncome;
  actual: ITransaction[];
};

export type IExpensePeriod = {
  start: Date;
  end: Date;
  range: 'weekly' | 'monthly' | 'annually';
};

export type IBudget = {
  income: IProjectedIncome[];
  expenses: IProjectedExpense[];
  transactions: ITransaction[];
};
