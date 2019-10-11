import Vue from 'vue';
import { InertiaApp } from '@inertiajs/inertia-vue';
import { Router } from '@/Script/router';

// @ts-ignore
Vue.use(InertiaApp);
Vue.mixin(Router);

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
