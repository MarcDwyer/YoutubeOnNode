
class getStreamers {
  constructor(name, checker, channelId, vidid, json, viewerCount) {
    this.name = name;
    this.checker = checker;
    this.vidid = vidid;
    this.json = json;
    this.viewerCount = viewerCount;
    this.channelId = channelId;
    this.count = 0;
  }
  getData() {
      fetch(`fetches/${this.name}.json`)
      .then((res) => res.json())
      .then(data => {
          this.json = data;
          if (this.count == 0) this.addLinks();
          this.dataThink();
  })
    }
  dataThink() {
      if (!this.checker && !this.json.pageInfo.totalResults == 0) {
        this.checker = true;
        this.vidid = this.json.items[0].id.videoId;
        updater(this.name);
        addVideo(this.name, this.vidid);
        this.getStats();
      } else if (this.checker && this.json.pageInfo.totalResults == 0){
        this.checker = false;
        const viddiv = document.querySelector(`.${this.name} `);
        this.viewerCount = 0;
        viddiv.dataset.viewer = this.viewerCount;
        remover(this.name);
        organizeCards();
      }  else if (this.checker && !this.json.pageInfo.totalResults == 0) {
        this.getStats();
      }
    }
  getStats() {
fetch (`../fetches/${this.name}stats.json`)
       .then((res) => res.json())
       .then((data) => {
         this.viewerCount = data.items[0].liveStreamingDetails.concurrentViewers;
         const viddiv = document.querySelector(`.${this.name} `);
        viddiv.dataset.viewer = this.viewerCount;
         if (this.viewerCount == undefined) {
           this.viewerCount = 'Offline';
         } else {
         viddiv.querySelector('.number').textContent = `${this.viewerCount} viewers`;
       }
     }).then(organizeCards)
  }
  addLinks() {
    const appenddiv = document.querySelector(`.${this.name}`);
    const alink = document.createElement('a');
    const vidurl = `https://www.youtube.com/channel/${this.channelId}`;
    alink.href = vidurl;
    alink.target = "_blank"
    alink.innerHTML = '<i class="fa fa-youtube-play"></i>';
    appenddiv.append(alink);
    this.count++;
  }
}


let ice = new getStreamers('ice', checker = false, 'UCv9Edl_WbtbPeURPtFDo-uA');
let tsa = new getStreamers('tsa', checker = false, 'UCB0H_1M78_jwTyfaJuP241g');
let destiny = new getStreamers('destiny', checker = false, 'UC554eY5jNUfDq3yDOJYirOQ');
let hyphonix = new getStreamers('hyphonix', checker = false, 'UCn0Fbg9fPbtMIh3xUyCDx8g');
let mix = new getStreamers('mix', checker = false, 'UC_jxnWLGJ2eQK4en3UblKEw');
let marie = new getStreamers('marie', checker = false, 'UC16fss-5fnGp2Drqp1iT9pA');
let burger = new getStreamers('burger', checker = false, 'UCJNILr75xb9zKpUI0RV7pmQ');

init();
setInterval(init, 120000);

function init() {
mix.getData();
ice.getData();
tsa.getData();
hyphonix.getData();
destiny.getData();
marie.getData();
burger.getData();
}

const pics = document.querySelectorAll('.pic');

function updater(astring) {
const item = document.querySelector(`.${astring} `);
item.classList.add('live');
item.children[1].classList.add('active');
item.querySelector('.fa').style.color = 'red';

}

function remover(stringer) {
  const item = document.querySelector(`.${stringer} `);
  const removeme = item.querySelector('a').children[0] || item.children[1];
  item.classList.remove('live');
  removeme.classList.remove('active');
  item.querySelector('.fa').style.color = '#eee';
  item.querySelector('.number').textContent = 'Offline';
}


const links = document.querySelectorAll('.pic');
const video = document.querySelector('.stream');
const chat = document.querySelector('.chat');
function addVideo(theName, vidNumb) {
  const namediv = document.querySelector(`.${theName} img`);
  const url = window.location.hostname;
  if (window.innerWidth > 850) {
    namediv.addEventListener('click', () => {
      video.src = `https://www.youtube.com/embed/${vidNumb}`;
      chat.src = `https://www.youtube.com/live_chat?v=${vidNumb}&embed_domain=${url}`;
    })
  } else {
    const href = `https://www.youtube.com/watch?v=${vidNumb}`;
    const target = "_blank";
    const itemdiv = document.querySelector(`.${theName}`);
   $(namediv).wrap(`<a class='linkme' href=${href} target=${target}></a>`);
  }
  }


function organizeCards() {
const getCards = [...document.querySelectorAll('[data-viewer]')];
const thediv = document.querySelector('.orgme');
const newray = getCards.sort((a, b) => {
  return +a.dataset.viewer < +b.dataset.viewer ? 1 : -1;
});
thediv.innerHTML = '';
thediv.append(...newray);
}


const togglechat = document.querySelector('.buttorg .btn-danger');
const btndiv = document.querySelector('.buttorg');
const chatter = document.querySelector('.chatter');

togglechat.addEventListener('click', toggleChat);

function toggleChat() {
  chatter.classList.toggle('closetime');
  btndiv.classList.toggle('keepbuttons');
}
