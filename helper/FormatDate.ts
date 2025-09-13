export const formatTaskDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();
  
  const normalize = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const d = normalize(date);
  const t = normalize(today);

  const oneDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.round((d.getTime() - t.getTime()) / oneDay);

  let relative: string;
  if (diffDays === 0) relative = "today";
  else if (diffDays === 1) relative = "tomorrow";
  else if (diffDays === -1) relative = "yesterday";
  else if (diffDays > 1) relative = `in ${diffDays} days`;
  else relative = `${Math.abs(diffDays)} days ago`;

  // Format date parts
  const formattedDate = date.toLocaleDateString(undefined, {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const weekday = date.toLocaleDateString(undefined, { weekday: "long" });

  return `${formattedDate} • ${formattedTime} • ${weekday} (${relative})`;
};
