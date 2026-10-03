document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("intro");
    const introVideo = document.getElementById("introVideo");
    const skip = document.getElementById("skip");

    const languageChoice =
        document.getElementById("languageChoice");

    const introRu =
        document.getElementById("introRu");

    const introAm =
        document.getElementById("introAm");

    const site =
        document.getElementById("site");

    const ru =
        document.getElementById("ru");

    const am =
        document.getElementById("am");

    const weddingMusic =
        document.getElementById("weddingMusic");

    const musicButton =
        document.getElementById("musicButton");


    /* =========================================
       НАЧАЛЬНОЕ СОСТОЯНИЕ
    ========================================= */

    if (site) {
        site.style.display = "none";
    }

    if (languageChoice) {
        languageChoice.style.display = "none";
    }

    if (ru) {
        ru.style.display = "none";
    }

    if (am) {
        am.style.display = "none";
    }

    if (musicButton) {
        musicButton.style.display = "none";
    }


    /* =========================================
       МУЗЫКА
       ЗАПУСКАЕТСЯ ВМЕСТЕ С ВИДЕО
    ========================================= */

    function startMusic() {

        if (!weddingMusic) {
            return;
        }

        weddingMusic.volume = 0.1;

        weddingMusic.play()
            .then(() => {

                console.log(
                    "Музыка запущена"
                );

                if (musicButton) {
                    musicButton.textContent = "♫";
                }

            })
            .catch((error) => {

                console.log(
                    "Автозапуск музыки заблокирован браузером:",
                    error
                );

            });
    }


    /* =========================================
       ЗАПУСК ВИДЕО И МУЗЫКИ
    ========================================= */

    function startIntro() {

        /* Видео */
        if (introVideo) {

            introVideo.currentTime = 0;

            introVideo.play()
                .then(() => {

                    console.log(
                        "Видео запущено"
                    );

                })
                .catch((error) => {

                    console.log(
                        "Видео не запустилось:",
                        error
                    );

                });

        }


        /* Музыка */
        startMusic();

    }


    /*
       Пытаемся запустить сразу.
       Если браузер блокирует звук,
       музыка попробует запуститься
       после первого клика пользователя.
    */

    startIntro();


    /* =========================================
       ЕСЛИ БРАУЗЕР ЗАБЛОКИРОВАЛ МУЗЫКУ
    ========================================= */

    document.addEventListener(
        "click",
        () => {

            if (
                weddingMusic &&
                weddingMusic.paused
            ) {

                weddingMusic.volume = 0.45;

                weddingMusic.play()
                    .then(() => {

                        console.log(
                            "Музыка запущена после действия пользователя"
                        );

                        if (musicButton) {
                            musicButton.textContent = "♫";
                        }

                    })
                    .catch(() => {});

            }

        },
        {
            once: true
        }
    );


    /* =========================================
       ПОКАЗАТЬ ВЫБОР ЯЗЫКА
    ========================================= */

    function showLanguageChoice() {

        /*
           Останавливаем только видео.
           Музыку НЕ останавливаем.
        */

        if (introVideo) {
            introVideo.pause();
        }


        /* Убираем кнопку "Пропустить" */

        if (skip) {
            skip.style.display = "none";
        }


        /* Убираем intro */

        if (intro) {
            intro.style.display = "none";
        }


        /* Показываем выбор языка */

        if (languageChoice) {
            languageChoice.style.display = "flex";
        }


        /* Показываем кнопку музыки */

        if (musicButton) {
            musicButton.style.display = "flex";
        }


        console.log(
            "Выбор языка показан"
        );

    }


    /* =========================================
       КОНЕЦ ВИДЕО
    ========================================= */

    if (introVideo) {

        introVideo.addEventListener(
            "ended",
            () => {

                console.log(
                    "Видео закончилось"
                );

                /*
                   Музыку НЕ останавливаем.
                */

                showLanguageChoice();

            }
        );

    }


    /* =========================================
       КНОПКА "ПРОПУСТИТЬ"
    ========================================= */

    if (skip) {

        skip.addEventListener(
            "click",
            () => {

                console.log(
                    "Нажата кнопка Пропустить"
                );

                /*
                   Музыка продолжает играть.
                */

                if (
                    weddingMusic &&
                    weddingMusic.paused
                ) {

                    startMusic();

                }

                showLanguageChoice();

            }
        );

    }


    /* =========================================
       РУССКИЙ
    ========================================= */

    if (introRu) {

        introRu.addEventListener(
            "click",
            () => {

                console.log(
                    "Выбран русский"
                );

                openSite("ru");

            }
        );

    }


    /* =========================================
       АРМЯНСКИЙ
    ========================================= */

    if (introAm) {

        introAm.addEventListener(
            "click",
            () => {

                console.log(
                    "Выбран армянский"
                );

                openSite("am");

            }
        );

    }


    /* =========================================
       ОТКРЫТЬ САЙТ
    ========================================= */

    function openSite(language) {

        if (languageChoice) {
            languageChoice.style.display = "none";
        }


        if (site) {
            site.style.display = "block";
        }


        if (language === "ru") {

            if (ru) {
                ru.style.display = "block";
            }

            if (am) {
                am.style.display = "none";
            }

            document.documentElement.lang = "ru";

        } else {

            if (am) {
                am.style.display = "block";
            }

            if (ru) {
                ru.style.display = "none";
            }

            document.documentElement.lang = "hy";

        }


        /*
           Музыку здесь НЕ запускаем заново.
           Она уже играет с начала видео.
        */


        window.scrollTo(
            0,
            0
        );

    }


    /* =========================================
       КНОПКА МУЗЫКИ
    ========================================= */

    if (musicButton) {

        musicButton.addEventListener(
            "click",
            (event) => {

                /*
                   Чтобы глобальный click
                   не мешал кнопке.
                */

                event.stopPropagation();


                if (
                    weddingMusic &&
                    weddingMusic.paused
                ) {

                    weddingMusic.volume = 0.45;

                    weddingMusic.play()
                        .then(() => {

                            musicButton.textContent =
                                "♫";

                        })
                        .catch((error) => {

                            console.log(
                                "Не удалось включить музыку:",
                                error
                            );

                        });

                } else {

                    if (weddingMusic) {

                        weddingMusic.pause();

                    }

                    musicButton.textContent = "♪";

                }

            }
        );

    }


    /* =========================================
       RSVP — РУССКИЙ
    ========================================= */

    const rsvpFormRu =
        document.getElementById(
            "rsvpFormRu"
        );


    if (rsvpFormRu) {

        rsvpFormRu.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();

                await sendRSVP("ru");

            }
        );

    }


    /* =========================================
       RSVP — АРМЯНСКИЙ
    ========================================= */

    const rsvpFormAm =
        document.getElementById(
            "rsvpFormAm"
        );


    if (rsvpFormAm) {

        rsvpFormAm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();

                await sendRSVP("am");

            }
        );

    }


    /* =========================================
       ОТПРАВКА RSVP
    ========================================= */

    async function sendRSVP(language) {

        let name;
        let attendance;
        let side;
        let guests;
        let message;

        let submitButton;
        let note;
        let success;
        let form;


        /* =====================================
           РУССКИЙ
        ===================================== */

        if (language === "ru") {

            form = rsvpFormRu;


            name = document
                .getElementById("nameRu")
                .value
                .trim();


            attendance = document
                .getElementById("attendanceRu")
                .value;


            side = document
                .getElementById("sideRu")
                .value;


            guests = document
                .getElementById("guestsRu")
                .value;


            message = document
                .getElementById("messageRu")
                .value
                .trim();


            submitButton =
                document.getElementById(
                    "submitRu"
                );


            note =
                document.getElementById(
                    "noteRu"
                );


            success =
                document.getElementById(
                    "successRu"
                );

        }


        /* =====================================
           АРМЯНСКИЙ
        ===================================== */

        else {

            form = rsvpFormAm;


            name = document
                .getElementById("nameAm")
                .value
                .trim();


            attendance = document
                .getElementById("attendanceAm")
                .value;


            side = document
                .getElementById("sideAm")
                .value;


            guests = document
                .getElementById("guestsAm")
                .value;


            message = document
                .getElementById("messageAm")
                .value
                .trim();


            submitButton =
                document.getElementById(
                    "submitAm"
                );


            note =
                document.getElementById(
                    "noteAm"
                );


            success =
                document.getElementById(
                    "successAm"
                );

        }


        /* =====================================
           ОЧИСТКА СООБЩЕНИЙ
        ===================================== */

        if (note) {

            note.textContent = "";

        }


        if (success) {

            success.textContent = "";

        }


        /* =====================================
           ПРОВЕРКА
        ===================================== */

        if (
            !name ||
            !attendance ||
            !side ||
            !guests
        ) {

            if (note) {

                note.textContent =
                    language === "ru"

                        ? "Пожалуйста, заполните обязательные поля."

                        : "Խնդրում ենք լրացնել պարտադիր դաշտերը։";

            }

            return;

        }


        /* Блокируем кнопку */

        if (submitButton) {

            submitButton.disabled = true;

        }


        /* =====================================
           ТЕКСТ ПРИСУТСТВИЯ
        ===================================== */

        const attendanceText =

            language === "ru"

                ? (

                    attendance === "yes"

                        ? "С радостью буду"

                        : "К сожалению, не смогу"

                )

                : (

                    attendance === "yes"

                        ? "Սիրով կմասնակցեմ"

                        : "Ցավոք, չեմ կարողանա"

                );


        /* =====================================
           ТЕКСТ СТОРОНЫ
        ===================================== */

        const sideText =

            language === "ru"

                ? (

                    side === "groom"

                        ? "Со стороны жениха"

                        : "Со стороны невесты"

                )

                : (

                    side === "groom"

                        ? "Փեսայի կողմից"

                        : "Հարսի կողմից"

                );


        /* =====================================
           ДАННЫЕ RSVP
        ===================================== */

        const data = {

            language:

                language === "ru"

                    ? "Русский"

                    : "Հայերեն",


            name: name,


            attendance:
                attendanceText,


            side:
                sideText,


            guests:
                guests,


            message:
                message || "—",


            subject:
                "RSVP — " +
                name +
                " — Nairi & Lolita"

        };


        /* =====================================
           ОТПРАВКА
        ===================================== */

        try {

            const response = await fetch(

                "https://formsubmit.co/ajax/harsanik1311@gmail.com",

                {

                    method: "POST",


                    headers: {

                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json"

                    },


                    body:
                        JSON.stringify(data)

                }

            );


            const result =
                await response.json();


            /* =================================
               УСПЕШНАЯ ОТПРАВКА
            ================================= */

            if (
                response.ok &&
                result.success !== false
            ) {

                if (success) {

                    success.textContent =

                        language === "ru"

                            ? "Спасибо ♥ Ваш ответ отправлен."

                            : "Շնորհակալություն ♥ Ձեր պատասխանը ուղարկված է։";

                }


                if (form) {

                    form.reset();

                }

            }


            /* =================================
               ОШИБКА ОТПРАВКИ
            ================================= */

            else {

                if (note) {

                    note.textContent =

                        language === "ru"

                            ? "Не удалось отправить ответ."

                            : "Չհաջողվեց ուղարկել պատասխանը։";

                }

            }


        }


        /* =====================================
           ОШИБКА СОЕДИНЕНИЯ
        ===================================== */

        catch (error) {

            console.error(
                "RSVP error:",
                error
            );


            if (note) {

                note.textContent =

                    language === "ru"

                        ? "Ошибка соединения."

                        : "Կապի սխալ։";

            }

        }


        /* Разблокируем кнопку */

        if (submitButton) {

            submitButton.disabled = false;

        }

    }

});