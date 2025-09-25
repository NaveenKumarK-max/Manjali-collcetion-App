cordova.define("cashfree_pg_sdk_cordova.PgCordovaWrapper", function(require, exports, module) {
var exec = require('cordova/exec');

exports.coolMethod = function (arg0, success, error) {
    exec(success, error, 'PgCordovaWrapper', 'coolMethod', [arg0]);
};

});
