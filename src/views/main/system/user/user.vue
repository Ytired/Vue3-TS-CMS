<template>
  <div class="user">
    <div class="search">
      <YjForm v-bind="formConfig" />
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import YjForm from '@/base-ui/form/index'
import { searchCormConfig } from './config/search.config'

export default defineComponent({
  components: {
    YjForm
  },
  setup() {
    const formConfig = searchCormConfig
    return { formConfig }
  }
})
</script>

<style scoped lang="less">
.user {
  border-radius: 15px;
}
</style>
