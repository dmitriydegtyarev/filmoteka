export default async function changeHomePage(result) {
  const baseYourtubeLinks = 'https://www.youtube.com/embed/';

  if (result[0] === undefined) {
    console.log('Нет трейлера');
    return null;
  }
  console.log('Есть ключ для трейлера');
  const yourtubeId = result[0].key;
  console.log(yourtubeId);
  return `${baseYourtubeLinks}${yourtubeId}`;
}
