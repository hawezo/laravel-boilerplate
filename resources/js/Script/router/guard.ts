// @ts-ignore
import Link from '@/Component/Link';
import Vue, { VueConstructor } from 'vue';

declare global {
  interface Window {
    routerGuards: RouterGuards;
  }
}

type BeforeRouteLeaveGuard = (vm: Vue, options: any, event: MouseEvent) => any;
type AfterRouteLeaveGuard = (vm: Vue, options: any, event: MouseEvent, visit?: Promise<any>) => any;
type Guard = BeforeRouteLeaveGuard | AfterRouteLeaveGuard;
type RouterGuards = { [key in GuardName]?: RouterGuardObject };
type GuardName = 'beforeRouteLeave' | 'afterRouteLeave';

interface RouterGuardObject {
  component: Vue;
  call: Guard;
}

declare module 'vue/types/vue' {
  interface Vue {
    clearGuards: (guard?: GuardName) => void;
    beforeRouteLeave: BeforeRouteLeaveGuard;
    afterRouteLeave: AfterRouteLeaveGuard;
  }
}

export default function(Vue: VueConstructor) {
  Vue.component('UiLink', Link);
  Vue.mixin({
    methods: {
      /**
       * Registers the guards if the current component has any.
       *
       * @param {Vue} component An instance of a component
       */
      registerGuards(component: Vue) {
        window.routerGuards = window.routerGuards || {};
        component = component || this;

        // Adds the last `beforeRouteLeave` encountered, for any component.
        if (component && component.$options && Object.getPrototypeOf(component.$options).beforeRouteLeave) {
          window.routerGuards.beforeRouteLeave = {
            component: component,
            call: Object.getPrototypeOf(component.$options).beforeRouteLeave,
          };
        }

        // Adds the last `afterRouteLeave` encountered, for any component.
        if (component && component.$options && Object.getPrototypeOf(component.$options).afterRouteLeave) {
          window.routerGuards.afterRouteLeave = Object.getPrototypeOf(component.$options).afterRouteLeave;
        }
      },

      /**
       * Returns the result of the `beforeRouteLeave` guard. If `clear` is set to true, it will also
       * clear the guard if the visit is not cancelled in order to avoid getting this guard again on the next clicks.
       *
       * @param {Vue} vm The Vue instance
       * @param {Object} options The options passed to Inertia
       * @param {MouseClick} event The event that triggered the guard
       * @param {Boolean} clear Whether or not to clear the guards if it doesn't cancel the visit
       */
      beforeRouteLeave(vm: Vue, options: any, event: MouseEvent, clear: boolean = true) {
        let result = true;

        if (window.routerGuards && window.routerGuards.beforeRouteLeave) {
          result = window.routerGuards.beforeRouteLeave.call(
            window.routerGuards.beforeRouteLeave.component || vm,
            options,
            event,
          );
        }

        if (clear && false !== result) {
          this.clearGuards('beforeRouteLeave');
        }

        return result;
      },

      /**
       * Calls the `afterRouteLeave` guard. If `clear` is set to true, it will also
       * clear the all the guards, since this one is supposed to be the last one.
       *
       * @param {Vue} vm The Vue instance
       * @param {Object} options The options passed to Inertia
       * @param {Promise} visit The Inertia visit promise
       * @param {MouseClick} event The event that triggered the guard
       * @param {Boolean} clear Whether or not to clear the guards
       */
      afterRouteLeave(vm: Vue, options: any, visit: Promise<any>, event: MouseEvent, clear: boolean = true) {
        if (window.routerGuards && window.routerGuards.afterRouteLeave) {
          window.routerGuards.afterRouteLeave.call(
            window.routerGuards.afterRouteLeave.component || vm,
            options,
            event,
            visit,
          );
        }

        if (clear) {
          this.clearGuards();
        }
      },

      /**
       * Clears the guards.
       */
      clearGuards(guard?: GuardName) {
        if (!guard) {
          window.routerGuards = {};
        } else {
          if (window.routerGuards && window.routerGuards[guard]) {
            delete window.routerGuards[guard];
          }
        }
      },
    },
    mounted() {
      this.registerGuards(this);
    },
  });
}
