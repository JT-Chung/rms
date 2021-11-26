import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)
const DEFAULT_FORMAT = "YYYY-MM-DD HH:mm:ss"
export function formatUtcString(utcString, format = DEFAULT_FORMAT) {
  return dayjs.utc(utcString).format(format)
}
