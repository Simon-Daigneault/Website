const landingPage = document.getElementsByClassName("landingPage")[0];

const mainTitle = landingPage.querySelector("h1");


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


