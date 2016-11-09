
window.onload = function () {
//    window.ya.speechkit.settings.apikey = 'efe49eed-0ce0-4482-8c14-0cf141204bd9';
window.ya.speechkit.settings.apikey = 'dc3e634b-1e90-40e7-9e6a-2341735aa8e3';

    var recognition = new ya.speechkit.SpeechRecognition();

    $('#rec_start').bind('click', function () {
        recognition.start({
            initCallback: function () {
                $('#text_field').html(' ');
                console.log('Началась запись звука.');
            },
            dataCallback: function (text, done, merge, words, biometry) {
                if (done) {
                    console.log("Анализ речи: ");
                    $.each(biometry, function (j, bio) {
                        console.log(" Характеристика: " + bio.tag + " Вариант: " + bio.class +
                        " Вероятность: " + bio.confidence.toFixed(3));
                    });
                    $('#text_field').append(text);
                    $('#text_field').append('\n');
                    /* Do smth more with the text */
                }
            },
            errorCallback: function (err) {
                console.log('Возникла ошибка ' + err);
            },
            stopCallback: function () {
                console.log('Запись звука остановлена.');
            },
            utteranceSilence: 60,
            punctuation: true,
            model: 'notes',
            biometry: 'gender, group, language'

        });
        $('#rec_start').prop('disabled', true);
        $('#rec_pause').prop('disabled', false);
        $('#rec_stop').prop('disabled', false);
    });

    $('#rec_pause').bind('click', function () {
        recognition.pause();
        $('#rec_start').prop('disabled', false);
        $('#rec_pause').prop('disabled', true);
        $('#rec_start').val('Возобновить диктовку записи');
    });

    $('#rec_stop').bind('click', function () {
        recognition.stop();
        $('#rec_start').val('Начать диктовку записи');
        $('#rec_start').prop('disabled', false);
        $('#rec_pause').prop('disabled', true);
        $('#rec_stop').prop('disabled', true);
    });
}
