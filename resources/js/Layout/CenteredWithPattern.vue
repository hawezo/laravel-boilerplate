<template>
  <div class="p-6 min-h-screen flex justify-center items-center">
    <svg-pattern class="absolute z-0" :class="patternClass" />
    <slot />
  </div>
</template>

<script>
import SvgPattern from '@/Component/SvgPattern';

export default {
  components: {
    SvgPattern,
  },
  props: {
    patternClass: String,
  },
};
</script>
