import { getHomeAuthListRequest, queryCategoryListRequest } from '@/api/home';
import { imgUrlEncode } from '@/utils';
import { ICategory } from '@/types/home';

export default defineStore('home', () => {
  const list = ref<ICategory[]>([]);

  async function getCategoryList(parentId?: number) {
    if (!parentId) parentId = 0;
    const cate = await queryCategoryListRequest(parentId);
    const auth = await getHomeAuthListRequest();
    if (Array.isArray(cate) && Array.isArray(auth)) {
      list.value = cate.map((item) => {
        return {
          ...item,
          imgUrl: imgUrlEncode(item.imgUrl),
          auth: auth.findIndex((a) => a === item.catId) !== -1
        };
      });
    }
  }

  return {
    list,

    getCategoryList
  };
});
