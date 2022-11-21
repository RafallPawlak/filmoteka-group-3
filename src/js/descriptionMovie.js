
const descriptionMovie = document.querySelector('.modal');

let markupMovie =`
  <div class="movie__description" data-movie-id="id">

  <div class="movie__poster-wrappaer">
    <img src="" alt="title" class="movie__poster" />
  </div>
  
  <div class="movie__container">
    <h3 class="movie__title">title</h3>
    <div class="description__container">
      <div class="description__title-wrapper">
        <p class="description__title">Vote / Votes</p>
        <p class="description__title">Popularity</p>
        <p class="description__title">Original Title</p>
        <p class="description__title">Genre</p>
      </div>

      <div class="description__text-wrapper">
        <p class="description__text">
          <span class="vote vote--accent"></span>&#47;
          <span class="vote">count</span
          >
        </p>
        <p class="description__text description__popularity">popular</p>
        <p class="description__text">original_title</p>
        <p class="description__text">genre</p>
      </div>
    </div>
    <h4 class="about__title">About</h4>
    <p class="about__text">aboutText</p>
    <div class="btn__container">
      <button type="button" class="modal__btn" data-add-watched>Add to watched</button>
      <button type="button" class="modal__btn" data-add-queue>Add to queue</button>
    </div>
  </div>
  <button type="button" data-movie-close >Close</button>
</div>
  `;

descriptionMovie.innerHTML = markupMovie;