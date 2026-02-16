"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeesClient = exports.employeesMethods = exports.employeesPath = void 0;
exports.employeesPath = 'emp';
exports.employeesMethods = ['find', 'get', 'create', 'patch', 'remove'];
var employeesClient = function (client) {
    var connection = client.get('connection');
    client.use(exports.employeesPath, connection.service(exports.employeesPath), {
        methods: exports.employeesMethods
    });
};
exports.employeesClient = employeesClient;
