<template>
  <div class="user">
    <page-search :formConfig="searchCormConfig" />
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="user"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import { searchCormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    return {
      searchCormConfig,
      contentTableConfig
    }
  }
})
</script>

<style scoped lang="less">
.user {
  border-radius: 15px;
  .content {
    padding: 20px;
    border-top: 20px solid #f5f5f5;
  }

  .header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .handler {
      align-items: center;
    }
  }

  .footer {
    margin-top: 15px;

    .el-pagination {
      text-align: right;
    }
  }
}
</style>
