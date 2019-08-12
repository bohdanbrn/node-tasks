"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product_1 = require("./classes/Product");
var ShoppingCart_1 = require("./classes/ShoppingCart");
var prodOne = new Product_1.Product("Product1", "Descriptiuon1", 100);
var prodTwo = new Product_1.Product("Product2", "Descriptiuon2", 200);
var prodThree = new Product_1.Product("Product3", "Descriptiuon3", 150);
var prodFour = new Product_1.Product("Product4", "Descriptiuon4", 175);
var prodFive = new Product_1.Product("Product5", "Descriptiuon5", 377);
var ShoppingCartOne = new ShoppingCart_1.ShoppingCart("ShoppingCart1", "Bohdan", 3);
var ShoppingCartTwo = new ShoppingCart_1.ShoppingCart("ShoppingCart2", "Bohdan", 5);
// Check Product methods
console.log("Check product +++++++++++++++++++++++++++++++++++++++++++++++++++");
console.log({ prodOnePrice: prodOne.getPrice() });
console.log("\nAfter changing price to lower:");
prodOne.setPrice(60);
console.log({ prodOnePrice: prodOne.getPrice() });
console.log("\nAfter changing price to bigger:");
prodOne.setPrice(110);
console.log({ prodOnePrice: prodOne.getPrice() });
console.log("\nAfter chaining:");
prodOne.setPrice(150).setPrice(250);
console.log({ prodOnePrice: prodOne.getPrice() });
// TODO
// prodOne.add().add();
// prodOne.removeProduct().removeProduct();
console.log("\nHistory:");
console.log({ prodOneHistory: prodOne.getHistory() });
// Check ShoppingCart methods
console.log("\n\nCheck ShoppingCartOne ++++++++++++++++++++++++++++++++++++++++++++++");
console.log("\nAfter adding products:");
ShoppingCartOne.addNewProduct(prodOne).addNewProduct(prodTwo).addNewProduct(prodThree);
console.log({ CartOneProducts: ShoppingCartOne.getProducts() });
console.log("\nAfter remove one product:");
ShoppingCartOne.removeProduct(0);
console.log({ CartOneProducts: ShoppingCartOne.getProducts() });
console.log("\nAvarage price:");
console.log({ CartOneAvaragePrice: ShoppingCartOne.getAvaragePrice() });
console.log("\nHistory:");
console.log({ ShoppingCartOneHistory: ShoppingCartOne.getHistory() });
console.log("\n\nCheck ShoppingCartTwo ++++++++++++++++++++++++++++++++++++++++++++++");
ShoppingCartTwo.addNewProduct(prodOne).addNewProduct(prodTwo)
    .addNewProduct(prodThree).addNewProduct(prodFour).addNewProduct(prodFive);
console.log("\nFormatted list of products:");
console.log({ ShoppingCartTwo: ShoppingCartOne.getFormattedListOfProducts() });
console.log("\nTotal price:");
console.log({ ShoppingCartTwoTotalPrice: ShoppingCartTwo.getTotalPrice() });
console.log("\nHistory:");
console.log({ ShoppingCartTwoHistory: ShoppingCartTwo.getHistory() });
