require('dotenv').config();
const config = {
  "development2": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "development": {
    "use_env_variable":  "DEVELOPMENT_DATABASE_URL"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "use_env_variable":  "PRODUCTION_DATABASE_URL"
  },
}
module.exports = config;