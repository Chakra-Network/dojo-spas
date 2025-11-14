/**
 * Creates a date in the past.
 * @param daysAgo - The number of days in the past.
 * @returns An ISO 8601 string representation of the date.
 */
export function createPastDate(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}