export interface ITransaction {
  source: string;
  amount: number;
  currency: string;
}

export interface IProjectedExpense {
  source: string;
  type: 'fixed' | 'percentage';
  amount: number;
  currency: string;
}

export interface IExpensePeriod {
  start: Date;
  end: Date;
  range: 'weekly' | 'monthly' | 'annually';
}
