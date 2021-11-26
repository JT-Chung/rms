<template>
  <div class="nav-header">
    <i
      class="menu-fold"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>

    <div class="user-info">
      <icy-breadcrumb />
      <user-info />
    </div>
  </div>
</template>
<script>
import { ref } from "vue"
import UserInfo from "./UserInfo.vue"
import icyBreadcrumb from "./IcyBreadcrumb.vue"

export default {
  components: {
    UserInfo,
    icyBreadcrumb,
  },
  emits: ["foldChange"],
  setup(props, { emit }) {
    const isFold = ref(false)
    function handleFoldClick() {
      isFold.value = !isFold.value
      emit("foldChange", isFold.value)
    }
    return {
      isFold,
      handleFoldClick,
    }
  },
}
</script>
<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .menu-fold {
    margin-left: 5px;
    font-size: 30px;
    cursor: pointer;
  }
  .user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
