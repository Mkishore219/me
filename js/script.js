/* =======================
   GSAP SETUP
======================= */
gsap.registerPlugin(SplitText, ScrollTrigger, CustomEase);
CustomEase.create("hop", ".87, 0, .3, 1");

/* =======================
   LENIS SMOOTH SCROLL
======================= */
let lenis;

function initLenis() {
    if (typeof Lenis === "undefined") return;

    lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
}

/* =======================
   CUSTOM CURSOR
======================= */
function initCursor() {
    const cursor = document.querySelector("#cursor");
    if (!cursor) return;

    document.body.addEventListener("mousemove", e => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.2,
            ease: "power3.out"
        });
    });
}

/* =======================
   SPLIT TEXT ANIMATION
======================= */
function animateSplitText(selector) {
    document.querySelectorAll(selector).forEach(el => {
        if (!el || el.offsetParent === null) return;

        if (el._splitTextInstance) {
            el._splitTextInstance.revert();
        }

        const split = new SplitText(el, {
            type: "lines",
            linesClass: "line-child",
            mask: "lines"
        });

        el._splitTextInstance = split;

        if (!split.lines.length) return;

        gsap.from(split.lines, {
            y: 120,
            duration: 0.8,
            ease: "hop",
            stagger: 0.08,
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
    });
}

function initSplitTextAnimation() {
    const selector = ".line-split";

    if (document.fonts) {
        document.fonts.ready.then(() => animateSplitText(selector));
    } else {
        animateSplitText(selector);
    }
}






/*  =======================
    =======================
    =======================
    LETTER SPLIT ANIMATION
    ======================= 
    ======================= 
    ======================= */
function animateLetterSplit(selector) {
    document.querySelectorAll(selector).forEach(el => {
        if (!el || el.offsetParent === null) return;

        // revert previous split
        if (el._splitLetterInstance) {
            el._splitLetterInstance.revert();
        }

        // split into words + chars
        const split = new SplitText(el, {
            type: "words, chars",
            wordsClass: "word",
            charsClass: "letter"
        });

        el._splitLetterInstance = split;

        if (!split.chars.length) return;

        gsap.from(split.chars, {
            color: "#08080918",
            opacity: 0,
            rotateX: -90,

            // blur effect
            filter: "blur(10px)",

            duration: 0.8,
            ease: "power3.out",

            stagger: 0.03,

            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
    });
}


/*  ======================= 
    INIT LETTER SPLIT
    ======================= */
function initLetterSplitAnimation() {
    const selector = ".letter-split";

    if (document.fonts) {
        document.fonts.ready.then(() => animateLetterSplit(selector));
    } else {
        animateLetterSplit(selector);
    }
}
/*  =======================
    =======================
    ======================= 
    INIT LETTER SPLIT END
    ======================= 
    ======================= 
    ======================= */








/* =======================
   IMAGE REVEAL
======================= */
function revealImages(selector = "img") {
    gsap.utils.toArray(selector).forEach(img => {
        gsap.fromTo(
            img,
            { clipPath: "inset(0 0 100% 0)" },
            {
                clipPath: "inset(0 0 0% 0)",
                duration: 0.8,
                ease: "hop",
                scrollTrigger: {
                    trigger: img,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
}

/* =======================
   RESIZE HANDLING
======================= */
function handleResize() {
    let lastWidth = window.innerWidth;
    let resizeTimer;

    const refresh = () => {
        initSplitTextAnimation();
        ScrollTrigger.refresh();
    };

    window.addEventListener("resize", () => {
        if (window.innerWidth !== lastWidth) {
            lastWidth = window.innerWidth;
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(refresh, 250);
        }
    });

    window.addEventListener("orientationchange", refresh);
}

/* =======================
   FOOTER YEAR
======================= */
function yearRights() {
    const yearEl = document.querySelector(".currentyear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

$(document).ready(function () {

    // variables 
    var toTop = $('.fixed-top-btnn');
    // logic
    toTop.on('click', function () {
        $('html, body').animate({
            scrollTop: $('html, body').offset().top,
        });
    });

});

/* =======================
   HEADER & FOOTER LOAD
======================= */
function loadHeaderFooter() {
    if (typeof $ === "undefined") return;

    $("#header").load("./header.html", () => {
        ScrollTrigger.refresh();
    });

    $("#footer").load("./footer.html", yearRights);

    $("#floating-buttons").load("./floating-buttons.html");
}



function initMobileNavigation() {

    const menuButton =
        document.querySelector("#mobileMenuBtn");

    const closeButton =
        document.querySelector("#mobileNavClose");

    const mobileNav =
        document.querySelector("#mobileNav");

    const mobileLinks =
        document.querySelectorAll(".mobile-nav-link");


    if (!mobileNav) return;


    function openMenu() {

        mobileNav.classList.add("open");

        document.body.style.overflow = "hidden";

    }


    function closeMenu() {

        mobileNav.classList.remove("open");

        document.body.style.overflow = "";

    }


    menuButton?.addEventListener(
        "click",
        openMenu
    );


    closeButton?.addEventListener(
        "click",
        closeMenu
    );


    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });

}




/* =======================
   OWL CAROUSEL (jQuery)
======================= */
function initOwlCarousel() {
    if (typeof $ === "undefined" || !$(".owl-carousel").length) return;

    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: { items: 1, nav: true },
            600: { items: 3, nav: false },
            1000: { items: 5, nav: true, loop: false }
        }
    });
}










function initBannerAnimation() {

    const banner = document.querySelector("#banner");

    if (!banner) return;


    const eyebrow =
        banner.querySelector(".banner-eyebrow");

    const description =
        banner.querySelector(".banner-description");

    const actions =
        banner.querySelector(".banner-actions");

    const meta =
        banner.querySelector(".banner-meta");

    const image =
        banner.querySelector(".banner-bg img");


    gsap.from(image, {
        scale: 1.08,
        duration: 1.8,
        ease: "power3.out"
    });


    gsap.from(eyebrow, {
        y: 25,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out"
    });


    gsap.from(description, {
        y: 25,
        opacity: 0,
        duration: 0.8,
        delay: 0.45,
        ease: "power3.out"
    });


    gsap.from(actions, {
        y: 25,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out"
    });


    gsap.from(meta, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        ease: "power3.out"
    });

}


















/* =========================================================
   LOGIN
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PASSWORD TOGGLE
    ===================================================== */

    const passwordInput =
        document.querySelector("#login-password");

    const passwordToggle =
        document.querySelector("#password-toggle");


    if (passwordInput && passwordToggle) {

        passwordToggle.addEventListener("click", () => {

            const icon =
                passwordToggle.querySelector("i");


            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                icon.className = "ri-eye-off-line";

            } else {

                passwordInput.type = "password";

                icon.className = "ri-eye-line";

            }

        });

    }


    /* =====================================================
       LOGIN FORM
    ===================================================== */

    const loginForm =
        document.querySelector("#login-form");

    const loginError =
        document.querySelector("#login-error");


    if (!loginForm) return;


    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const username =
            document.querySelector("#login-email").value.trim();

        const password =
            document.querySelector("#login-password").value.trim();


        loginError.textContent = "";


        if (!username || !password) {

            loginError.textContent =
                "Please enter your login details.";

            return;

        }


        /*
         * TEMPORARY LOGIN
         *
         * This is only for testing the dashboard flow.
         *
         * Admin:
         * username: admin
         * password: admin123
         *
         * Staff:
         * username: staff
         * password: staff123
         */


        let role = "";


        if (
            username.toLowerCase() === "admin" &&
            password === "admin123"
        ) {

            role = "admin";

        } else if (
            username.toLowerCase() === "staff" &&
            password === "staff123"
        ) {

            role = "staff";

        } else {

            loginError.textContent =
                "Invalid username or password.";

            return;

        }


        /* =================================================
           SAVE LOGIN SESSION
        ================================================= */

        sessionStorage.setItem(
            "mujeed_logged_in",
            "true"
        );

        sessionStorage.setItem(
            "mujeed_role",
            role
        );


        /* =================================================
           GO TO DASHBOARD
        ================================================= */

        window.location.href = "dashboard.html";

    });

});

















/* =======================
   INIT ALL
======================= */
window.addEventListener("load", () => {
    initLenis();
    initCursor();
    loadHeaderFooter();
    initMobileNavigation();

    initOwlCarousel();
    initSplitTextAnimation();
    handleResize();
    revealImages("img:not(header img):not(#banner img)");
    ScrollTrigger.refresh();







    initBannerAnimation();





});
