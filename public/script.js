/* =====================================================
   ELEMENTS
===================================================== */

const intro = document.getElementById("intro");

const video = document.getElementById("introVideo");

const site = document.getElementById("site");

const skipButton = document.getElementById("skip");

const languageChoice =
    document.getElementById("languageChoice");

const introRu =
    document.getElementById("introRu");

const introAm =
    document.getElementById("introAm");

const ru =
    document.getElementById("ru");

const am =
    document.getElementById("am");

const heroPhoto =
    document.getElementById("heroPhoto");

const note =
    document.getElementById("note");

const success =
    document.getElementById("success");

const submitRu =
    document.getElementById("submitRu");

const submitAm =
    document.getElementById("submitAm");


/* =====================================================
   MUSIC
===================================================== */

const weddingMusic =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");


/* =====================================================
   PHOTOS
===================================================== */

const photos = {

    ru: "photo-ru.jpg",

    am: "photo-am.jpg"

};


/* =====================================================
   VARIABLES
===================================================== */

let videoFinished = false;

let selectedLanguage = false;

let musicPlaying = false;


/* =====================================================
   START VIDEO + MUSIC TOGETHER
===================================================== */

async function startIntroMedia() {

    try {

        if (weddingMusic) {

            weddingMusic.currentTime = 0;

            weddingMusic.volume = 0.45;

        }


        /*
           Запускаем видео
        */

        const videoPromise =
            video
                ? video.play()
                : Promise.resolve();


        /*
           Одновременно запускаем музыку
        */

        const musicPromise =
            weddingMusic
                ? weddingMusic.play()
                : Promise.resolve();


        /*
           Ждём оба запуска,
           но если браузер заблокировал
           один из них — сайт не ломается
        */

        await Promise.allSettled([

            videoPromise,

            musicPromise

        ]);


        /*
           Проверяем состояние музыки
        */

        if (
            weddingMusic &&
            !weddingMusic.paused
        ) {

            musicPlaying = true;

            updateMusicButton();

        }

    } catch (error) {

        console.log(
            "Ошибка запуска видео/музыки:",
            error
        );

    }

}


/* =====================================================
   MUSIC BUTTON
===================================================== */

function updateMusicButton() {

    if (!musicButton) {
        return;
    }


    if (musicPlaying) {

        musicButton.textContent = "♫";

        musicButton.classList.add(
            "playing"
        );

        musicButton.classList.remove(
            "muted"
        );

        musicButton.setAttribute(
            "aria-label",
            "Выключить музыку"
        );

    } else {

        musicButton.textContent = "🔇";

        musicButton.classList.remove(
            "playing"
        );

        musicButton.classList.add(
            "muted"
        );

        musicButton.setAttribute(
            "aria-label",
            "Включить музыку"
        );

    }

}


/* =====================================================
   MUSIC ON / OFF
===================================================== */

if (musicButton) {

    musicButton.addEventListener(
        "click",
        async function () {

            if (!weddingMusic) {
                return;
            }


            if (musicPlaying) {

                weddingMusic.pause();

                musicPlaying = false;

                updateMusicButton();

            } else {

                try {

                    await weddingMusic.play();

                    musicPlaying = true;

                    updateMusicButton();

                } catch (error) {

                    console.log(
                        "Не удалось включить музыку:",
                        error
                    );

                }

            }

        }
    );

}


/* =====================================================
   SHOW LANGUAGE CHOICE
===================================================== */

function showLanguageChoice() {

    if (videoFinished) {
        return;
    }


    videoFinished = true;


    if (video) {
        video.pause();
    }


    /*
       Музыку НЕ останавливаем.

       Она продолжает играть,
       пока человек выбирает язык.
    */


    if (skipButton) {

        skipButton.style.display =
            "none";

    }


    if (languageChoice) {

        languageChoice.classList.add(
            "show"
        );

    }

}


/* =====================================================
   OPEN WEBSITE
===================================================== */

async function openSite(language) {

    if (selectedLanguage) {
        return;
    }


    selectedLanguage = true;


    /*
       Если браузер ранее заблокировал
       звук, нажатие RU / ՀԱՅ является
       пользовательским действием.

       Поэтому пробуем включить музыку ещё раз.
    */

    if (
        weddingMusic &&
        weddingMusic.paused
    ) {

        try {

            await weddingMusic.play();

            musicPlaying = true;

            updateMusicButton();

        } catch (error) {

            console.log(
                "Музыка заблокирована браузером:",
                error
            );

        }

    }


    /*
       Выбираем язык
    */

    if (language === "ru") {

        setRussian();

    } else {

        setArmenian();

    }


    /*
       Убираем выбор языка
    */

    if (languageChoice) {

        languageChoice.classList.remove(
            "show"
        );

    }


    /*
       Плавно убираем intro
    */

    intro.style.opacity = "0";


    /*
       Открываем сайт
    */

    setTimeout(function () {

        intro.style.display = "none";

        site.classList.add("show");

        window.scrollTo(0, 0);

    }, 800);

}


/* =====================================================
   RUSSIAN
===================================================== */

function setRussian() {

    if (ru) {

        ru.style.display =
            "block";

    }


    if (am) {

        am.style.display =
            "none";

    }


    if (heroPhoto) {

        heroPhoto.src =
            photos.ru;

        heroPhoto.alt =
            "Nairi & Lolita";

    }


    document.documentElement.lang =
        "ru";


    if (note) {

        note.textContent = "";

    }

}


/* =====================================================
   ARMENIAN
===================================================== */

function setArmenian() {

    if (ru) {

        ru.style.display =
            "none";

    }


    if (am) {

        am.style.display =
            "block";

    }


    if (heroPhoto) {

        heroPhoto.src =
            photos.am;

        heroPhoto.alt =
            "Նաիրի և Լոլիտա";

    }


    document.documentElement.lang =
        "hy";


    if (note) {

        note.textContent = "";

    }

}


/* =====================================================
   LANGUAGE BUTTONS
===================================================== */

if (introRu) {

    introRu.addEventListener(
        "click",
        function () {

            openSite("ru");

        }
    );

}


if (introAm) {

    introAm.addEventListener(
        "click",
        function () {

            openSite("am");

        }
    );

}


/* =====================================================
   SKIP VIDEO
===================================================== */

if (skipButton) {

    skipButton.addEventListener(
        "click",
        function () {

            if (video) {

                video.pause();

            }


            /*
               Музыку НЕ выключаем.

               Она продолжает играть.
            */

            showLanguageChoice();

        }
    );

}


/* =====================================================
   VIDEO ENDED
===================================================== */

if (video) {

    video.addEventListener(
        "ended",
        function () {

            /*
               Музыка продолжает играть.
            */

            showLanguageChoice();

        }
    );


    video.addEventListener(
        "error",
        function () {

            showLanguageChoice();

        }
    );

}


/* =====================================================
   START MEDIA
===================================================== */

startIntroMedia();


/* =====================================================
   RSVP
===================================================== */

async function sendRSVP(language) {

    const russian =
        language === "ru";


    /* =================================================
       NAME
    ================================================= */

    const nameElement =
        document.getElementById(
            russian
                ? "nameRu"
                : "nameAm"
        );


    const name =
        nameElement.value.trim();


    /* =================================================
       ATTENDANCE
    ================================================= */

    const attendanceName =
        russian
            ? "attendanceRu"
            : "attendanceAm";


    const attendanceElement =
        document.querySelector(
            `input[name="${attendanceName}"]:checked`
        );


    const attendance =
        attendanceElement
            ? attendanceElement.value
            : "";


    /* =================================================
       GUESTS
    ================================================= */

    const guestsElement =
        document.getElementById(
            russian
                ? "guestsRu"
                : "guestsAm"
        );


    const guests =
        guestsElement.value;


    /* =================================================
       MESSAGE
    ================================================= */

    const messageElement =
        document.getElementById(
            russian
                ? "messageRu"
                : "messageAm"
        );


    const message =
        messageElement.value.trim();


    /* =================================================
       VALIDATION
    ================================================= */

    if (
        !name ||
        !attendance ||
        !guests
    ) {

        note.textContent =
            russian

                ? "Пожалуйста, заполните обязательные поля."

                : "Խնդրում ենք լրացնել պարտադիր դաշտերը։";


        note.style.display =
            "block";


        return;

    }


    /* =================================================
       SENDING
    ================================================= */

    note.textContent =
        russian

            ? "Отправляем…"

            : "Ուղարկվում է…";


    note.style.display =
        "block";


    const currentButton =
        russian
            ? submitRu
            : submitAm;


    currentButton.disabled =
        true;


    try {

        const response =
            await fetch(
                "/rsvp",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        language,

                        name,

                        attendance,

                        guests,

                        message

                    })

                }
            );


        /* =================================================
           SERVER ERROR
        ================================================= */

        if (!response.ok) {

            let errorMessage =
                "Ошибка отправки";


            try {

                const data =
                    await response.json();


                if (data.error) {

                    errorMessage =
                        data.error;

                }

            } catch (error) {

                console.log(error);

            }


            throw new Error(
                errorMessage
            );

        }


        /* =================================================
           SUCCESS
        ================================================= */

        ru.style.display =
            "none";

        am.style.display =
            "none";

        note.style.display =
            "none";

        success.style.display =
            "block";


    } catch (error) {

        console.error(
            "RSVP error:",
            error
        );


        note.textContent =
            russian

                ? "Не удалось отправить. Проверьте подключение к серверу."

                : "Չհաջողվեց ուղարկել։ Ստուգեք սերվերի միացումը։";


        note.style.display =
            "block";


        currentButton.disabled =
            false;

    }

}


/* =====================================================
   RSVP BUTTONS
===================================================== */

if (submitRu) {

    submitRu.addEventListener(
        "click",
        function () {

            sendRSVP("ru");

        }
    );

}


if (submitAm) {

    submitAm.addEventListener(
        "click",
        function () {

            sendRSVP("am");

        }
    );

}