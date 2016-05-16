

describe("Testing AngularJS Test Suit", function() {
    
    // include angular module for our test
	beforeEach( 
		module("testingAngularApp") 
	);

	describe("Testing AngularJS Controller", function() {
		var scope, ctrl, httpBackend; 

		beforeEach(
			inject( function( $controller, $rootScope , $httpBackend) { // used to inject angular components
				scope = $rootScope.$new(); // create a new scope
				ctrl = $controller('testingAngularCtrl', {$scope:scope});
				httpBackend = $httpBackend;
			})
		);
		
		afterEach( function() {
			httpBackend.verifyNoOutstandingExpectation();
			httpBackend.verifyNoOutstandingRequest(); // account for all possible backend calls
		});

		it('should initilize the title in the scope', function() { // used to define a test spec
		
			expect(scope.title).toBeDefined();
			expect(scope.title).toBe("Testing Angular Applications"); 
		}); 

		it('should add 2 destination to the destination list',function() {
			expect( scope.destinations ).toBeDefined();
			expect( scope.destinations.length ).toBe( 0 );

			scope.newDestination = {
				city: "London",
				country: "England"
			};

			scope.addDestination();

			expect( scope.destinations.length).toBe(1);
			expect( scope.destinations[0].city).toBe("London");
			expect( scope.destinations[0].country).toBe("England");

			scope.newDestination.city = "Frankfurt";
			scope.newDestination.country = "Germany";

			scope.addDestination();

			expect( scope.destinations.length).toBe(2);
			expect( scope.destinations[1].city).toBe("Frankfurt");
			expect( scope.destinations[1].country).toBe("Germany"); 
 
			expect( scope.destinations[0].city).toBe("London");
			expect( scope.destinations[0].country).toBe("England");

		});

		it("should remove a destination form the destinations list", function() {
			scope.destinations = [
			{
				city: "Paris",
				country: "France"
			},
			{
				city: "Warsaw",
				country: "Poland"
			}
			];

			expect(scope.destinations.length).toBe(2);

			scope.removeDestination(0); 
			expect(scope.destinations.length).toBe(1);
			expect(scope.destinations[0].city).toBe("Warsaw");
			expect(scope.destinations[0].country).toBe("Poland");

		});

		it('should update the weather for a specific destinations',function() {
			scope.destination = {
				city: "Melbourne",
				country: "Australia"
			};

			httpBackend.expectGET("http://api.openweathermap.org/data/2.5/weather?q=" + scope.destination.city + "&appid=" + scope.apiKey)
			.respond({
				weather: [{ main: 'Rain', detial: 'Light Rain'}],
				main: {temp : 288}
			});

			scope.getWeather( scope.destination );
			httpBackend.flush(); // tells angular to respond to all pending requests

			expect(scope.destination.weather.main).toBe("Rain");
			expect(scope.destination.weather.temp).toBe(15);
		});

	});

	

});

