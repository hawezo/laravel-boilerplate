import { MutationTree } from 'vuex';
import { LayoutState } from './LayoutState';
import { Layout } from './Layout';

export const mutations: MutationTree<LayoutState> = {
  ['ON_LAYOUT_CHANGE'](state, value: Layout) {
    state.name = value || null;
  },
};
