<template>
  <div class="page-search">
    <YjForm v-bind="formConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btn">
          <el-button icon="el-icon-refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </YjForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import YjForm from '@/base-ui/form/index'

export default defineComponent({
  emits: ['restBtnClick', 'queryBtnClick'],
  props: {
    formConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    YjForm
  },
  setup(props, { emit }) {
    // 双向绑定的数据应该是由props里卖弄的field属性决定的
    // formData中的属性应该动态来决定
    const formItems = props.formConfig?.formItem ?? []
    const formOriginData: any = {}

    for (const item of formItems) {
      formOriginData[item.field] = ''
    }

    const formData = ref(formOriginData)
    // 监听搜索按钮
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    // 用户点击按钮重置
    const handleResetClick = () => {
      emit('restBtnClick')
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }
    }
    return { formData, handleResetClick, handleQueryClick }
  }
})
</script>

<style scoped lang="less">
.handle-btn {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
