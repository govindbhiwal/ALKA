
/* =========================================
   PAGE SYSTEM
========================================= */

let currentPage = 1;

const totalPages = 15;

const pages =
    document.querySelectorAll(".page");

const pageIndicator =
    document.getElementById("pageIndicator");


function showPage(pageNumber) {

    if (pageNumber < 1) {
        pageNumber = 1;
    }

    if (pageNumber > totalPages) {
        pageNumber = totalPages;
    }

    currentPage = pageNumber;


    pages.forEach((page, index) => {

        page.classList.remove("active");

        if (index === currentPage - 1) {

            page.classList.add("active");

        }

    });


    pageIndicator.textContent =
        `${currentPage} / ${totalPages}`;


    startMusic();

}


/* =========================================
   NEXT PAGE
========================================= */

function nextPage() {

    if (currentPage < totalPages) {

        showPage(currentPage + 1);

    }

}


/* =========================================
   PREVIOUS PAGE
========================================= */

function previousPage() {

    if (currentPage > 1) {

        showPage(currentPage - 1);

    }

}


/* =========================================
   KEYBOARD NAVIGATION
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "ArrowRight" ||
            event.key === "Enter"
        ) {

            nextPage();

        }


        if (event.key === "ArrowLeft") {

            previousPage();

        }

    }
);


/* =========================================
   TOUCH / SWIPE NAVIGATION
========================================= */

let touchStartX = 0;

let touchEndX = 0;


document.addEventListener(
    "touchstart",
    function (event) {

        touchStartX =
            event.changedTouches[0].screenX;

    }
);


document.addEventListener(
    "touchend",
    function (event) {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    }
);


function handleSwipe() {

    const difference =
        touchEndX - touchStartX;


    if (Math.abs(difference) < 50) {
        return;
    }


    if (difference < 0) {

        nextPage();

    } else {

        previousPage();

    }

}


/* =========================================
   MUSIC
========================================= */

const music =
    document.getElementById(
        "birthdayMusic"
    );


let musicStarted = false;


function startMusic() {

    if (
        music &&
        !musicStarted
    ) {

        music.volume = 0.35;


        music.play()
            .then(() => {

                musicStarted = true;

            })
            .catch(() => {

                /*
                   Browser may block
                   autoplay until user
                   interacts with page.
                */

            });

    }

}


/* =========================================
   BIRTHDAY GAME
========================================= */

function birthdayChoice(choice) {

    const result =
        document.getElementById(
            "gameResult"
        );


    const messages = {

        happy:
            "😄 Of course! Alka deserves a day full of happiness!",

        crazy:
            "🤪 That's the Alka energy we were looking for!",

        queen:
            "👑 Correct! Today Alka is officially the birthday queen!",

        legend:
            "🌟 Exactly! Alka is officially a birthday legend!"

    };


    result.textContent =
        messages[choice];


    result.style.animation =
        "none";


    setTimeout(() => {

        result.style.animation =
            "revealMessage 0.6s ease";

    }, 10);

}


/* =========================================
   SECRET ENVELOPE
========================================= */

function openLetter() {

    const secretMessage =
        document.getElementById(
            "secretMessage"
        );


    secretMessage.classList.add(
        "show"
    );


    createSmallSparkles();

}


/* =========================================
   SMALL SPARKLES
========================================= */

function createSmallSparkles() {

    for (let i = 0; i < 15; i++) {

        const sparkle =
            document.createElement("div");


        sparkle.className =
            "confetti";


        sparkle.textContent = "✦";


        sparkle.style.left =
            (
                40 +
                Math.random() * 20
            ) + "vw";


        sparkle.style.color =
            "#69ff9b";


        sparkle.style.fontSize =
            (
                10 +
                Math.random() * 18
            ) + "px";


        sparkle.style.animationDuration =
            (
                1.5 +
                Math.random() * 2
            ) + "s";


        document.body.appendChild(
            sparkle
        );


        setTimeout(() => {

            sparkle.remove();

        }, 4000);

    }

}


/* =========================================
   FINAL CELEBRATION
========================================= */

function celebrate() {

    startMusic();


    const celebrationText =
        document.getElementById(
            "celebrationText"
        );


    celebrationText.textContent =
        "🎉 HAPPY BIRTHDAY ALKA! 🎉";


    for (
        let i = 0;
        i < 120;
        i++
    ) {

        setTimeout(
            createConfetti,
            i * 15
        );

    }

}


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const piece =
        document.createElement("div");


    piece.className =
        "confetti";


    const symbols = [
        "★",
        "✦",
        "✧",
        "♥",
        "•",
        "✿",
        "❖"
    ];


    piece.textContent =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];


    piece.style.left =
        Math.random() * 100 + "vw";


    piece.style.fontSize =
        (
            8 +
            Math.random() * 18
        ) + "px";


    piece.style.animationDuration =
        (
            2 +
            Math.random() * 4
        ) + "s";


    piece.style.animationDelay =
        (
            Math.random() * 0.5
        ) + "s";


    piece.style.opacity =
        (
            0.6 +
            Math.random() * 0.4
        );


    document.body.appendChild(
        piece
    );


    setTimeout(() => {

        piece.remove();

    }, 7000);

}


/* =========================================
   MATRIX BIRTHDAY RAIN
========================================= */

const canvas =
    document.getElementById(
        "matrix"
    );


const ctx =
    canvas.getContext("2d");


let width;

let height;

let columns;

let drops;


/*
   IMPORTANT:
   These are the words that
   appear in the falling rain.
*/

const birthdayPhrase =
    "HAPPY BIRTHDAY ALKA KUMARI";


/* =========================================
   RESIZE CANVAS
========================================= */

function resizeCanvas() {

    width =
        canvas.width =
        window.innerWidth;


    height =
        canvas.height =
        window.innerHeight;


    const fontSize = 17;


    columns =
        Math.ceil(
            width / fontSize
        );


    drops =
        Array(columns)
            .fill(0)
            .map(() =>
                Math.random() *
                -100
            );

}


window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();


/* =========================================
   MATRIX DRAWING
========================================= */

function drawMatrix() {

    /*
       Transparent black layer
       creates the fading trails.
    */

    ctx.fillStyle =
        "rgba(0, 0, 0, 0.075)";


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    const fontSize = 17;


    ctx.font =
        `${fontSize}px monospace`;


    for (
        let i = 0;
        i < columns;
        i++
    ) {

        /*
           Select character
           from birthday phrase.
        */

        const character =
            birthdayPhrase[
                Math.floor(
                    Math.random() *
                    birthdayPhrase.length
                )
            ];


        const x =
            i * fontSize;


        const y =
            drops[i] * fontSize;


        /*
           Main green character.
        */

        ctx.fillStyle =
            "#36ff7a";


        ctx.shadowColor =
            "#00ff66";


        ctx.shadowBlur = 8;


        ctx.fillText(
            character,
            x,
            y
        );


        /*
           Random bright characters.
        */

        if (
            Math.random() > 0.92
        ) {

            ctx.fillStyle =
                "#b8ffd0";

            ctx.shadowBlur = 18;

            ctx.fillText(
                character,
                x,
                y
            );

        }


        ctx.shadowBlur = 0;


        /*
           Reset column after it
           leaves the screen.
        */

        if (
            y > height &&
            Math.random() > 0.975
        ) {

            drops[i] =
                Math.random() * -20;

        }


        /*
           Falling speed.
        */

        drops[i] +=
            0.45 +
            Math.random() * 0.25;

    }


    requestAnimationFrame(
        drawMatrix
    );

}


drawMatrix();


/* =========================================
   INITIALIZE WEBSITE
========================================= */

showPage(1);