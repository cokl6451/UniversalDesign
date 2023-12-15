document.getElementById('funFactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    function formatFact(fact) {
        const parts = fact.split(':');
        if (parts.length > 1) {
            return '<strong>' + parts[0] + ':</strong>' + parts.slice(1).join(':');
        }
        return fact;
    }

    const facts = [
        "Origin in Architecture: Universal design originated in the field of architecture. It was developed by architect Ronald Mace, who himself was a wheelchair user, emphasizing the creation of buildings and environments accessible to all people, regardless of their age, size, or ability.",
        "7 Principles: There are seven principles of universal design, which include equitable use, flexibility in use, simple and intuitive use, perceptible information, tolerance for error, low physical effort, and size and space for approach and use.",
        "Beyond Disability: While often associated with accessibility for people with disabilities, universal design actually benefits everyone. For example, curb cuts on sidewalks, while essential for wheelchairs, are also handy for strollers and luggage.",
        "Influence on Technology: Universal design has significantly influenced the development of technology, leading to features like closed captioning on TVs and voice-activated virtual assistants, which aid users of all abilities.",
        "Global Movement: Universal design is a global movement and has been adopted in many countries as part of their design standards and regulations, particularly in public buildings and transport systems.",
        "Sustainable Design: Universal design aligns with sustainable design principles by promoting the creation of spaces and products that remain usable and relevant across different life stages and abilities, reducing the need for modifications or replacements.",
        "Ongoing Evolution: As society's understanding of diversity and inclusion evolves, so does universal design. It continually adapts to new technologies, materials, and societal needs, making it a dynamic and ever-evolving field."
    ];

    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('funFact').innerHTML = formatFact(randomFact);
});

window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};
