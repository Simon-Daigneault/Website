
const landingPage = document.getElementsByClassName("landingPage")[0];

const mainTitle = landingPage.querySelector("h1");

const leadsTitlesContainer = document.getElementById("team-name");
const leadsTitles = document.getElementById("team-name").childNodes;



const leadsDescriptionsContainer = document.getElementById("team-description");

const leadsDescriptions = document.getElementById("team-description").childNodes;


const slickSlideFirst = document.querySelector("#slick-slide00");

window.addEventListener("mousedown", () => {
    // console.log(slickSlideFirst.clientHeight);
    console.log(slickSlideFirst);
    slickSlideFirst.style.background = "#000";
})



for (let i = 0; i < leadsTitles.length; i++) {

    if (i % 2 == 1) {
        leadsTitles[i].style.height = leadsTitlesContainer.clientHeight + "px";
    }

}


for (let i = 0; i < leadsDescriptions.length; i++) {

    if (i % 2 == 1) {
        leadsDescriptions[i].style.height = leadsDescriptionsContainer.clientHeight + "px";
    }

}


mainTitle.style.top = window.innerHeight - 200 + "px";
landingPage.style.height = window.innerHeight + "px";



//landingPage.style.background = "#0d4";




/*landingPage.style.width = window.innerWidth + "px";
landingPage.style.height = window.innerHeight + "px";
*/
window.addEventListener("resize", () => {
    mainTitle.style.top = window.innerHeight - 200 + "px";
    landingPage.style.height = window.innerHeight + "px";
})






