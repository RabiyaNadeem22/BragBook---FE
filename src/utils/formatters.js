import { format, parseISO, isValid } from 'date-fns';

export function formatDate(value, pattern = 'MMM d, yyyy') {
  if (!value) return null;
  const date = typeof value === 'string' ? parseISO(value) : value;
  if (!isValid(date)) return null;
  return format(date, pattern);
}

export function toDateInputValue(value) {
  if (!value) return '';
  const date = typeof value === 'string' ? parseISO(value) : value;
  if (!isValid(date)) return '';
  return format(date, 'yyyy-MM-dd');
}

export function formatProjectTimeline(startDate, endDate, status) {
  const start = formatDate(startDate, 'MMM yyyy');
  const end = formatDate(endDate, 'MMM yyyy');
  if (start && end) return `${start} – ${end}`;
  if (start && !end) return `${start} – ${status === 'COMPLETED' || status === 'ARCHIVED' ? 'Ended' : 'Present'}`;
  if (!start && end) return `Until ${end}`;
  return 'Dates not set';
}

export function titleCaseEnum(value) {
  if (!value) return '';
  return value
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function formatYears(years) {
  if (years === null || years === undefined || years === '') return 'Experience not set';
  const numeric = Number(years);
  if (Number.isNaN(numeric)) return 'Experience not set';
  if (numeric === 1) return '1 year';
  return `${numeric} years`;
}
