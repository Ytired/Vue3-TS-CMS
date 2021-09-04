<template>
  <el-form
    ref="loginForm"
    :rules="rules"
    :model="account"
    status-icon
    label-width="100px"
    class="loginForm sign-in-form"
  >
    <el-form-item label="账号" prop="name">
      <el-input
        placeholder="请输入您的用户名~"
        v-model="account.name"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        placeholder="请输入您的密码~"
        v-model="account.password"
        show-password
      ></el-input>
    </el-form-item>

    <el-form-item class="login-submit">
      <el-button type="primary" class="submit-btn" @click="handleLoginClick"
        >登录</el-button
      >
    </el-form-item>

    <!-- 找回密码 -->
    <div class="account-info">
      <div class="remember-pwd">
        <el-checkbox
          v-model="isKeepPassword"
          @click="saveKeepPassword(isKeepPassword)"
          >记住密码</el-checkbox
        >
      </div>
      <div class="tiparea">
        <p>忘记密码？ <a>联系管理员</a></p>
      </div>
    </div>
  </el-form>
</template>

<script lang="ts">
import type { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import { useStore } from 'vuex'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const loginForm = ref<InstanceType<typeof ElForm>>()
    const isKeepPassword = ref(false)
    // 获取store对象
    const store = useStore()

    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    const saveKeepPassword = (save: boolean) => {
      console.log(save)
    }

    // 登录点击事件
    const handleLoginClick = () => {
      loginForm.value?.validate(valid => {
        if (valid) {
          // 是否需要记住密码
          if (isKeepPassword.value) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 登陆验证
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }

    return {
      account,
      rules,
      isKeepPassword,
      handleLoginClick,
      loginForm,
      saveKeepPassword
    }
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
.account-info {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .remember-pwd {
    margin-left: 13%;
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
}
</style>
