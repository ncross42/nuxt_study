module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'comma-dangle': ["error", "only-multiline"],
    'vue/singleline-html-element-content-newline': ["error", {
      "ignoreWhenNoAttributes": true,
      "ignoreWhenEmpty": true,
      // "ignores": ["pre", "textarea", ...INLINE_ELEMENTS]
    }],
    'no-console' : "off",
  }
}
