<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item to="#">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script>
import { mapPathToBreadcrumbs } from "@/utils/mapMenus"
import { useRoute } from "vue-router"
import { useStore } from "vuex"
import { computed } from "vue"
export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const userMenus = store.state.login.userMenus.data
    const breadcrumbs = computed(() => {
      const currentPath = route.path
      return mapPathToBreadcrumbs(userMenus, currentPath)
    })
    return {
      breadcrumbs,
    }
  },
}
</script>
<style scoped lang="less"></style>
