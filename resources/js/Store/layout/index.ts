import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { LayoutState } from './LayoutState';
import { RootState } from '../RootState';

export const state: LayoutState = {
  name: null,
};

export const layout: Module<LayoutState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
