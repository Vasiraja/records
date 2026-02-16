"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeesQueryResolver = exports.employeesQueryValidator = exports.employeesQuerySchema = exports.employeesQueryProperties = exports.employeesPatchResolver = exports.employeesPatchValidator = exports.employeesPatchSchema = exports.employeesDataResolver = exports.employeesDataValidator = exports.employeesDataSchema = exports.employeesExternalResolver = exports.employeesResolver = exports.employeesValidator = exports.employeesSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
var schema_1 = require("@feathersjs/schema");
var typebox_1 = require("@feathersjs/typebox");
var typebox_2 = require("@feathersjs/typebox");
var validators_1 = require("../../validators");
// Main data model schema
exports.employeesSchema = typebox_1.Type.Object({
    _id: (0, typebox_2.ObjectIdSchema)(),
    text: typebox_1.Type.String()
}, { $id: 'Employees', additionalProperties: false });
exports.employeesValidator = (0, typebox_1.getValidator)(exports.employeesSchema, validators_1.dataValidator);
exports.employeesResolver = (0, schema_1.resolve)({});
exports.employeesExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.employeesDataSchema = typebox_1.Type.Pick(exports.employeesSchema, ['text'], {
    $id: 'EmployeesData'
});
exports.employeesDataValidator = (0, typebox_1.getValidator)(exports.employeesDataSchema, validators_1.dataValidator);
exports.employeesDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.employeesPatchSchema = typebox_1.Type.Partial(exports.employeesSchema, {
    $id: 'EmployeesPatch'
});
exports.employeesPatchValidator = (0, typebox_1.getValidator)(exports.employeesPatchSchema, validators_1.dataValidator);
exports.employeesPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.employeesQueryProperties = typebox_1.Type.Pick(exports.employeesSchema, ['_id', 'text']);
exports.employeesQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.employeesQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.employeesQueryValidator = (0, typebox_1.getValidator)(exports.employeesQuerySchema, validators_1.queryValidator);
exports.employeesQueryResolver = (0, schema_1.resolve)({});
