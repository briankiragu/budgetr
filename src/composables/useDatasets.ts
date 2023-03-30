import type { ITransaction } from '@interfaces/budget';

export default () => {
  /**
   *
   * @param {string} filterId The filter ID being used
   * @param {string} timestamp The timestamp to use to get the interval
   * @returns {string|number} The interval value
   */
  const getTimePeriod = (
    filterId: string,
    timestamp: string
  ): string | number => {
    // Interval to use (based on active filter).
    let interval: number | string | undefined;

    // Get the current year from the field.
    switch (filterId) {
      case 'day':
        interval = new Date(timestamp).toLocaleString('default', {
          day: '2-digit',
          hour: '2-digit',
        });
        break;

      case 'week':
        interval = new Date(timestamp).toLocaleString('default', {
          day: '2-digit',
          month: 'short',
        });
        break;

      case 'months':
        interval = new Date(timestamp).toLocaleString('default', {
          month: 'short',
          year: 'numeric',
        });
        break;

      case 'years':
        interval = new Date(timestamp).toLocaleString('default', {
          year: 'numeric',
        });
        break;

      default:
        interval = new Date(timestamp).toLocaleString('default', {
          day: '2-digit',
          month: 'short',
        });
        break;
    }

    return interval;
  };

  /**
   * Group the transactions by the period.
   *
   * @param {ITransaction[]} transactions The transactions to group (income, expense, etc...)
   * @param {string} period The period to group them into (day, month, year, etc...)
   * @param {string[]|undefined} sources The sources to create the stacks based on...
   *
   * @returns {Record<string|number, number>} Transactions grouped by period.
   */
  const groupByPeriod = (
    transactions: ITransaction[],
    period: string,
    sources: string[] | undefined = undefined
  ): Record<string | number, number> =>
    transactions.reduce(
      (group: Record<string | number, number>, transaction) => {
        // Get only the transactions with the specified natures (if sources were provided).
        if (sources && !sources.includes(transaction.source)) {
          return group;
        }

        // Get the date to use to filter.
        const { amount, source, updatedAt } = transaction;

        // Interval to use (based on active filter).
        const interval = getTimePeriod(period, updatedAt);

        // If the group does not exist, create it.
        if (!(interval in group)) {
          group[interval] = 0;
        }

        // Add the transaction to the group.
        group[interval] += amount;

        // Return the new group.
        return group;
      },
      {}
    );

  /**
   * Stack the transactions into natures by the period.
   *
   * @param {ITransaction[]} transactions The transactions to group (income, expense, etc...)
   * @param {string} period The period to group them into (day, month, year, etc...)
   * @param {string[]|undefined} sources The sources to create the stacks based on...
   *
   * @returns {Record<string|number, Record<string, number>>} Transactions stacked by period.
   */
  const stackByPeriod = (
    transactions: ITransaction[],
    period: string,
    sources: string[] | undefined = undefined
  ): Record<string | number, Record<string, number>> =>
    transactions
      // Group the transactions based on their period
      .reduce(
        (
          stack: Record<string | number, Record<string, number>>,
          transaction
        ) => {
          // Get only the transactions with the specified natures (if sources were provided).
          if (sources && !sources.includes(transaction.source)) {
            return stack;
          }

          // Get the date to use to filter.
          const { amount, source, updatedAt } = transaction;

          // Interval to use (based on active filter).
          const interval = getTimePeriod(period, updatedAt);

          // If the stack does not exist, create it.
          if (!(interval in stack)) {
            stack[interval] = {};
          }

          // Check the transaction source
          if (!(source in stack[interval])) {
            stack[interval][source] = 0;
          }

          // Add the transaction to the stack.
          stack[interval][source] += amount;

          // Return the new stack.
          return stack;
        },
        {}
      );

  return { groupByPeriod, stackByPeriod };
};
