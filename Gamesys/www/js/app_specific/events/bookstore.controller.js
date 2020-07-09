(function () {
    'use strict';

    angular
        .module('bookstore')
        .controller('bookstoreCtrl', control);

    control.$inject = [
        ];
    
    function control(
        
    ) {
        var vm = angular.extend(this, {
            bookList : [],
            basket : [],
            total : 0
         });
        
         class Book {
            constructor(title, price, year) {
                this.title = title;
                this.price = price;
                this.year = year;
            }
        }
        class Discount{
            constructor(discountAmountPercent) {
                this.discountAmountPercent = discountAmountPercent;
            }
            applyDiscount(price){
                return (price -(price/this.discountAmountPercent));
            }
        }
        class BookDiscount{
            constructor(discountAmountPercent,discountTerm) {
                this.discountAmountPercent = discountAmountPercent;
                this.discountTerm = discountTerm;
                this.discountType = "book";
            }
            applyDiscount(book){
                if(this.discountTerm(book)){
                    return (book.price - (book.price*this.discountAmountPercent));
                }
                return book.price;
            }
        }
        class TotalPriceDiscount{
            constructor(discountAmountPercent,discountTerm) {
                this.discountAmountPercent = discountAmountPercent;
                this.discountTerm = discountTerm;
                this.discountType = "total";
            }
            applyDiscount(totalPrice){
                if(this.discountTerm(totalPrice)){
                    return (totalPrice - (totalPrice*this.discountAmountPercent));
                }
                return totalPrice;
            }
        }
        function discountYearTerm(book){
            if(book.year >=2000){
                return true;
            }
            return false;
        }
        function discountTotal(price){
            if(price >= 3000){
                return true;
            }
            return false;
        }
        
        var discounts = [];
        function Main(){
            discounts.push(new BookDiscount(0.10, discountYearTerm));
            discounts.push(new TotalPriceDiscount(0.05, discountTotal));
            vm.bookList.push(new Book("Moby Dick", 1520, 1851));
            vm.bookList.push(new Book("The Terrible Privacy of Maxwell Sim", 1314, 2010));
            vm.bookList.push(new Book("Still Life With Woodpecker", 1105, 1980));
            vm.bookList.push(new Book("Sleeping Murder", 1024, 1976));
            vm.bookList.push(new Book("Three Men in a Boat", 1287, 1889));
            vm.bookList.push(new Book("The Time Machine", 1043, 1895));
            vm.bookList.push(new Book("The Caves of Steel", 812, 1954));
            vm.bookList.push(new Book("Idle Thoughts of an Idle Fellow", 732, 1886));
            vm.bookList.push(new Book("A Christmas Carol", 423, 1843));
            vm.bookList.push(new Book("A Tale of Two Cities", 632, 1859));
            vm.bookList.push(new Book("Great Expectations", 1321, 1861));
        }
        vm.addToBasket = function(book){
            vm.basket.push(book);
            for(var i = vm.bookList.length - 1; i >= 0; i--) {
                if(vm.bookList[i] === book) {
                    vm.bookList.splice(i, 1);
                }
            }
            vm.total =priceOfBasket();
        }
        vm.removeFromBasket = function(book){
            for(var i = vm.basket.length - 1; i >= 0; i--) {
                if(vm.basket[i] === book) {
                    vm.basket.splice(i, 1);
                }
            }
            vm.bookList.push(book);
            vm.total =priceOfBasket();
        }
        function priceOfBasket(){
            var tempPrice = 0;
            for(var j = 0; j <= vm.basket.length - 1; j++){
                tempPrice += vm.basket[j].price;
            }
            for(var i = 0; i <= discounts.length - 1; i++) {
                if(discounts[i].discountType == "book"){
                    tempPrice = 0;
                    for(var j = 0; j <= vm.basket.length - 1; j++) {
                        tempPrice += discounts[i].applyDiscount(vm.basket[j]);
                    }
                }
            }
            for(var i = 0; i <= discounts.length - 1; i++) {
                if (discounts[i].discountType == "total"){
                    tempPrice = discounts[i].applyDiscount(tempPrice);
                }
            }
            tempPrice = Math.floor(tempPrice);
            tempPrice = "Total:£"+tempPrice/100;
            return tempPrice;
        }
        
        Main();
        
              
    }
})();
