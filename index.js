const puns = require("./trocadilhos.json");
require('dotenv').config();

const botgram = require("botgram");
const bot = botgram(process.env.API_TOKEN);

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;


function ramdom(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

bot.on("updateError", function (err) {
  console.error("Erro ao atualizar:", err);
});

bot.on("synced", function () {
  console.log("Bot pronto!");
});

bot.command("start", function (msg, reply, next) {
  reply.text("Olá meu jovem! Então você quer um pouco de graça nessa sua vida miserável?")
  reply.text("Me manda uma palavra aí:")
});

bot.text(function(msg, reply) {
  for(var i = 0; i < puns.length; i++) {
    ramdom(puns);
    if(puns[i].pergunta.includes(msg.text)) {
        console.log("Achou");
        reply.text(puns[i].pergunta)
        setTimeout(() => { reply.text(puns[i].resposta) }, 6000);
        return;
    }
  }

  console.log("Não achou");
  reply.text("Difícil pensar em algo com " + msg.text)
  reply.text("Manda outra aí:")
})


//Precauções
bot.contact(function (msg, reply, next) {
  console.log("Usuário %s mandou o contato:", msg.from.firstname);
  console.log(" * Telefone: %s", msg.phone);
  console.log(" * Nome: %s %s", msg.firstname, msg.lastname);
  reply.text("Ok, contatinho adicionado ;)");
});

bot.photo(function(msg, reply, next){
  reply.text("Não vou nem abrir, deve ser putaria");
})

bot.video(function (msg, reply, next) {
  reply.text("Não vou nem abrir, deve ser gemidão");
});

bot.location(function (msg, reply, next) {
  reply.text("Você parece ta em " + msg.latitude + ", " + msg.longitude);
  reply.text("Precisa da ajuda do miranha?")
});

bot.command(function(msg, reply) {
   reply.text("Não tem comando secreto, desiste")
})

bot.command("comandosecreto", function (msg, reply, next) {
  reply.text("Ora ora parece que temos um sheroque homes por aqui")
  reply.sticker("BQADAgAD3gAD9HsZAAFphGBFqImfGAI");
});

app.listen(port, () => { console.log(`Servidor rodando na porta ${port}!`); });
