const addModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = addModal.querySelector('.btn--passive');
const addMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModel = document.getElementById('delete-modal');

const movies = [];

const updateUi = () => {
    if(movies.length === 0){
        entryTextSection.style.display = 'block';
    }
    else{
        entryTextSection.style.display = 'none';
    }
};

const deleteMovie = (id) => {
    let movieIndex = 0;
    for(const movie of movies){
        if(movie.id == id){
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.removeChild(listRoot.children[movieIndex]);
    closeMovieDeletionModal();
    updateUi();
};

const deleteMovieHandler = (id) => {
    deleteMovieModel.classList.add('visible');
    toggleBackdrop();
    // deleteMovie(id);

    const no = deleteMovieModel.querySelector('.btn--passive');
    let yes = deleteMovieModel.querySelector('.btn--danger');

    yes.replaceWith(yes.cloneNode(true));
    yes = deleteMovieModel.querySelector('.btn--danger');
    no.removeEventListener('click', closeMovieDeletionModal);
    no.addEventListener('click', closeMovieDeletionModal);
    yes.addEventListener('click', deleteMovie.bind(null, id));
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModel.classList.remove('visible');
};


const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class = 'movie-element__image'>
            <img  src="${imageUrl}" alt = "${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
    `;
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
    const listRoot = document.getElementById('movie-list');
    listRoot.appendChild(newMovieElement);
};

const toggleMovieModal = () => {
    addModal.classList.toggle('visible');
    toggleBackdrop();
};

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const closeMovieModal = () => {
    addModal.classList.remove('visible');
};

const showMovieModel = () => {
    addModal.classList.add('visible');
};

const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
};

const cancelAddMovie = () => {
    clearInputs();
    closeMovieModal();
};

const addMovieHandler = () => {
    const title = userInputs[0].value;
    const imageUrl = userInputs[1].value;
    const rating = userInputs[2].value;

    if(title.trim() === '' || imageUrl.trim() === '' || rating.trim() === '' || (+rating < 1 || +rating > 5)){
        alert('Please enter correct values');
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title : title,
        image : imageUrl,
        rating : rating
    };

    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    clearInputs();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUi();
};



const clearInputs = () => {

    for(const input of userInputs){
        input.value = '';
    }
};

startAddMovieButton.addEventListener('click', showMovieModel);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', cancelAddMovie);
addMovieBtn.addEventListener('click', addMovieHandler);
