
const landingPage = document.getElementsByClassName("landingPage")[0];

// const podSection = document.getElementsByClassName("pod-section")[0];


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

const missionSection = document.getElementsByClassName("mission")[0];

const missionFixedPart = document.getElementsByClassName("mission-fixed-part")[0];


const missionCanvas = document.getElementsByClassName("mission-canvas")[0];




let landingHeight = landingPage.offsetHeight;
let missionHeight = missionSection.offsetHeight;
let missionYOffset = missionSection.offsetTop;
// let podSectionHeight = podSection.offsetHeight;
// let podSectionYOffset = podSection.offsetTop;
console.log(missionYOffset);
console.log(landingHeight);


missionCanvas.width = 640;
missionCanvas.height = 480;




const missionContext = missionCanvas.getContext("2d");

// canvas.width = 1158;
// canvas.height = 770;

const frameCount = 60;
const currentFrame = index => (
  `media/rrr_animation/${(index + 1).toString().padStart(4, "0")}.png`
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
    start: `${landingHeight} top`,
    end: `${landingHeight + missionHeight} bottom`,
    markers: false,
    scrub: 0.5,
  },
  onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
});

images[0].onload = render;

function render() {
  missionContext.clearRect(0, 0, missionCanvas.width, missionCanvas.height);
  missionContext.drawImage(images[threewords.frame], 0, 0, 640, 480);

}

//fix the position of the animation & only display the pod when in the viewport


document.addEventListener("scroll", () => {
  console.log(missionCanvas);
  if (missionHeight + landingHeight > window.pageYOffset && window.pageYOffset > landingHeight && !missionSection.classList.contains("fixed-animation")) {
    console.log("i am in viewport");
    missionFixedPart.classList.add("fixed-animation");
  }

  else {
    missionFixedPart.classList.remove("fixed-animation");
  }
  // if (podSectionYOffset < window.pageYOffset && window.pageYOffset < podSectionYOffset + podSectionHeight) {
  //   podSection.style.display = "block";

  // }
  // else {
  //   podSection.style.display = "none";
  // }
  console.log(window.pageYOffset);
})


//Landing Page

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
 
};


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
  landingHeight = landingPage.offsetHeight;
  missionYOffset = missionSection.offsetTop;
  missionHeight = missionSection.offsetHeight;
  //NEED TO RESOLVE RESIZE ISSUE WITH SLIDES
  // slideResizedXPos = slickSlides[0].getBoundingClientRect().left;
  // slideRelativeXPos = slideInitialXPos*2 - slideResizedXPos;
})


//COUNTDOWN

function updateTimer() {
  future = Date.parse("July 10, 2022 UTC 00:00:00"); //set to correct date
  now = new Date();
  diff = future - now;

  days = Math.floor(diff / (1000 * 60 * 60 * 24));
  hours = Math.floor(diff / (1000 * 60 * 60));
  minutes = Math.floor(diff / (1000 * 60));
  seconds = Math.floor(diff / (1000))


  d = days;
  h = hours - days * 24;
  m = minutes - hours * 60;
  s = seconds - minutes * 60;


  document.getElementById("timer")
    .innerHTML =
    '<div>' + d + '<span>Days</span></div>' +
    '<div>' + h + '<span>Hours</span></div>' +
    '<div>' + m + '<span>Minutes</span></div>' +
    '<div>' + s + '<span>Seconds</span></div>';
}
setInterval('updateTimer()', 1000);



