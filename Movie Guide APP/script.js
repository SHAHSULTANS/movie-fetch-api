
const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movie-container");
const inputBox = document.querySelector(".inputBox");

//Function to fetch movie detail using OMDB API

//No hoisting: Arrow functions are not hoisted. This means you must declare the function before you try to call it.
const getMovieInfo = async (movie) => {

    try {
        const myAPIKey = "a8f60800";
        const url = `http://www.omdbapi.com/?apikey=${myAPIKey}&t=${movie}`;

        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Unable to fetch movie data.");
        }

        const data = await response.json();
        //console.log(data);

        ShowMoiveData(data);
    }
    catch(error){
        showErrorMessage("No Movie found!!");

    }
    
}
/*127.0.0.1/:1  Unchecked runtime.lastError: The message port closed before a response was received.
script.js:16 {Title: 'Pathan', Year: '1962', Rated: 'N/A', Released: '22 Mar 1962', Runtime: 'N/A', …}Actors: "Premnath Malhotra, Mumtaz Askari, Bhagwan Palav"Awards: "N/A"BoxOffice: "N/A"Country: "India"DVD: "N/A"Director: "Attaullah Khan"Genre: "Drama, Family"Language: "Hindi"Metascore: "N/A"Plot: "N/A"Poster: "https://m.media-amazon.com/images/M/MV5BNWIxMzYxM2UtZWMyZC00MmFkLWIzYjEtYTE1MDM2YjkxZWI5XkEyXkFqcGdeQXVyMTA4Njk3Mjcw._V1_SX300.jpg"Production: "N/A"Rated: "N/A"Ratings: [{…}]Released: "22 Mar 1962"Response: "True"Runtime: "N/A"Title: "Pathan"Type: "movie"Website: "N/A"Writer: "N/A"Year: "1962"imdbID: "tt0176010"imdbRating: "4.0"imdbVotes: "1,492"[[Prototype]]: Object
*/
// Function to show movie Data

const ShowMoiveData = (data) => {
    movieContainer.innerHTML = '';
    movieContainer.classList.remove("invalidInput");

    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-info");
    movieElement.innerHTML = `<h2>${Title}</h2>
                            <p><strong>Rating: &#10029;</strong>${imdbRating}</p>`;





    const movieGenreElement = document.createElement("div");
    movieGenreElement.classList.add("movie-genre");
    Genre.split(",").forEach((element) => {
        const para = document.createElement("P");
        para.innerHTML = element;
        movieGenreElement.appendChild(para);

    });
    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
                            <p><strong>Duration: </strong>${Runtime}</p>
                            <p><strong>Actors: </strong>${Actors}</p>
                            <p><strong>Plot: </strong>${Plot}</p>`;




    //creating div for movie poster.

    const moviePosterElement = document.createElement("div");
    moviePosterElement.classList.add("movie-poster");
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`;

    movieContainer.appendChild(moviePosterElement);





    movieContainer.appendChild(movieElement);






}

//Show error Message

const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`;
movieContainer.classList.add("invalidInput");

    
}
movieContainer.classList.add("invalidInput");


// Adding event listener to search form.
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //console.log(inputBox.value);
    const movieName = inputBox.value.trim();
    if (movieName != '') {
        getMovieInfo(movieName);
    }
    else {
        showErrorMessage("Enter Movie name!!");

    }
});
