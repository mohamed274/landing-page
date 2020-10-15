/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const navList = document.getElementById('navbar__list');
const sections = [...document.querySelectorAll('[data-nav]')];
const sectionsIds = sections.map(section => section.id);
const linksIds = []; 

/**
 * End Global Variables
 * Start Helper Functions           
 * 
*/
const scrollingFunc = (targetoffset, dur) => {    
    if (dur <= 0) {
        return;
    }
    let diff = targetoffset - document.documentElement.scrollTop;

    let speed = (diff / dur) * 10;

    setTimeout(() => {

        document.documentElement.scrollTop += speed;

        if (document.documentElement.scrollTop == targetoffset) {

            return;
        }
        scrollingFunc(targetoffset, dur - 10);

    }, 10);
};

const removeActive = (activeClass, links) => {

    links.forEach((link) => {

        document.getElementById(link).classList.remove(activeClass);

    });
};

const addActive = (targetLink, activeClass) => {

    targetLink.classList.add(activeClass);

};


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

const createMenu = (secArr) => {
    //creating a link foe each section
    secArr.forEach(sec => {
        let markup = `
            <li><a href="#${sec.id}" id="link_${sec.id}" class="menu__link">${sec.dataset.nav}</a></li>
        `;
        navList.insertAdjacentHTML('beforeend' , markup);
        linksIds.push(`link_${sec.id}`);
    });
};


// Add class 'active' to section when near top of viewport
const addActiveclasses = (sections) => {              
    let currentPosition = window.pageYOffset;

    sections.forEach((section) => {

        let top = section.offsetTop,

            bottom = top + section.offsetHeight - 1;

        if (currentPosition >= top && currentPosition <= bottom) {

            let link = document.getElementById(`link_${section.id}`);

            let activeSection = document.getElementById(`${section.id}`);

            removeActive('your-active-class', sectionsIds);
            removeActive('active', linksIds);
            addActive(link, 'active');
            addActive(activeSection, 'your-active-class');

        } else if (currentPosition < sections[0].offsetTop) {
            removeActive('active', linksIds);
            removeActive('your-active-class', sectionsIds);
        }
    });
};

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
createMenu(sections);

// Scroll to section on link click
navList.addEventListener('click', (event) => {         
    event.preventDefault();
    if (event.target.matches('.menu__link')) {
        let targetOffset = document.getElementById(event.target.hash.substr(1)).offsetTop;
        scrollingFunc(targetOffset, 200);
    }
});

// Set sections as active

document.addEventListener('scroll', () => {          
    addActiveclasses(sections);
});


