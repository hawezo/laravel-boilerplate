<template>
  <div class="w-full max-w-sm z-10">
    <form
      class="p-8 pb-6 bg-surface text-on-surface rounded-lg shadow-lg overflow-hidden transition-all elevation-4"
      @submit.prevent="submit"
    >
      <div class="flex flex-col items-center pb-8 uppercase font-title leading-tight">
        <span class="text-on-surface-high-emphasis font-normal text-2xl">{{ $_('auth.form.login.welcome') }}</span>
        <span class="text-on-surface font-black text-3xl">{{ $_('auth.form.login.login') }}</span>
      </div>

      <text-input
        v-model="form.username"
        :errors="$page.errors.username"
        :label="$_('auth.username')"
        class="mb-4"
        type="username"
        autofocus
        autocapitalize="off"
      />
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
  </div>
</template>

<script>
import Layout from '@/Layout/Layout';
import TextInput from '@/Component/TextInput';
import UiButton from '@/Component/Button';

export default {
  title: 'login',
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
        username: null,
        password: null,
        remember: null,
      },
    };
  },
  methods: {
    submit() {
      this.sending = true;
      this.$inertia
        .post(this.$path('login.attempt'), {
          username: this.form.username,
          password: this.form.password,
          remember: this.form.remember,
        })
        .then(() => (this.sending = false));
    },
  },
};
</script>
