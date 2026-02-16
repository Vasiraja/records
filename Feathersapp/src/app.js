"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
var feathers_1 = require("@feathersjs/feathers");
var configuration_1 = require("@feathersjs/configuration");
var koa_1 = require("@feathersjs/koa");
var socketio_1 = require("@feathersjs/socketio");
var configuration_2 = require("./configuration");
var log_error_1 = require("./hooks/log-error");
var mongodb_1 = require("./mongodb");
var index_1 = require("./services/index");
var channels_1 = require("./channels");
var app = (0, koa_1.koa)((0, feathers_1.feathers)());
exports.app = app;
// Load our app configuration (see config/ folder)
app.configure((0, configuration_1.default)(configuration_2.configurationValidator));
// Set up Koa middleware
app.use((0, koa_1.cors)());
app.use((0, koa_1.serveStatic)(app.get('public')));
app.use((0, koa_1.errorHandler)());
app.use((0, koa_1.parseAuthentication)());
app.use((0, koa_1.bodyParser)());
// Configure services and transports
app.configure((0, koa_1.rest)());
app.configure((0, socketio_1.default)({
    cors: {
        origin: app.get('origins')
    }
}));
app.configure(mongodb_1.mongodb);
app.configure(index_1.services);
app.configure(channels_1.channels);
// Register hooks that run on all service methods
app.hooks({
    around: {
        all: [log_error_1.logError]
    },
    before: {},
    after: {},
    error: {}
});
// Register application setup and teardown hooks here
app.hooks({
    setup: [],
    teardown: []
});
