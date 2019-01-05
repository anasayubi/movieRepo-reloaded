app = angular.module('app');

app.controller("CreateMovieController", function($scope, $location, $window, movieCollection){
    $scope.noName = false;
    $scope.noYear = false;
    $scope.noRating = false;
    $scope.invalidName = false;
    $scope.invalidYear = false;
    $scope.invalidRating = false;
    
    $scope.createMovie = function(){

        // Remove all errors before evaluating errors 
        // - done so that the errors from previous verification does not impact the next verification
        $scope.noName = false;
        $scope.noYear = false;
        $scope.noRating = false;
        $scope.invalidName = false;
        $scope.invalidYear = false;
        $scope.invalidRating = false;

        console.log($scope.name);
        console.log($scope.year);
        console.log($scope.rating);

        try {
            movieCollection.addMovie({
                name: $scope.name,
                year: Number($scope.year),
                rating: Number($scope.rating)
            });

            $window.location.href = '/index.html';
        }
        catch(err) {
            if(err.name === "NoNameInMovieObjError"){
                $scope.noName = true;
            }
            else if(err.name === "NoYearInMovieObjError"){
                $scope.noYear = true;
            }
            else if(err.name === "NoRatingInMovieObjError"){
                $scope.noRating = true;
            }
            else if(err.name === "InvalidNameInMovieObjError"){
                $scope.invalidName = true;
            }
            else if(err.name === "InvalidYearInMovieObjError"){
                $scope.invalidYear = true;
            }
            else if(err.name === "InvalidRatingInMovieObjError"){
                $scope.invalidRating = true;
            }
            else {
                console.log("Error: ");
                console.log(err);
            }
        }
    };
});