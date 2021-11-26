<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar
        shape="square"
        :size="20"
        :src="'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"
      >
      </el-avatar>
      <span>{{ name }}</span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>开发中...</el-dropdown-item>
        <el-dropdown-item>开发中...</el-dropdown-item>
        <el-dropdown-item divided icon="el-icon-circle-close" @click="logOut"
          >注销</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script>
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { computed } from "vue"
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const name = computed(() => store.state.login.userInfo.data.name)
    function logOut() {
      localStorage.clear()
      router.push("/login")
    }
    return {
      name,
      logOut,
    }
  },
}
</script>
<style scoped lang="less">
.el-dropdown-link {
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin-left: 6px;
  }
}
</style>
