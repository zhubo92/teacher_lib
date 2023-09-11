import {
  deleteBrowserHistory,
  deleteOneBrowserHistory,
  queryBrowsingRecords,
  queryBrowsingRecordsLast,
  searchContent
} from '@/api/home';
import { ElMessage } from 'element-plus';
import { ILearnRecord, IRecentStudyRecord } from '@/types/user';
import { imgUrlEncode } from '@/utils';

const defaultStudyRecord = {
  catId: null,
  catLevel: null,
  catName: '',
  classLevelId: null,
  classLevelName: null,
  createTime: null,
  description: null,
  imgUrl: '',
  isDelete: null,
  longImgUrl: null,
  parentId: null,
  sort: null,
  status: null,
  uncheckedImgUrl: null,
  updateTime: null
};

export default defineStore('header', () => {
  const { goSearch: jumpSearch, userInfo } = useStore('user');

  // 是否展示下载二维码
  const showDownLoad = ref(false);
  // 是否展示搜索框
  const showSearchBar = ref(false);
  // 搜索内容
  const searchText = ref('');
  // 搜索结果列表
  const searchResult = ref<{ name: string; nameHighlights?: string }[]>([]);
  // 搜索框
  const searchBarRef = ref<null | HTMLElement>(null);
  // 展开前的搜索按钮
  const searchLogoRef = ref<null | HTMLElement>(null);
  // 搜索框清空按钮
  const clearBtnRef = ref<null | HTMLElement>(null);
  // 学习记录列表
  const learnRecordList = ref<ILearnRecord[]>([]);
  // 近期学习记录
  const recentStudyRecord = ref<IRecentStudyRecord>(defaultStudyRecord);

  // 是否展示搜索结果列表
  const showSearchResult = computed<boolean>(() => {
    return searchResult.value.length > 0;
  });

  const showLearnRecord = computed<boolean>(() => {
    return learnRecordList.value.length > 0;
  });

  // 替换文本
  function replaceText() {
    const search = searchText.value;
    searchResult.value = searchResult.value.map((item) => {
      for (const key in item) {
        if (key === '') {
          const replaceReg = new RegExp(search, 'g'); // 匹配关键字正则
          const replaceString = `<span class='highlights'>${searchText.value}</span>`; // 高亮替换v-html值
          item.nameHighlights = item.name.replace(replaceReg, replaceString); // 开始替换
        }
      }
      return item;
    });
  }

  // 开始搜索
  async function startSearch() {
    console.log('startSearch', searchText.value);
    if (!searchText.value || searchText.value.length === 0) return;
    searchResult.value = await searchContent(searchText.value);
    replaceText();
  }

  // 跳转到搜索页面
  async function goSearch() {
    console.log(showSearchBar.value, 'goSearch');
    showSearchBar.value = !showSearchBar.value;

    if (!showSearchBar.value) {
      if (!searchText.value || searchText.value.length === 0) return;
      searchResult.value = [];
      await jumpSearch(searchText.value);
      searchText.value = '';
    }
  }

  function clearSearchText() {
    searchText.value = '';
  }

  async function clearLearnRecord() {
    if (!showLearnRecord) return;

    await deleteBrowserHistory(userInfo.value.userId);
    ElMessage({
      message: '删除成功！',
      type: 'success'
    });
    await getLearnRecord();
  }

  // 获取七天前的时间戳
  function getSevenDaysAgoTime() {
    let fmt = 'YYYY-mm-dd HH:MM:SS';
    const currentDate = new Date();
    const oldDate = currentDate.setDate(currentDate.getDate() - 7);
    const date = new Date(oldDate);
    let ret;
    const opt = {
      'Y+': date.getFullYear().toString(), // 年
      'm+': (date.getMonth() + 1).toString(), // 月
      'd+': date.getDate().toString(), // 日
      'H+': date.getHours().toString(), // 时
      'M+': date.getMinutes().toString(), // 分
      'S+': date.getSeconds().toString() // 秒
    } as Record<string, string>;
    for (const k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt);
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
        );
      }
    }
    return fmt;
  }

  async function getLearnRecord() {
    const { entityList } = await queryBrowsingRecords({
      updateTime: getSevenDaysAgoTime(),
      userId: userInfo.value.userId,
      page: 1,
      pageSize: 4
    });
    learnRecordList.value = entityList;
  }

  async function getLearnRecordLast() {
    const value = await queryBrowsingRecordsLast({ userId: userInfo.value.userId });

    recentStudyRecord.value = { ...value, imgUrl: imgUrlEncode(String(value.imgUrl)) };
  }

  async function deleteLearnRecord(id: number) {
    await deleteOneBrowserHistory(id);
    ElMessage({
      message: '删除成功！',
      type: 'success'
    });
    await getLearnRecord();
  }

  async function chooseSearch(text: string) {
    searchText.value = text;
    await goSearch();
  }

  async function hideMask() {
    if (showSearchResult) searchResult.value = [];
    if (showSearchBar) showSearchBar.value = false;
  }

  return {
    showDownLoad,
    searchResult,
    showSearchBar,
    searchText,
    searchBarRef,
    searchLogoRef,
    learnRecordList,
    recentStudyRecord,
    clearBtnRef,

    showSearchResult,
    showLearnRecord,

    goSearch,
    startSearch,
    clearSearchText,
    chooseSearch,
    hideMask,
    clearLearnRecord,
    getLearnRecordLast,
    getLearnRecord,
    deleteLearnRecord
  };
});
