import JournalLink from "./JournalLink.svelte";
import JournalsLink from "./JournalsLink.svelte";
import JournalsList from "./JournalsList.svelte";
import JournalTag from "./JournalTag.svelte";

import type { journal, nestedDate, nestedDates } from '$types/journal.type';

function toMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'long'
  });
}

function toMonthInt(monthName){
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return isNaN(monthName) ? months.indexOf(monthName) : monthName;
};

function filter(journals: journal[], params: { year?: string; month?: string; travel?: string; }) {
  return journals.filter((journal) => {
    if (!params) return true;

    const date = new Date(journal.metadata.date);
    if (params.year && date.getFullYear() != parseInt(params.year)) return false;
    if (params.month && date.getMonth() + 1 != toMonthInt(params.month)) return false;
    if (params.travel && journal.metadata.travel != params.travel) return false;

    return true;
  });
};

function nestDates(journals: journal[]) {
  const dates = {} as nestedDates;
  const undated = [] as journal[];

  journals.forEach((journal: journal) => {
    if (journal && !journal.metadata.date) {
      undated.push(journal);
      return;
    }

    const date = new Date(journal.metadata.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    var yearA = dates[year] || (dates[year] = {} as nestedDate);
    var monthA = yearA[month] || (yearA[month] = [] as journal[]);

    monthA.push(journal);
  });

  return { dates, undated };
};

export { JournalLink, JournalsLink, JournalsList, JournalTag, toMonthName, toMonthInt, filter, nestDates };