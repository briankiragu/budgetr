/* eslint-disable @typescript-eslint/naming-convention */
export type IGroupedDataSet = Record<string, number>;

export type IStackedDataSet = Record<string, IGroupedDataSet[]>;
