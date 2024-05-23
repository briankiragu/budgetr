import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

export default () => ({
  dayDiff: (date1: Date, date2: Date) => differenceInDays(date1, date2),
  weekDiff: (date1: Date, date2: Date) => differenceInWeeks(date1, date2),
  monthDiff: (date1: Date, date2: Date) => differenceInMonths(date1, date2),
  yearDiff: (date1: Date, date2: Date) => differenceInYears(date1, date2),

  dayAdd: (date1: Date, amount: number) => addDays(date1, amount),
  weekAdd: (date1: Date, amount: number) => addWeeks(date1, amount),
  monthAdd: (date1: Date, amount: number) => addMonths(date1, amount),
  yearAdd: (date1: Date, amount: number) => addYears(date1, amount),
});
