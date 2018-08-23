let tsajson;
let icejson;
let hyponixjson;
let destinyjson;

let icecheck = false;
let destcheck = false;
let hypcheck = false;
let tsacheck = false;


function fetcher() {
  console.log('working...')
  // ice
  fetch ('fetches/ice.json')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    icejson = data;
    if (!data.pageInfo.totalResults == 0) {
      icecheck = true;
      updater();
      }
  });
  //hyphonix
  fetch ('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCaFpm67qMk1W1wJkFhGXucA&eventType=live&type=video&key=AIzaSyAxfrRQxi1QW-ilyKqXPXqqI-Woq0Ocm5I')
  .then((res) => res.json())
  .then((data) => {
    hyphonixjson = data;
    if (!data.pageInfo.totalResults == 0) {
      hypcheck = true;
      updater();
      }
  });
  // tsa
  fetch ('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCB0H_1M78_jwTyfaJuP241g&eventType=live&type=video&key=AIzaSyAxfrRQxi1QW-ilyKqXPXqqI-Woq0Ocm5I')
  .then((res) => res.json())
  .then((data) => {
    tsajson = data;
    if (!data.pageInfo.totalResults == 0) {
      tsacheck = true;
      updater();
      }
  });
  //destiny
  fetch ('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC554eY5jNUfDq3yDOJYirOQ&eventType=live&type=video&key=AIzaSyAxfrRQxi1QW-ilyKqXPXqqI-Woq0Ocm5I')
  .then((res) => res.json())
  .then((data) => {
    destinyjson = data;
    if (!data.pageInfo.totalResults == 0) {
      destcheck = true;
      updater();
      }
  });
}
fetcher();
setInterval(fetcher, 10000);

function updater() {
  console.log('helo');

const dataset = document.querySelectorAll('[data-who]');

dataset.forEach(item => {
if (item.dataset.who == 'icecheck' && icecheck == true) {

  item.children[1].classList.add('active');
  item.addEventListener('click', addVideo)
}
if (item.dataset.who == 'destcheck' && destcheck == true) {
  item.children[1].classList.add('active');
  item.addEventListener('click', addVideo)
}
if (item.dataset.who == 'hypcheck' && hypcheck == true) {
  item.children[1].classList.add('active');
  item.addEventListener('click', addVideo)
}
if (item.dataset.who == 'tsacheck' && tsacheck == true) {
  item.children[1].classList.add('active');
  item.addEventListener('click', addVideo)
}
})

}


const links = document.querySelectorAll('.pic');
const video = document.querySelector('.video');
function addVideo() {
  const data = this.dataset.who;

  if (data == 'icecheck') {
    const iceurl = icejson.items[0].id.videoId;
    video.innerHTML = `<iframe class="stream" src="https://www.youtube.com/embed/${iceurl}"></iframe>`;
  }
  if (data == 'destcheck') {
    const desturl = destinyjson.items[0].id.videoId;
    video.innerHTML = `<iframe class="stream" src="https://www.youtube.com/embed/${desturl}"></iframe>`;
  }
  if (data == 'hypcheck') {

    const hyphurl = hyphonixjson.items[0].id.videoId;
    video.innerHTML = `<iframe class="stream" src="https://www.youtube.com/embed/${hyphurl}"></iframe>`;
  }
  if (data == 'tsacheck') {
    const tsaurl = tsajson.items[0].id.videoId;
    video.innerHTML = `<iframe class="stream" src="https://www.youtube.com/embed/${tsaurl}"></iframe>`;
  }
}


setInterval(updater, 300000);
