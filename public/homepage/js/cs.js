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
    icejson = data;
    if (!data.pageInfo.totalResults == 0) {
      icecheck = true;
      getStats('icestats.json');
      updater();
      }
  });
  //hyphonix
  fetch ('fetches/hyphonix.json')
  .then((res) => res.json())
  .then((data) => {
    hyphonixjson = data;
    if (!data.pageInfo.totalResults == 0) {
      hypcheck = true;
      getStats('hyphonixstats.json');
      updater();
      }
  });
  // tsa
  fetch ('fetches/tsa.json')
  .then((res) => res.json())
  .then((data) => {
    tsajson = data;
    if (!data.pageInfo.totalResults == 0) {
      tsacheck = true;
      getStats('tsastats.json');
      updater();
      }
  });
  //destiny
  fetch ('fetches/destiny.json')
  .then((res) => res.json())
  .then((data) => {
    destinyjson = data;
    if (!data.pageInfo.totalResults == 0) {
      destcheck = true;
      getStats('destinystats.json');
      updater();
      }
  });
}
fetcher();
setInterval(fetcher, 60000);

let athing;
function getStats(name) {
  fetch (`../fetches/${name}`)
  .then((res) => res.json())
  .then((data) => {
    athing = data;
    const vidnumber = data.items[0].liveStreamingDetails.concurrentViewers;
    const match = name.split('stats');
    console.log(match[0]);
    const viddiv = document.querySelector(`.${match[0]} .number`)
    viddiv.textContent = `${vidnumber} viewers`;
  })
}

function updater() {

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

