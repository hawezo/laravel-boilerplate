export const Layout = {
  created() {
    if (this.$store && this.$options.layoutName) {
      this.$store.dispatch('layout/set', this.$options.layoutName);
    }
  },
};
