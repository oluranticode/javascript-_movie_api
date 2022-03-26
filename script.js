    $(document).ready(()=>{
        $('#searchForm').on('submit', (e)=>{
            // console.log($('#searchText').val());
            let searchText = $('#searchText').val();
            getMovies(searchText);
            e.preventDefault();
        });
    });

    function getMovies(searchText){
        // console.log(searchText);
        // axios.get('http://www.omdbapi.com?s='+searchText)
        // axios.get(`http://www.omdbapi.com/?s=${searchText}&apikey=${APIKeyHere}`)
        axios.get('http://www.omdbapi.com/?s='+searchText + '&apikey=9be27fce')
        .then((response) => {
            console.log(response);
            let output = '';
            if(response.data.Response == "False"){
                output = `<h2 class="text-center" style="color: sred">${response.data.Error}<h2>`
            } else {
                if(response.data.Response == "True"){
                    document.querySelector(".title-movie").innerText = "You Search For:"
                    let movies = response.data.Search;
                    $.each(movies, (index, movie) => {
                        output += `
                        <div class="col-md-3"> 
                            <div class="well text-center">
                            <img src="${movie.Poster}" >
                            <h5> ${movie.Title} </h5>
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                            </div>
                        </div>
                        `;
                    })
                    $('#movies').html(output);        
                }
            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        })
        .catch((err) => {
            console.log(err);
        });
    }
//...perfect end... 
    function movieSelected(id){
        sessionStorage.setItem('movieId', id);
        window.location = 'movie.html';
        return false;
    }

    function getMovie(){
        let movieId = sessionStorage.getItem('movieId');

        axios.get('http://www.omdbapi.com/?i='+movieId + '&apikey=9be27fce')
        .then((response) => {
            console.log(response);
            let movie = response.data;

            output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>     
                <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group"> 

                    <li class="list-group-item"><strong>Genre:</strong>${movie.Genre}</li>
                    <li class="list-group-item"><strong>Genre:</strong>${movie.Country}</li>
                    <li class="list-group-item"><strong>Genre:</strong>${movie.Language}</li>
                    <li class="list-group-item"><strong>Genre:</strong>${movie.Writer}</li>
                    <li class="list-group-item"><strong>Genre:</strong>${movie.Plot}</li>
                  
                </ul>
                </div>
            </div>

            <div class="row"> 
                <hr>
                <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-warning">View IMDB</a>
                <a href="index.html" class="btn btn-defalut">Go Back to Search</a>
            </div>

            `;
            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
        
    }