
export const getMonthDays = (date) => {
  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
  const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const days = [];
  for (let i = 1; i <= monthEnd.getDate(); i++) {
    days.push(new Date(date.getFullYear(), date.getMonth(), i));
  }
  return days;
};

export const getWeekDays = (date) => {
  const start = new Date(date);
  const day = start.getDay();
  start.setDate(start.getDate() - day + 1); 
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
};
