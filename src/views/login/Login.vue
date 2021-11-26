<template>
  <div class="login">
    <login-panel />
  </div>
</template>
<script>
import loginPanel from "./cpns/Login-panel"

export default {
  components: {
    loginPanel,
  },
  setup() {
    return {}
  },
}
</script>
<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login-bgc.png") no-repeat center center;
}
</style>
