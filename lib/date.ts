type DateTimeFormatOptions = Intl.DateTimeFormatOptions;
type DateLike = string | number | Date;

const defaultOptions: DateTimeFormatOptions = {
  dateStyle: "medium",
  // timeStyle: "short",
  // year: "numeric",
  // month: "long",
  // day: "numeric",
};

export function formatDate(
  dateString: string,
  options?: DateTimeFormatOptions,
): string {
  return new Date(dateString).toLocaleDateString(
    "en-US",
    options ?? defaultOptions,
  );
}

export function getYear<T extends DateLike>(date: T): number {
  return new Date(date).getFullYear();
}

export function isFuture<T extends DateLike>(date: T): boolean {
  return Number(new Date(date)) > Date.now();
}
