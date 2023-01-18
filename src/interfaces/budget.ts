export interface ITransaction {
  uid: string;
  refs: string[] | null;
  source: string;
  amount: number;
  currency: string;
  nature: 'income' | 'investment' | 'saving' | 'expense';
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface IProjectedIncome extends ITransaction {
  frequency: {
    recurring: boolean;
    value: number | null;
    unit: 'day' | 'week' | 'month' | 'year' | null;
    start: string;
    end: string | null;
  };
}

export interface IProjectedExpense extends ITransaction {
  type: 'fixed' | 'percentage';
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
