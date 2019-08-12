"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product = /** @class */ (function () {
    function Product(name, description, price) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.logs = [];
    }
    Product.prototype.getPrice = function () {
        return this.price;
    };
    Product.prototype.setPrice = function (price) {
        if (price > this.price) {
            this.price = price;
            this.addLog("Product " + this.name + " price changed to " + this.price);
        }
        return this;
    };
    // TODO
    // public add() {
    // }
    // TODO
    // public removeProduct() {
    // }
    Product.prototype.getHistory = function () {
        return this.logs;
    };
    Product.prototype.addLog = function (title) {
        this.logs.push({
            date: new Date(),
            title: title,
        });
    };
    return Product;
}());
exports.Product = Product;
