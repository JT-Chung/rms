<template>
  <div class="main">
    <el-container>
      <el-aside :width="isCollapse ? '60px' : '190px'">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <nav-header @foldChange="handleFoldChange" />
        </el-header>
        <el-main>
          <div class="el-main-body">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import NavMenu from "@/components/nav-menu"
import NavHeader from "@/components/nav-header"

import { ref } from "vue"

export default {
  components: {
    NavMenu,
    NavHeader,
  },
  setup() {
    const isCollapse = ref(false)
    const handleFoldChange = (isFold) => {
      isCollapse.value = isFold
    }
    return {
      isCollapse,
      handleFoldChange,
    }
  },
}
</script>
<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    transition: width 0.3s linear;
    background-color: #0c2135;
    color: var(--el-text-color-primary);
    text-align: left;
    line-height: 200px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-container {
    height: 100%;
    .el-header {
      display: flex;
      text-align: center;
      align-items: center;
      padding: 0;
      color: var(--el-text-color-primary);
      height: 50px;
      border-bottom: 1px solid #f8f8f8;
    }
    .el-main {
      height: calc(100% - 48px);
      color: var(--el-text-color-primary);
      text-align: center;
      .el-main-body {
        background-color: #f8f8f8;
      }
    }
  }
}
</style>
