require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;


/* =========================================
   НАСТРОЙКИ EXPRESS
========================================= */

app.use(express.json({ limit: "50kb" }));

/*
   Папка public доступна напрямую
*/
app.use(express.static(path.join(__dirname, "public")));


/* =========================================
   ПРОВЕРКА SMTP НАСТРОЕК
========================================= */

console.log("");
console.log("========== SMTP ==========");
console.log("HOST:", process.env.SMTP_HOST);
console.log("PORT:", process.env.SMTP_PORT);
console.log("USER:", process.env.SMTP_USER);
console.log("==========================");
console.log("");


/* =========================================
   СОЗДАНИЕ EMAIL TRANSPORTER
========================================= */

const transporter = nodemailer.createTransport({

    host: process.env.SMTP_HOST,

    port: Number(
        process.env.SMTP_PORT || 465
    ),

    secure:
        String(
            process.env.SMTP_SECURE || "true"
        ) === "true",

    auth: {

        user: process.env.SMTP_USER,

        pass: process.env.SMTP_PASS

    }

});


/* =========================================
   ПРОВЕРКА ПОДКЛЮЧЕНИЯ К SMTP
========================================= */

transporter.verify((error, success) => {

    if (error) {

        console.error("");
        console.error("========== SMTP ERROR ==========");
        console.error(error);
        console.error("================================");
        console.error("");

    } else {

        console.log("");
        console.log("SMTP server готов к отправке.");
        console.log("");

    }

});


/* =========================================
   RSVP
========================================= */

app.post("/rsvp", async (req, res) => {

    try {

        const {
            language,
            name,
            attendance,
            guests,
            message
        } = req.body || {};


        /* =================================
           ПРОВЕРКА ОБЯЗАТЕЛЬНЫХ ПОЛЕЙ
        ================================= */

        if (
            !name ||
            !attendance ||
            !guests
        ) {

            return res.status(400).json({

                error:
                    "Необходимо заполнить обязательные поля."

            });

        }


        /* =================================
           ЯЗЫК
        ================================= */

        const langName =
            language === "am"

                ? "Армянский / Հայերեն"

                : "Русский / Ռուսերեն";


        /* =================================
           ПРИСУТСТВИЕ
        ================================= */

        const attendText =
            attendance === "yes"

                ? "Будет / Կմասնակցի"

                : "Не будет / Չի մասնակցի";


        /* =================================
           ТЕКСТ ПИСЬМА
        ================================= */

        const text = [

            "Свадьба Nairi & Lolita",

            "Дата: 13.11.2026",

            "Место: Mkrtchyan Hall",

            "Адрес: 2/10 Echmiatsin St, Masis 0801, Armenia",

            "",

            `Язык формы: ${langName}`,

            `Имя: ${name}`,

            `Присутствие: ${attendText}`,

            `Количество гостей: ${guests}`,

            `Комментарий: ${message || "—"}`

        ].join("\n");


        /* =================================
           ОТПРАВКА ПИСЬМА
        ================================= */

        console.log("");
        console.log("Отправляем RSVP...");
        console.log("Имя:", name);
        console.log("Гостей:", guests);
        console.log("");


        await transporter.sendMail({

            from:
                process.env.MAIL_FROM ||
                process.env.SMTP_USER,

            to:
                "ll0393207@gmail.com",

            subject:
                `RSVP — ${name} — Nairi & Lolita`,

            text

        });


        /* =================================
           УСПЕШНАЯ ОТПРАВКА
        ================================= */

        console.log("");
        console.log("================================");
        console.log("Письмо успешно отправлено!");
        console.log("================================");
        console.log("");


        return res.json({

            ok: true

        });

    } catch (error) {

        /* =================================
           ОШИБКА
        ================================= */

        console.error("");
        console.error("================================");
        console.error("ОШИБКА ОТПРАВКИ EMAIL:");
        console.error(error);
        console.error("================================");
        console.error("");


        return res.status(500).json({

            error:
                "Mail sending failed"

        });

    }

});


/* =========================================
   ЗАПУСК СЕРВЕРА
========================================= */

app.listen(
    PORT,
    "0.0.0.0",
    () => {
        console.log(
            `Wedding site started on port ${PORT}`
        );
    }
);