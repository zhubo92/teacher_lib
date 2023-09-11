export interface ISlides {
  slidesId: number;
  slidesName: string;
  slidesSize: null;
  description: null;
  createTime: null;
  updateTime: null;
  slidesUrl: string;
  catId: number;
  classLevelId: string;
  classLevelName: string;
  emptyPos: null;
  isDelete: null;
  typeName: null;
  sort: null;
  article: null;
  fileId: string;
  fileVersionId: string;
  videoUrl: null;
  imgUrl: string;
}

export const defaultSlides = (): ISlides => {
  return {
    slidesId: 0,
    slidesName: '',
    slidesSize: null,
    description: null,
    createTime: null,
    updateTime: null,
    slidesUrl: '',
    catId: 0,
    classLevelId: '',
    classLevelName: '',
    emptyPos: null,
    isDelete: null,
    typeName: null,
    sort: null,
    article: null,
    fileId: '',
    fileVersionId: '',
    videoUrl: null,
    imgUrl: ''
  };
};
