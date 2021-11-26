<template>
  <div class="pie-echart">
    <base-echart :options="options" />
  </div>
</template>
<script setup>
import BaseEchart from "@/base-ui/echart"
import { computed, defineProps } from "vue"

const props = defineProps({
  pieData: Array,
})

const options = computed(() => {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "horizontal",
      left: "left",
    },
    series: [
      {
        name: "分类数据",
        type: "pie",
        radius: "50%",
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  }
})
</script>
<style scoped lang="less"></style>
