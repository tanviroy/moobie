// Enables Search 
$(document).ready(() => {
    $("#searchForm").on("submit", (e) => {
        let searchText = $("#searchText").val();
        getMovies(searchText);
        e.preventDefault();
    });
});

// NOTE: Since this is a first project I'm not going to use envt vars here but henceforth I should
// Retrieves movies depending on Search query
function getMovies(searchText) {
    axios.get("http://www.omdbapi.com/?apikey=91f483c0&s="+searchText)
    .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = "";
        $.each(movies, (index, movie) => {
            output += `
            <div class="col-md-3">
                <div class="well text-center">
                <img src="${movie.Poster}">
                <h5>${movie.Title}</h5>
                <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                </div>
            </div>
            `;
        });
        $("#movies").html(output);
    })
    .catch((error) => {
        console.log(error); // NOTE: Can be improved by custom error page
    });
}

// Need to store the ID of the movie selected so can display deets 
function movieSelected(id){
    sessionStorage.setItem("movieID", id);
    window.location = "movie.html";
    return false;
}

// Retrieves info on the movie selected 
function getMovie(){
    let movieID = sessionStorage.getItem("movieID");

    axios.get("http://www.omdbapi.com/?apikey=91f483c0&i=" + movieID)
        .then((response) => {
            console.log(response);
            let movie = response.data;
            let output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class = "col-md-8">
                    <h2>${movie.Title}</h2> 
                    <ul class="list-group">
                        <li class = "list-group-item"> <strong> Genre: </strong> ${movie.Genre}</li>
                        <li class = "list-group-item"> <strong> Release Date: </strong> ${movie.Released}</li>
                        <li class = "list-group-item"> <strong> Runtime: </strong> ${movie.Runtime}</li>
                        <li class = "list-group-item"> <strong> Language: </strong> ${movie.Language}</li>
                        <li class = "list-group-item"> <strong> Directors: </strong> ${movie.Director}</li>
                        <li class = "list-group-item"> <strong> Writers: </strong> ${movie.Writer}</li>
                        <li class = "list-group-item"> <strong> Actors: </strong> ${movie.Actors}</li>
                    </ul>
                </div>
            </div>

            <div class="container">
            <div class="row">
                <div class ="well">
                    <h3>Plot: </h3>
                    ${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID}" target=_blank" class="btn btn-primary">View IMDB</a>
                    <a href="index.html" class="btn btn-secondary">Back To Search</a>
                </div>
            </div>
            </div>
            `;
            $("#movie").html(output);
        })
        .catch((error) => {
            console.log(error);
        });

}
// i like smol gurl and i cannot lie 