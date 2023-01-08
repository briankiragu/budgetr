export interface ITransaction {
  uid: string;
  refs: string[] | null;
  source: string;
  amount: number;
  currency: string;
  date: Date;
  nature: 'income' | 'investment' | 'saving' | 'expense';
  description?: string;
}

export interface IProjectedIncome extends ITransaction {
  frequency: {
    recurring: boolean;
    unit?: 'day' | 'week' | 'month' | 'year';
    value?: number;
    start?: string;
    end?: string | null;
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
