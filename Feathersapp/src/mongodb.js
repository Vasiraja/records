"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongodb = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
var mongodb_1 = require("mongodb");
var mongodb = function (app) {
    var connection = app.get('mongodb');
    var database = new URL(connection).pathname.substring(1);
    var mongoClient = mongodb_1.MongoClient.connect(connection).then(function (client) { return client.db(database); });
    app.set('mongodbClient', mongoClient);
};
exports.mongodb = mongodb;
