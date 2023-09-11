import { getCourseListRequest } from '@/api/course';
import { defaultCourse, defaultGrade, GradeLevel, ICate, ICourse } from '@/types/course';
import { chineseToPinyin } from '@/utils/pinYin';
import { COURSE_BGI_ARR, GRADE_NAME } from '@/utils/constants';
import { getImageUrl } from '@/utils';

export default defineStore('course', () => {
  // 年级上
  const upperGradeList = ref<ICourse[]>(defaultGrade());
  // 年级下
  const lowerGradeList = ref<ICourse[]>(defaultGrade());

  async function getCourseList(catId: string) {
    const list = await getCourseListRequest(catId);
    // console.log(list, 'list');
    if (Array.isArray(list)) {
      list.map((item: ICate) => {
        const index = GRADE_NAME.findIndex((g) => item.classLevelName.includes(g));
        if (index !== -1) {
          const cate =
            Array.isArray(item.categoryDTOS) && item.categoryDTOS.length > 0
              ? item.categoryDTOS[0]
              : defaultCourse();
          const classLevelName = item.classLevelName;
          if (classLevelName.includes(GradeLevel.UPPER_GRADE)) {
            upperGradeList.value[index] = {
              ...cate,
              classLevelName,
              index
            };
          } else if (classLevelName.includes(GradeLevel.LOWER_GRADE)) {
            lowerGradeList.value[index] = {
              ...cate,
              classLevelName,
              index
            };
          }
        }
      });
    }
    console.log(upperGradeList.value, 'upperGradeList');
    console.log(lowerGradeList.value, 'lowerGradeList');
  }
  return {
    upperGradeList,
    lowerGradeList,

    getCourseList
  };
});
