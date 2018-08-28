
class getStreamers {
  constructor(name, vidid, checker) {
    this.name = name;
    this.vidid = vidid;
    this.checker = checker;
  }
  getData() {
    fetch(`fetches/${this.name}.json`)
    .then((res) => res.json())
    .then(data => {
      if (!this.checker && !data.pageInfo.totalResults == 0) {
        this.checker = true;
        const vidurl = data.items[0].id.videoId;
        this.vidid = vidurl;
        updater(`${this.name}`);
        addVideo(this.name, vidurl);
        getStats(`${this.name}stats.json`)
        organizeCards();
        return this.vidid;
      } else if (this.checker && data.pageInfo.totalResults == 0){
        this.checker = false;
        remover(`${this.name}`)
      }  else if (this.checker && !data.pageInfo.totalResults == 0) {
        getStats(`${this.name}stats.json`);
      }
    })
  }
}

let ice = new getStreamers('ice', '', checker = false);
let tsa = new getStreamers('tsa', '', checker = false);
let destiny = new getStreamers('destiny', '', checker = false);
let hyphonix = new getStreamers('hyphonix', '', checker = false);
let mix = new getStreamers('mix', '', checker = false);

init();
setInterval(init, 120000)




function init() {
mix.getData();
ice.getData();
tsa.getData();
hyphonix.getData();
destiny.getData();
}

function getStats(name) {
  console.log(name);
  fetch (`../fetches/${name}`)
  .then((res) => res.json())
  .then((data) => {
    const vidnumber = data.items[0].liveStreamingDetails.concurrentViewers;
    const match = name.split('stats');
    const viddiv = document.querySelector(`.${match[0]} .number`)
    if (vidnumber == undefined) {
      vidnumber = 'Offline'
    } else {
    viddiv.innerHTML = `<span>${vidnumber} viewers</span>`;
  }
  })
}

const pics = document.querySelectorAll('.pic');

function updater(astring) {
const dataset = document.querySelectorAll('.card');
dataset.forEach(item => {
  if (item.classList.value.includes(astring)) {
  item.classList.add('live');
  item.children[1].classList.add('active');
}
})
}

function remover(stringer) {
  const dataset = document.querySelectorAll('.card');
  dataset.forEach(item => {
    if (item.classList.value.includes(stringer)) {
    item.children[1].classList.remove('active');
    item.classList.remove('live');
    item.querySelector('.pic').removeEventListener('click', addVideo);
  }
  })
}


const links = document.querySelectorAll('.pic');
const video = document.querySelector('.stream');
const chat = document.querySelector('.chat');
function addVideo(theName, vidNumb) {
  const namediv = document.querySelector(`.${theName} img`);
  namediv.addEventListener('click', () => {
    video.src = `https://www.youtube.com/embed/${vidNumb}`;
    chat.src = `https://www.youtube.com/live_chat?v=${vidNumb}&embed_domain=localhost`;
  })
}

function organizeCards() {
  const moon1 = [...document.querySelectorAll('[data-who]')];
  const thediv = document.querySelector('.orgme');
  const newray = moon1.sort((a, b) => a.classList.length < b.classList.length ? 1 : -1);
  thediv.innerHTML = '';
  thediv.append(...newray);
}
