interface ICategoryTree {
  catId: number;
  catName: string;
  parentId: number;
  catLevel: number;
  imgUrl: string;
  classLevelId: string;
  sort: number;
  status: number;
  description: string;
  createTime: string;
  classLevelName: string;
  categoryTreeDTO: [];
  classLevelImg: null | string;
  slidesAmount: number | null;
  longImgUrl: string;
  uncheckedImgUrl: null | string;
}

export const defaultCourse = (): ICourse => {
  return {
    catId: 0,
    catName: '',
    parentId: 0,
    catLevel: 1,
    imgUrl: '',
    classLevelId: '',
    sort: 0,
    status: 1,
    description: null,
    createTime: '',
    classLevelName: '',
    categoryTreeDTO: [],
    classLevelImg: null,
    slidesAmount: null,
    longImgUrl: '',
    uncheckedImgUrl: null
  };
};

export interface ICourse {
  catId: number;
  catName: string;
  parentId: number;
  catLevel: number;
  imgUrl: string;
  classLevelId: string;
  sort: number;
  status: number;
  description: string | null;
  createTime: string;
  classLevelName: string;
  categoryTreeDTO: ICategoryTree[];
  classLevelImg: null | string;
  slidesAmount: null | number;
  longImgUrl: string;
  uncheckedImgUrl: null | string;
  index?: number;
}

export const defaultGrade = (): ICourse[] => {
  return [
    {
      catId: 39,
      catName: '',
      parentId: 35,
      catLevel: 1,
      imgUrl: '',
      classLevelId: '',
      sort: 1,
      status: 1,
      description: '',
      createTime: '',
      classLevelName: '托班·上',
      categoryTreeDTO: [],
      classLevelImg: null,
      slidesAmount: null,
      longImgUrl: '',
      uncheckedImgUrl: null,
      index: 0
    },
    {
      catId: 54,
      catName: '',
      parentId: 35,
      catLevel: 1,
      imgUrl: '',
      classLevelId: '',
      sort: 0,
      status: 1,
      description: '',
      createTime: '',
      classLevelName: '小班·上',
      categoryTreeDTO: [],
      classLevelImg: null,
      slidesAmount: null,
      longImgUrl: '',
      uncheckedImgUrl: null,
      index: 1
    },
    {
      catId: 56,
      catName: '',
      parentId: 35,
      catLevel: 1,
      imgUrl: '',
      classLevelId: '',
      sort: 0,
      status: 1,
      description: '',
      createTime: '',
      classLevelName: '中班·上',
      categoryTreeDTO: [],
      classLevelImg: null,
      slidesAmount: null,
      longImgUrl: '',
      uncheckedImgUrl: null,
      index: 2
    },
    {
      catId: 58,
      catName: '',
      parentId: 35,
      catLevel: 1,
      imgUrl: '',
      classLevelId: '',
      sort: 0,
      status: 1,
      description: '',
      createTime: '',
      classLevelName: '大班·上',
      categoryTreeDTO: [],
      classLevelImg: null,
      slidesAmount: null,
      longImgUrl: '',
      uncheckedImgUrl: null,
      index: 3
    }
  ];
};

export interface ICate {
  classLevelId: string;
  classLevelName: string;
  categoryDTOS: ICourse[];
}

/**
 * 年级阶段 年级上，还是下
 */
export enum GradeLevel {
  'UPPER_GRADE' = '上',
  'LOWER_GRADE' = '下'
}
