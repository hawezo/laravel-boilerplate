<template>
  <main class="flex flex-col min-h-screen" role="main">
    <nav class="p-4 flex bg-navigation text-on-navigation shadow-md z-10 transition-all">
      <div class="flex-1">
        <inertia-link :href="$path('index')">Application</inertia-link>
      </div>
      <button
        @click="rotateThemes"
        class="text-on-navigation hover:text-on-navigation-hover"
      >Next theme</button>
    </nav>
    <section class="flex flex-col flex-1 bg-background text-on-background transition-all">
      <slot />
    </section>
  </main>
</template>

<script>
import rotateThemes from '@/Script/rotateThemes';

export default {
  data() {
    return {
      theme: null
    };
  },

  methods: {
    rotateThemes
  }
};
</script>
