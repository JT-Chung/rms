<template>
  <div class="goods">
    <table-content :contentTableConfig="contentTableConfig" pageName="goods">
      <template #image="{ row }">
        <el-image
          style="width: 60px; height: 60px"
          :src="row.imgUrl"
          :preview-src-list="[row.imgUrl]"
        />
      </template>
      <template #oldPrice="{ row }">
        {{ "￥" + row.oldPrice }}
      </template>
      <template #newPrice="{ row }">
        {{ "￥" + row.newPrice }}
      </template>
    </table-content>
  </div>
</template>

<script>
import tableContent from "@/components/page-content"
export default {
  components: {
    tableContent,
  },
  setup() {
    const contentTableConfig = {
      title: "商品中心",
      propList: [
        { prop: "name", label: "商品名称", minWidth: "80" },
        {
          prop: "oldPrice",
          label: "原价格",
          minWidth: "80",
          slotName: "oldPrice",
        },
        {
          prop: "newPrice",
          label: "现价格",
          minWidth: "80",
          slotName: "newPrice",
        },
        {
          prop: "imgUrl",
          label: "商品图片",
          minWidth: "100",
          slotName: "image",
        },
        { prop: "status", label: "状态", minWidth: "100", slotName: "status" },
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
        { label: "操作", minWidth: "120", slotName: "tableUD" },
      ],
      showIndexColumn: true,
      showSelectColumn: true,
    }
    return {
      contentTableConfig,
    }
  },
}
</script>

<style scoped></style>
