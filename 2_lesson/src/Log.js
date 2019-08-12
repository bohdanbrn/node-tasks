"use strict";
exports.__esModule = true;
var Log = /** @class */ (function () {
    function Log(title, description) {
        this.title = title;
        this.description = description;
    }
    Log.prototype.getTitle = function () {
        return this.title;
    };
    Log.prototype.getDescription = function () {
        return this.description;
    };
    return Log;
}());
exports.Log = Log;
