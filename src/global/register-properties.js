import { formatUtcString } from "@/utils/date-format"

export function registerProperties(app) {
  app.config.globalProperties.$filters = {
    formatTime(value) {
      return formatUtcString(value)
    },
  }
}
