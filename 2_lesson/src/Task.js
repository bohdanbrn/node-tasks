"use strict";
exports.__esModule = true;
var Task = /** @class */ (function () {
    function Task(title, estimate, consumedTime, completed) {
        this.title = title;
        this.estimate = estimate;
        this.consumedTime = consumedTime;
        this.completed = completed;
        this.workers = [];
        this.logs = [];
    }
    Task.prototype.setTitle = function (title) {
        this.title = title;
    };
    Task.prototype.setEstimate = function (time) {
        this.estimate = time;
    };
    Task.prototype.setConsumedTime = function (time) {
        this.consumedTime = time;
    };
    Task.prototype.setCompleted = function (status) {
        this.completed = status;
    };
    Task.prototype.addLog = function (log) {
        this.logs.push(log);
    };
    Task.prototype.getLogs = function () {
        return this.logs;
    };
    return Task;
}());
exports.Task = Task;
