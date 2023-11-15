/* eslint-disable @typescript-eslint/naming-convention */

export enum ETransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}
export enum ETransactionNature {
  SAVING = 'saving',
  PASSIVE = 'passive',
}

export enum EProjectedExpenseCategory {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
}

export enum ETransactionFrequencyPeriod {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

// A single transaction.
export type ITransaction = {
  uid: string;
  refs: string[];
  currency: string | undefined;
  amount: number;
  type: ETransactionType;
  nature: ETransactionNature | string;
  description?: string | undefined;
  createdAt: string;
  updatedAt: string;
};

// An "expected" income transaction
// e.g. (salary @ 100,000.00 - paid monthly).
export type IProjectedCredit = {
  frequency: {
    isRecurring: boolean;
    period: ETransactionFrequencyPeriod | undefined;
    value: number | undefined;
    start: string;
    end: string | undefined;
  };
} & ITransaction;

// An "expected" expense transaction
// e.g. (rent @ 10% of total income (10,000.00) - paid monthly).
export type IProjectedDebit = {
  category: EProjectedExpenseCategory;
} & IProjectedCredit;

// A user's budget item.
export type IBudget = {
  credits: IProjectedCredit[];
  debits: IProjectedDebit[];
  transactions: ITransaction[];
};

// A projected income item and the transactions that belong to it.
export type ICreditStream = {
  projected: IProjectedCredit;
  actual: ITransaction[];
};

// A projected expense item and the transactions that belong to it.
export type IDebitStream = {
  projected: IProjectedDebit;
  actual: ITransaction[];
};

export type IPeriod = {
  start: Date;
  end: Date;
  range: 'weekly' | 'monthly' | 'annually';
};
