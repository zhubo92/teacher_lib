import { getSectionRequest, getAddressRequest } from '@/api/course';
import { defaultAddress, IAddress, ISection, ISlides } from '@/types/section.d';

const defaultSection = {
  catId: 0,
  catName: '',
  parentId: 0,
  parentName: '',
  catLevel: 0,
  imgUrl: '',
  classLevelId: '',
  classLevelName: '',
  sort: 0,
  status: 1,
  description: '',
  slidesDOs: null,
  slidesDOPage: {
    currentPage: 0,
    pageSize: 0,
    total: 0,
    entityList: [
      {
        slidesId: 0,
        slidesName: '',
        slidesSize: null,
        description: null,
        createTime: null,
        updateTime: null,
        slidesUrl: null,
        catId: 0,
        classLevelId: null,
        classLevelName: null,
        emptyPos: null,
        isDelete: null,
        typeName: null,
        sort: null,
        article: null,
        fileId: null,
        fileVersionId: null,
        videoUrl: null,
        imgUrl: null
      }
    ],
    assistData: null
  }
};

export default defineStore('section', () => {
  const page = ref<number>(1);
  // const pageSize = ref<number>(10);
  const section = ref<ISection>(defaultSection);
  const address = ref<IAddress>(defaultAddress());

  const total = computed<number>(() => {
    return section.value.slidesDOPage.total;
  });

  const slidesList = computed<ISlides[]>(() => {
    return section.value.slidesDOPage.entityList;
  });

  async function getSection(id: string) {
    section.value = await getSectionRequest(id, page.value, 10);
  }
  async function getAddress(id: string | number) {
    address.value = await getAddressRequest(id);
  }
  return {
    page,
    section,
    address,

    total,
    slidesList,

    getSection,
    getAddress
  };
});
