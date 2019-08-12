"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShoppingCart = /** @class */ (function () {
    function ShoppingCart(name, owner, maxCount) {
        this.name = name;
        this.owner = owner;
        this.maxCount = maxCount;
        this.logs = [];
        this.products = [];
    }
    ShoppingCart.prototype.addNewProduct = function (product) {
        if (this.products.length >= this.maxCount) {
            this.removeCheapestProduct();
        }
        // save date for added to cart product
        product.addedDate = new Date();
        this.products.push(product);
        this.addLog("Product " + product.name + " added to cart");
        return this;
    };
    ShoppingCart.prototype.removeProduct = function (index) {
        var removedProduct = this.products.splice(index, 1)[0];
        this.addLog("Product " + removedProduct.name + " removed from cart");
        return this;
    };
    ShoppingCart.prototype.getAvaragePrice = function () {
        var totalPrice = this.getTotalPrice();
        return totalPrice / this.products.length;
    };
    ShoppingCart.prototype.getProducts = function () {
        return this.products;
    };
    ShoppingCart.prototype.getFormattedListOfProducts = function () {
        var _this = this;
        return this.products.map(function (prod) {
            return prod.name + " - is on " + _this.name + " from " + prod.addedDate + ". " +
                ("Detailed product description: " + prod.description);
        });
    };
    ShoppingCart.prototype.getTotalPrice = function () {
        var prices = this.products.map(function (prod) { return prod.price; });
        return prices.reduce(function (sum, price) { return sum + price; }, 0);
    };
    ShoppingCart.prototype.getHistory = function () {
        return this.logs;
    };
    ShoppingCart.prototype.addLog = function (title) {
        this.logs.push({
            date: new Date(),
            title: title,
        });
    };
    ShoppingCart.prototype.getCheapestProductIndex = function () {
        var products = this.products;
        var cheapestIndex = 0;
        for (var i = 1; i < products.length; i++) {
            if (products[cheapestIndex].price < products[i].price) {
                cheapestIndex = i;
            }
        }
        return cheapestIndex;
    };
    ShoppingCart.prototype.removeCheapestProduct = function () {
        var cheapestIndex = this.getCheapestProductIndex();
        return this.removeProduct(cheapestIndex);
    };
    return ShoppingCart;
}());
exports.ShoppingCart = ShoppingCart;
