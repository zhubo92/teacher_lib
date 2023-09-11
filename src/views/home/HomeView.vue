<script setup lang="ts">
import loading from '@/utils/loading';
import { getImageUrl } from '@/utils';
import { ICategory } from '@/types/home';

const { getCategoryList, list: homeList } = useStore('home');
const list: ICategory[] = computed(() => homeList.value);

const { goCourse } = useStore('user');

onMounted(async () => {
  loading.start();
  await getCategoryList();
  loading.close();
});
</script>

<template>
  <div class="home">
    <img :src="getImageUrl('home_title')" alt="home-title" class="home-title" />
    <div class="home-list">
      <div
        v-for="item in list"
        :key="item.catId"
        class="home-list-card cp"
        @click="goCourse(item.catId)"
      >
        <img
          :src="item.imgUrl"
          alt="bgi"
          class="bgi"
          :style="{ filter: `${!item.auth && 'brightness(60%)'}` }"
        />
        <div class="title" :style="{ fontWeight: `${!item.auth && '400'}` }">
          {{ item.catName }}
        </div>
        <div v-if="!item.auth" class="mask" @click.stop>
          <img :src="getImageUrl('home_lock')" alt="home_lock" class="mask-lock" />
          <span class="mask-text">园所暂未合作课程，更多优质内容等您开启！</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  &-title {
    margin: 6px auto 45px;
    height: 43px;
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    &-card {
      position: relative;
      margin-bottom: 26px;
      width: 572px;
      height: 386px;
      border-radius: 80px;
      overflow: hidden;
      transition: all 0.25s ease-in;
      -moz-transition: all 0.25s ease-in;
      -webkit-transition: all 0.25s ease-in;

      .bgi {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .title {
        position: absolute;
        bottom: 46px;
        width: 573px;
        height: 28px;
        font-size: 26px;
        font-weight: normal;
        color: #333333;
        line-height: 28px;
        text-align: center;
      }

      .mask {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 999;
        width: 100%;
        height: 100%;

        &-lock {
          margin-bottom: 11px;
          width: 24px;
          height: 30px;
        }

        &-text {
          font-size: 18px;
          color: #ffffff;
          text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
        }
      }
    }

    &-card:hover {
      transform: translateY(-10px);

      .title {
        font-weight: 600;
      }
    }
  }
}
</style>
