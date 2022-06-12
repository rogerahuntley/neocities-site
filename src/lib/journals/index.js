import JournalLink from "./JournalLink.svelte";
import JournalsLink from "./JournalsLink.svelte";
import JournalsList from "./JournalsList.svelte";
import JournalTag from "./JournalTag.svelte";
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

export { JournalLink, JournalsLink, JournalsList, JournalTag, toMonthName, toMonthInt };