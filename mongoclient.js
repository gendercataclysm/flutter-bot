const { MongoClient, ServerApiVersion } = require('mongodb');
const { uri } = require('./config.json');

const mongoclient = new MongoClient(uri, {
	serverApi: {
	  version: ServerApiVersion.v1,
	  strict: true,
	  deprecationErrors: false,
	}
  });
  module.exports = {mongoclient};
 