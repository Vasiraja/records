"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersClient = exports.usersMethods = exports.usersPath = void 0;
exports.usersPath = 'users';
exports.usersMethods = ['find', 'get', 'create', 'patch', 'remove'];
var usersClient = function (client) {
    var connection = client.get('connection');
    client.use(exports.usersPath, connection.service(exports.usersPath), {
        methods: exports.usersMethods
    });
};
exports.usersClient = usersClient;
