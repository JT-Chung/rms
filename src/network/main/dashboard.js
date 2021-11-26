import { sendReq } from ".."

export function getCategoryGoodsCount() {
  return sendReq.get("/goods/category/count")
}
export function getCategoryGoodsSale() {
  return sendReq.get("/goods/category/sale")
}
export function getCategoryGoodsFavor() {
  return sendReq.get("/goods/category/favor")
}
export function getAddressGoodsSale() {
  return sendReq.get("/goods/address/sale")
}
