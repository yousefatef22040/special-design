// check if there's local storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
    // console.log("local");
    // console.log(mainColors)
    document.documentElement.style.setProperty("--main-color", mainColors);

    // remove active class from all colors list item
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");

            // add active class on element with data color === local storage item
    if (element.dataset.color === mainColors) {

        // add active class
        element.classList.add("active")
    }
    });
}

// random background option 
let backgroundOption = true;

// variable to control the interval
let backgroundInterval;

// check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");

// check if random local storage is not empty
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === 'true') {
        backgroundOption = true
    } else {
        backgroundOption = false
    }

    // remove active class from all spans
    document.querySelectorAll(".random-background span").forEach(element => {
        element.classList.remove("active")
    });
    if (backgroundLocalItem === 'true') {
        document.querySelector(".random-background .yes").classList.add("active");
    } else {
        document.querySelector(".random-background .no").classList.add("active");

    }
}

//toggle spin class on icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    //toggle class fa-spin for roattion on self
    this.classList.toggle("fa-spin");

    // toggle class open main settings box
    document.querySelector(".settings-box").classList.toggle("open");

}

// swith colors
const colorsLi = document.querySelectorAll(".colors-list li");
// loop on all list items
colorsLi.forEach(li => {

    // click on every list items
    li.addEventListener("click", (e) => {

        // set color on root
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

        // set color on local storage
        localStorage.setItem("color_option", e.target.dataset.color);

        handleActive(e);
    });
});

// swith background option
const randomBackgroundEl = document.querySelectorAll(".random-background span");
// loop on all spans
randomBackgroundEl.forEach(span => {

    // click on every span
    span.addEventListener("click", (e) => {

        handleActive(e);

        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});

//select landing page element
let landingPage = document.querySelector(".landing-page");

//get array from imgs
let imgsArray = ["website-background-1.jpg", "website-background-2.jpg", "website-background-3.jpg", "website-background-4.jpg"];

// function to randomize imgs
function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {

            //get random number
            randomNumber = Math.floor(Math.random() * imgsArray.length);

            // change background image url
            landingPage.style.backgroundImage = 'url("image/' + imgsArray[randomNumber] + '")';

        }, 10000);
    }
}
randomizeImgs()

let section = document.querySelector(".skills");
let spans = document.querySelectorAll(".skill-progress span");

window.onscroll = function(){
    if(window.scrollY >= section.offsetTop - 500){
        spans.forEach((span) => {
            span.style.width = span.dataset.width;
        })
}
};

// create popup with the image
let ourGallary = document.querySelectorAll(".gallary img");

ourGallary.forEach(img => {
    img.addEventListener('click', (e) => {
        // create overlay element
        let overlay = document.createElement("div");

        // add class to overlay
        overlay.className = 'popup-overlay';

        // append overlay to the body
        document.body.appendChild(overlay)

        // create the popup
        let popupBox = document.createElement("div");

        // add class to the popup box
        popupBox.className = 'popup-box';
        if (img.alt !== null) {
            // create heading
            let imgHeading = document.createElement("h3");

            // crate text for heading
            let imgText = document.createTextNode(img.alt);

            // append the teaxt to the heading
            imgHeading.appendChild(imgText);

            // append the heading to the popup box
            popupBox.appendChild(imgHeading)
        }
        
        // create the image
        let popupImage = document.createElement("img");

        // set image src
        popupImage.src = img.src;

        // add image to popup box
        popupBox.appendChild(popupImage);

        // append the popup box to body
        document.body.appendChild(popupBox);

        // ceate the close span
        let closeButton = document.createElement("span");

        // create the close button text 
        let closeButtonText = document.createTextNode("X");

        // append text to close button
        closeButton.appendChild(closeButtonText);

        // add class to close button
        closeButton.className = 'close-button';

        // add close button to the popup box
        popupBox.appendChild(closeButton)
    });
});

// close popup
document.addEventListener("click", function (e) {
    if (e.target.className == 'close-button') {
        // remove the current popup
        e.target.parentNode.remove();

        // remove overlay
        document.querySelector(".popup-overlay").remove();
    }
});

// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

allBullets.forEach(bullet => {
    bullet.addEventListener("click", (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// select all links
const allLinks = document.querySelectorAll(".links a")

allLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// handle active state
function handleActive(ev) {
            // remove active class from all childrens
        ev.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });

        // add active class on self
        ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullet-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullet_option");

if (bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active")
    });
    if (bulletLocalItem === 'block') {
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullet-option .yes").classList.add("active")
    } else {
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullet-option .no").classList.add("active")
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem('bullet_option', 'block');
        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullet_option", 'none');
        }
        handleActive(e);
    });
});
// reset button
document.querySelector(".reset-options").onclick = function () {
    localStorage.clear();
    
    // OR

    // localStorage.removeItem("bullet_option");
    // localStorage.removeItem("color_option");
    // localStorage.removeItem("bacground_option");

    // reload window
    window.location.reload();
}
// toggle menu
let toggleBtn = document.querySelector(".toggle-menue");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    // stop propagation
    e.stopPropagation();

    // toggle class "menu-active" on button
    this.classList.toggle('menu-active');

    // toggle class "open" on links
    tLinks.classList.toggle('open');
};

// click anywhere outside menu and toggle button
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks) {
        // check if menu is open
        if (tLinks.classList.contains("open")) {
            // toggle class "menu-active" on button
            toggleBtn.classList.toggle('menu-active');

            // toggle class "open" on links
            tLinks.classList.toggle('open');
        }
    }
});

// stop propagation on menu
tLinks.onclick = function (e) {
    e.stopPropagation();
}