module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: '<%= underscoredName %>_development',
      charset: 'utf8',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './db/migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: process.env.DATABASE_POOL_MIN || 2,
      max: process.env.DATABASE_POO_MAX || 10,
    },
    migrations: {
      directory: './db/migrations',
    },
  },

};
