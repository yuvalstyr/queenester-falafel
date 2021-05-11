import { addDays, endOfWeek, format, startOfWeek } from "date-fns";
const formatDate = "yyyy-MM-dd";

function weekBoundaries(date: string) {
  const startWeek = format(startOfWeek(new Date(date)), formatDate);
  const endWeek = format(addDays(endOfWeek(new Date(date)), 1), formatDate);
  return { startWeek, endWeek };
}

function allWeekDays({ date }: { date: string }) {
  const { startWeek } = weekBoundaries(date);
  return new Array(7).fill(0).map((_d, index) => {
    return format(addDays(new Date(startWeek), index), formatDate);
  });
}

function formatDay({
  date,
  formatConfig,
}: {
  date: Date;
  formatConfig?: string;
}) {
  return format(date, formatConfig ?? formatDate);
}

export { weekBoundaries, allWeekDays, formatDay };
