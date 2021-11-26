<template>
  <div class="icy-table">
    <icy-table
      :listData="listData"
      :footerListCount="footerListCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <template #headerHandler
        ><el-button
          v-if="isCreate"
          type="primary"
          size="medium"
          @click="handleNewClick"
          >新建用户</el-button
        ></template
      >
      <template #status="{ row }">
        <el-button
          plain
          size="mini"
          :type="row.enable ? 'success' : 'danger'"
          >{{ row.enable ? "启用" : "禁用" }}</el-button
        >
      </template>
      <template #createAt="{ row }"
        ><strong>{{ $filters.formatTime(row.createAt) }}</strong></template
      >
      <template #updateAt="{ row }"
        ><strong>{{ $filters.formatTime(row.updateAt) }}</strong></template
      >
      <template #tableUD="{ row }">
        <div>
          <el-button
            v-if="isUpdate"
            type="text"
            size="mini"
            icon="el-icon-edit"
            @click="handleEditClick(row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            type="text"
            size="mini"
            icon="el-icon-delete"
            @click="handleDeleteClick(row)"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 在page-content插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </icy-table>
  </div>
</template>
<script>
import icyTable from "@/base-ui/table"

import { useStore } from "vuex"
import { computed, ref, watch } from "vue"

import { usePermission } from "@/hooks/use-permission"
export default {
  props: {
    contentTableConfig: {
      type: Object,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
  },
  components: {
    icyTable,
  },
  emits: ["newBtnClick", "editBtnClick"],
  setup(props, { emit }) {
    const store = useStore()

    //获取操作的权限
    const isCreate = usePermission(props.pageName, "create")
    const isUpdate = usePermission(props.pageName, "update")
    const isDelete = usePermission(props.pageName, "delete")
    const isQuery = usePermission(props.pageName, "query")

    //双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    //发送网络请求
    const getPageData = (searchInfo) => {
      if (!isQuery) return
      store.dispatch(`system/getPageListAction`, {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...searchInfo,
        },
      })
    }
    getPageData()
    //从vuex中获取数据
    const listData = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const footerListCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    //获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig.propList.filter((item) => {
      if (item.slotName === "status") return false
      if (item.slotName === "createAt") return false
      if (item.slotName === "updateAt") return false
      if (item.slotName === "tableUD") return false
      return true
    })

    //删除/编辑/新建操作
    const handleNewClick = () => {
      emit("newBtnClick")
    }
    const handleEditClick = (item) => {
      emit("editBtnClick", item)
    }
    const handleDeleteClick = (item) => {
      console.log(item)
      store.dispatch("system/deletePageDataAction", {
        pageName: props.pageName,
        id: item.id,
      })
    }
    return {
      pageInfo,
      listData,
      footerListCount,
      getPageData,
      isCreate,
      isUpdate,
      isDelete,
      otherPropSlots,
      handleNewClick,
      handleEditClick,
      handleDeleteClick,
    }
  },
}
</script>
<style scoped lang="less"></style>
