import Vue from 'vue';

function getTitle(vm: Vue) {
  const { title } = vm.$options;
  if (title) {
    return title instanceof Function ? title.call(vm, vm) : title;
  }
}

export const Meta = {
  created() {
    const title = getTitle(this);
    if (title) {
      document.title = title;
    }
  },
};
