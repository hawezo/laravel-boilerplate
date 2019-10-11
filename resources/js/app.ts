import { InertiaApp } from '@inertiajs/inertia-vue';
import Vue from 'vue';

// @ts-ignore
Vue.use(InertiaApp);

const app: any = document.getElementById('app');

new Vue({
  render: h =>
    h(InertiaApp, {
      props: {
        initialPage: JSON.parse(app.dataset.page),
        resolveComponent: (name: string) => require(`./View/${name}`).default,
      },
    }),
}).$mount(app);
