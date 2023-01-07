export interface ITransaction {
  uid: string;
  ref?: string | null;
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
    range?: 'daily' | 'weekly' | 'monthly' | 'annually';
  };
}

export interface IProjectedExpense extends ITransaction {
  type: 'fixed' | 'percentage';
}

export interface IExpensePeriod {
  start: Date;
  end: Date;
  range: 'weekly' | 'monthly' | 'annually';
}
