
define(function(require, exports, module) {

var PluginBase = require("plugins/c9.ide.language.jsonalyzer/worker/jsonalyzer_base_handler");
var fs = require('fs');

var handler = module.exports = Object.create(PluginBase);

handler.extensions = ["py"];

handler.languages = ["py"];

handler.maxCallInterval = handler.CALL_INTERVAL_BASIC;

handler.init = function(options, callback) {
    log("Handler Init");
    callback();
};

handler.analyzeCurrent = function(path, doc, ast, options, callback) {
    log("Analyzing shit");
    var errors = [{
        pos: { sl: 0, sc: 0 },
        message: "This is a message from a jsonalyzer handler",
        level: "info"
    }]
    callback(null, null, errors);
};

var DEBUG = true;
if (DEBUG) {
var logger = new (require('console').Console)(
    fs.createWriteStream('/home/ubuntu/.c9/plugins/mikeyhew.pylint/log')
);
logger.log('--------');
}

function log(message) {
    if (DEBUG) {
        logger.log(message);
    }
}

});