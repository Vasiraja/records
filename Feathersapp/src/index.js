"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var logger_1 = require("./logger");
var port = app_1.app.get('port');
var host = app_1.app.get('host');
process.on('unhandledRejection', function (reason) { return logger_1.logger.error('Unhandled Rejection %O', reason); });
app_1.app.listen(port).then(function () {
    logger_1.logger.info("Feathers app listening on http://".concat(host, ":").concat(port));
});
