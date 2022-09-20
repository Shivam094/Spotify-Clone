console.log("Welcome to Spotify")

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {SongName: "Salam-e-Ishq",filepath:"song/1.mp3", coverpath: "covers/1.jpg"},
    {SongName: "Asikq ban aya ap ne Salam-e-Ishq",filepath:"song/2.mp3", coverpath: "covers/2.jpg"},
    {SongName: "teri kasam Salam-e-Ishq",filepath:"song/3.mp3", coverpath: "covers/3.jpg"},
    {SongName: "tu mera hero Salam-e-Ishq",filepath:"song/4.mp3", coverpath: "covers/4.jpg"},
    {SongName: "idha aa Salam-e-Ishq",filepath:"song/5.mp3", coverpath: "covers/5.jpg"},
    {SongName: "i love u Salam-e-Ishq",filepath:"song/6.mp3", coverpath: "covers/6.jpg"},
    {SongName: "kasoor Salam-e-Ishq",filepath:"song/7.mp3", coverpath: "covers/7.jpg"},
]

songItems.forEach((element,i)=>{
     console.log(element,i);
     element.getElementsByTagName("img")[0].src = songs[i].coverpath;
     element.getElementsByClassName("songName")[0].innerText = songs[i].SongName;
})
//Handle play/pause click
masterPlay.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
//Listen to events
audioElement.addEventListener('timeupdate', ()=>{  
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myprogressbar.value = progress;
})

myprogressbar.addEventListener('change', ()=>{
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle'); 
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
         makeAllPlays();
         
         songIndex = parseInt(e.target.id);
         e.target.classList.remove('fa-play-circle');
         e.target.classList.add('fa-pause-circle');
         
         audioElement.src = `song/${songIndex+1}.mp3`;
         masterSongName.innerText = songs[songIndex].SongName;
         audioElement.currentTime = 0;
         audioElement.play();
         gif.style.opacity=1;
         masterPlay.classList.remove('fa-play-circle');
         masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>6)
    {
        songIndex=0;
    }
    else
    {
        songIndex+=1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].SongName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0)
    {
        songIndex=0;
    }
    else
    {
        songIndex-=1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].SongName;
         audioElement.currentTime = 0;
         audioElement.play();
         gif.style.opacity=1;
         masterPlay.classList.remove('fa-play-circle');
         masterPlay.classList.add('fa-pause-circle');
})