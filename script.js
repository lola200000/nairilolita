document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

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
       INTRO MEDIA
    ========================================= */

    function startMusic() {

        if (!weddingMusic) return;

        weddingMusic.volume = 0.45;

        const playPromise = weddingMusic.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => {
                console.log("Музыка ожидает действия пользователя.");
            });
        }
    }


    function updateMusicButton() {

        if (!musicButton || !weddingMusic) return;

        if (weddingMusic.paused) {
            musicButton.textContent = "♪";
        } else {
            musicButton.textContent = "♫";
        }
    }


    /* =========================================
       START INTRO
    ========================================= */

    if (introVideo) {

        introVideo.play().catch(() => {
            console.log("Видео ожидает действия пользователя.");
        });

    }

    startMusic();
    updateMusicButton();


    /* =========================================
       VIDEO ENDED
    ========================================= */

    if (introVideo) {

        introVideo.addEventListener("ended", () => {

            showLanguageChoice();

        });

    }


    /* =========================================
       SKIP BUTTON
    ========================================= */

    if (skip) {

        skip.addEventListener("click", () => {

            if (introVideo) {
                introVideo.pause();
            }

            showLanguageChoice();

        });

    }


    /* =========================================
       SHOW LANGUAGE
    ========================================= */

    function showLanguageChoice() {

        if (!languageChoice) return;

        languageChoice.classList.add("show");

        if (skip) {
            skip.style.display = "none";
        }

    }


    /* =========================================
       MUSIC BUTTON
    ========================================= */

    if (musicButton) {

        musicButton.addEventListener("click", async () => {

            if (!weddingMusic) return;

            if (weddingMusic.paused) {

                try {

                    await weddingMusic.play();

                } catch (error) {

                    console.log("Не удалось включить музыку.");

                }

            } else {

                weddingMusic.pause();

            }

            updateMusicButton();

        });

    }


    /* =========================================
       LANGUAGE BUTTONS
    ========================================= */

    if (introRu) {

        introRu.addEventListener("click", () => {

            openSite("ru");

        });

    }


    if (introAm) {

        introAm.addEventListener("click", () => {

            openSite("am");

        });

    }


    /* =========================================
       OPEN SITE
    ========================================= */

    function openSite(language) {

        /*
         * Повторно пытаемся запустить музыку после
         * действия пользователя.
         */

        if (weddingMusic && weddingMusic.paused) {

            weddingMusic.play()
                .then(() => {
                    updateMusicButton();
                })
                .catch(() => {
                    console.log("Музыка не запустилась.");
                });

        }


        if (language === "ru") {

            setRussian();

        } else {

            setArmenian();

        }


        if (site) {

            site.classList.add("show");

        }


        if (languageChoice) {

            languageChoice.classList.remove("show");

        }


        if (intro) {

            intro.style.opacity = "0";

            setTimeout(() => {

                intro.style.display = "none";

            }, 700);

        }

    }


    /* =========================================
       RUSSIAN
    ========================================= */

    function setRussian() {

        if (ru) {

            ru.style.display = "block";

        }

        if (am) {

            am.style.display = "none";

        }

        document.documentElement.lang = "ru";

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }


    /* =========================================
       ARMENIAN
    ========================================= */

    function setArmenian() {

        if (am) {

            am.style.display = "block";

        }

        if (ru) {

            ru.style.display = "none";

        }

        document.documentElement.lang = "hy";

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }


    /* =========================================
       RSVP — RUSSIAN
    ========================================= */

    const rsvpFormRu = document.getElementById("rsvpFormRu");

    if (rsvpFormRu) {

        rsvpFormRu.addEventListener("submit", async (event) => {

            event.preventDefault();

            await sendRSVP("ru");

        });

    }


    /* =========================================
       RSVP — ARMENIAN
    ========================================= */

    const rsvpFormAm = document.getElementById("rsvpFormAm");

    if (rsvpFormAm) {

        rsvpFormAm.addEventListener("submit", async (event) => {

            event.preventDefault();

            await sendRSVP("am");

        });

    }


    /* =========================================
       SEND RSVP
    ========================================= */

    async function sendRSVP(language) {

        let name;
        let attendance;
        let guests;
        let message;
        let submitButton;
        let note;
        let success;


        /* -----------------------------------------
           GET RUSSIAN DATA
        ----------------------------------------- */

        if (language === "ru") {

            name = document.getElementById("nameRu")?.value.trim();

            attendance = document.querySelector(
                'input[name="attendanceRu"]:checked'
            )?.value;

            guests = document.getElementById("guestsRu")?.value;

            message = document.getElementById("messageRu")?.value.trim();

            submitButton = document.getElementById("submitRu");

            note = document.getElementById("noteRu");

            success = document.getElementById("successRu");

        }


        /* -----------------------------------------
           GET ARMENIAN DATA
        ----------------------------------------- */

        else {

            name = document.getElementById("nameAm")?.value.trim();

            attendance = document.querySelector(
                'input[name="attendanceAm"]:checked'
            )?.value;

            guests = document.getElementById("guestsAm")?.value;

            message = document.getElementById("messageAm")?.value.trim();

            submitButton = document.getElementById("submitAm");

            note = document.getElementById("noteAm");

            success = document.getElementById("successAm");

        }


        /* -----------------------------------------
           CLEAR MESSAGES
        ----------------------------------------- */

        if (note) {
            note.textContent = "";
        }

        if (success) {
            success.textContent = "";
        }


        /* -----------------------------------------
           VALIDATION
        ----------------------------------------- */

        if (!name) {

            if (note) {

                note.textContent =
                    language === "ru"
                        ? "Пожалуйста, укажите имя."
                        : "Խնդրում ենք նշել անունը։";

            }

            return;

        }


        if (!attendance) {

            if (note) {

                note.textContent =
                    language === "ru"
                        ? "Пожалуйста, укажите, сможете ли вы прийти."
                        : "Խնդրում ենք նշել՝ կկարողանա՞ք գալ։";

            }

            return;

        }


        if (!guests) {

            if (note) {

                note.textContent =
                    language === "ru"
                        ? "Пожалуйста, укажите количество гостей."
                        : "Խնդրում ենք նշել հյուրերի քանակը։";

            }

            return;

        }


        /* -----------------------------------------
           BUTTON
        ----------------------------------------- */

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.dataset.originalText =
                submitButton.textContent;

            submitButton.textContent =
                language === "ru"
                    ? "ОТПРАВКА..."
                    : "ՈՒՂԱՐԿՈՒՄ...";

        }


        /* -----------------------------------------
           TEXT
        ----------------------------------------- */

        let attendanceText;

        if (language === "ru") {

            attendanceText =
                attendance === "yes"
                    ? "С радостью буду ❤️"
                    : "К сожалению, не смогу";

        } else {

            attendanceText =
                attendance === "yes"
                    ? "Սիրով կմասնակցեմ ❤️"
                    : "Ցավոք, չեմ կարողանա";

        }


        const languageText =
            language === "ru"
                ? "Русский"
                : "Հայերեն";


        /* -----------------------------------------
           FORM DATA
        ----------------------------------------- */

        const formData = {

            language: languageText,

            name: name,

            attendance: attendanceText,

            guests: guests,

            message: message || "—",

            subject:
                "RSVP — " +
                name +
                " — Nairi & Lolita"

        };


        /* -----------------------------------------
           SEND TO FORMSUBMIT
        ----------------------------------------- */

        try {

            const response = await fetch(
                "https://formsubmit.co/ajax/ll0393207@gmail.com",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );


            const data = await response.json();


            /* -------------------------------------
               SUCCESS
            ------------------------------------- */

            if (response.ok && data.success !== false) {

                if (success) {

                    success.textContent =
                        language === "ru"
                            ? "Спасибо ♥ Ваш ответ отправлен."
                            : "Շնորհակալություն ♥ Ձեր պատասխանը ուղարկված է։";

                }

                if (note) {
                    note.textContent = "";
                }


                /*
                 * Очищаем форму
                 */

                if (language === "ru") {

                    rsvpFormRu?.reset();

                } else {

                    rsvpFormAm?.reset();

                }

            }


            /* -------------------------------------
               ERROR
            ------------------------------------- */

            else {

                if (note) {

                    note.textContent =
                        language === "ru"
                            ? "Не удалось отправить ответ. Попробуйте ещё раз."
                            : "Չհաջողվեց ուղարկել պատասխանը։ Փորձեք կրկին։";

                }

                console.log("FormSubmit error:", data);

            }

        }


        /* -----------------------------------------
           NETWORK ERROR
        ----------------------------------------- */

        catch (error) {

            console.error(error);

            if (note) {

                note.textContent =
                    language === "ru"
                        ? "Ошибка соединения. Попробуйте ещё раз."
                        : "Կապի սխալ։ Փորձեք կրկին։";

            }

        }


        /* -----------------------------------------
           RETURN BUTTON
        ----------------------------------------- */

        finally {

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.textContent =
                    submitButton.dataset.originalText;

            }

        }

    }


    /* =========================================
       INITIAL STATE
    ========================================= */

    if (site) {

        site.classList.remove("show");

    }

    if (ru) {

        ru.style.display = "none";

    }

    if (am) {

        am.style.display = "none";

    }

});