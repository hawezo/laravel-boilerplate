<template>
  <div class="flex flex-1 flex-col items-center justify-center text-lg">
    <h1 class="font-bold">{{ $_('messages.welcome.title') }}</h1>
    <p v-html="$_('messages.welcome.text', { user: `<span class='font-semibold'>${user.name}</span>` })" />
  </div>
</template>

<script>
import Vue from 'vue'
import Layout from '@/Layout/Layout';

export default {
  layout: (h, page) => h(Layout, [page]),
  title: ({ user }) => `Welcome, ${user.name}`,
  data() {
    return {
      user: {
        name: 'Jon Doe'
      }
    }
  }
}
</script>
