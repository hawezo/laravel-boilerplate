import Vue from 'vue';
import Vuex from 'vuex';
import { layout } from './layout/';
import { RootState } from './RootState';

Vue.use(Vuex);

// https://dev.to/nkoik/-vuex-pattern-smart-module-registration-15gc
export const Store = new Vuex.Store<RootState>({
  state: { version: '' },
  modules: {
    layout,
  },
});
