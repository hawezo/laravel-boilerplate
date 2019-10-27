<template>
  <div @click="toggle" :class="wrapperClassObject">
    <div class="switch" :class="switchClassObject" :style="overlay">
      <input type="hidden" :name="name" :id="id" :disabled="disabled" :required="required" :value="value" />
      <div
        class="switch-button"
        :class="switchButtonClassObject"
        :disabled="disabled"
        :required="required"
        :data-on="this.value"
        v-ripple
      />
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ui-switch',
  methods: {
    toggle() {
      if (!this.disabled) {
        this.$emit('input', !this.value);
      }
    },
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    colorOn: {
      type: String,
      default: 'success',
    },
    colorOff: {
      type: String,
      default: 'error',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    name: String | Number | undefined,
    id: String | Number | undefined,
  },
  computed: {
    overlay() {
      return {
        '--overlay-pressed': this.disabled ? '0' : '',
      };
    },
    wrapperClassObject() {
      let _disabled = `cursor-not-allowed`;
      let _enabled = `cursor-pointer`;
      return [this.disabled ? _disabled : _enabled];
    },
    switchClassObject() {
      let _color = this.value ? `bg-${this.colorOn}` : `bg-${this.colorOff}`;
      let _disabled = `cursor-not-allowed ${_color}-disabled`;
      let _enabled = `cursor-pointer ${_color}-inactive`;
      return [this.disabled ? _disabled : _enabled];
    },
    switchButtonClassObject() {
      let _color = this.value ? `bg-${this.colorOn}` : `bg-${this.colorOff}`;
      let _disabled = `cursor-not-allowed elevation-0 ${_color}-disabled`;
      let _enabled = `cursor-pointer elevation-2 ${_color}`;
      return [this.disabled ? _disabled : _enabled];
    },
  },
};
</script>

<style lang="postcss" scoped>
.switch {
  @apply transition-all transition-250;
  @apply flex items-center justify-center;
  @apply relative rounded-full w-8;
  height: 0.85rem;

  .switch-button {
    @apply transition-all transition-250;
    @apply absolute w-5 h-5 will-change-transform rounded-full;
    transform: translateX(-0.5rem);

    &[data-on] {
      transform: translateX(0.5rem);
    }
  }
}
</style>
