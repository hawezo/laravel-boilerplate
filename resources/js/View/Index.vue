<template>
  <div class="flex flex-1 flex-col items-center justify-center text-lg">
    <h1 class="font-bold">Welcome</h1>
    <p>Hello <span class="font-semibold">{{ user.name }}</span>, welcome to your first Inertia app!</p>
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
