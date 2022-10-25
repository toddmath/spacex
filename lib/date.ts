type DateTimeFormatOptions = Intl.DateTimeFormatOptions

const defaultOptions: DateTimeFormatOptions = {
  dateStyle: "medium",
  // timeStyle: "short",
  // year: "numeric",
  // month: "long",
  // day: "numeric",
}

export const formatDate = (
  dateString: string,
  options?: DateTimeFormatOptions
): string => {
  return new Date(dateString).toLocaleDateString("en-US", options ?? defaultOptions)
}

export function getYear<T extends DateLike>(date: T): number {
  return new Date(date).getFullYear()
}

type DateLike = string | number | Date

export function isFuture<T extends DateLike>(date: T): boolean {
  return Number(new Date(date)) > Date.now()
}
