/* eslint-disable @typescript-eslint/naming-convention */

import type {
  ETransactionFrequencyPeriod,
  ETransactionType,
} from '@interfaces/budget';

export type IProjectedCreditForm = {
  amount: number;
  currency: string;
  nature: string;
  description: string;
  frequencyRecurring: 'true' | 'false';
  frequencyUnit: ETransactionFrequencyPeriod;
  frequencyValue: number;
  frequencyStart: string;
  frequencyEnd: string | undefined;
};

export type IProjectedDebitForm = {
  refs: string[];
} & IProjectedCreditForm;

export type ITransactionForm = {
  refs: string[];
  type: ETransactionType;
  amount: number;
  currency: string;
  nature: string;
  description: string;
};
