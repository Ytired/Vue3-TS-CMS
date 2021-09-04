<template>
  <div class="notFound">
    <img src="~@/assets/images/404error.svg" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.notFound {
  width: 100vw;
  height: 100vh;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
