import {
  deletePageData,
  editPageData,
  getPageList,
  createPageData,
} from "../../../network/main/system"

export const system = {
  namespaced: true,
  state: () => ({
    usersList: [],
    usersCount: 0,
    roleList: [],
    roleCount: 0,
    menuList: [],
    menuCount: 0,
    goodsList: [],
    goodsCount: 0,
  }),
  mutations: {
    changeUsersList(state, list) {
      state.usersList = list
    },
    changeUsersCount(state, totalCount) {
      state.usersCount = totalCount
    },
    changeRoleList(state, list) {
      state.roleList = list
    },
    changeRoleCount(state, totalCount) {
      state.roleCount = totalCount
    },
    changeMenuList(state, list) {
      state.menuList = list
    },
    changeMenuCount(state, totalCount) {
      state.menuCount = totalCount
    },
    changeGoodsList(state, list) {
      state.goodsList = list
    },
    changeGoodsCount(state, totalCount) {
      state.goodsCount = totalCount
    },
  },
  getters: {
    pageListData(state) {
      return (pageName) => {
        return state[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName) => {
        return state[`${pageName}Count`]
      }
    },
  },
  actions: {
    async getPageListAction({ commit }, payload) {
      const pageName = payload.pageName
      const pageUrl = `${pageName}/list`
      const pageResult = await getPageList(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },

    async deletePageDataAction({ dispatch }, payload) {
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await deletePageData(pageUrl)
      //重新请求最新数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      })
    },

    async createPageDataAction({ dispatch }, payload) {
      //创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)

      //请求最新数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      })
    },

    async editPageDataAction({ dispatch }, payload) {
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)

      //请求最新数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      })
    },
  },
}
