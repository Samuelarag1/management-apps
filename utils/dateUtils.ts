import {
  addYears,
  differenceInCalendarDays,
  format,
  isValid,
  parseISO,
} from "date-fns";

type DateValue = string | Date | null | undefined;

function parseDate(value: DateValue) {
  if (!value) return null;
  const date = value instanceof Date ? value : parseISO(value);
  return isValid(date) ? date : null;
}

// Finds the next annual renewal date that is still in the future.
// Handles stored dates that are already past (e.g. original registration year).
export function daysUntilNextYear(value: DateValue): number | null {
  const date = parseDate(value);
  if (!date) return null;

  const today = new Date();
  let renewal = addYears(date, 1);
  while (renewal < today) {
    renewal = addYears(renewal, 1);
  }
  return differenceInCalendarDays(renewal, today);
}

export function nextRenewalDate(value: DateValue): Date | null {
  const date = parseDate(value);
  if (!date) return null;

  const today = new Date();
  let renewal = addYears(date, 1);
  while (renewal < today) {
    renewal = addYears(renewal, 1);
  }
  return renewal;
}

export function formatDate(value: DateValue, fallback = "Sin fecha") {
  const date = parseDate(value);
  if (!date) return fallback;
  return format(date, "dd/MM/yyyy");
}
