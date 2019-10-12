<template>
  <div class="h-screen flex flex-col items-center justify-center leading-tight">
    <h1 class="text-6xl font-thin">{{ code }}</h1>
    <span class="text-lg font-thin">{{ $_(`errors.description.${code}`) }}</span>
  </div>
</template>

<script>
import Vue from 'vue'
import Layout from '@/Layout/Layout';

export default {
  title: ({ code, $_ }) => $_(`errors.title.${code}`),
  props: {
    code: Number
  }
}
</script>
