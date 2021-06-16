export default async function changeHomePage(result) {
  const baseYourtubeLinks = 'https://www.youtube.com/embed/';

  let homepage = null;

  if (result[0] === undefined) {
    console.log('Нет трейлера');
    return homepage;
  } else {
    console.log('Есть ключ для трейлера');
    const yourtubeId = result[0].key;
    console.log(yourtubeId);
    homepage = `${baseYourtubeLinks}${yourtubeId}`;
  }
  return homepage;
}
