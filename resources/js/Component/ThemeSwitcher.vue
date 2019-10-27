<template>
  <button
    class="cursor-pointer transition-all"
    v-tooltip="$_(`label.theme.text`, { theme: $_(`label.theme.${current()}`) })"
  >
    <font-awesome-icon icon="moon" v-if="is('dark')" @click="toggle" />
    <font-awesome-icon icon="sun" v-if="is('light')" @click="toggle" />
    <font-awesome-icon icon="adjust" v-if="is(undefined)" @click="toggle" />
  </button>
</template>

<script>
import { Themes, ThemeApi } from '@/Script/theme';

export default {
  methods: {
    current() {
      return false === ThemeApi.current() ? ThemeApi.documentCurrent() : ThemeApi.current();
    },
    is(theme) {
      return this.current() === theme;
    },
    set(theme) {
      return ThemeApi.update(theme);
    },
    toggle() {
      switch (ThemeApi.current()) {
        case Themes.Light:
          this.set();
          break;
        case Themes.Dark:
          this.set(Themes.Light);
          break;
        default:
          this.set(Themes.Dark);
          break;
      }

      this.$forceUpdate();
    },
  },
};
</script>
