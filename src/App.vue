<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import LayoutView from '@/layout/LayoutView.vue';

const { bgi } = useStore('user');
const locale = computed(() => zhCn);
</script>

<template>
  <div class="app" :style="{ backgroundImage: `url(${bgi})` }">
    <el-config-provider :locale="locale">
      <LayoutView />
    </el-config-provider>
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  min-width: 100%;
  width: fit-content;
  min-height: 100%;
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: auto;
  box-sizing: border-box;
}
</style>
