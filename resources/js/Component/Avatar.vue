<template>
  <div v-if="hasPicture">
    <img :src="picture" class="bg-surface" />
  </div>
  <div v-else v-html="svg" />
</template>

<script>
import Generator from '@dicebear/avatars';
import sprites from '@dicebear/avatars-initials-sprites';
import _ from 'lodash';

export default {
  name: 'avatar',
  props: {
    picture: {
      type: String,
      default: null,
    },
    seed: {
      type: String,
      default: () =>
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15),
    },
    options: {
      type: Object,
      default: () => ({
        fontSize: 35,
        backgroundColorLevel: 800,
        backgroundColors: ['teal', 'cyan', 'grey', 'orange', 'yellow', 'amber', 'blue'],
      }),
    },
  },
  computed: {
    hasPicture() {
      return _.size(this.picture);
    },
    svg() {
      let generator = new Generator(sprites(this.options));
      return generator.create(this.seed);
    },
  },
};
</script>
