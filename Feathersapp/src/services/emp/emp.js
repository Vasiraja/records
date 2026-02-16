"use strict";
// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employees = void 0;
var schema_1 = require("@feathersjs/schema");
var emp_schema_1 = require("./emp.schema");
var emp_class_1 = require("./emp.class");
var emp_shared_1 = require("./emp.shared");
__exportStar(require("./emp.class"), exports);
__exportStar(require("./emp.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
var employees = function (app) {
    // Register our service on the Feathers application
    app.use(emp_shared_1.employeesPath, new emp_class_1.EmployeesService((0, emp_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: emp_shared_1.employeesMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(emp_shared_1.employeesPath).hooks({
        around: {
            all: [
                schema_1.hooks.resolveExternal(emp_schema_1.employeesExternalResolver),
                schema_1.hooks.resolveResult(emp_schema_1.employeesResolver)
            ]
        },
        before: {
            all: [
                schema_1.hooks.validateQuery(emp_schema_1.employeesQueryValidator),
                schema_1.hooks.resolveQuery(emp_schema_1.employeesQueryResolver)
            ],
            find: [],
            get: [],
            create: [
                schema_1.hooks.validateData(emp_schema_1.employeesDataValidator),
                schema_1.hooks.resolveData(emp_schema_1.employeesDataResolver)
            ],
            patch: [
                schema_1.hooks.validateData(emp_schema_1.employeesPatchValidator),
                schema_1.hooks.resolveData(emp_schema_1.employeesPatchResolver)
            ],
            remove: []
        },
        after: {
            all: []
        },
        error: {
            all: []
        }
    });
};
exports.employees = employees;
