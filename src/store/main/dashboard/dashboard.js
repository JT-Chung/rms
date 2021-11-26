import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale,
} from "../../../network/main/dashboard"

export const dashboard = {
  namespaced: true,
  state: () => ({
    categoryGoodsCount: [],
    categoryGoodsSale: [],
    categoryGoodsFavor: [],
    addressGoodsSale: [],
  }),
  mutations: {
    saveCategoryGoodsCount(state, payload) {
      state.categoryGoodsCount = payload
    },
    saveCategoryGoodsSale(state, payload) {
      state.categoryGoodsSale = payload
    },
    saveCategoryGoodsFavor(state, payload) {
      state.categoryGoodsFavor = payload
    },
    saveAddressGoodsSale(state, payload) {
      state.addressGoodsSale = payload
    },
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryGoodsCountResult = await getCategoryGoodsCount()
      commit("saveCategoryGoodsCount", categoryGoodsCountResult.data)

      const categoryGoodsSaleResult = await getCategoryGoodsSale()
      commit("saveCategoryGoodsSale", categoryGoodsSaleResult.data)

      const categoryGoodsFavorResult = await getCategoryGoodsFavor()
      commit("saveCategoryGoodsFavor", categoryGoodsFavorResult.data)

      const addressGoodsSaleResult = await getAddressGoodsSale()
      commit("saveAddressGoodsSale", addressGoodsSaleResult.data)
    },
  },
}
