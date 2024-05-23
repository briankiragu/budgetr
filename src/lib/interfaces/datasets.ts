/* eslint-disable @typescript-eslint/naming-convention */
export type IFilter = {
  id: string;
  title: string;
  symbol: string;
  isActive: boolean;
};

export type IGroupedDataSet = Record<string, number>;

export type IStackedDataSet = Record<string, IGroupedDataSet[]>;
