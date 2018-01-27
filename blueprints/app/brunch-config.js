// See http://brunch.io/#documentation for docs.
exports.config = {
  files: {
    javascripts: {
      joinTo: 'js/app.js',
    },
    stylesheets: {
      joinTo: 'css/app.css',
    },
    templates: {
      joinTo: 'js/app.js',
    },
  },

  conventions: {
    assets: [
      /^(assets\/static)/,
    ],
  },

  paths: {
    watched: [
      './assets/static',
      './assets/css',
      './assets/js',
      './assets/vendor',
    ],
    public: './public/assets',
  },

  plugins: {
    babel: {
      ignore: [/^(assets\/vendor)/],
    },
  },

  modules: {
    autoRequire: {
      'js/app.js': ['assets/js/app.js'],
    },
  },

  npm: {
    enabled: true,
  },
};
