<template>
  <div class="role-search">
    <page-search :formConfig="searchFormConfig"></page-search>
  </div>
  <div class="role-content">
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    return { contentTableConfig, searchFormConfig }
  }
})
</script>

<style scoped lang="less">
.role-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
