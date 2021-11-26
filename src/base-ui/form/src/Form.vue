<template>
  <div class="icyForm">
    <!-- header  -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :labelWidth="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
              v-if="!item.isHidden"
            >
              <!-- 判断input输入框的类型 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <!-- 判断input输入框的类型 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <!-- 判断input输入框的类型 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- footer -->
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
// import { ref, watch } from "vue"
export default {
  props: {
    formItems: {
      type: Array,
      default: () => [],
    },
    labelWidth: {
      type: String,
      default: "100px",
    },

    itemStyle: {
      type: Object,
      default: () => ({ padding: "10px,40px" }),
    },

    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      }),
    },
    modelValue: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // const formData = ref({ ...props.modelValue })
    // watch(
    //   formData,
    //   (newValue) => {
    //     emit("update:modelValue", newValue)
    //   },
    //   {
    //     deep: true,
    //   }
    // )
    function handleValueChange(value, field) {
      emit("update:modelValue", { ...props.modelValue, [field]: value })
    }
    return {
      handleValueChange,
    }
  },
}
</script>
<style scoped lang="less">
.el-form-item {
  padding-top: 22px;
}
</style>
