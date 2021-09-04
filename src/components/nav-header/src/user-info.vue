<template>
  <div class="user">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <span>{{ userName }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            ><i class="el-icon-circle-close"></i>退出登录</el-dropdown-item
          >
          <el-dropdown-item divided
            ><i class="el-icon-user"></i>用户信息</el-dropdown-item
          >
          <el-dropdown-item
            ><i class="el-icon-s-tools"></i>系统管理</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  setup() {
    const store = useStore()
    const userName = computed(() => store.state.login.userInfo.name)
    return { userName }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-avatar {
    margin-right: 5px;
  }
  &:hover {
    color: #409eff;
  }
}
.el-icon-arrow-down {
  font-size: 12px;
}

.el-dropdown-menu__item:hover {
  background-color: #ecf5ff;
  color: #66b1ff;
}
</style>
