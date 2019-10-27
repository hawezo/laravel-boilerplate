import { GetterTree } from 'vuex';
import { LayoutState } from './LayoutState';
import { RootState } from '../RootState';

export const getters: GetterTree<LayoutState, RootState> = {
  name: (state: LayoutState) => state.name,
};
