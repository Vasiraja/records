"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
var feathers_1 = require("@feathersjs/feathers");
var authentication_client_1 = require("@feathersjs/authentication-client");
var emp_shared_1 = require("./services/emp/emp.shared");
var users_shared_1 = require("./services/users/users.shared");
/**
 * Returns a typed client for the Feathersapp app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
var createClient = function (connection, authenticationOptions) {
    if (authenticationOptions === void 0) { authenticationOptions = {}; }
    var client = (0, feathers_1.feathers)();
    client.configure(connection);
    client.configure((0, authentication_client_1.default)(authenticationOptions));
    client.set('connection', connection);
    client.configure(users_shared_1.usersClient);
    client.configure(emp_shared_1.employeesClient);
    return client;
};
exports.createClient = createClient;
