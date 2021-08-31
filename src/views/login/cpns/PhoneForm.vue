<template>
  <el-form
    ref="loginForm"
    :rules="rules"
    :model="tel"
    status-icon
    label-width="100px"
    class="loginForm sign-up-form"
  >
    <el-form-item label="电话号码" prop="tel">
      <el-input placeholder="请输入您的电话号码~" v-model="tel"></el-input>
    </el-form-item>
    <el-form-item label="验证码">
      <el-input
        v-model="verifyCode"
        style="width: 30%; margin-right: 10px"
      ></el-input>
      <el-button type="primary" style="width: 20%">验证码</el-button>
    </el-form-item>
    <el-form-item class="login-submit">
      <el-button type="primary" class="submit-btn">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { rules } from '../config/account-config'

export default defineComponent({
  setup() {
    const tel = ref('')
    const verifyCode = ref('')

    return { tel, verifyCode, rules }
  }
})
</script>

<style scoped lang="less">
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.login-submit {
  display: flex;
  justify-content: center;
  .submit-btn {
    width: 100%;
  }
}

.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}

.tiparea p a {
  color: #409eff;
  cursor: pointer;
}

.tiparea p a:hover {
  color: #278cf0;
}
</style>
