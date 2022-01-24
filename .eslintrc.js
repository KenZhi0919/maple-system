module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'prettier/prettier': 'warn',

    /*****************************************
     * Eslint 規則
     * https://cn.eslint.org/docs/rules
     ****************************************/

    'no-unused-expressions': 'off',

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',

    // must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],

    // class 成員需空行 (警告)
    'lines-between-class-members': [
      'warn',
      'always',
      {
        exceptAfterSingleLine: false
      }
    ],

    // console (只在 development 允許)
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 允許在正則表達式中使用控制字符
    'no-control-regex': 'off',

    // debugger (只在 development 允許)
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    /***********************************
     * Vue Eslint 規則
     * https://eslint.vuejs.org/rules/
     **********************************/

    // Vue script, 未使用的組件 (警告)
    'vue/no-unused-components': 'warn',

    // Vue template, 不使用 v-html (關閉)
    // 'vue/no-v-html': 'off',

    // Vue template, HTML Tag 關閉規則 (警告)
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],

    // Vue template, Component 命名規則
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: false,
        ignores: []
      }
    ],

    // Vue template, attribute 命名
    'vue/attribute-hyphenation': [
      'error',
      'always',
      {
        ignore: []
      }
    ]
  }
}
