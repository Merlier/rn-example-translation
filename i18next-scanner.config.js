const fs = require('fs');
const chalk = require('chalk');

module.exports = {
  input: [
    'src/**/*.{js,jsx}',
    // Use ! to filter out files or directories
    '!app/**/*.spec.{js,jsx}',
    '!app/i18n/**',
    '!**/node_modules/**',
  ],
  output: './',
  options: {
    debug: false,
    removeUnusedKeys: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js', '.jsx'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: [],
      fallbackKey: function (ns, value) {
        return value;
      },
      acorn: {
        ecmaVersion: 10, // defaults to 10
        sourceType: 'module', // defaults to 'module'
        // Check out https://github.com/acornjs/acorn/tree/master/acorn#interface for additional options
      },
    },
    lngs: ['en', 'fr'],
    ns: ['translations'],
    defaultLng: 'en',
    defaultNs: 'translations',
    defaultValue: '__STRING_NOT_TRANSLATED__',
    resource: {
      loadPath: 'src/assets/locales/{{lng}}/{{ns}}.json',
      savePath: 'src/assets/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform: function customTransform(file, enc, done) {
    'use strict';
    const parser = this.parser;

    const options = {
      presets: ['@babel/preset-flow'],
      plugins: [
        '@babel/plugin-syntax-jsx',
        '@babel/plugin-proposal-class-properties',
      ],
      configFile: false,
    };

    const content = fs.readFileSync(file.path, enc);
    let count = 0;

    const code = require('@babel/core').transform(content, options);
    parser.parseFuncFromString(
      code.code,
      {list: ['i18next._', 'i18next.__']},
      (key, options) => {
        parser.set(
          key,
          Object.assign({}, options, {
            nsSeparator: false,
            keySeparator: false,
          }),
        );
        ++count;
      },
    );

    if (count > 0) {
      console.log(
        `i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(
          JSON.stringify(file.relative),
        )}`,
      );
    }

    done();
  },
};
