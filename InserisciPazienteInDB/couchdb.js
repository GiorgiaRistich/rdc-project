var nano = require('nano');
module.exports = nano(process.env.COUCHDB_URL || 'http://admin:adminpass@2.236.50.195:5984');