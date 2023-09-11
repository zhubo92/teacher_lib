<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import '@/styles/fonts.scss';
import loading from '@/utils/loading';
import { getImageUrl } from '@/utils';
import { DARK_COLOR, LIGHT_COLOR } from '@/utils/constants';
import { chineseToPinyin } from '@/utils/pinYin';

const { id } = useRoute().query;
const { list: cateList, getCategoryList } = useStore('home');
const { upperGradeList, lowerGradeList, getCourseList } = useStore('course');
const { goSection, currentGrade, changeCurrentGrade } = useStore('user');

const fontColor = computed<{ light: string; dark: string }>(() => {
  return { light: LIGHT_COLOR[currentGrade.value], dark: DARK_COLOR[currentGrade.value] };
});

const currentCatName = computed(() => {
  const index = cateList.value.findIndex((cate) => cate.catId === Number(id));
  return index !== -1 ? cateList.value[index].catName : '';
});

interface SwiperType {
  slideNext: () => void;
  slidePrev: () => void;
}

function getElement(name: string) {
  return document.querySelector(name) as HTMLElement;
}

function getSwiper(el: SwiperElement) {
  return el.swiper;
}

function slideNext(swiper: SwiperType) {
  swiper.slideNext();
}

function slidePrev(swiper: SwiperType) {
  swiper.slidePrev();
}

function hasSwiper(el: HTMLElement): el is SwiperElement {
  return 'swiper' in el;
}

interface SwiperElement extends HTMLElement {
  swiper: SwiperType;
}

function handleMove(name: string, moveFn: (swiper: SwiperType) => void) {
  try {
    const el = getElement(name);

    if (hasSwiper(el)) {
      const swiper = getSwiper(el);
      moveFn(swiper);
    }
  } catch (err) {
    console.error(err);
  }
}

function initCurrentGrade() {
  if (
    !(upperGradeList.value[currentGrade.value].categoryTreeDTO?.length > 0) &&
    !(lowerGradeList.value[currentGrade.value].categoryTreeDTO?.length > 0)
  ) {
    const index = upperGradeList.value.findIndex((item) => item.categoryTreeDTO?.length > 0);
    changeCurrentGrade(index === -1 ? 0 : index);
  }
}

onMounted(async () => {
  loading.start();

  await getCategoryList();
  if (typeof id === 'string') {
    await getCourseList(id);
    initCurrentGrade();
  }

  loading.close();
});
</script>

<template>
  <div class="course">
    <div class="course-title">{{ currentCatName }}</div>
    <div class="course-content">
      <div class="course-content-level cp">
        <div
          v-for="(item, index) in upperGradeList"
          :key="item.catId"
          :class="['grade', currentGrade === index && 'current-grade']"
          :style="{ visibility: item.categoryTreeDTO?.length > 0 ? 'visible' : 'hidden' }"
          @click="changeCurrentGrade(index)"
        >
          <div
            class="grade-name"
            :style="{ color: `${currentGrade === index ? fontColor.dark : ''}` }"
          >
            {{ item.classLevelName }}
          </div>
          <div
            class="grade-eName"
            :style="{ color: `${currentGrade === index ? fontColor.light : ''}` }"
          >
            {{ chineseToPinyin(item.classLevelName) }}
          </div>
        </div>
      </div>
      <div class="course-content-section">
        <div
          class="title"
          :style="{ backgroundImage: `url(${upperGradeList[currentGrade].longImgUrl})` }"
        >
          {{ upperGradeList[currentGrade].catName }}
        </div>
        <div class="section">
          <img
            v-if="upperGradeList[currentGrade].categoryTreeDTO?.length > 0"
            :src="getImageUrl('swiper_left')"
            class="section-btn cp"
            alt="swiper_left"
            @click="handleMove('#swiperTop', slidePrev)"
          />
          <Swiper
            id="swiperTop"
            style="width: 830px; overflow: hidden; margin: 0 auto"
            :slides-per-view="3"
            :space-between="10"
          >
            <SwiperSlide
              v-for="(section, sectionIndex) in upperGradeList[currentGrade].categoryTreeDTO"
              :key="sectionIndex"
              class="section-swiper cp"
            >
              <img class="section-cover" :src="section.imgUrl" />
              <div class="section-mask" @click="goSection(section.catId)">
                <div class="section-mask-tag">
                  <img :src="getImageUrl('card')" alt="card" />
                  <span>共{{ section.slidesAmount }}</span>
                </div>
                <div class="section-mask-name">{{ section.catName }}</div>
              </div>
            </SwiperSlide>
          </Swiper>
          <img
            v-if="upperGradeList[currentGrade].categoryTreeDTO?.length > 0"
            :src="getImageUrl('swiper_right')"
            class="section-btn cp"
            alt="swiper_right"
            @click="handleMove('#swiperTop', slideNext)"
          />
        </div>
      </div>
    </div>
    <div class="course-content bottom">
      <div class="course-content-section">
        <div
          class="title"
          :style="{ backgroundImage: `url(${lowerGradeList[currentGrade].longImgUrl})` }"
        >
          {{ lowerGradeList[currentGrade].catName }}
        </div>
        <div class="section">
          <img
            v-if="lowerGradeList[currentGrade].categoryTreeDTO?.length > 0"
            :src="getImageUrl('swiper_left')"
            class="section-btn cp"
            alt="swiper_left"
            @click="handleMove('#swiperBottom', slidePrev)"
          />
          <Swiper
            id="swiperBottom"
            style="width: 830px; overflow: hidden; margin: 0 auto"
            :slides-per-view="3"
            :space-between="10"
          >
            <SwiperSlide
              v-for="(section, sectionIndex) in lowerGradeList[currentGrade].categoryTreeDTO"
              :key="sectionIndex"
              class="section-swiper cp"
            >
              <img class="section-cover" :src="section.imgUrl" />
              <div class="section-mask cp" @click="goSection(section.catId)">
                <div class="section-mask-tag">
                  <img :src="getImageUrl('card')" alt="card" />
                  <span>共{{ section.slidesAmount }}节</span>
                </div>
                <div class="section-mask-name">{{ section.catName }}</div>
              </div>
            </SwiperSlide>
          </Swiper>
          <img
            v-if="lowerGradeList[currentGrade].categoryTreeDTO?.length > 0"
            :src="getImageUrl('swiper_right')"
            class="section-btn cp"
            alt="swiper_right"
            @click="handleMove('#swiperBottom', slideNext)"
          />
        </div>
      </div>
      <div class="course-content-level cp">
        <div
          v-for="(item, index) in lowerGradeList"
          :key="item.catId"
          :class="['grade', currentGrade === index && 'current-grade']"
          :style="{ visibility: item.categoryTreeDTO?.length > 0 ? 'visible' : 'hidden' }"
          @click="changeCurrentGrade(index)"
        >
          <div
            class="grade-name"
            :style="{ color: `${currentGrade === index ? fontColor.dark : ''}` }"
          >
            {{ item.classLevelName }}
          </div>
          <div
            class="grade-eName"
            :style="{ color: `${currentGrade === index ? fontColor.light : ''}` }"
          >
            {{ chineseToPinyin(item.classLevelName) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.course {
  &-title {
    margin-top: 24px;
    height: 75px;
    font-size: 58px;
    font-family: YouSheBiaoTiHei;
    color: #333333;
    line-height: 75px;
  }

  &-content {
    display: flex;
    margin-left: 50px;
    margin-top: 78px;

    &-level {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 250px;
      height: 306px;

      .grade {
        font-size: 20px;
        color: #333;
        font-weight: 600;

        &-eName {
          font-size: 16px;
          color: #999;
          font-weight: normal;
        }
      }

      .current-grade {
        font-size: 44px;
        font-family: YouSheBiaoTiHei, serif;
        line-height: 57px;

        .grade-eName {
          margin-top: -17px;
          height: 31px;
          font-size: 24px;
          font-family: YouSheBiaoTiHei;
          line-height: 31px;
        }
      }
    }

    &-section {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .title {
        padding-left: 30px;
        width: 890px;
        height: 78px;
        line-height: 90px;
        font-size: 24px;
        color: #333333;
        font-weight: 550;
        box-sizing: border-box;
        background-size: contain;
        background-repeat: no-repeat;
      }

      .section {
        display: flex;
        margin-top: 36px;
        width: 900px;
        height: 150px;

        &-swiper:hover {
          .section-mask {
            display: flex;
            box-shadow: 0 0 2px #999;
          }
        }

        &-btn {
          width: 25px;
          height: 102px;
        }

        &-cover {
          width: 270px;
          height: 150px;
          border-radius: 20px;
          object-fit: cover;
        }

        &-mask {
          display: none;
          position: absolute;
          justify-content: center;
          align-items: center;
          top: 0;
          left: 0;
          z-index: 10;
          width: 270px;
          height: 150px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 20px;

          &-tag {
            position: absolute;
            top: 24px;
            left: -6px;

            img {
              width: 51px;
              height: 29px;
            }

            span {
              position: absolute;
              top: 0;
              left: 0;
              width: 51px;
              height: 23px;
              line-height: 23px;
              text-align: center;
            }
          }

          &-name {
            padding: 0 14px;
            min-width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: #ffffff;
            border-radius: 25px;
            font-size: 18px;
            color: #333333;
            font-weight: 550;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }

  .bottom {
    margin-left: 0;
    margin-top: 79px;
    margin-right: 50px;
    padding-bottom: 130px;

    .grade-name,
    .grade-eName {
      text-align: right;
    }
  }
}
</style>
