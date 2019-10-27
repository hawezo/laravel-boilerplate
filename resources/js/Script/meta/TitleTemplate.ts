import Vue from 'vue';

export type TitleTemplate = (title: string | undefined, vm: Vue) => string;
