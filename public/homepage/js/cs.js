
class getStreamers {
  constructor(name, vidid) {
    this.name = name;
    this.vidid = vidid;
  }
  getData() {
    fetch(`fetches/${this.name}.json`)
    .then((res) => res.json())
    .then(data => {
      if (!data.pageInfo.totalResults == 0) {
        const vidurl = data.items[0].id.videoId;
        this.vidid = vidurl;
        updater(`${this.name}`);
        addVideo(this.name, vidurl);
        getStats(`${this.name}stats.json`)
      } else {
        remover(`${this.name}`)
      }
    })
  }
}

let ice = new getStreamers('ice', '');
let tsa = new getStreamers('tsa', '');
let destiny = new getStreamers('destiny', '');
let hyphonix = new getStreamers('hyphonix', '');
let bjorn = new getStreamers('bjorn', '');

init();
setInterval(init, 60000)
function init() {
ice.getData();
tsa.getData();
hyphonix.getData();
destiny.getData();
bjorn.getData();
}

function getStats(name) {
  fetch (`../fetches/${name}`)
  .then((res) => res.json())
  .then((data) => {
    const vidnumber = data.items[0].liveStreamingDetails.concurrentViewers;
    const match = name.split('stats');
    const viddiv = document.querySelector(`.${match[0]} .number`)
    viddiv.innerHTML = `<span>${vidnumber} viewers</span>`;
  })
}

const pics = document.querySelectorAll('.pic');

function updater(astring) {
const dataset = document.querySelectorAll('.card');
dataset.forEach(item => {
  if (item.classList.value.includes(astring)) {
  item.children[1].classList.add('active');
}
})
}

function remover(stringer) {
  const dataset = document.querySelectorAll('.card');
  dataset.forEach(item => {
    if (item.classList.value.includes(stringer)) {
    item.children[1].classList.remove('active');
    item.querySelector('.pic').removeEventListener('click', addVideo);
  }
  })
}


const links = document.querySelectorAll('.pic');
const video = document.querySelector('.stream');
const chat = document.querySelector('.chat');
function addVideo(theName, vidNumb) {
  const namediv = document.querySelector(`.${theName} card`);
  namediv.addEventListener('click', () => {
    video.src = `https://www.youtube.com/embed/${vidNumb}`;
    chat.src = `https://www.youtube.com/live_chat?v=${vidNumb}&embed_domain=localhost`;
  })
}

