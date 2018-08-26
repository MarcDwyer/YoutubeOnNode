let icecheck = false;
let destcheck = false;
let hypcheck = false;
let tsacheck = false;

let icejson;
let tsajson;
let destinyjson;
let hyphonixjson;


function fetcher() {
  console.log('working...')
  // ice
  const fetch1 = fetch ('fetches/ice.json')
  .then((res) => res.json())
  .then((data) => {
    icejson = data;
    if (!data.pageInfo.totalResults == 0) {
      icecheck = true;
      updater('ice');
      getStats('icestats.json');
      } else {
        icecheck = false;
        remover('ice');
      }

  });
  //hyphonix
  const fetch2 = fetch ('fetches/hyphonix.json')
  .then((res) => res.json())
  .then((data) => {
    hyphonixjson = data;
    if (!data.pageInfo.totalResults == 0) {
      hypcheck = true;
      updater('hyphonix');
      getStats('hyphonixstats.json');
      } else {
        hypcheck = false;
        remover('ice');
      }
  });
  // tsa
  const fetch3 = fetch ('fetches/tsa.json')
  .then((res) => res.json())
  .then(data => {
    tsajson = data;
    if (!data.pageInfo.totalResults == 0) {
      tsacheck = true;
      updater('tsa');
      getStats('tsastats.json');
      } else {
        tsacheck = false;
        remover('ice');
      }
  });
  //destiny
  const fetch4 = fetch ('fetches/destiny.json')
  .then((res) => res.json())
  .then(data => {
    destinyjson = data;
    if (!data.pageInfo.totalResults == 0) {
      destcheck = true;
      updater('destiny', destcheck);
      getStats('destinystats.json');
      } else {
        destcheck = false;
        remover('ice');
      }
  });
  return Promise.all([fetch1, fetch2, fetch3, fetch4]);
}
fetcher();
setInterval(fetcher, 120000);


function getStats(name) {
  fetch (`../fetches/${name}`)
  .then((res) => res.json())
  .then((data) => {
    const vidnumber = data.items[0].liveStreamingDetails.concurrentViewers;
    const match = name.split('stats');
    const viddiv = document.querySelector(`.${match[0]} .number`)
    viddiv.textContent = `${vidnumber} viewers`;
  })
}

const pics = document.querySelectorAll('.pic');

function updater(astring) {
console.log('updater working...')
const dataset = document.querySelectorAll('.card');
dataset.forEach(item => {
  if (item.classList.value.includes(astring)) {
  item.children[1].classList.add('active');
  item.querySelector('.pic').addEventListener('click', addVideo);
}
})
}

function remover(astring) {
  const dataset = document.querySelectorAll('.card');
  dataset.forEach(item => {
    if (item.classList.value.includes(astring)) {
    item.children[1].classList.remove('active');
    item.querySelector('.pic').removeEventListener('click', addVideo);
  }
  })
}


const links = document.querySelectorAll('.pic');
const video = document.querySelector('.video');
function addVideo() {
  const itemclass = this.classList.value;
if (itemclass.includes('suit')) {
  const tsaurl = tsajson.items[0].id.videoId;
  video.innerHTML = `<iframe class="stream" src="https://www.youtube.com/embed/${tsaurl}"></iframe>`;
}
if (itemclass.includes('bignose')) {
    const iceurl = icejson.items[0].id.videoId;
    video.innerHTML = `<iframe class="stream" src="https://www.youtube.com/embed/${iceurl}"></iframe>`;
  }
  if (itemclass.includes('dwarf')) {
    const desturl = destinyjson.items[0].id.videoId;
    video.innerHTML = `<iframe class="stream" src="https://www.youtube.com/embed/${desturl}"></iframe>`;
  }
  if (itemclass.includes('bald')) {
    const hyphurl = hyphonixjson.items[0].id.videoId;
    video.innerHTML = `<iframe class="stream" src="https://www.youtube.com/embed/${hyphurl}"></iframe>`;
  }
}

