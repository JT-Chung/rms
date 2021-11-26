<template>
  <div class="page-search">
    <icy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearchClick"
            >搜索</el-button
          >
        </div>
      </template>
    </icy-form>
  </div>
</template>
<script>
import icyForm from "@/base-ui/form"
import { ref } from "vue"

export default {
  props: {
    searchFormConfig: {
      type: Object,
      required: true,
    },
  },
  components: {
    icyForm,
  },
  emits: ["resetBtnClick", "searchBtnClick"],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData = {}
    for (const item of formItems) {
      formOriginData[item.field] = ""
    }
    const formData = ref(formOriginData)

    //重置
    function handleResetClick() {
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      formData.value = formOriginData
      emit("resetBtnClick")
    }
    //搜索
    function handleSearchClick() {
      delete formData.value.creatAt
      emit("searchBtnClick", formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleSearchClick,
    }
  },
}
</script>
<style scoped lang="less">
.header {
  color: red;
  padding-top: 22px;
  margin: 0;
}
.handle-btns {
  text-align: right;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
