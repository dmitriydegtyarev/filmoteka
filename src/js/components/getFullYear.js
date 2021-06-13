export default function getFullYearFilm(date) {
  const newDate = new Date(date);
  const fullYear = newDate.getFullYear();
  console.log('fullYear :>> ', fullYear);
  return fullYear;
}