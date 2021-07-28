
const landingPage = document.getElementsByClassName("landingPage")[0];

const header = document.querySelectorAll("header")[0];

const headerLogo = document.getElementsByClassName("header-logo")[0];






let slideInitialXPos;
let slideResizedXPos;
let slideRelativeXPos;
let leadsScrollingFactor;
let slickSlides;



window.addEventListener("scroll", function () {

    if (window.pageYOffset > 10) {
        header.style.background = "#333";
        //header.style.boxShadow = "0px 0px 30px 5px #444";
        headerLogo.style.display = "inline-block";
        headerLogo.style.opacity = 1;

    } else {
        header.style.background = "transparent";
        header.style.boxShadow = "none";
        headerLogo.style.display = "inline-block";
        headerLogo.style.opacity = 0;
    }
})


// control animation between landing and pod


const missionCanvas = document.getElementsByClassName("mission-canvas")[0];

missionCanvas.width = 640;
missionCanvas.height = 480;



const missionContext = missionCanvas.getContext("2d");

// canvas.width = 1158;
// canvas.height = 770;

const frameCount = 20;
const currentFrame = index => (
  `media/rrr_animation/${(index + 1).toString().padStart(4,"0")}.png`
);

const images = []
const threewords = {
  frame: 0
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

gsap.to(threewords, {
  frame: frameCount - 1,
  snap: "frame",
  scrollTrigger: {
    // trigger: threewords,
            
            
    //         pin:true,
    scrub: 0.5,
  },
  onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
});

images[0].onload = render;

function render() {
  missionContext.clearRect(0, 0, missionCanvas.width, missionCanvas.height);
  missionContext.drawImage(images[threewords.frame], 0, 0,640,480); 
}


//DOT NAVIGATION

//all possible easing functions:
//linear, easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic, easeOutCubic, easeInOutCubic, 
//easeInQuart, easeOutQuart, easeInOutQuart, easeInQuint, easeOutQuint, easeInOutQuint

//dotNav('section', 'linear');


// THE FOLLOWING LINES OF CODES ARE FOR THE DEPRECATED LEADS SECTION ANIMATIONS



// window.addEventListener("DOMContentLoaded", () => {
//     slickSlides = document.getElementsByClassName("slides");

//     slideInitialXPos = slickSlides[0].getBoundingClientRect().left;
//     slideRelativeXPos = slideInitialXPos;
//     leadsScrollingFactorTitles =leadsTitles[1].offsetHeight / slickSlides[0].offsetWidth;
//     leadsScrollingFactorDescriptions =leadsDescriptions[1].offsetHeight / slickSlides[0].offsetWidth;
//     console.log(leadsScrollingFactor);
//     console.log(leadsTitlesContainer.scrollHeight + "scrollheight");


//     teamsScrolling();
// })



// const teamsScrolling = () => {
//     if(window.innerWidth < 1100){
//         let slideXPos = slickSlides[0].getBoundingClientRect().left;
//         $(leadsTitlesContainer).scrollTop(-slideXPos*leadsScrollingFactorTitles + slideInitialXPos +15);
//         $(leadsDescriptionsContainer).scrollTop(-slideXPos*leadsScrollingFactorDescriptions + slideInitialXPos+20);
//         console.log(slideXPos - slideInitialXPos);
//     } else {
//         let slideXPos = slickSlides[0].getBoundingClientRect().left;
//         $(leadsTitlesContainer).scrollTop(-slideXPos*leadsScrollingFactorTitles + slideInitialXPos);
//         $(leadsDescriptionsContainer).scrollTop(-slideXPos*leadsScrollingFactorDescriptions + slideInitialXPos);
//         console.log(slideXPos - slideInitialXPos);
//     }


//     requestAnimationFrame(teamsScrolling);
// }






// console.log(leadsTitlesContainer.clientHeight);
// for (let i = 0; i < leadsTitles.length; i++) {

//     if (i % 2 == 1) {
//         leadsTitles[i].style.height = leadsTitlesContainer.clientHeight + "px";
//     }

// }


// for (let i = 0; i < leadsDescriptions.length; i++) {

//     if (i % 2 == 1) {
//         leadsDescriptions[i].style.height = leadsDescriptionsContainer.clientHeight + "px";
//     }

// }




landingPage.style.height = window.innerHeight + "px";







window.addEventListener("resize", () => {

    landingPage.style.height = window.innerHeight + "px";


    //NEED TO RESOLVE RESIZE ISSUE WITH SLIDES
    // slideResizedXPos = slickSlides[0].getBoundingClientRect().left;
    // slideRelativeXPos = slideInitialXPos*2 - slideResizedXPos;
})


//COUNTDOWN

function updateTimer() {
    future  = Date.parse("July 10, 2022 UTC 00:00:00"); //set to correct date
    now     = new Date();
    diff    = future - now;
  
    days  = Math.floor( diff / (1000*60*60*24) );
    hours = Math.floor( diff / (1000*60*60) );
    minutes  = Math.floor( diff / (1000*60) );
    seconds = Math.floor(diff / (1000))
    
  
    d = days;
    h = hours - days  * 24;
    m = minutes  - hours * 60;
    s = seconds - minutes * 60;
  
  
    document.getElementById("timer")
      .innerHTML =
        '<div>' + d + '<span>Days</span></div>' +
        '<div>' + h + '<span>Hours</span></div>' +
        '<div>' + m + '<span>Minutes</span></div>' +
        '<div>' + s + '<span>Seconds</span></div>' ;
  }
  setInterval('updateTimer()', 1000 );



