/**
 * Created by Stephanie on 5/23/16.
 */



//javascript is the logical side of our JAMN
//this creates our angular app
//empty brackets mean that there are NO dependencies

//function is self contained name space
//only used in OUR code internally for our purposes

//have to make our top level module depend on the other module

(function(){
    angular.module('jamn', ['ngRoute', 'textAngular']);
})();
