var TelegramBot = require('node-telegram-bot-api');

// Устанавливаем токен, который выдавал нам бот.
var token = '569351376:AAGtqU7fjnEux6sVJpInEIs6OGI89Ki0L8Y';
// Включить опрос сервера
var bot = new TelegramBot(token, {polling: true});

bot.on('polling_error', (error) => {
    console.log(error.code);  // => 'EFATAL'
  });

  /*
// Matches /love
bot.onText(/\/love/, function onLoveText(msg) {
    const opts = {
      reply_to_message_id: msg.message_id,
      reply_markup: JSON.stringify({
        keyboard: [
          ['Yes, you are the bot of my life ❤'],
          ['No, sorry there is another one...']
        ]
      })
    };
    bot.sendMessage(msg.chat.id, 'Do you love me?', opts);
  });
  */

bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
  console.log("received id " + chatId);
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
  
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
  });

// Написать мне ... (/echo Hello World! - пришлет сообщение с этим приветствием.)
bot.onText(/\/weather/, function (msg, match) {
    var fromId = msg.from.id;
    bot.sendMessage(fromId, 'City?');
    });

var notes = [];

bot.onText(/\/напомни (.+) в (.+)/i, function (msg, match) {
    var userId = msg.from.id;
    var text = match[1];
    var time = match[2];
    console.log("time " + time);
    notes.push( { 'uid':userId, 'time':time, 'text':text } );

    bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если не сдохну :)');
});

setInterval(function(){
    console.log("notes: " + notes.length);
    for (var i = 0; i < notes.length; i++){
        var curDate = new Date().getHours() + ':' + new Date().getMinutes();
        console.log("curDate: " + curDate);
            if ( notes[i]['time'] == curDate ) {
                console.log("we are here : " + notes[i]['text']);
                bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
                notes.splice(i,1);
            }
        }
},1000);

/*
// Простая команда без параметров.
bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    // Фотография может быть: путь к файлу, поток(stream) или параметр file_id
    var photo = 'cats.png';
    bot.sendPhoto(chatId, photo, {caption: 'Милые котята'});
});
*/