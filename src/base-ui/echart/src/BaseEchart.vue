<template>
  <div class="base-echart">
    <div ref="echartDivRef" style="width: 100%; height: 360px"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, defineProps, watchEffect } from "vue"
import useEchart from "../hooks/use-echart"

//定义props
const props = defineProps({
  options: Object,
})

const echartDivRef = ref()

onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value)

  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>
<style scoped lang="less"></style>
