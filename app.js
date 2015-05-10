/**
 * Created by steven on 20.11.13.
 */

server = require('./server.js');
config = require('./config.js');

server.start(config.server);
