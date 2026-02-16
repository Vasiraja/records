"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.EmployeesService = void 0;
var mongodb_1 = require("@feathersjs/mongodb");
// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
var EmployeesService = /** @class */ (function (_super) {
    __extends(EmployeesService, _super);
    function EmployeesService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EmployeesService;
}(mongodb_1.MongoDBService));
exports.EmployeesService = EmployeesService;
var getOptions = function (app) {
    return {
        paginate: app.get('paginate'),
        Model: app.get('mongodbClient').then(function (db) { return db.collection('emp'); })
    };
};
exports.getOptions = getOptions;
