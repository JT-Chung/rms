<template>
  <div class="login-phone">
    <el-form status-icon ref="ruleForm" label-width="60px">
      <el-form-item label="手机号" prop="id">
        <el-input
          type="text"
          v-model="phoneId"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="Pass">
        <div class="phoneBtn">
          <el-input
            type="password"
            v-model="phoneCode"
            placeholder="请输入验证码"
          ></el-input>
          <el-button type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ref } from "vue"
export default {
  setup() {
    const phoneId = ref()
    const phoneCode = ref()
    return {
      phoneId,
      phoneCode,
    }
  },
}
</script>
<style scoped lang="less">
.phoneBtn {
  display: flex;
  .el-button--primary {
    margin-left: 8px;
  }
}
</style>
