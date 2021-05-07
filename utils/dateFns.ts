import { addDays, format, formatISO, startOfDay } from "date-fns";

function dayBoundaries(date: Date) {
  const startDay = format(startOfDay(date), "");
  const endDay = formatISO(addDays(startOfDay(date), 1));
  return { startDay, endDay };
}

function startOfISODay(date: Date) {
  return formatISO(startOfDay(date));
}

export { dayBoundaries, startOfISODay };
