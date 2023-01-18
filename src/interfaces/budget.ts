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

export interface ITransaction {
  uid: string;
  refs: string[] | null;
  source: string;
  amount: number;
  currency: string | null;
  nature: ETransactionNature;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface IProjectedIncome extends ITransaction {
  frequency: {
    recurring: boolean;
    value: number | null;
    unit: ETransactionFrequencyUnit | null;
    start: string;
    end: string | undefined;
  };
}

export interface IProjectedExpense extends IProjectedIncome {
  type: ETransactionType;
}

export interface IIncomeStream {
  projected: IProjectedIncome;
  actual: ITransaction[];
}

export interface IExpensePeriod {
  start: Date;
  end: Date;
  range: 'weekly' | 'monthly' | 'annually';
}

export interface IBudget {
  income: IProjectedIncome[];
  expenses: IProjectedExpense[];
  transactions: ITransaction[];
}
