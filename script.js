document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("intro");
    const introVideo = document.getElementById("introVideo");
    const skip = document.getElementById("skip");

    const languageChoice = document.getElementById("languageChoice");
    const introRu = document.getElementById("introRu");
    const introAm = document.getElementById("introAm");

    const site = document.getElementById("site");
    const ru = document.getElementById("ru");
    const am = document.getElementById("am");

    const weddingMusic = document.getElementById("weddingMusic");
    const musicButton = document.getElementById("musicButton");


    /* =========================================
       НАЧАЛЬНОЕ СОСТОЯНИЕ
    ========================================= */

    site.style.display = "none";
    languageChoice.style.display = "none";

    ru.style.display = "none";
    am.style.display = "none";

    musicButton.style.display = "none";


    /* =========================================
       ПОКАЗАТЬ ВЫБОР ЯЗЫКА
    ========================================= */

    function showLanguageChoice() {

        // Останавливаем видео
        if (introVideo) {
            introVideo.pause();
        }

        // Убираем кнопку "Пропустить"
        if (skip) {
            skip.style.display = "none";
        }

        // Убираем intro
        if (intro) {
            intro.style.display = "none";
        }

        // ПОКАЗЫВАЕМ ЯЗЫКИ
        languageChoice.style.display = "flex";

        // Показываем кнопку музыки
        musicButton.style.display = "flex";

        console.log("Выбор языка показан");
    }


    /* =========================================
       КОНЕЦ ВИДЕО
    ========================================= */

    if (introVideo) {

        introVideo.addEventListener("ended", () => {

            showLanguageChoice();

        });

    }


    /* =========================================
       КНОПКА ПРОПУСТИТЬ
    ========================================= */

    if (skip) {

        skip.addEventListener("click", () => {

            console.log("Нажата кнопка Пропустить");

            showLanguageChoice();

        });

    }


    /* =========================================
       РУССКИЙ
    ========================================= */

    if (introRu) {

        introRu.addEventListener("click", () => {

            console.log("Выбран русский");

            openSite("ru");

        });

    }


    /* =========================================
       АРМЯНСКИЙ
    ========================================= */

    if (introAm) {

        introAm.addEventListener("click", () => {

            console.log("Выбран армянский");

            openSite("am");

        });

    }


    /* =========================================
       ОТКРЫТЬ САЙТ
    ========================================= */

    function openSite(language) {

        languageChoice.style.display = "none";

        site.style.display = "block";

        if (language === "ru") {

            ru.style.display = "block";
            am.style.display = "none";

            document.documentElement.lang = "ru";

        } else {

            am.style.display = "block";
            ru.style.display = "none";

            document.documentElement.lang = "hy";
        }


        // Музыка
        startMusic();


        // Вверх страницы
        window.scrollTo(0, 0);

    }


    /* =========================================
       МУЗЫКА
    ========================================= */

    function startMusic() {

        if (!weddingMusic) {
            return;
        }

        weddingMusic.volume = 0.45;

        weddingMusic.play()
            .then(() => {

                musicButton.textContent = "♫";

            })
            .catch(() => {

                console.log(
                    "Автозапуск музыки заблокирован браузером"
                );

            });

    }


    /* =========================================
       КНОПКА МУЗЫКИ
    ========================================= */

    if (musicButton) {

        musicButton.addEventListener("click", () => {

            if (weddingMusic.paused) {

                weddingMusic.play()
                    .then(() => {

                        musicButton.textContent = "♫";

                    })
                    .catch(() => {});

            } else {

                weddingMusic.pause();

                musicButton.textContent = "♪";

            }

        });

    }


    /* =========================================
       RSVP — РУССКИЙ
    ========================================= */

    const rsvpFormRu =
        document.getElementById("rsvpFormRu");


    if (rsvpFormRu) {

        rsvpFormRu.addEventListener("submit", async (event) => {

            event.preventDefault();

            await sendRSVP("ru");

        });

    }


    /* =========================================
       RSVP — АРМЯНСКИЙ
    ========================================= */

    const rsvpFormAm =
        document.getElementById("rsvpFormAm");


    if (rsvpFormAm) {

        rsvpFormAm.addEventListener("submit", async (event) => {

            event.preventDefault();

            await sendRSVP("am");

        });

    }


    /* =========================================
       ОТПРАВКА RSVP
    ========================================= */

    async function sendRSVP(language) {

        let name;
        let attendance;
        let guests;
        let message;

        let submitButton;
        let note;
        let success;
        let form;


        if (language === "ru") {

            form = rsvpFormRu;

            name = document
                .getElementById("nameRu")
                .value
                .trim();

            attendance = document
                .getElementById("attendanceRu")
                .value;

            guests = document
                .getElementById("guestsRu")
                .value;

            message = document
                .getElementById("messageRu")
                .value
                .trim();

            submitButton =
                document.getElementById("submitRu");

            note =
                document.getElementById("noteRu");

            success =
                document.getElementById("successRu");

        } else {

            form = rsvpFormAm;

            name = document
                .getElementById("nameAm")
                .value
                .trim();

            attendance = document
                .getElementById("attendanceAm")
                .value;

            guests = document
                .getElementById("guestsAm")
                .value;

            message = document
                .getElementById("messageAm")
                .value
                .trim();

            submitButton =
                document.getElementById("submitAm");

            note =
                document.getElementById("noteAm");

            success =
                document.getElementById("successAm");

        }


        if (note) {
            note.textContent = "";
        }

        if (success) {
            success.textContent = "";
        }


        /* ПРОВЕРКА */

        if (!name || !attendance || !guests) {

            note.textContent =
                language === "ru"
                    ? "Пожалуйста, заполните обязательные поля."
                    : "Խնդրում ենք լրացնել պարտադիր դաշտերը։";

            return;
        }


        submitButton.disabled = true;


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


        const data = {

            language:
                language === "ru"
                    ? "Русский"
                    : "Հայերեն",

            name: name,

            attendance: attendanceText,

            guests: guests,

            message: message || "—",

            subject:
                "RSVP — " +
                name +
                " — Nairi & Lolita"
        };


        try {

            const response = await fetch(
                "https://formsubmit.co/ajax/harsanik1311@gmail.com",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },

                    body: JSON.stringify(data)
                }
            );


            const result = await response.json();


            if (response.ok && result.success !== false) {

                success.textContent =
                    language === "ru"

                        ? "Спасибо ♥ Ваш ответ отправлен."

                        : "Շնորհակալություն ♥ Ձեր պատասխանը ուղարկված է։";

                form.reset();

            } else {

                note.textContent =
                    language === "ru"

                        ? "Не удалось отправить ответ."

                        : "Չհաջողվեց ուղարկել պատասխանը։";

            }


        } catch (error) {

            console.error(error);

            note.textContent =
                language === "ru"

                    ? "Ошибка соединения."

                    : "Կապի սխալ։";

        }


        submitButton.disabled = false;

    }

});