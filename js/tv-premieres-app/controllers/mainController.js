app.controller("mainController", function($scope, $http){
 
    $scope.apiKey = "a01402d4cb067ffdbc858532cb310a3e";
    /*
     * From the Trakt.tv API Documentation, to make calls to `calendar/premieres', 
     * the following parameters are needed: 
     
     * API KEY - The api key generated at trakt.tv
     * Start - The date at which to start collecting data
     * Days - The number of days of data to retrieve
    
    */
    $scope.results = [];
    $scope.filterText = null;
    $scope.init = function() {
        //API requires a start date
        var today = new Date();
        //Create the date string and ensure leading zeros if required
        var apiDate = today.getFullYear() + ("0" + (today.getMonth() + 1)).slice(-2) + "" + ("0" + today.getDate()).slice(-2);
        $http.jsonp('http://api.trakt.tv/calendar/premieres.json/' + $scope.apiKey + '/' + apiDate + '/' + 30 + '/?callback=JSON_CALLBACK').success(function(data) {
            console.log(data);
            // As the data comes in, we need to format it for our own use. 
            // For each day, get all the episodes
            // Loop through each data group and store the data in a local `date` variable
            angular.forEach(data, function(value, index){
                // The API stores the full data separate from each episode. Save it for future use.
                var date = value.date;
                // For each episode, push it to our `results` array
                // Loop through each of the TV shows in that date group
                // And add the locally stored date to the tvshow object. 
                // Then add each `tvshow` object to the $scope.results array/
                angular.forEach(value.episodes, function(tvshow, index){
                    // Create a date string from the timestamp so the user can filter using text input
                    // Attach the full date to each episode
                    tvshow.date = date;
                    // Declare a scope variable to hold our processed results
                    $scope.results.push(tvshow);
                });
            });
        }).error(function(error) {
 
        });
    };
 
});