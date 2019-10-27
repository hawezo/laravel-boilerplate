import Vue from 'vue';

/**
 * Default title template will add the app name to the translated title.
 *
 * @param {Vue} vm
 * @param {string} [title]
 * @returns {string}
 */
function defaultTemplate(title: string | undefined, vm: Vue): string {
  const { $_ } = vm;
  let result = `${$_(`title.${title}`)}`;

  try {
    return `${result} — ${vm.$page.app.name}`;
  } catch {}

  return result;
}

/**
 * Gets the title defined in a page. Applies a function template.
 *
 * @param {Vue} vm
 * @returns {(string | undefined)}
 */
function getTitle(vm: Vue): string | undefined {
  const { title, titleTemplate } = vm.$options;

  if (title) {
    let computed = title instanceof Function ? title.call(vm, vm) : title;

    if (null === titleTemplate) {
      return computed;
    }

    return (titleTemplate || defaultTemplate)(computed, vm);
  }
}

export const Meta = {
  created() {
    const title = getTitle(this);

    if (title) {
      document.title = title;
    }
  },
};
