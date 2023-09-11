export interface ICategory {
  catId: number;
  catName: string;
  parentId: null | number;
  catLevel: null | number;
  imgUrl: string;
  classLevelId: null | number;
  sort: null | number;
  status: null | number;
  description: null | string;
  createTime: string;
  updateTime: null | string;
  isDelete: null | number;
  classLevelName: null | string;
  longImgUrl: null | string;
  uncheckedImgUrl: null | string;
  auth: boolean;
}
