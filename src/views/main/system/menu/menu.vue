<template>
  <div class="menu">
    <page-content :contentTableConfig="contentTableConfig" pageName="menu" />
    <page-modal
      :defaultInfo="defaultInfo"
      pageName="menu"
      :modalConfig="modalConfigRef"
      ref="pageModalRef"
    />
  </div>
</template>

<script>
import pageContent from "@/components/page-content"
import pageModal from "@/components/page-modal"

import { usePageModal } from "@/hooks/use-page-modal"

import { useStore } from "vuex"
import { computed } from "vue"
export default {
  components: {
    pageContent,
    pageModal,
  },
  setup() {
    const contentTableConfig = {
      titie: "菜单列表",
      propList: [
        { prop: "name", label: "菜单名称", minWidth: "100" },
        { prop: "type", label: "类型", minWidth: "60" },
        { prop: "url", label: "菜单url", minWidth: "100" },
        { prop: "icon", label: "菜单icon", minWidth: "100" },
        { prop: "permission", label: "按钮权限", minWidth: "100" },
        {
          prop: "createAt",
          label: "创建时间",
          minWidth: "220",
          slotName: "createAt",
        },
        {
          prop: "updateAt",
          label: "更新时间",
          minWidth: "220",
          slotName: "updateAt",
        },
        { label: "操作", minWidth: "120", slotName: "tableUD" },
      ],
      childrenProps: {
        rowKey: "id",
        treeProp: {
          children: "children",
        },
      },
      showFooter: false,
    }

    //配置dialog
    const modalConfig = {
      formItems: [
        {
          field: "name",
          type: "input",
          label: "用户名",
          placeholder: "请输入用户名",
        },
        {
          field: "realname",
          type: "input",
          label: "真实姓名",
          placeholder: "请输入真实姓名",
        },
        {
          field: "password",
          type: "password",
          label: "用户密码",
          placeholder: "请输入密码",
          // isHidden: false,
        },
        {
          field: "cellphone",
          type: "input",
          label: "电话号码",
          placeholder: "请输入电话号码",
        },
        {
          field: "departmentId",
          type: "select",
          label: "选择部门",
          placeholder: "请选择部门",
          options: [],
        },
        {
          field: "roleId",
          type: "select",
          label: "选择角色",
          placeholder: "请选择角色",
          options: [],
        },
      ],
      colLayout: { span: 24 },
      itemStyle: {},
    }

    function newCallback() {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === "password"
      )
      passwordItem.isHidden = false
    }

    function editCallback() {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === "password"
      )
      passwordItem.isHidden = true
    }

    //动态添加部门和角色列表
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === "departmentId"
      )
      departmentItem.options = store.state.entireDepartment.map((item) => {
        return {
          title: item.name,
          value: item.id,
        }
      })

      const roleItem = modalConfig.formItems.find(
        (item) => item.field === "roleId"
      )
      roleItem.options = store.state.entireRole.map((item) => {
        return {
          title: item.name,
          value: item.id,
        }
      })
      return modalConfig
    })

    //调用hooks获取公共变量和函数
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback)

    return {
      contentTableConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      modalConfigRef,
    }
  },
}
</script>

<style scoped></style>
