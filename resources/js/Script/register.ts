import { VueConstructor } from 'vue';
import { Layout } from './layout';
import { Router } from '@/Script/router';
import { Meta } from '@/Script/meta';
import { Theme } from '@/Script/theme';

import RegisterFontAwesome from '@/Script/font-awesome';
import RegisterRipple from '@/Script/ripple';
import RegisterTooltip from '@/Script/tooltip';
import RegisterRouteGuards from '@/Script/router/guard';

export const Adapters = {
  install: (Vue: VueConstructor) => {
    RegisterFontAwesome(Vue);
    RegisterRipple(Vue);
    RegisterTooltip(Vue);
    RegisterRouteGuards(Vue);

    Vue.mixin(Router);
    Vue.mixin(Meta);
    Vue.mixin(Layout);
    Vue.mixin(Theme);
  },
};

declare module 'vue/types/vue' {
  interface Vue {
    $page?: any;
  }
}
