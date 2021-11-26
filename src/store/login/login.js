import {
  accountLoginRequest,
  getUserById,
  getUserMenus,
} from "@/network/login/login"

import router from "@/router"
import { mapMenusToRoutes, mapMenusToPermissions } from "../../utils/mapMenus"

export const login = {
  namespaced: true,
  state: () => ({
    token: "",
    userInfo: {},
    userMenus: [],
    permissions: [],
  }),
  mutations: {
    saveToken(state, token) {
      state.token = token
    },
    saveUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    saveUserMenus(state, userMenus) {
      state.userMenus = userMenus

      const routes = mapMenusToRoutes(userMenus.data)
      routes.forEach((route) => {
        router.addRoute("main", route)
      })
      //获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus.data)
      state.permissions = permissions
    },
  },
  actions: {
    async accountLoginAction({ commit }, account) {
      //1用户登录
      const loginResult = await accountLoginRequest(account)
      // console.log(loginResult)
      const { id, token } = loginResult.data
      commit("saveToken", token)
      localStorage.setItem("token", JSON.stringify(token))

      //2获取用户信息
      const userInfo = await getUserById(id)
      // console.log(userInfo)
      commit("saveUserInfo", userInfo)
      localStorage.setItem("userInfo", JSON.stringify(userInfo))

      //3用户菜单树
      const userMenus = await getUserMenus(userInfo.data.role.id)
      // console.log(userMenus)
      commit("saveUserMenus", userMenus)
      localStorage.setItem("userMenus", JSON.stringify(userMenus))

      //跳转到首页
      router.push("/main")
    },

    //开发阶段用
    loadLocalStore({ commit }) {
      const token = JSON.parse(localStorage.getItem("token"))
      if (token) {
        commit("saveToken", token)
      }

      const userInfo = JSON.parse(localStorage.getItem("userInfo"))
      if (userInfo) {
        commit("saveUserInfo", userInfo)
      }
      const userMenus = JSON.parse(localStorage.getItem("userMenus"))
      if (userMenus) {
        commit("saveUserMenus", userMenus)
      }
    },
  },
}
