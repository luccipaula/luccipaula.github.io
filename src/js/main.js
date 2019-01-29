// CSS Import
import '../sass/main.scss';

// Animate on Scroll Import
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

// Toggle theme
document.querySelector('.navigation__theme--switch').addEventListener('click', () => {
    let darkThemeEnabled = document.body.classList.toggle('dark-theme');
    localStorage.setItem('dark-theme-enabled', darkThemeEnabled);
});

// Remember theme choice
if(JSON.parse(localStorage.getItem('dark-theme-enabled'))) {
    document.body.classList.add('dark-theme');
}

const elements = {
    nav: document.querySelector('.navigation'),
    checkbox: document.querySelector('.navigation__check'),
    menu: document.querySelector('.navigation__btn'),
    navIcon: document.querySelector('.navigation__btn--icon'),
    scrollIcon: document.querySelector('.header__icon')
};

document.addEventListener('click', e => {
    // Add background to navigation when opened
    if (elements.checkbox.checked === true) {
        addBackgroundColor();
    } else if (elements.checkbox.checked === false) {
        // Keep background color if page is scrolled down
        if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
            addBackgroundColor();
        } else if (document.documentElement.scrollTop === 0 || document.body.scrollTop === 0) {
            elements.nav.style.backgroundColor = "transparent"; 
        }
    } else {
        elements.nav.style.backgroundColor = "transparent"; 
    }

    // Close navigation menu when clicking away
    if (e.target !== elements.checkbox && e.target !== elements.navIcon && e.target !== elements.menu) {
      elements.checkbox.checked = false;
      // Menu is closed but navbar color is determined by how far page is scrolled
      if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
        addBackgroundColor();
      } else if (document.documentElement.scrollTop === 0 || document.body.scrollTop === 0) {
        elements.nav.style.backgroundColor = "transparent"; 
      }
    }
});

// Change nav background on scroll
window.onscroll = () => {
    if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
        if (elements.checkbox.checked === true || elements.checkbox.checked === false) {
            addBackgroundColor();
        }

        // Make scroll icon invisible when scrolling begins
        elements.scrollIcon.style.opacity = "0";
    } else if (document.documentElement.scrollTop === 0 || document.body.scrollTop === 0) {
        if (elements.checkbox.checked === true) {
            addBackgroundColor();
        } else if (elements.checkbox.checked === false) {
            elements.nav.style.backgroundColor = "transparent"; 
        }

        // Make scroll icon visible when at the top
        elements.scrollIcon.style.opacity = "100";
    } else {
        elements.nav.style.backgroundColor = "transparent";
    }
}

function addBackgroundColor() {
    if (document.body.classList.contains('dark-theme')) {
        elements.nav.style.backgroundColor = "rgba(29, 30, 34, .85)";
    } else {
        elements.nav.style.backgroundColor = "rgba(255, 255, 255, .85)";
    }
}