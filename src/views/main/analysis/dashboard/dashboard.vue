<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <icy-card title="分类商品数量（饼图）">
          <pie-echart :pieData="categoryGoodsCount" />
        </icy-card>
      </el-col>
      <el-col :span="10">
        <icy-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale" />
        </icy-card>
      </el-col>
      <el-col :span="7">
        <icy-card title="分类商品数量（玫瑰图）">
          <rose-echart :roseData="addressGoodsSale" />
        </icy-card>
      </el-col>
    </el-row>
    <!-- --- -->
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <icy-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale" />
        </icy-card>
      </el-col>
      <el-col :span="12">
        <icy-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor" />
        </icy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import IcyCard from "@/base-ui/card"
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart,
} from "@/components/page-echarts"
import { useStore } from "vuex"
import { computed } from "vue"

const store = useStore()
store.dispatch("dashboard/getDashboardDataAction")
//获取数据
const categoryGoodsCount = computed(() => {
  return store.state.dashboard.categoryGoodsCount.map((item) => {
    return {
      name: item.name,
      value: item.goodsCount,
    }
  })
})
// --
const addressGoodsSale = computed(() => {
  return store.state.dashboard.addressGoodsSale.map((item) => {
    return {
      name: item.address,
      value: item.count,
    }
  })
})
// --
const categoryGoodsSale = computed(() => {
  const xLabels = []
  const values = []
  const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
  for (const item of categoryGoodsSale) {
    xLabels.push(item.name)
    values.push(item.goodsCount)
  }
  return {
    xLabels,
    values,
  }
})
// --
const categoryGoodsFavor = computed(() => {
  const xLabels = []
  const values = []
  const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
  for (const item of categoryGoodsFavor) {
    xLabels.push(item.name)
    values.push(item.goodsFavor)
  }
  return { xLabels, values }
})
</script>

<style scoped lang="less">
.dashboard {
  .content-row {
    margin-top: 20px;
  }
}
</style>
