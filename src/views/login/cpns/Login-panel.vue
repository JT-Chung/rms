<template>
  <div class="login-panel">
    <el-tabs type="card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账户登录</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="passwdCtrl">
      <el-checkbox label="记住密码" :checked="ischeck"></el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="loginAccount"
      >登录</el-button
    >
  </div>
</template>

<script>
import { ref } from "vue"

import loginAccount from "./Login-account.vue"
import loginPhone from "./Login-phone.vue"
export default {
  components: {
    loginAccount,
    loginPhone,
  },
  setup() {
    //定义属性
    const ischeck = ref(true)
    const accountRef = ref(null)
    const phoneRef = ref(null)
    const currentTab = ref("account")

    //定义方法
    const loginAccount = () => {
      if (currentTab.value === "account") {
        accountRef.value.accountLoginAction(ischeck.value)
      } else {
        console.log("phoneRef调用loginAction")
      }
    }

    return {
      ischeck,
      accountRef,
      phoneRef,
      currentTab,
      loginAccount,
    }
  },
}
</script>
<style scoped lang="less">
.login-panel {
  width: 360px;
  height: 260px;
  .passwdCtrl {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
