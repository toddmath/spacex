type DateTimeFormatOptions = Intl.DateTimeFormatOptions
type DateLike = string | number | Date

const defaultOptions: DateTimeFormatOptions = {
  dateStyle: "medium",
}

export function formatDate(dateString: string, options?: DateTimeFormatOptions) {
  return new Date(dateString).toLocaleDateString("en-US", options ?? defaultOptions)
}

export function getYear<T extends DateLike>(date: T) {
  return new Date(date).getFullYear()
}

export function isFuture<T extends DateLike>(date: T) {
  return Number(new Date(date)) > Date.now()
}
