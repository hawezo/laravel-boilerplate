<template>
  <component :is="layout">
    <!-- <button class="absolute z-100" style="bottom: 5px; right: 5px;" @click="rotateTheme">Change theme</button> -->
    <slot />
  </component>
</template>

<script>
import v from 'voca';
import rotateTheme from '@/Script/rotateThemes';

// Default layout
const fallback = 'default';

// Available
const layouts = {
  Default: require('@/Layout/Default').default,
  Fullscreen: require('@/Layout/Fullscreen').default,
  CenteredWithPattern: require('@/Layout/CenteredWithPattern').default,
};

export default {
  components: layouts,
  computed: {
    layout() {
      return this.parseLayout(this.$page.layout) || this.$store.getters['layout/name'] || fallback;
    },
  },
  methods: {
    rotateTheme: () => rotateTheme(false),
    parseLayout(name) {
      name = v.kebabCase(name);

      if (name) {
        if (
          Object.keys(layouts)
            .map(name => v.kebabCase(name))
            .includes(name)
        ) {
          return name;
        }

        console.warn(`Unknown layout '${name}', defaulting to '${fallback}'.`);
        return fallback;
      }

      return null;
    },
  },
};
</script>
