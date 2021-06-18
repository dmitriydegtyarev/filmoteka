export default function getFullYear(results) {
  const newResults = results.map(result => {
    const {
      id,
      poster_path,
      original_title,
      name,
      genre_ids,
      first_air_date,
      release_date,
      vote_average,
    } = result;
    if (first_air_date) {
      const newDate1 = new Date(first_air_date);
      const fullYear1 = newDate1.getFullYear();
      return { id, poster_path, original_title, name, genre_ids, fullYear1, vote_average };
    } else if (release_date) {
      const newDate2 = new Date(release_date);
      const fullYear2 = newDate2.getFullYear();
      return { id, poster_path, original_title, name, genre_ids, fullYear2, vote_average };
    } else {
      // console.log('У данного фильма нет даты');
      return { id, poster_path, original_title, name, genre_ids, vote_average };
    }
  });
  // console.log('newResults :>> ', newResults);
  return newResults;
}
