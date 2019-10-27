import { ActionTree } from 'vuex';
import { LayoutState } from './LayoutState';
import { RootState } from '../RootState';
import { Layout } from './Layout';

export const actions: ActionTree<LayoutState, RootState> = {
  set({ commit }, name?: Layout): any {
    commit('ON_LAYOUT_CHANGE', name || null);
  },
};
