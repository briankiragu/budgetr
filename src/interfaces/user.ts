/* eslint-disable @typescript-eslint/naming-convention */

import type { IBudget } from '@interfaces/budget';

export type IUser = {
  username: string;
  config: {
    natures: {
      credit: string[];
      debit: string[];
    };
  };
  budget: IBudget;
};
