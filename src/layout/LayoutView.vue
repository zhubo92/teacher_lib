<script setup lang="ts"></script>

<template>
  <div class="layout">
    <HeaderView />
    <div class="layout-container">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 auto;
  width: 1200px;

  &-container {
    position: relative;
    flex: 1;
  }
}
</style>
