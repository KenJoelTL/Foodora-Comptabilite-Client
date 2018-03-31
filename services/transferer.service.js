angular.module("myApp")
.service("transferer", function() {

    var obj = {};

    this.getData = function() {
        return this.data;
    };

    this.setData = function(data) {
        this.data = data;
    };

    this.dump = function(){
        this.data = {};
    };

    this.addAttribute = function(key, value){
        this.data[key] = value;
    };

    this.removeAttribute = function(key){
        delete data[key];
    };

});
