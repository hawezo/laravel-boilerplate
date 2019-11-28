import Vue from 'vue';
import Lang from 'laravel-vue-lang';
import { Store } from '@/Store';
import { Adapters } from './Script/register';
import { InertiaApp } from '@inertiajs/inertia-vue';

// @ts-ignore
Vue.use(InertiaApp);
Vue.use(Lang, { shortLanguage: true });
Vue.use(Adapters);

const app: any = document.getElementById('app');

new Vue({
  store: Store,
  render: h =>
    h(InertiaApp, {
      props: {
        initialPage: JSON.parse(app.dataset.page),
        resolveComponent: (name: string) => require(`./View/${name}`).default,
      },
    }),
}).$mount(app);
