
 
var testingAngularApp = angular.module('testingAngularApp', [] );

testingAngularApp.controller('testingAngularCtrl', function($rootScope, $scope, $timeout, $http, TempService) {
	$scope.title = "Testing Angular Applications";

	$scope.destinations = [];

	$scope.apiKey = "0622adc99d668234234d39c65e95adf7";

	$scope.newDestination = {
		city: undefined, 
		country: undefined
	};

	$scope.addDestination = function() { 
		$scope.destinations.push(
			{
				city : $scope.newDestination.city,
				country: $scope.newDestination.country
			}
		);
	};

	$scope.removeDestination = function(index){
		$scope.destinations.splice(index,1);
	}

	$scope.getWeather = function( destination ) {
		var url = "http://api.openweathermap.org/data/2.5/weather?q=" + destination.city + "&appid=" + $scope.apiKey;
		console.log( url );
		$http.get( url )
		.then(
			function successCallBack(response) {
				if( response.data.weather ) {
					destination.weather = {};
					destination.weather.main = response.data.weather[0].main;
					destination.weather.temp = $scope.convertKelvinToCelsius(response.data.main.temp);
				} else {
					$scope.message = "City not found";
				}
			}, 
			function errorCallback( error ) {
				$scope.message = "Server Error";
			}
		);
	};

	$scope.convertKelvinToCelsius = function( temp ) {
		return TempService.convertKelvinToCelsius(temp);
	};

	// do something when the message changes
	$scope.messageWatcher = $scope.$watch('message', function() {
		if( $scope.message ){
			$timeout( function(){
				$scope.message = null;
			},3000);
		}
	} ); 
});  

testingAngularApp.filter('warmestDestinations', function() {
	return function( destinations, minimumTemp){
		var wamDestinations = [];

		angular.forEach( destinations, function(destination) {
			if( destination.weather && destination.weather.temp && destination.weather.temp >= minimumTemp) {
				wamDestinations.push( destination );
			}
		});
		return wamDestinations;	
	};
});

testingAngularApp.factory('TempService', function(){
 
	var convertKelvinToCelsius = function( temp ) {
		return Math.round(temp - 273);
	};

	var test = function(something){
		console.log( "my1" + something);
	};

	return {	
		convertKelvinToCelsius : convertKelvinToCelsius,
		test :test
	};   
}); 

testingAngularApp.factory('Calculator', function() {
	this.square = function (a) { return a*a; }; 
	this.say    = function (z) { return("i am saying: " + z); };
	return this;
}); 


