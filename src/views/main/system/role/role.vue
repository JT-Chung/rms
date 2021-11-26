<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig" />

    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    />

    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      :modalConfig="modalConfig"
      pageName="role"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        />
      </div>
    </page-modal>
  </div>
</template>

<script>
import pageSearch from "@/components/page-search"
import pageContent from "@/components/page-content"
import pageModal from "@/components/page-modal"

import { usePageModal } from "@/hooks/use-page-modal"
import { mapMenuToLeafKeys } from "@/utils/mapMenus"

import { nextTick, ref, computed } from "vue"
import { useStore } from "vuex"

export default {
  components: {
    pageSearch,
    pageContent,
    pageModal,
  },
  setup() {
    //检索配置
    const searchFormConfig = {
      labelWidth: "120px",
      itemLayout: {
        padding: "10px 40px",
      },

      formItems: [
        {
          field: "name",
          type: "input",
          label: "角色",
          placeholder: "请输入要查询的角色名",
        },
        {
          field: "intro",
          type: "input",
          label: "权限介绍",
          placeholder: "请输入权限介绍",
        },
        {
          field: "createTime",
          type: "datepicker",
          label: "创建时间",
          otherOptions: {
            startPlaceholder: "开始时间",
            endPlaceholder: "结束时间",
            type: "daterange",
          },
        },
      ],
    }
    //table配置

    const contentTableConfig = {
      title: "用户列表",
      propList: [
        {
          prop: "name",
          label: "角色名",
          minWidth: "100",
        },
        {
          prop: "intro",
          label: "介绍",
          minWidth: "100",
        },

        {
          prop: "createAt",
          label: "创建时间",
          minWidth: "250",
          slotName: "createAt",
        },
        {
          prop: "updateAt",
          label: "更新时间",
          minWidth: "250",
          slotName: "updateAt",
        },
        {
          label: "操作",
          minWidth: 100,
          slotName: "tableUD",
        },
      ],
      showIndexColumn: true,
      showSelectColumn: true,
    }

    //modal配置
    const modalConfig = {
      formItems: [
        {
          field: "name",
          type: "input",
          label: "角色名",
          placeholder: "请输入角色名",
        },
        {
          field: "intro",
          type: "input",
          label: "角色介绍",
          placeholder: "请输入角色介绍",
        },
      ],
      colLayout: { span: 24 },
      itemStyle: {},
    }

    //处理pageModal的hook
    const elTreeRef = ref()
    const editCallback = (item) => {
      const leafKeys = mapMenuToLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    const [pageModalRef, handleNewData, handleEditData, defaultInfo] =
      usePageModal(null, editCallback)

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    const handleCheckChange = (data1, data2) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      searchFormConfig,
      contentTableConfig,
      pageModalRef,
      handleNewData,
      handleEditData,
      defaultInfo,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef,
      modalConfig,
    }
  },
}
</script>

<style scoped></style>
