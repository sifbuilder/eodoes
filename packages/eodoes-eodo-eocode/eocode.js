/**********************
 *    @eonitem
 */
;(function (global, factory) { // eslint-disable-line no-extra-semi
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eonitem = global.eonitem || {}))
})(this, function (exports) {
  'use strict'

  // ....................... eonitem
  async function eonitem (__eo = {}) {
    const {report} = require('eodoes-muons')
    const {wstree} = require('eodoes-muons')

    let isWin = process.platform === 'win32' // eslint-disable-line no-unused-vars
    let isLinux = process.platform === 'linux' // eslint-disable-line no-unused-vars

    let state = {

      helpmsg: ` 
      will create the eodoes code folder

      usage:      
      > node ./scripts/run eodoes-eodo-eocode ../eosites eoparse --eon eospace
`,

    }

    /**********************
      * eoparse__parcel
      */
    state.eoparse__parcel = function (data, __) {
      let { eoroot } = __ // eslint-disable-line no-unused-vars
      let {eon, version, author, license, descr, email} = __.eonopts // eslint-disable-line no-unused-vars
      let { delay = 3969 } = __.eventsopts // eslint-disable-line no-unused-vars

      let {
        useWorkspaces,
        packages,
        starter,
        themes,
        packagesPath,
        starterPath,
        themePaths,
      } = wstree(data, __)

      report.trace({useWorkspaces, packages, starter, themes, packagesPath, starterPath, themePaths}, __)

      /**
       *  parcel
       */
      let parcel = { // ---------------------- parcel

        __eofolders_root: ['.'], // __eobreak: ``,

        __eofiles_c_012: [
          {
            resolve: `c/eodoes/.eslintrc.js`,
            options: {
              __eodoc: `012 create c/eodoes/.eslintrc.js`,
              content: `
module.exports = {
  "env": {
      "browser": true,
      "es6": true,
      "amd": true,
      "commonjs": true,
      "jest": true,
      "node": true
  },
  "parserOptions": {
      "ecmaVersion": 2018
  },
  "extends": "eslint:recommended",
  "rules": {
  "accessor-pairs": "error",
  "arrow-spacing": ["error", { "before": true, "after": true }],
  "block-spacing": ["error", "always"],
  "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
  // "camelcase": ["error", { "properties": "never" }],
  "comma-dangle": ["error", {
    "arrays": "always-multiline", // "never",
    "objects": "always-multiline", // "never",
    "imports": "never",
    "exports": "never",
    "functions": "never"
  }],
  "comma-spacing": ["error", { "before": false, "after": true }],
  "comma-style": ["error", "last"],
  "constructor-super": "error",
  "curly": ["error", "multi-line"],
  "dot-location": ["error", "property"],
  "eol-last": "error",
  "eqeqeq": ["error", "always", { "null": "ignore" }],
  "func-call-spacing": ["error", "never"],
  "generator-star-spacing": ["error", { "before": true, "after": true }],
  "handle-callback-err": ["error", "^(err|error)$" ],
  "indent": ["error", 2, { "SwitchCase": 1 }],
  "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
  "keyword-spacing": ["error", { "before": true, "after": true }],
  "new-cap": ["error", { "newIsCap": true, "capIsNew": false }],
  "new-parens": "error",
  "no-array-constructor": "error",
  "no-caller": "error",
  "no-class-assign": "error",
  "no-compare-neg-zero": "error",
  "no-cond-assign": "error",
  "no-const-assign": "error",
  "no-constant-condition": ["error", { "checkLoops": false }],
  "no-control-regex": "error",
  "no-debugger": "error",
  "no-delete-var": "error",
  "no-dupe-args": "error",
  "no-dupe-class-members": "error",
  "no-dupe-keys": "error",
  "no-duplicate-case": "error",
  "no-empty-character-class": "error",
  "no-empty-pattern": "error",
  "no-eval": "error",
  "no-ex-assign": "error",
  "no-extend-native": "error",
  "no-extra-bind": "error",
  "no-extra-boolean-cast": "error",
  "no-extra-parens": ["error", "functions"],
  "no-fallthrough": "error",
  "no-floating-decimal": "error",
  "no-func-assign": "error",
  "no-global-assign": "error",
  "no-implied-eval": "error",
  "no-inner-declarations": ["error", "functions"],
  "no-invalid-regexp": "error",
  "no-irregular-whitespace": "error",
  "no-iterator": "error",
  "no-label-var": "error",
  "no-labels": ["error", { "allowLoop": false, "allowSwitch": false }],
  "no-lone-blocks": "error",
  "no-mixed-operators": ["error", {
    "groups": [
      ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
      ["&&", "||"],
      ["in", "instanceof"]
    ],
    "allowSamePrecedence": true
  }],
  "no-mixed-spaces-and-tabs": "error",
  "no-multi-spaces": "error",
  "no-multi-str": "error",
  "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
  "no-negated-in-lhs": "error",
  "no-new": "error",
  "no-new-func": "error",
  "no-new-object": "error",
  "no-new-require": "error",
  "no-new-symbol": "error",
  "no-new-wrappers": "error",
  "no-obj-calls": "error",
  "no-octal": "error",
  "no-octal-escape": "error",
  "no-path-concat": "error",
  "no-proto": "error",
  "no-redeclare": "error",
  "no-regex-spaces": "error",
  // "no-return-assign": ["error", "except-parens"],
  "no-return-await": "error",
  "no-self-assign": "error",
  "no-self-compare": "error",
  "no-sequences": "error",
  "no-shadow-restricted-names": "error",
  "no-sparse-arrays": "error",
  "no-tabs": "error",
  "no-template-curly-in-string": "error",
  "no-this-before-super": "error",
  "no-throw-literal": "error",
  "no-trailing-spaces": "error",
  "no-undef": "error",
  "no-undef-init": "error",
  "no-unexpected-multiline": "error",
  "no-unmodified-loop-condition": "error",
  "no-unneeded-ternary": ["error", { "defaultAssignment": false }],
  "no-unreachable": "error",
  "no-unsafe-finally": "error",
  "no-unsafe-negation": "error",
  "no-unused-expressions": ["error", { "allowShortCircuit": true, "allowTernary": true, "allowTaggedTemplates": true }],
  "no-unused-vars": ["error",
          { "vars": "all",
            "args": "none",
            "ignoreRestSiblings": true,
            "varsIgnorePattern": "render[SW]|proton"// eons
            }],
  "no-use-before-define": ["error", { "functions": false, "classes": false, "variables": false }],
  "no-useless-call": "error",
  "no-useless-computed-key": "error",
  "no-useless-constructor": "error",
  "no-useless-escape": "error",
  "no-useless-rename": "error",
  "no-useless-return": "error",
  "no-whitespace-before-property": "error",
  "no-with": "error",
  /*  "object-property-newline": ["error", { "allowMultiplePropertiesPerLine": true }], */
  /*  "one-var": ["error", { "initialized": "never" }], */
  "operator-linebreak": ["error", "after", { "overrides": { "?": "before", ":": "before" } }],
  "padded-blocks": ["error", { "blocks": "never", "switches": "never", "classes": "never" }],
  "prefer-promise-reject-errors": "error",
  "quotes": ["error", "single", { "avoidEscape": true, "allowTemplateLiterals": true }],
  "rest-spread-spacing": ["error", "never"],
  "semi": ["error", "never"],
  "semi-spacing": ["error", { "before": false, "after": true }],
  "space-before-blocks": ["error", "always"],
  "space-before-function-paren": ["error", "always"],
  "space-in-parens": ["error", "never"],
  "space-infix-ops": "error",
  "space-unary-ops": ["error", { "words": true, "nonwords": false }],
  "spaced-comment": ["error", "always", {
    "line": { "markers": ["*package", "!", "/", ",", "="] },
    "block": { "balanced": true, "markers": ["*package", "!", ",", ":", "::", "flow-include"], "exceptions": ["*"] }
  }],
  "symbol-description": "error",
  "template-curly-spacing": ["error", "never"],
  "template-tag-spacing": ["error", "never"],
  "unicode-bom": ["error", "never"],
  "use-isnan": "error",
  "valid-typeof": ["error", { "requireStringLiterals": true }],
  "wrap-iife": ["error", "any", { "functionPrototypeMethods": true }],
  "yield-star-spacing": ["error", "both"],
  "yoda": ["error", "never"],
  },
  "plugins": [
    "html",
    "destructuring"
  ],
}
        `,
            },
          } ],

        __eofetch_c_eodoes_014: [{ // c eodoes
          resolve: `https://github.com/sifbuilder/eodoes/archive/master.zip`,
          options: {
            __eodoc: `014 download eodoes tar`,
            file: `c/eodoes.zip`,
          },
        }],

        __eounzip_c_eodo_016: [{
          resolve: `c/eodoes.zip`,
          options: {
            __eodoc: `016 unzip eodoes tar`,
            folder: `c`,
          },
        }],

        __eofolders_c_eodo_018: [{
          resolve: `c/eodoes`,
          options: {
            __eodoc: `018 copy unzipped eodoes-master to eodoes`,
            path: `c/eodoes-master`, // from
          },
        }],

        __eofiles_c_rm_zip_020: [ {
          resolve: `null`,
          options: {
            __eodoc: `020 create c/eodoes/eodoes.zip`,
            __eodelay: delay,
            path: `c/eodoes.zip`,
          },
        } ],

        __eofolders_c_rm_master_022: [ {
          resolve: `null`,
          options: {
            __eodoc: `022 rm c/eodoes/eodoes-master`,
            __eodelay: delay,
            path: `c/eodoes-master`,
          },
        } ],

        __eoexec_c_npm_eodo_024: {
          resolve: `yarn`,
          options: {
            __eodoc: `024 yarn eodoes`,
            __eodelay: delay,
            cwd: `c/eodoes`,
          },
        },

      }
      return parcel
    }

    // ....................... enty
    let enty = {}

    enty.getState = () => state

    return enty
  }

  exports.eonitem = eonitem
})
