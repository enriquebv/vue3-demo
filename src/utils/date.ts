import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/es'

dayjs.extend(relativeTime)
dayjs.locale('es') // Probably hardcoding locale is not the best idea, but it's just an example

function checkDate(date: string) {
  if (!dayjs(date).isValid()) {
    throw new Error('Invalid date')
  }
}

export function dateToRelative(isoDate: string) {
  checkDate(isoDate)
  return dayjs(isoDate).fromNow()
}
