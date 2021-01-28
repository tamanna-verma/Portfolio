//for smooth scrolling
var navMenuAnchorTags = document.querySelectorAll('.navigation-menu a');
var interval;
for (let i = 0; i < navMenuAnchorTags.length; i++) {
    navMenuAnchorTags[i].addEventListener('click', function (event) {
        event.preventDefault();
        var targetSectionID = this.textContent.trim().toLowerCase();
        var targetSection = document.getElementById(targetSectionID);
        //    interval = setInterval(scrollVertically, 20, targetSection);
         //or we can write function like below
        interval = setInterval(function () {
            scrollVertically(targetSection);
        }, 10);
    });
}

function scrollVertically(targetSection) {
    var targetSectionCoordinates = targetSection.getBoundingClientRect();
    if (targetSectionCoordinates.top <= 0) {
        clearInterval(interval);
        return;
    }
    window.scrollBy(0, 50);
}

// back to top function
var intervaltop;
var topbtn = document.querySelector('#topbtn');

window.addEventListener('scroll', function(){
    if (document.documentElement.scrollTop > 20) {
        topbtn.style.display = "block";
    } else {
        topbtn.style.display = "none";
    }
});
topbtn.addEventListener('click',function(event){
    event.preventDefault();
    intervaltop = setInterval(function(){
        console.log(intervaltop)
        if(document.documentElement.scrollTop <= 0 ){
            clearInterval(intervaltop);
            return;
        }
        window.scrollBy(0,-100);
    },10)
});

// top scroll progress
var scrollbar = document.getElementById('scroll-bar');
function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.body.offsetHeight, D.body.clientHeight
    );
}
var docHeight = getDocHeight();
var windowHeight = window.innerHeight;
window.addEventListener('scroll', function(){
    var scrolled = Math.floor((window.scrollY/(docHeight-windowHeight))*100);
    scrollbar.style.width = scrolled+ '%';
})

// to filling the skills bar
var progressBars = document.querySelectorAll(".skill-progress > a > div");

function initialiseBar(bar) {
    bar.setAttribute("data-visited", false);
    bar.style.width = 0 + '%';
}

for (var bar of progressBars) {
    initialiseBar(bar);
}

function fillBar(bar) {

    var currentWidth = 0;
    var targetWidth = bar.getAttribute("data-bar-width");
    var interval = setInterval(function () {
        if (currentWidth >= targetWidth) {
            clearInterval(interval);
            return;
        }
        currentWidth++;
        bar.style.width = currentWidth + '%';
    }, 10);

}



// This function uses a for loop for individual progress bars.
function checkScroll() {

    for (let bar of progressBars) {
        var barCoordinates = bar.getBoundingClientRect();
        if ((bar.getAttribute("data-visited") == "false") &&
            (barCoordinates.top <= (window.innerHeight - barCoordinates.height))) {
            bar.setAttribute("data-visited", true);
            fillBar(bar);
        } else if (barCoordinates.top > window.innerHeight) {
            bar.setAttribute("data-visited", false);
            initialiseBar(bar);
        }

    }
}



window.addEventListener("scroll", checkScroll);

// This event fills the progress bars if they are displayed on the screen when the page is loaded.
// window.addEventListener("load", checkScroll);