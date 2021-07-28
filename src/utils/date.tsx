import { format, parseISO } from 'date-fns'

export const formatDate = (x: string) => format(parseISO(x), 'MMMM DD, YYYY')

export const dateSortDesc = (a: Date, b: Date) => {
	if (a > b) return -1
	if (a < b) return 1
	return 0
}
