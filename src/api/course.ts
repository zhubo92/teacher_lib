import request from '@/utils/request';
import { IAddress, ISection } from '@/types/section';
import { ISlides } from '@/types/slides.d';

/**
 * 课程详情
 */
export function getCourseListRequest(catId: string) {
  return request({
    url: `/teacher-lib/home/${catId}`,
    method: 'GET'
  });
}

/**
 * 小节详情
 */
export function getSectionRequest(catId: string, page: number, pageSize: number) {
  return request<ISection>({
    url: `/teacher-lib/category/queryCourse/list/${catId}/${page}/${pageSize}`,
    method: 'GET'
  });
}
/**
 * 查询地址栏
 */
export function getAddressRequest(courseId: string | number) {
  return request<IAddress>({
    url: `/teacher-lib/category/query/crumb/${courseId}`,
    method: 'GET'
  });
}
/**
 * 查询课件信息
 */
export function getSlidesRequest(slideId: string) {
  return request<ISlides>({
    url: `/teacher-lib/slides/queryInfo/${slideId}`,
    method: 'GET'
  });
}
