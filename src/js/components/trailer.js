export default async function changeHomePage(result) {
  const baseYourtubeLinks = 'https://www.youtube.com/embed/';
  const trailers = result.trailers;
  let yourtubeId = null;
  for (const t of trailers) {
    if (isValidVideoId(t.key)) {
      yourtubeId = t.key;
      break;
    }
  }
  if (!yourtubeId) {
    console.log('Нет трейлера');
    return;
  }
  console.log('Есть ключ для трейлера');
  console.log(yourtubeId);
  result.homepage = `${baseYourtubeLinks}${yourtubeId}`;
}

async function isValidVideoId(id) {
  //  //*[@id="movie_player"]/div[@class="ytp-error"]
  var img = new Image();
  img.src = `http://img.youtube.com/vi/${id}/mqdefault.jpg`;
  const res = await new Promise(resolve => {
    img.onload = function () {
      resolve(img.width);
    };
  });
  return res > 120;
}
