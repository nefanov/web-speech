var streamer = new ya.speechkit.SpeechRecognition();
window.ya.speechkit.settings.apikey = 'dc3e634b-1e90-40e7-9e6a-2341735aa8e3';
//Будем запускать процесс распознавания при нажатии на кнопку.

$('_id').bind('click', function () {
  alert('Вы нажали на элемент "foo"');
  streamer.start({
    // initCallback вызывается после успешной инициализации сессии.
    initCallback: function () {
        console.log("Началась запись звука.");
    },
    // Данная функция вызывается многократно.
    // Ей передаются промежуточные результаты распознавания.
    // После остановки распознавания этой функции
    // будет передан финальный результат.
    dataCallback: function (text, done, merge, words, biometry) {
      console.log("Распознанный текст: " + text);
      console.log("Является ли результат финальным:" + done);
      console.log("Число обработанных запросов, по которым выдан ответ от сервера: " + merge);
      console.log("Подробная информация о распознанных фрагметах: " + words);
      // Подробнее о массиве biometry см. в разделе Анализ речи.
      $.each(biometry, function (j, bio) {
        console.log("Характеристика: " + bio.tag + " Вариант: " + bio.class +
        " Вероятность: " + bio.confidence.toFixed(3));
      });
    },
    // Вызывается при возникновении ошибки (например, если передан неверный API-ключ).
    errorCallback: function (err) {
        console.log("Возникла ошибка: " + err);
    },
    // Содержит сведения о ходе процесса распознавания.
    infoCallback: function (sent_bytes, sent_packages, processed, format) {
        console.log("Отправлено данных на сервер: " + sent_bytes);
        console.log("Отправлено пакетов на сервер: " + sent_packages);
        console.log("Количество пакетов, которые обработал сервер: " + processed);
        console.log("До какой частоты понижена частота дискретизации звука: " + format);
    },
    // Будет вызвана после остановки распознавания.
    stopCallback: function () {
        console.log("Запись звука прекращена.");
    },
    // Возвращать ли промежуточные результаты.
    particialResults: true,
    // Длительность промежутка тишины (в сантисекундах),
    // при наступлении которой API начнет преобразование
    // промежуточных результатов в финальный текст.
    utteranceSilence: 60
  });
});
