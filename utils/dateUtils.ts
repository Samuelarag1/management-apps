export function daysUntilNextYear(dateString: string): number {
  const startDate = new Date(dateString);
  const nextYearDate = new Date(startDate);
  nextYearDate.setFullYear(startDate.getFullYear() + 1);

  const today = new Date();
  const diffTime = nextYearDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
