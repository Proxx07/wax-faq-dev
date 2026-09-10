export const getMonthDayYearDateFromDateString = (dateISOString: string) => {
  const date = new Date(dateISOString);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
};

export const getTimeStringFromDateString = (dateISOString: string) => {
  const date = new Date(dateISOString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).replace(/ AM| PM/i, '');
};
