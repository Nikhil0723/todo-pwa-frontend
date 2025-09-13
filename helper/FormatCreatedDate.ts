export function formatCreatedDate(dateStr: string) {
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
  else return formatCreatedDate(dateStr);

  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formattedTime} (${relative})`;
}
