app.controller('ViewController', function($scope, movieCollection){
    $scope.movieCollection = movieCollection;

    console.log(movieCollection.getMovies());
});