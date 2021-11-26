<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @searchBtnClick="handleSearchClick"
    />

    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      ref="pageContentRef"
    />

    <page-modal
      :defaultInfo="defaultInfo"
      pageName="users"
      :modalConfig="modalConfigRef"
      ref="pageModalRef"
    />
  </div>
</template>

<script>
import pageSearch from "@/components/page-search"
import pageContent from "@/components/page-content"
import pageModal from "@/components/page-modal"

import { usePageSearch } from "@/hooks/use-page-search"
import { usePageModal } from "@/hooks/use-page-modal"
import PageModal from "../../../../components/page-modal/src/PageModal.vue"

import { useStore } from "vuex"
import { computed } from "vue"

export default {
  components: {
    pageSearch,
    pageContent,
    pageModal,
    PageModal,
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
          field: "id",
          type: "input",
          label: "id",
          placeholder: "请输入id",
        },
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
          field: "cellphone",
          type: "input",
          label: "电话号码",
          placeholder: "请输入电话号码",
        },
        {
          field: "enable",
          type: "select",
          label: "用户状态",
          placeholder: "请选择用户状态",
          options: [
            { title: "启用", value: 1 },
            { title: "禁用", value: 0 },
          ],
        },
        {
          field: "creatAt",
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
          label: "用户名",
          minWidth: "100",
        },
        {
          prop: "realname",
          label: "真实姓名",
          minWidth: "100",
        },
        {
          prop: "cellphone",
          label: "手机号码",
          minWidth: "100",
        },
        {
          prop: "enable",
          label: "状态",
          minWidth: "100",
          slotName: "status",
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

    //处理form的按钮重置
    const [pageContentRef, handleResetClick, handleSearchClick] =
      usePageSearch()

    //pageModal相关的hook逻辑
    //处理密码的逻辑
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
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      pageContentRef,
      handleSearchClick,
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
