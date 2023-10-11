/* eslint-disable @typescript-eslint/naming-convention */

import type { ETransactionType } from '@interfaces/budget';

export type IProjectedIncomeForm = {
  nature: string;
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
  nature: string;
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
  nature: string;
  amount: number;
  currency: string;
  description: string;
};
