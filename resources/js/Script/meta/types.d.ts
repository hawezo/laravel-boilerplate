import Vue from 'vue';
import { TitleTemplate } from './TitleTemplate';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    title?: string | Function;
    titleTemplate?: TitleTemplate;
    type?: string | Function;
    layout?: any;
  }
}
