<template>
  <div class="login-account">
    <el-form
      label-width="60px"
      :rules="accountRules"
      :model="account"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input
          type="text"
          placeholder="请输入账号"
          v-model="account.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="account.password"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ref, reactive } from "vue"
import { useStore } from "vuex"
import { ElMessage } from "element-plus"

export default {
  setup() {
    const account = reactive({
      name: JSON.parse(localStorage.getItem("account"))?.name ?? "",
      password: JSON.parse(localStorage.getItem("account"))?.password ?? "",
    })

    const accountRules = {
      name: [
        {
          required: true,
          message: "用户名是必传内容~",
          trigger: "blur",
        },
        {
          pattern: /^[a-z0-9]{5,10}$/,
          message: "用户名必须是5~10个字母或者数字~",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "密码是必传内容~",
          trigger: "blur",
        },
        {
          pattern: /^[a-z0-9]{3,}$/,
          message: "用户名必须是3位以上的字母或者数字~",
          trigger: "blur",
        },
      ],
    }

    //验证form的函数
    const formRef = ref(null)
    const store = useStore()
    const accountLoginAction = (ischeck) => {
      //1 验证是否成功
      formRef.value.validate((valid) => {
        if (valid) {
          //判断是否需要记住密码
          if (ischeck) {
            //本地缓存
            localStorage.setItem("account", JSON.stringify(account))
          } else {
            localStorage.removeItem("account")
          }

          //开始验证登录
          store.dispatch("login/accountLoginAction", { ...account })
        } else {
          return ElMessage.error("账号或密码错误！！")
        }
      })
    }

    return {
      accountRules,
      formRef,
      account,
      accountLoginAction,
    }
  },
}
</script>
<style scoped></style>
