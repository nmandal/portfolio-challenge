// Find date or closest previous date
export function findDate(date, dateList) {
  date = new Date(date); // normalize to Date type
  dateList = dateList.map((d) => new Date(d)).sort((a,b) => a-b); // sort dateList ascending

  for (let i = 0; i < dateList.length; i++) {
    let currentDate = dateList[i];
    if (date.getTime() === currentDate.getTime()) {
      return date;                     // return date if equal to current date
    } else
    if (date > currentDate) {          // date is greater than current (in future)
      if (i < (dateList.length - 1)) {
        continue;                      // keep searching if we have more dates in list
      } else {
        return currentDate;            // else return last date
      }
    } else
    if (date < currentDate) {          // date is less than current (in past)
      if (i === 0) {
        return dateList[0];            // return first date if this is the first date
      } else {
        return dateList[i-1];          // else return previous date
      }
    }
  }
}

// Format date to match allocation file (MM-dd-yyyy)
export function formatAllocationDate(date) {
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
}

// Format date to yyyy-mm-dd format
export function formatDate(date) {
  return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + (date.getDate() + 1)).slice(-2)}`;
}
