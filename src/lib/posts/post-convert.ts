import type { journal, nestedDate, nestedDates } from '$types/journal.type';

export function filter(journals: journal[], params: { year?: string; month?: string; day?: string, travel?: string, tag?: string }) {
  return journals.filter((journal) => {
    if (!params) return true;

    const date = new Date(journal.metadata.date);
    if (params.year && date.getUTCFullYear() != parseInt(params.year)) return false;
    if (params.month && date.getUTCMonth() + 1 != toMonthInt(params.month)) return false;
    if (params.day && date.getUTCDate() != parseInt(params.day)) return false;
    if (params.travel && journal.metadata.travel != params.travel) return false;
    if (params.tag && !journal.metadata.tags?.split(' ').includes(params.tag)) return false;

    return true;
  });
}

export function nestDates(journals: journal[]) {
  const dates = {} as nestedDates;
  const undated = [] as journal[];

  journals.forEach((journal: journal) => {
    if (journal && !journal.metadata.date) {
      undated.push(journal);
      return;
    }

    const date = new Date(journal.metadata.date);
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

export function convert(path){

  return "ape";
}