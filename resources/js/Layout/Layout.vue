<template>
  <main class="flex flex-col min-h-screen" role="main">
    <nav class="p-4 flex bg-menu-primary text-on-menu-primary">
      <div class="flex-1">Application</div>
      <button
        @click="toggleTheme"
        class="text-on-menu-primary hover:text-on-menu-primary-medium-emphasis"
      >Toggle theme</button>
    </nav>
    <section class="flex flex-col flex-1 bg-background text-on-background">
      <slot />
    </section>
  </main>
</template>

<script>
import toggleTheme from '@/Script/toggleTheme';

export default {
  data() {
    return {
      theme: null
    };
  },

  methods: {
    toggleTheme
  }
};
</script>
