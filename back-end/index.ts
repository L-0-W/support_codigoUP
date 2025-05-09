const Koa = require('koa');
const app = new Koa();

import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import input from "input"; // npm i input
import { NewMessage, type NewMessageEvent } from "telegram/events";
import { message } from "telegram/client";

const apiId = 29750333;
const apiHash = "3aa9ede81264c73813f1885f5ff23382";
const stringSession = new StringSession("1AQAOMTQ5LjE1NC4xNzUuNTQBu6J8Ube4PDGjl4fHXg4iTR95Nu584KCpACsg/l8BPEtHs6M0KxO/uHBih1QGdQxhLNLGX9iB8WqFHuhskMFmm1yhpKEDzfXEI1oVGXIkg+X54jO8/lXh0mKkTLx/Vs+ttiFjbZw9Ie0aOCfAT9xTnLGiAQpHhVBO3mV6agKBSmzr9z5kNyzqR60Au2p57ZkzGju5T3y193T1lFvYdPJvnDMl2abMnOcJQj6wWAzlpO3h6a+FA9wzz9bnhF6Gc6bZEn2anMfMbzY5q0fWFIg46CaLr5qX+VU0Htanwhk25T/ZoS3LIF0OwB17u53sYZUotomUoRdrh/L8tEdGj176lwc="); // fill this later with the value from session.save()
let allTickets = [];
var crypto = require('crypto');



// --- Variável do Cliente (Escopo do Módulo) ---
// Declarada aqui para ser acessível por todas as funções neste arquivo
let client: TelegramClient | null = null;

async function connectTelegramClient(): Promise<boolean> {
  console.log("Inicializando o cliente Telegram...");
  client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  console.log("Conectando ao Telegram...");
  try {
    await client.start({
      phoneNumber: async () => await input.text("Por favor, insira seu número: "),
      password: async () => await input.text("Por favor, insira sua senha: "),
      phoneCode: async () =>
        await input.text("Por favor, insira o código que você recebeu: "),
      onError: (err) => {
          console.error("Erro durante a conexão:", err);
          // Você pode querer lançar o erro ou retornar false aqui
      },
    });

    console.log("Conectado com sucesso!");
    console.log("Sessão salva:", client.session.save()); // Guarde esta string para evitar login futuro
    // Lembre-se de armazenar a string de sessão de forma segura!
    return true; // Indica sucesso na conexão
  } catch (error) {
    console.error("Falha ao conectar o cliente:", error);
    client = null; // Reseta o cliente em caso de falha
    return false; // Indica falha na conexão
  }
}

let currentId = 1;


let ws_send:any = '';


const server = Bun.serve({
    port: 3000,
    fetch(req, server) {
        const sessionId = crypto.randomBytes(16).toString('base64');
        const sucess = server.upgrade(req, {
          data: {
            socketId: sessionId,
          }
        });

        if (sucess) return undefined;
    },
    websocket: {     
        message(ws, message) {
          ws_send = ws;

          if(message === "a") return
            const json_obj = JSON.parse(message);
            
            if (json_obj.type === "update") {
              if (json_obj.status === "accept") {
                allTickets.map(tickets => tickets.socketId === json_obj.socketId ? client?.sendMessage(tickets.user_id, {message: "Ok"}) : '');
              }
            }

            if (json_obj.type === "msg"){
              const message_send = 
              `
              ------- Luiz Felipe ------

              ${json_obj.message}
              `;
              client?.sendMessage(allTickets[0].user_id, {message: message_send});
            }
        },
        open(ws) {
        },
        close(ws, code, message) {},
        drain(ws) {},
    },
});    

console.log(`Listening on ${server.url}`);

let title = "";

async function printEvent(event: NewMessageEvent) {
    const message = event.message;

    title = message.message;

    if (title.length < 5) {
      await client?.sendMessage(message.peerId.userId, { message: "Descreava o erro e o o passo a passo feito pelo cliente" });
      return;
    }    


    console.log(message.peerId.userId.value);

    const result = await client?.invoke(
        new Api.users.GetUsers({
          id: [message.peerId.userId],
        })
    );

  console.log(result[0])

  if (result[0]?.bot){
    return
  }

  const date = new Date((message.date * 1000))
  
  const options = {
    weekday: 'long',    // Dia da semana por extenso (ex: sábado)
    year: 'numeric',    // Ano numérico (ex: 2025)
    month: 'long',     // Mês por extenso (ex: maio)
    day: 'numeric',     // Dia do mês numérico (ex: 3)
    hour: '2-digit',    // Hora com 2 dígitos (ex: 13)
    minute: '2-digit',  // Minuto com 2 dígitos (ex: 12)
    second: '2-digit',  // Segundo com 2 dígitos (ex: 42)
    timeZone: 'UTC',    // !! ESSENCIAL: Calcula a hora usando o fuso UTC
    timeZoneName: 'short' // Opcional: adiciona o nome do fuso (ex: GMT ou UTC)
};

const formatadorDataHoraUTC_ptBR = new Intl.DateTimeFormat('pt-BR', options);
const onlyDateFormated = date.toLocaleDateString();
let dataFormatadaUTC_ptBR = formatadorDataHoraUTC_ptBR.format(date).split("UTC");

console.log(dataFormatadaUTC_ptBR[0]);

  const newTicket = {
    type: "iniciate_ticket",
    socketId: ws_send.data.socketId,
    ticket_id: `#${currentId}`,
    user_id: result[0]?.id,
    user_name: result[0]?.username,
    user_phone: result[0]?.phone, 
    user_photo: result[0]?.photo,
    user_emojiStatus: result[0]?.emojiStatus,
    msg_id: message.id,
    msg_date: dataFormatadaUTC_ptBR[0],
    msg_sortdate: onlyDateFormated,
    msg_message: message.message,
    msg_media: message.media,
    msg_videoProcessingPending: message.videoProcessingPending
  };  

  allTickets.push(newTicket);

  currentId++;

  try {
    ws_send.send(JSON.stringify(newTicket))
  } catch (e) {
    console.error("Inicialize o websocket no atendimento\n")
    console.log(e);
  }

}


async function main() {
  try {
    await connectTelegramClient();
    await client?.addEventHandler(printEvent, new NewMessage({}));
  } catch (e) {
    console.log(e)
  }
}


main().catch(console.error);