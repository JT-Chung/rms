<template>
  <base-echart :options="options" />
</template>
<script setup>
import { computed, defineProps } from "vue"
import BaseEchart from "@/base-ui/echart"

const props = defineProps({
  roseData: Array,
})

const options = computed(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "类别数据",
        type: "pie",
        radius: [10, 100],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: props.roseData,
      },
    ],
  }
})
</script>
<style scoped lang="less"></style>
