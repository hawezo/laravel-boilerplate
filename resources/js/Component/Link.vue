<template>
  <a v-bind="attributes">
    <slot />
  </a>
</template>

<script>
import { Inertia, shouldIntercept } from '@inertiajs/inertia';

export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    href: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      default: 'get',
    },
    replace: {
      type: Boolean,
      default: false,
    },
    preserveScroll: {
      type: Boolean,
      default: false,
    },
    preserveState: {
      type: Boolean,
      default: false,
    },
    newTab: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.$el.addEventListener('click', this.handle);
  },
  beforeDestroy() {
    this.$el.removeEventListener('click', this.handle);
  },
  computed: {
    attributes() {
      return {
        ...this.$attrs,
        href: this.href,
      };
    },
  },
  methods: {
    handle(event) {
      let options = {
        data: this.data,
        method: this.method,
        replace: this.replace,
        preserveScroll: this.preserveScroll,
        preserveState: this.preserveState,
      };
      if ('#' == this.href) {
        event.preventDefault();
        return;
      }
      if (this.newTab || 'blank' == this.$attrs.target) {
        event.preventDefault();
        window.open(this.href, 'blank');
        return;
      }
      if (false === this.beforeRouteLeave(this, options, event)) {
        event.preventDefault();
        return;
      }
      if (shouldIntercept(event)) {
        event.preventDefault();
        this.afterRouteLeave(this, options, Inertia.visit(this.href, options), event);
      }
    },
  },
};
</script>
