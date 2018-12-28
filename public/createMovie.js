app = angular.module('app');

app.controller("CreateMovieController", function($scope, $location, $window, movieCollection){
    $scope.createMovie = function(){
        console.log($scope.name);
        console.log($scope.year);
        console.log($scope.rating);

        if($scope.name && $scope.year && $scope.rating){
            movieCollection.push({
                name: $scope.name,
                year: $scope.year,
                rating: $scope.rating
            });

            // $location.path('/');
            $window.location.href = '/index.html';
        }
        else{
            window.alert("Please fill out all the fields!")
        }
    };
});