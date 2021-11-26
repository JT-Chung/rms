import { sendReq } from "../index"

export function getPageList(pageUrl, queryInfo) {
  return sendReq.post(pageUrl, queryInfo)
}

export function deletePageData(pageUrl) {
  return sendReq.delete(pageUrl)
}

export function createPageData(pageUrl, newData) {
  return sendReq.post(pageUrl, newData)
}

export function editPageData(pageUrl, editData) {
  return sendReq.patch(pageUrl, editData)
}
