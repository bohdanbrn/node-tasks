"use strict";
exports.__esModule = true;
var App = /** @class */ (function () {
    function App() {
        this.tasks = [];
    }
    App.prototype.addTask = function (task) {
        this.tasks.push(task);
    };
    App.prototype.getTasks = function () {
        return this.tasks;
    };
    App.prototype.getWorkers = function () {
        var tasks = this.getTasks();
        var workers = [];
        for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
            var task = tasks_1[_i];
            var _loop_1 = function (worker) {
                // get only unique workers
                if (!workers.some(function (w) { return w.name === worker.name; })) {
                    workers.push(worker);
                }
            };
            for (var _a = 0, _b = task.workers; _a < _b.length; _a++) {
                var worker = _b[_a];
                _loop_1(worker);
            }
        }
        return workers;
    };
    App.prototype.completedTask = function () {
        return this.tasks.filter(function (task) {
            return task.completed === true;
        });
    };
    return App;
}());
exports.App = App;
