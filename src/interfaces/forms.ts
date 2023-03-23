/* eslint-disable @typescript-eslint/naming-convention */

import type { ETransactionNature, ETransactionType } from '@interfaces/budget';

export type IProjectedIncomeForm = {
  source: string;
  amount: number;
  currency: string;
  description: string;
  frequencyRecurring: 'true' | 'false';
  frequencyValue: number;
  frequencyUnit: string;
  frequencyStart: string;
  frequencyEnd: string | undefined;
};

export type IProjectedExpenseForm = {
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
};

export type ITransactionForm = {
  refs: string[];
  source: string;
  nature: ETransactionNature;
  amount: number;
  currency: string;
  description: string;
};
