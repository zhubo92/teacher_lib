<script setup lang="ts">
import loading from '@/utils/loading';
const { text: _text } = useRoute().query;
const { searchResultList, searchContentByPage, text } = useStore('search');
onMounted(async () => {
  loading.start();
  if (typeof _text === 'string') {
    text.value = _text;
    await searchContentByPage();
  }
  loading.close();
});
</script>

<template>
  <div class="search">SearchView</div>
</template>

<style scoped lang="scss"></style>
