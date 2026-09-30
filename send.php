<?php

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'ok' => false,
        'message' => 'Метод запроса не поддерживается.'
    ]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode([
        'ok' => false,
        'message' => 'Некорректные данные.'
    ]);
    exit;
}


// ==========================
// Данные из формы
// ==========================

$language  = $data['language'] ?? '';
$name      = trim($data['name'] ?? '');
$attendance = $data['attendance'] ?? '';
$guests    = $data['guests'] ?? '';
$message   = trim($data['message'] ?? '');


// ==========================
// Проверка
// ==========================

if ($name === '') {
    echo json_encode([
        'ok' => false,
        'message' => 'Пожалуйста, укажите имя.'
    ]);
    exit;
}

if ($attendance === '') {
    echo json_encode([
        'ok' => false,
        'message' => 'Пожалуйста, укажите, сможете ли вы прийти.'
    ]);
    exit;
}

if ($guests === '') {
    echo json_encode([
        'ok' => false,
        'message' => 'Пожалуйста, укажите количество гостей.'
    ]);
    exit;
}


// ==========================
// Перевод языка
// ==========================

if ($language === 'ru') {
    $languageText = 'Русский';
} elseif ($language === 'am') {
    $languageText = 'Հայերեն';
} else {
    $languageText = $language;
}


// ==========================
// Перевод ответа
// ==========================

if ($attendance === 'yes') {
    $attendanceText = 'Да, буду ❤️';
} elseif ($attendance === 'no') {
    $attendanceText = 'К сожалению, не смогу';
} else {
    $attendanceText = $attendance;
}


// ==========================
// Email получателя
// ==========================

$to = 'll0393207@gmail.com';


// ==========================
// Тема письма
// ==========================

$subject = 'RSVP — ' . $name . ' — Nairi & Lolita';


// ==========================
// Текст письма
// ==========================

$emailBody = "
Новое подтверждение приглашения на свадьбу

━━━━━━━━━━━━━━━━━━━━

Лолита & Наири
13 ноября 2026

Место:
Mkrtchyan Hall
2/10 Echmiatsin St
Masis 0801, Armenia

━━━━━━━━━━━━━━━━━━━━

Язык формы: $languageText

Имя: $name

Присутствие: $attendanceText

Количество гостей: $guests

Комментарий:
$message

━━━━━━━━━━━━━━━━━━━━

Это сообщение отправлено с сайта
nairi-lolita.com
";


// ==========================
// Заголовки
// ==========================

$headers = [];

$headers[] = 'From: RSVP <rsvp@nairi-lolita.com>';
$headers[] = 'Reply-To: rsvp@nairi-lolita.com';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';


// ==========================
// Отправка
// ==========================

$sent = mail(
    $to,
    $subject,
    $emailBody,
    implode("\r\n", $headers)
);


// ==========================
// Ответ сайту
// ==========================

if ($sent) {

    echo json_encode([
        'ok' => true,
        'message' => 'Ваш ответ успешно отправлен.'
    ]);

} else {

    echo json_encode([
        'ok' => false,
        'message' => 'Не удалось отправить сообщение.'
    ]);
}