<template>
  <button
    class="px-4 py-2 rounded font-bold cursor-pointer transition-all transition-250 uppercase font-sans leading-normal focus:outline-none disabled:cursor-not-allowed"
    :class="[
      color,
      elevated ? 'elevation-1 focus:elevation-4 active:elevation-8 hover:elevation-4 disabled:elevation-0' : '',
    ]"
    :disabled="disabled || loading"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    v-ripple
  >
    <slot v-bind:loading="loading" v-bind:hover="hover" />
  </button>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    elevated: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'brand',
      validator: value => ['brand', 'error', 'navigation-primary', 'navigation-secondary'].includes(value),
    },
  },
  data: () => ({
    hover: false,
  }),
};
</script>

<style lang="postcss" scoped>
.brand {
  @apply text-on-brand bg-brand;

  &[disabled] {
    @apply text-on-brand bg-brand-disabled;
  }
}
.error {
  @apply text-on-error bg-error;

  &[disabled] {
    @apply text-on-error bg-error-disabled;
  }
}
.navigation-primary {
  @apply text-on-navigation bg-navigation-primary;

  &[disabled] {
    @apply text-on-brand bg-navigation-primary-disabled;
  }
}
.navigation-secondary {
  @apply text-on-navigation bg-navigation-secondary;

  &[disabled] {
    @apply text-on-brand bg-navigation-secondary-disabled;
  }
}
</style>
