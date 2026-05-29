import { format, parseISO } from 'date-fns';

export function PostDate({
  dateString,
  className,
  formatStr = 'LLL d, yyyy',
}: {
  dateString: string;
  className?: string;
  formatStr?: string;
}) {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString} className={className}>
      {format(date, formatStr)}
    </time>
  );
}
