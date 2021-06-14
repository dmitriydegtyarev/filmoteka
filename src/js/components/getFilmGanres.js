export default function getFilmGenres(data) {
  const { id, poster_path, original_title, name, first_air_date, release_date, vote_average, vote_count, popularity, overview, genres, homepage } = data;
  const allGenres = genres.map(genre => genre.name).join(', ');
  //console.log('object :>> ', genres.map(genre => genre.name).join());
  //console.log({ id, poster_path, original_title, name, vote_average, vote_count, popularity, overview, allGenres, homepage });
  return ({ id, poster_path, original_title, name, first_air_date, release_date, vote_average, vote_count, popularity, overview, allGenres, homepage });
}