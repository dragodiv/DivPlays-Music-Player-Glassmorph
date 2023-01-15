let songs=[
    {
        name:"Hanuman Chalisa Superfast",
        singer:"Brijesh Shandilya",
        image:"https://i.scdn.co/image/ab67616d00001e02fdb9cbec60d16e3f14c542a3",
        audio:"Hanuman Chalisa Superfast"
    },
    {
        name:"Kesariya From Brahmastra",
        singer:"Pritam, Arijit Singh, Amitabh B.",
        image:"https://i.scdn.co/image/ab67616d0000b273c08202c50371e234d20caf62",
        audio:"Kesariya From Brahmastra"
    },
    {
        name:"Tujhme Rab Dikhta Hai",
        singer:"Salim, Roop Kumar Rathod",
        image:"https://i.scdn.co/image/ab67616d0000b2731555fec10000486f9331fbc8",
        audio:"Tujhme Rab Dikhta Hai"
    },
    {
        name:"Achyutam Keshavam",
        singer:"Maanya Arora",
        image:"https://i.scdn.co/image/ab67616d00001e025d86ed8d8c5c071b87c2e650",
        audio:"Achyutam Keshavam"
    },
    {
        name:"Ram Siya Ram",
        singer:"Sachet Tandon",
        image:"https://i.scdn.co/image/ab67616d0000b273b5db9fac30bd158408f1b477",
        audio:"Ram Siya Ram"
    },
    {
        name:"Ek Raat",
        singer:"Vilen",
        image:"https://i.scdn.co/image/ab67616d00001e027faa48afca36e6854f2a8ce3",
        audio:"Ek Raat"
    },
    {
        name:"Humare Saath Shri Raghunath",
        singer:"Prakash Gandhi",
        image:"https://i.scdn.co/image/ab67616d0000b2739a7b3a3064aec7b75f693b86",
        audio:"Humare Saath Shri Raghunath"
    },
    {
        name:"Pasoori",
        singer:"Ali Sethi x Shae Gill",
        image:"https://i.scdn.co/image/ab67616d0000b2733f3d35703bdcd917dad51c4f",
        audio:"Pasoori"
    },
    {
        name:"Shri Ram Jaanki Baithe Hai",
        singer:"Ram Kumar Lakha",
        image:"https://i.scdn.co/image/ab67616d00001e02c43baa42b9d8c3e784bcb65f",
        audio:"Shri Ram Jaanki Baithe Hai"
    },
    {
        name:"Laembadgini",
        singer:"Diljit Dosanjh",
        image:"https://i.scdn.co/image/ab67616d0000b2733b8c830e266297cee34cf3b4",
        audio:"Laembadgini"
    },
    {
        name:"Chhore NCR Aale",
        singer:"Paradox, MC SQUARE",
        image:"https://i.scdn.co/image/ab67616d00001e02ef2eed9fc8eb2c8fb9ae9e6b",
        audio:"Chhore NCR Aale"
    },
    {
        name:"Kya Baat Ay",
        singer:"Harrdy Sandhu",
        image:"https://i.scdn.co/image/ab67616d00001e0231cc2963f1615892af6a9f93",
        audio:"Kya Baat Ay"
    },
]

const playerbanner = document.getElementById("banner-pl"),
title = document.getElementById("title-pl"),
singer = document.getElementById("singer-pl");

let audio = document.getElementById("audio"),
playpause = document.getElementById("play-pause"),
forward = document.getElementById("forward"),
backward = document.getElementById("backward"),
progressBar = document.getElementById("progress"),
progressDetails = document.getElementById("track"),
curTime = document.getElementById("current"),
finTime = document.getElementById("duration"),
menubar = document.getElementById("menu"),
menu = document.getElementById("navbar");

// let index = Math.floor(Math.random()*12+0);
let index = 0;

function loaded(){

    loadData(index);
    // audio.play();
}

function loadData(indexVal){
    playerbanner.src = songs[indexVal].image;
    title.innerHTML = songs[indexVal].name;
    singer.innerHTML = songs[indexVal].singer;
    audio.src = "music/"+songs[indexVal].audio+".mp3";
    if(playpause.classList.contains("fa-pause")){
        audio.play();
    // location.href="#player";
}
}


playpause.addEventListener("click",()=>{
    if(playpause.classList.contains("fa-play")){
        audio.play();
        playpause.classList.remove("fa-play");
        playpause.classList.add("fa-pause");
    }else if(playpause.classList.contains("fa-pause")){
        playpause.classList.remove("fa-pause");
        playpause.classList.add("fa-play");
        audio.pause();
    }
})
forward.addEventListener("click",()=>{
    playpause.classList.remove("fa-play");
    playpause.classList.add("fa-pause");
    index++;
    if(index>songs.length){
        index=0;
    }else{
        index=index;
    }
    loadData(index);
})
backward.addEventListener("click",()=>{
    playpause.classList.remove("fa-play");
    playpause.classList.add("fa-pause");
    index--;
    if(index<=0){
        index=songs.length;
    }else{
        index=index;
    }
    loadData(index);
})

audio.addEventListener("timeupdate", (e)=>{
    const initialTime = e.target.currentTime;
    const finalTime = e.target.duration;
    let BarWidth = initialTime/finalTime*100;
    progressBar.style.width = BarWidth+"%";

    progressDetails.addEventListener("click", (e)=>{
        let progressValue = progressDetails.clientWidth;
        let clickedOffsetX = e.offsetX;
        let MusicDuration = audio.duration;

        audio.currentTime = (clickedOffsetX/progressValue)*MusicDuration;
    })
        

    audio.addEventListener("loadeddata", ()=>{
        // console.log(audio.duration)
        let finMin = Math.floor(audio.duration/60);
        let finSec = Math.floor(audio.duration%60);
        if(finSec<10){
            finSec="0"+finSec;
        }
        let fM = finMin.toString();
        let fS = finSec.toString();
        finTime.innerText = fM+":"+fS;
    })
    if(audio.currentTime==audio.duration){
        index++;
        if(index>songs.length){
        index=0;
        }else{
        index=index;
        }
        loadData(index);
    }
    let curMin = Math.floor(audio.currentTime/60);
    let curSec = Math.floor(audio.currentTime%60);

    if(curMin<10){
        curMin="0"+curMin;
    }
    if(curSec<10){
        curSec="0"+curSec;
    }
    let cM = curMin.toString();
    let cS = curSec.toString();
    curTime.innerText = cM+":"+cS;
    
})

menubar.addEventListener("click",()=>{
    menubar.classList.toggle("fa-xmark");
    menu.classList.toggle("active");
})
// heart function
heart.addEventListener("mouseover", (e) =>{
    heart.classList.add("heart","fa-solid");
})
heart.addEventListener("mouseout", (e)=>{
    heart.classList.remove("heart","fa-solid");
})
