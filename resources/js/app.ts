import Vue from 'vue';
import { InertiaApp } from '@inertiajs/inertia-vue';
import { WindowRouter } from '@/Script/router';

// @ts-ignore
Vue.use(InertiaApp);
Vue.mixin(WindowRouter);

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
