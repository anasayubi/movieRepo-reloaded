var app = angular.module('app', []);

function movieCollectionCreation(){
    // private

    // Check if movieCollection is present in LocalStorage
    // returns null if no such file exists
    movieCollection = JSON.parse(window.localStorage.getItem('movieCollection'));

    // prestine movieCollection
    function prestineMovieCollection(){
        movieCollection = [
            {
                id: 0,
                name: "Avatar",
                year: 2012,
                rating: 4.8
            },
            {
                id: 1,
                name: "WestWorld",
                year: 2013,
                rating: 3.6
            },
            {
                id: 2,
                name: "Titanic",
                year: 2001,
                rating: 3.9
            }
        ]

        window.localStorage.setItem("movieCollection", JSON.stringify(movieCollection));
    }

    // update movieCollection to prestine
    if(movieCollection == null){
        prestineMovieCollection();
    }

    // console.log(movieCollection)

    function isMovieObjValid(movieObj){

        // collection of possible errors
        function InvalidMovieObjError(){
            this.name = "InvalidMovieObjError";
            this.message = "The movie objected validated is invalid - movie object must be of type object";
        }
        InvalidMovieObjError.prototype = Error.prototype;

        function NoNameInMovieObjError(){
            this.name = "NoNameInMovieObjError";
            this.message = "The movie objected validated is missing a 'name' field - name of the movie";
        }
        NoNameInMovieObjError.prototype = Error.prototype;

        function NoYearInMovieObjError(){
            this.name = "NoYearInMovieObjError";
            this.message = "The movie objected validated is missing a 'year' field - year of release of the movie";
        }
        NoYearInMovieObjError.prototype = Error.prototype;

        function NoRatingInMovieObjError(){
            this.name = "NoRatingInMovieObjError";
            this.message = "The movie objected validated is missing a 'rating' field - rating of the movie";
        }
        NoRatingInMovieObjError.prototype = Error.prototype;

        function InvalidNameInMovieObjError(){
            this.name = "InvalidNameInMovieObjError";
            this.message = "The movie objected validated has an invalid 'name' field - must be a string";
        }
        InvalidNameInMovieObjError.prototype = Error.prototype;

        function InvalidYearInMovieObjError(){
            this.name = "InvalidYearInMovieObjError";
            this.message = "The movie objected validated has an invalid 'year' field - must be an integer in range [1900, 2100]";
        }
        InvalidYearInMovieObjError.prototype = Error.prototype;

        function InvalidRatingInMovieObjError(){
            this.name = "InvalidRatingInMovieObjError";
            this.message = "The movie objected validated has an invalid 'rating' field - must be a real number in range [1, 5]";
        }
        InvalidRatingInMovieObjError.prototype = Error.prototype;

        // Check if movie object is not an object
        if(typeof movieObj !== 'object' || movieObj === null){
            err = new InvalidMovieObjError();
            throw err;
        }
        else if(!movieObj.name){
            err = new NoNameInMovieObjError();
            throw err;
        }
        else if(!movieObj.year){
            err = new NoYearInMovieObjError();
            throw err;
        }
        else if(!movieObj.rating){
            err = new NoRatingInMovieObjError();
            throw err;
        }
        else if(typeof movieObj.name !== 'string'){
            err = new InvalidNameInMovieObjError();
            throw err;
        }
        else if(isNaN(movieObj.year) || (movieObj.year !== parseInt(movieObj.year, 10)) || (movieObj.year < 1900) || (movieObj.year > 2100) ){
            err = new InvalidYearInMovieObjError();
            throw err;
        }
        else if(isNaN(movieObj.rating) || movieObj.rating < 1 || movieObj.rating > 5){
            err = new InvalidRatingInMovieObjError();
            throw err;
        }
        
        return true;
    }

    // isMovieObjValid Tests
    // isMovieObjValid(undefined); // Must throw InvalidMovieObjError
    // isMovieObjValid(3); // Must throw InvalidMovieObjError
    // isMovieObjValid({rating: 3.5, year: 2010}); // Must throw NoNameInMovieObjError
    // isMovieObjValid({rating: 3.5, name: "Goodbye"}); // Must throw NoYearInMovieObjError
    // isMovieObjValid({name: "Goodbye", year: 2011}); // Must throw NoRatingInMovieObjError
    // isMovieObjValid({name: 2, year: 2011, rating: 3}); // Must throw InvalidNameInMovieObjError
    // isMovieObjValid({name: 'Goodbye', year: "nel", rating: 3}); // Must throw InvalidYearInMovieObjError
    // isMovieObjValid({name: 'Goodbye', year: 3.5, rating: 3}); // Must throw InvalidYearInMovieObjError
    // isMovieObjValid({name: 'Goodbye', year: 1890, rating: 3}); // Must throw InvalidYearInMovieObjError
    // isMovieObjValid({name: 'Goodbye', year: 2300, rating: 3}); // Must throw InvalidYearInMovieObjError
    // isMovieObjValid({name: 'Goodbye', year: 1900, rating: 3}); // Must not throw any error
    // isMovieObjValid({name: 'Goodbye', year: 2100, rating: 3}); // Must not throw any error
    // isMovieObjValid({name: 'Goodbye', year: 2100, rating: 'ff'}); // Must throw InvalidRatingInMovieObjError
    // isMovieObjValid({name: 'Goodbye', year: 2100, rating: 0}); // Must throw InvalidRatingInMovieObjError
    // isMovieObjValid({name: 'Goodbye', year: 2100, rating: 6}); // Must throw InvalidRatingInMovieObjError
    // isMovieObjValid({name: 'Goodbye', year: 2100, rating: 1}); // Must not throw any error
    // isMovieObjValid({name: 'Goodbye', year: 2100, rating: 5}); // Must not throw any error

    // console.log(isMovieObjValid({rating: 3.5, name: "Goodbye", year: 2011})); // Must not throw any error

    // public
    return {
        addMovie: function(movieObj){
            isMovieObjValid(movieObj);
            movieObj.id = movieCollection.length;
            movieCollection.push(movieObj);
            window.localStorage.setItem("movieCollection", JSON.stringify(movieCollection));
        },
        removeMovie: function(id){
            // Will hold the index in the array that contains movieId
            index = -1;

            // Error when movie with Index not found
            function MovieNotFoundInCollection(id){
                this.name = "MovieNotFoundInCollection"
                this.message = "movie with the movieId:" + id + " not found in movieCollection";
            }
            MovieNotFoundInCollection.prototype = Error.prototype;

            movieCollection.forEach(function(element, arrayIndex) {
                if(element.id === id){
                    index = arrayIndex;
                }
            });

            if(index === -1){
                error = new MovieNotFoundInCollection(id);
                throw error;
            }

            movieCollection.splice(index, 1);

            window.localStorage.setItem("movieCollection", JSON.stringify(movieCollection));
        },
        updateMovie: function(id, movieObj){
            isMovieObjValid(movieObj);
            this.removeMovie(id);
            movieObj.id = id;
            movieCollection.push(movieObj);
            window.localStorage.setItem("movieCollection", JSON.stringify(movieCollection));
        },
        viewMovies: function(){
            console.log(movieCollection);
        },
        getMovies: function(){
            return movieCollection;
        },
        prestineMovies: function(){
            prestineMovieCollection();
            window.localStorage.setItem("movieCollection", JSON.stringify(movieCollection));
        }
    }
};

app.factory("movieCollection", movieCollectionCreation);

app.controller('MovieCollectionTestingController', function(movieCollection){
    movieCollection.viewMovies();

    movieCollection.updateMovie(0, {
        name: "Avators",
        year: 2012,
        rating: 4.8
    });

    movieCollection.viewMovies();

    // movieCollection.removeMovie(3);

    // movieCollection.viewMovies();

    // movieCollection.addMovie({
    //     name: 'Wisdom of the Lambs',
    //     year: 1988,
    //     rating: 4.9
    // });

    // movieCollection.addMovie({
    //     name: 'Home Sweet Home',
    //     year: 1999,
    //     rating: 2.4
    // });

    // movieCollection.viewMovies();

    // movieCollection.prestineMovies();

    // movieCollection.viewMovies();
});