
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
        header.style.background = "#2c3f81";
        header.style.boxShadow = "0px 0px 30px 5px #444";
        headerLogo.style.display = "inline-block";
        headerLogo.style.opacity = 1;

    } else {
        header.style.background = "transparent";
        header.style.boxShadow = "none";
        headerLogo.style.display = "inline-block";
        headerLogo.style.opacity = 0;
    }
})




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


function updateTimer() {
    future  = Date.parse("July 10, 2022 00:00:00"); //set to correct date
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



