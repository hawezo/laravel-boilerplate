import Tooltip from 'v-tooltip';
import { VueConstructor } from 'vue';

export default function(Vue: VueConstructor) {
  Vue.use(Tooltip, {});
}
