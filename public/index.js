var app = angular.module('app', []);

// app.controller('ViewController', function($scope, movieCollection){
//     $scope.movieCollection = movieCollection;

//     $scope.deleteMovie = function(movieId){
//         // Will hold the index in the array that contains movieId
//         index = -1;

//         // Error when movie with Index not found
//         function MovieNotFoundInCollection(id){
//             this.name = "MovieNotFoundInCollection"
//             this.message = "movie with the movieId:" + id + " not found in movieCollection";
//         }
//         MovieNotFoundInCollection.prototype = Error.prototype;

//         try{
//             movieCollection.forEach(function(element, arrayIndex) {
//                 if(element.id === movieId){
//                     index = arrayIndex;
//                 }
//             });

//             if(index === -1){
//                 error = new MovieNotFoundInCollection(movieId);
//                 throw error;
//             }
            

//             // Select the movie to be deleted by index
//             movie = movieCollection[index];

//             // Returns true if user pressed "Ok"
//             // Returns false if user pressed "Cancel"
//             userResp = window.confirm("Remove the following movie?\n\nName: " + 
//             movie.name + "\nYear: " + movie.year + "\nRating: " + 
//             movie.rating);

//             if(userResp){
//                 movieCollection.splice(index, 1)
//             }
//         }
//         catch(err){
//             window.alert(err.name + "error thrown: " + err.message)
//         }

//         // console.log(userResp)
//         // console.log(index)
//     };

//     $scope.createMovie = function(){

//     }
// });