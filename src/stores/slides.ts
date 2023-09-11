import { verifyAuthCountRequest } from '@/api/user';
import { getSlidesRequest } from '@/api/course';
import { defaultSlides, ISlides } from '@/types/slides.d';

export default defineStore('slides', () => {
  const isExceedLimit = ref<boolean>(false);
  const slides = ref<ISlides>(defaultSlides());
  async function verifyAuthCount() {
    const value = await verifyAuthCountRequest();
    isExceedLimit.value = !value;
  }
  async function getSlides(id: string) {
    slides.value = await getSlidesRequest(id);
  }
  return {
    isExceedLimit,
    slides,

    verifyAuthCount,
    getSlides
  };
});
