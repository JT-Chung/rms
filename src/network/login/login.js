import { sendReq } from ".."
// import axios from "axios"

// const loginAPI = {
//   AccountLogin: "/login",
//   UserInfo: "/users/",
//   UserMenus: "/role/",
// }

export function accountLoginRequest(account) {
  return sendReq.post("/login", account)
}
export function getUserById(id) {
  return sendReq.get(`/users/${id}`)
}
export function getUserMenus(id) {
  return sendReq.get(`/role/${id}/menu`)
}
