export const getAmPmTimeFromDate = (date: Date) => {
  const hours = date.getHours();
  const mins = date.getMinutes();
  return (hours > 12) ? (`${hours - 12}:${mins} PM`) : (`${hours}:${mins} AM`);
};
