/* eslint-disable @typescript-eslint/naming-convention */

import type { IBudget } from '@interfaces/budget';

export type IUser = {
  username: string;
  config: {
    natures: string[];
  };
  budget: IBudget;
};
