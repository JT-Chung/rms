<template>
  <div class="icy-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <!-- 表格主体部分 -->
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        width="50"
        align="center"
        label="序号"
      />
      <!-- 公共内容部分 -->
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="{ row }">
            <slot :name="propItem.slotName" :row="row">{{
              row[propItem.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 表格主体部分 -->
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="footerListCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    listData: {
      type: Array,
      required: true,
    },
    propList: {
      type: Array,
      required: true,
    },
    childrenProps: {
      type: Object,
      default: () => ({}),
    },
    showIndexColumn: {
      type: Boolean,
      default: false,
    },
    showSelectColumn: {
      type: Boolean,
      default: false,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 }),
    },
    footerListCount: {
      type: Number,
      default: 0,
    },
  },
  emits: ["selectionChange", "update:page"],
  setup(props, { emit }) {
    //半成品，监听table表格的数据的变化
    function handleSelectionChange(value) {
      emit("selectionChange", value)
    }
    //---
    function handleCurrentChange(currentPage) {
      emit("update:page", { ...props.page, currentPage })
    }
    function handleSizeChange(pageSize) {
      emit("update:page", { ...props.page, pageSize })
    }
    return {
      handleSelectionChange,
      handleCurrentChange,
      handleSizeChange,
    }
  },
}
</script>
<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 10px;
  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .handler {
    margin-right: 10px;
  }
}
.footer {
  margin-top: 15px;
  .el-pagination {
    text-align: right;
  }
}
</style>
