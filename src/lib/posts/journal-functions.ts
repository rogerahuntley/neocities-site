import type { journal, nestedDate, nestedDates } from '$types/journal.type';

export function nestDates(journals: journal[]) {
  const dates = {} as nestedDates;
  const undated = [] as journal[];

  journals.forEach((journal: journal) => {
    if (journal && !journal.data.metadata.date) {
      undated.push(journal);
      return;
    }

    const date = new Date(journal.data.metadata.date);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;

    const yearA = dates[year] || (dates[year] = {} as nestedDate);
    const monthA = yearA[month] || (yearA[month] = [] as journal[]);

    monthA.push(journal);
  });

  return { dates, undated };
}

export function toMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'long'
  });
}

export function toMonthInt(monthName) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  return isNaN(monthName) ? months.indexOf(monthName) : monthName;
}