<script setup lang="ts">
import loading from '@/utils/loading';
import { getImageUrl } from '@/utils';
import { BUTTON_IMG_NAME, BUTTON_SOLID_IMG_NAME, DARK_COLOR, LIGHT_COLOR } from '@/utils/constants';

const { id } = useRoute().query;
const {
  getSection,
  getAddress,
  address,
  section,
  slidesList,
  total,
  page: currentPage
} = useStore('section');
const { currentGrade, goSlides } = useStore('user');

const btn = computed(() => {
  return getImageUrl(BUTTON_IMG_NAME[currentGrade.value]);
});
const solidBtn = computed(() => {
  return getImageUrl(BUTTON_SOLID_IMG_NAME[currentGrade.value]);
});

async function changePage(page: number) {
  loading.start();
  currentPage.value = page;
  if (typeof id === 'string') await getSection(id);
  loading.close();
}

onMounted(async () => {
  loading.start();
  console.log(id, 'id');
  if (typeof id === 'string') {
    await getSection(id);
    await getAddress(id);
  }
  loading.close();
});
</script>

<template>
  <AddressBar :address="address" />
  <div class="section">
    <div class="section-left">
      <img :src="section.imgUrl" alt="" class="section-left-cover" />
      <div class="section-left-title">{{ section.catName }}</div>
      <div class="section-left-desc">
        <span>课程简介：</span>{{ section.description || '无简介' }}
      </div>
    </div>
    <div class="section-right">
      <div
        class="section-right-title"
        :style="{ backgroundImage: `url(${address.secSubLongImg})` }"
      >
        课程资料列表
      </div>
      <div class="section-right-list">
        <div
          class="slides cp"
          v-for="item in slidesList"
          :key="item.slidesId"
          :style="{
            backgroundColor: LIGHT_COLOR[currentGrade],
            borderColor: DARK_COLOR[currentGrade]
          }"
          @click="goSlides(item.slidesId)"
        >
          <div class="slides-name">{{ item.slidesName }}</div>
          <img :src="btn" alt="" class="slides-btn virtual" />
          <img :src="solidBtn" alt="" class="slides-btn solid" />
        </div>
      </div>

      <PagingController :total="total" :page="currentPage" @change="changePage" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.section {
  display: flex;
  justify-content: space-between;
  padding-bottom: 80px;
  overflow: hidden;

  &-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: 159px;
    height: 551px;
    box-sizing: border-box;

    &-cover {
      width: 300px;
      height: 167px;
      object-fit: cover;
      border-radius: 10px;
    }

    &-title {
      margin-top: 50px;
      width: 300px;
      font-size: 24px;
      font-weight: 550;
      color: #333333;
      @include single-hide();
    }

    &-desc {
      margin-top: 20px;
      width: 300px;
      @include multi-hide(3);

      span {
        font-weight: 550;
      }
    }
  }

  &-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
    margin-top: 40px;
    //height: 739px;

    &-title {
      margin-bottom: 40px;
      margin-left: -20px;
      padding-left: 208px;
      width: 890px;
      height: 78px;
      line-height: 92px;
      background-size: contain;
      background-repeat: no-repeat;
      font-size: 24px;
      color: #333333;
      font-weight: 550;
      box-sizing: border-box;
      border-radius: 10px;
    }

    &-list {
      //height: 576px;
      //overflow: auto;
      /* Firefox */
      scrollbar-width: none;
      /* IE 10+, edge */
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        /* Chrome Safari */
        display: none;
      }

      .slides {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        padding: 0 50px 0 30px;
        width: 880px;
        height: 72px;
        border-radius: 10px;
        // filter: blur(40px);
        border: 0 solid;
        box-sizing: border-box;

        &-name {
          font-size: 18px;
          color: #333333;
        }

        &-btn {
          width: 32px;
          height: 32px;
        }

        .virtual {
          display: block;
        }

        .solid {
          display: none;
        }
      }

      .slides:hover {
        padding: 0 49px 0 29px;
        border: 1px solid;

        .solid {
          display: block;
        }

        .virtual {
          display: none;
        }
      }
    }
  }
}
</style>
