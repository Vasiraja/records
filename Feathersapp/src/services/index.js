"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.services = void 0;
var emp_1 = require("./emp/emp");
var users_1 = require("./users/users");
var services = function (app) {
    app.configure(emp_1.employees);
    app.configure(users_1.users);
    // All services will be registered here
};
exports.services = services;
