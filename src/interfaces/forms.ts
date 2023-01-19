import type { ETransactionNature, ETransactionType } from '@interfaces/budget';

export interface IProjectedIncomeForm {
  source: string;
  amount: number;
  currency: string;
  description: string;
  frequencyRecurring: 'true' | 'false';
  frequencyValue: number;
  frequencyUnit: string;
  frequencyStart: string;
  frequencyEnd: string | undefined;
}

export interface IProjectedExpenseForm {
  refs: string[];
  source: string;
  type: ETransactionType;
  amount: number;
  currency: string;
  description: string;
  frequencyRecurring: 'true' | 'false';
  frequencyValue: number;
  frequencyUnit: string;
  frequencyStart: string;
  frequencyEnd: string | undefined;
}

export interface ITransactionForm {
  refs: string[];
  source: string;
  nature: ETransactionNature;
  amount: number;
  currency: string;
  description: string;
}
