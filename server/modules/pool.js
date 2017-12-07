// var pg = require('pg');


// var config = {
//     database: "livefreedb",
//     host: "localhost",
//     port: 5432,
//     max: 10,
//     idleTimeoutMillis: 1500,
//
// }
//
// module.exports = pg.Pool(config);


var pg = require('pg');
var url = require('url');
var s = require('./settings.js')
var config = {};

if (process.env.DATABASE_URL) {
  // Heroku gives a url, not a connection object
  // https://github.com/brianc/node-pg-pool
  var params = url.parse(process.env.DATABASE_URL);
  var auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true, // heroku requires ssl to be true
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    user: s.user,
    password: s.pword
  };

} else {
  config = {
    user: process.env.PG_USER || null, //env var: PGUSER
    password: process.env.DATABASE_SECRET || null, //env var: PGPASSWORD
    host: process.env.DATABASE_SERVER || 'localhost', // Server hosting the postgres database
    port: process.env.DATABASE_PORT || 5432, //env var: PGPORT
    database: process.env.DATABASE_NAME || 'bookit', //env var: PGDATABASE
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    user: s.user,
    password: s.pword
  };
}

module.exports = new pg.Pool(config);
