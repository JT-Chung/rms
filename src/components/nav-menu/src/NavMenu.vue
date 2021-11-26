<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-if="!collapse">here we go</span>
    </div>
    <!-- 菜单 -->

    <el-menu
      :uniqueOpened="true"
      :default-active="defaultActiveValue"
      class="el-menu-vertical-demo"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 级菜单 -->
        <template v-if="item.type === 1">
          <!-- 级菜单的可以展开的标题 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span> {{ item.name }} </span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span> {{ subitem.name }} </span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 菜单 -->
        <!-- <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span> {{ item.name }} </span>
          </el-menu-item>
        </template> -->
      </template>
    </el-menu>
  </div>
</template>
<script>
import { ref } from "vue"
import { useStore } from "vuex"
import { useRouter, useRoute } from "vue-router"
import { mapPathToMenus } from "@/utils/mapMenus"

export default {
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const userMenus = store.state.login.userMenus.data
    function handleMenuItemClick(item) {
      router.push({
        path: item.url ?? "/not-found",
      })
    }
    //获取当前的路径
    const currentPath = route.path
    const menu = mapPathToMenus(userMenus, currentPath)
    const defaultActiveValue = ref(menu + "")

    return {
      userMenus,
      handleMenuItemClick,
      defaultActiveValue,
    }
  },
}
</script>
<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 10px;
    height: 28px;

    img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
    }
  }
  .el-menu {
    border-right: none;
  }
}
</style>
