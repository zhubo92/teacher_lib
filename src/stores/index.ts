import type { ToRef } from 'vue';

import headerStore from './header';
import loginStore from './login';
import userStore from './user';
import homeStore from './home';
import courseStore from './course';
import sectionStore from './section';
import slidesStore from './slides';
import searchStore from './search';

type AutoToRefs<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : ToRef<T[K]>;
};

const storeExports = {
  header: headerStore,
  login: loginStore,
  user: userStore,
  home: homeStore,
  section: sectionStore,
  slides: slidesStore,
  search: searchStore,
  course: courseStore
};

export function useStore<T extends keyof typeof storeExports>(storeName: T) {
  const store = storeExports[storeName]();
  const storeRefs = storeToRefs(store);
  return { ...store, ...storeRefs } as unknown as AutoToRefs<ReturnType<(typeof storeExports)[T]>>;
}
