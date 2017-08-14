exports.config = {
  files: {
    javascripts: {
      joinTo: {
        'js/app.js': 'assets/js/**/*',
        'js/vendor.js': 'assets/vendor/*.js',
      },
    },
    stylesheets: {
      joinTo: {
        'css/app.css': 'assets/css/**/*',
        'css/vendor.css': 'vendor/*.css',
      },
    },
  },

  modules: {
    autoRequire: {
      'js/app.js': ['assets/js/app.js'],
    },
  },

  conventions: {
    assets: 'assets/static/**/*',
  },

  paths: {
    watched: ['assets/static', 'assets/css', 'assets/js', 'assets/vendor'],
    public: './public/assets',
  },

  plugins: {
    babel: {
      ignore: ['assets/vendor/*.js'],
    },
  },

  npm: {
    enabled: true,
  },
};
