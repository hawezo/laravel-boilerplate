<template>
  <div class="w-full max-w-lg z-10 flex flex-col items-center justify-center leading-tight">
    <h1 class="text-6xl font-thin">{{ code }}</h1>
    <span class="text-lg font-thin">{{ $_(`error.description.${code}`) }}</span>
    <div class="mt-4">
      <ui-link :href="$path('logout')" method="post">{{ $_('auth.logout') }}</ui-link>
    </div>
  </div>
</template>

<script>
import Layout from '@/Layout/Layout';

export default {
  layout: Layout,
  layoutName: 'centered-with-pattern',
  title: ({ code }) => `error.title.${code}`,
  titleTemplate: (title, { $_, $page }) => `${$_(title)} — ${$page.app.name}`,
  props: {
    code: Number,
  },
};
</script>
