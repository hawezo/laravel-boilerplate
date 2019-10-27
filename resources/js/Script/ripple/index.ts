import Ripple from 'vue-ripple-directive';
import { VueConstructor } from 'vue';

export default function(Vue: VueConstructor) {
  Ripple.color = 'rgba(var(--overlay), var(--overlay-pressed))';
  Vue.directive('ripple', Ripple);
}
