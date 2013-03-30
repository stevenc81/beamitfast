module.exports = {
    api: {
        port: 8084,
        host: 'api.beamitfast.com'
    },

    db: {
        user: 'root',
        password: 'mysqlpasswd',
        database: 'beamitfast',
        host: '127.0.0.1',
        logging: true,
        debug: false
    },

    session: {
    key: 'beamitfast.sid',
    secret: 'shh',
    cookieDomain: '.beamitfast.com'
  },

  memcached: {
    server: '127.0.0.1',
    port: 11211
  }
};