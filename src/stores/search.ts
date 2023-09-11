import { searchContentByPageRequest } from '@/api/home';
import { ISearchResult } from '@/types/search.d';

export default defineStore('search', () => {
  const currentPage = ref<number>(1);
  const text = ref<string>('');
  const searchResultList = ref<ISearchResult[]>([]);
  async function searchContentByPage() {
    if (text.value) {
      const { entityList } = await searchContentByPageRequest(currentPage.value, text.value);
      searchResultList.value = entityList;
    }
  }
  return {
    text,
    searchResultList,

    searchContentByPage
  };
});
