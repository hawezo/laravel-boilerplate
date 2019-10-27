<template>
  <div class="w-full max-w-sm z-10">
    <div class="flex flex-col items-center pb-6 uppercase font-title leading-tight">
      <span class="text-on-surface-high-emphasis font-bold text-3xl text-center">
        {{ $_('auth.form.confirm_password.confirm_password') }}
      </span>
      <span class="text-on-surface-medium-emphasis font-normal text-xl text-center">
        {{ $_('auth.form.confirm_password.to_continue') }}
      </span>
    </div>

    <form
      class="p-8 pb-6 bg-surface text-on-surface rounded-lg shadow-lg overflow-hidden transition-all elevation-4"
      @submit.prevent="submit"
    >
      <text-input
        v-model="form.password"
        :errors="$page.errors.password"
        class="mb-4"
        :label="$_('auth.password')"
        type="password"
      />

      <div class="flex justify-center">
        <ui-button :disabled="sending" type="submit" color="brand" :aria-label="$_('auth.login')">
          <font-awesome-icon icon="lock" />
        </ui-button>
      </div>
    </form>

    <div class="flex justify-center pt-6 text-sm">
      <span class="text-on-surface-muted text-center">{{ $_('auth.form.confirm_password.help') }}</span>
    </div>
  </div>
</template>

<script>
import Layout from '@/Layout/Layout';
import TextInput from '@/Component/TextInput';
import UiButton from '@/Component/Button';

export default {
  title: 'confirm.password',
  layoutName: 'centered-with-pattern',
  layout: Layout,
  props: {
    errors: Object,
  },
  components: {
    TextInput,
    UiButton,
  },
  data() {
    return {
      sending: false,
      form: {
        password: null,
      },
    };
  },
  methods: {
    submit() {
      this.sending = true;
      this.$inertia
        .post(this.$path('password.confirm.attempt'), {
          password: this.form.password,
        })
        .then(() => (this.sending = false));
    },
  },
};
</script>
