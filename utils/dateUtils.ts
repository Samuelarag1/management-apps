import {
  addYears,
  differenceInCalendarDays,
  format,
  isValid,
  parseISO,
} from "date-fns";

type DateValue = string | Date | null | undefined;

function parseDate(value: DateValue) {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : parseISO(value);

  return isValid(date) ? date : null;
}

export function daysUntilNextYear(value: DateValue) {
  const date = parseDate(value);

  if (!date) {
    return null;
  }

  return differenceInCalendarDays(addYears(date, 1), new Date());
}

export function formatDate(value: DateValue, fallback = "Sin fecha") {
  const date = parseDate(value);

  if (!date) {
    return fallback;
  }

  return format(date, "dd/MM/yyyy");
}
