<template>
  <div class="content">
    <yj-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      @selectChange="selectChange"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" size="medium"
          >新建用户</el-button
        >
        <el-button icon="el-icon-refresh"></el-button>
      </template>
      <template #header></template>
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button v-if="isUpdate" icon="el-icon-edit" size="mini" type="text"
            >编辑</el-button
          >
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="text"
            style="color: red"
            v-if="isDelete"
            >删除</el-button
          >
        </div>
      </template>
      <template #footer></template>
      <!-- 动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </yj-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import YjTable from '@/base-ui/table'
import { usePermission } from '@/hooks/usePermissions'

export default defineComponent({
  components: { YjTable },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    // 获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())
    // 派发事件
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    // 从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    const selectChange = (value: any) => {
      console.log(value)
    }

    // 获取其他动态插槽
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )
    return {
      selectChange,
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete
    }
  }
})
</script>

<style scoped></style>
