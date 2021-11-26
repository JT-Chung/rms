import { createStore } from "vuex"
import { getPageList } from "../network/main/system.js"

import { login } from "./login/login.js"
import { system } from "./main/system/system.js"
import { dashboard } from "./main/dashboard/dashboard.js"

const store = createStore({
  state: {
    entireDepartment: [],
    entireRole: [],
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
  },
  actions: {
    async getInitialDataAction({ commit }) {
      //请求部门和角色数据
      const departmentResult = await getPageList("department/list", {
        offset: 0,
        size: 1000,
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageList("role/list", {
        offset: 0,
        size: 1000,
      })
      const { list: roleList } = roleResult.data

      //保存数据
      commit("changeEntireDepartment", departmentList)
      commit("changeEntireRole", roleList)
    },
  },
  modules: {
    login,
    system,
    dashboard,
  },
})

export default store

//开发阶段用
export function setupStore() {
  store.dispatch("login/loadLocalStore")
  store.dispatch("getInitialDataAction")
}
