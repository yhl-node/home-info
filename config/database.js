module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'home-info',
    host: '192.168.6.21',
    dialect: 'mysql'
  },
  test: {
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PWD || 'root',
    database: process.env.MYSQL_DB || 'home-info',
    host: process.env.MYSQL_HOST || 'mysql.db',
    dialect: 'mysql'
  },
  production: {
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PWD || 'root',
    database: process.env.MYSQL_DB || 'home-info',
    host: process.env.MYSQL_HOST || 'mysql.db',
    dialect: 'mysql'
  }
}
