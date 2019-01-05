app.controller('ViewController', function($scope, $window, movieCollection){
    $scope.movieCollection = movieCollection;

    console.log(movieCollection.getMovies());

    $scope.prestineMovies = function() {
        userResp = $window.confirm("All saved data will be permanently destroyed. Continue?");
        if (userResp) {
            $scope.movieCollection.prestineMovies();
        }
    };
});