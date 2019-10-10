// This file is auto gererated by build/build-entry.js
import { VueConstructor } from 'vue/types';


declare global {
  interface Window {
    Vue?: VueConstructor;
  }
}

const version = '1.0.0';
const components = [
  
];

const install = (Vue: VueConstructor) => {
  components.forEach(Component => {
    Vue.use(Component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  install,
  version,
  
};

export default {
  install,
  version
};
