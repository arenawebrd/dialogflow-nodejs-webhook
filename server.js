// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

let bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
  response.send("Teste Plataforma Umbler no Dialogflow");
});

const { google } = require('googleapis');
const calendarId = "ea9f557d8364c20d2f995c07a4fc7fc247b4399e44745a9e61183d9057800df5@group.calendar.google.com"
const serviceAccount = {
  "type": "service_account",
  "project_id": "botasistente-fr9t",
  "private_key_id": "9e5eb700c1a4f37ab1a8ebd8174bb9593aa356b8",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCNQHgfmuBTf6Ew\nspZ3Il9nQhN+qXKz/Ye1wsegIOAElqaMzYZ53MAA+bcioEHpJ6fWK2Aloes+cF+L\nASeKVieg8mr2oonteqdzGiaNMssElqRoIIZHJ+ytoGVINa0vqAKpWctMsY0e2qvE\nmGK/5Vld32pMQ3SiK2Jdu53xRctiBxg9TrUzMqBP7H686Y4pMV5w/D20H3Bk2WyD\nYlybKACJ6a66wgPgeSZ7OlFdf6RqmNFCFHeXopWIYltnogq97VbSCTvrXRBOmmF/\nBHsNmHuvhQFh1RsfAzv5JYFEhvCuzs4/mZR8I4FIVvsLjONPxkdL61Tms8MH76Bj\nfZK5OxTrAgMBAAECggEAAJ2jLbN5hnxnKE2NBm7rtfaxNi1+/dL5W4r3H7eyKuPH\nLWolmukOLtU3B5cbxpKquYn5E0G/hSD/hNiiKfAMFsw4vCl2fgN05t0cdHMAaXzn\nlIkKPKbix+v6uNjizzUmLpA9VDldmMGsFrRgmRY99CR4S+Hd36twxMK/ERkNy0vr\neo3iMtCSAHDYPi4tGLlhHA6h5jCSrnETzJ+TzkQ0Iur1I8X1pn5StIrywXs9c+h7\nX9s9BihkjFbKI0ND4fO8x2usT0QFjqwU1Mqdl2i4Fzd1jC1EH4TCZZ7A5M2C9M/h\nCBkNdwqUA98e5V4Jootty3CdArXzdd0n+irwyNYsuQKBgQC+md1+waiIkpoPoUaY\nlpqgYFZnJYH8xZ9MxJGu60nr+HQlfz7ItVJLdva+z2xvYRpMK2ijB9apa/N8ayto\nnLZXu80Yp4ETI47ZO0nxFBBf3YOMw5tPct4tyofPHBAodotRplEFX6VEBJRIRp+F\n6Tb5g8oBeHFNsCknuhFW4tFRhQKBgQC9t9Zfc46gZiV40mU1IhL1+gs0LpCgFA7V\nWLUncsyHQRnGMSbH6+hcbO5Rz+C1hyC8j8ouX9crUIHcdFHbk8vEkGJh+mkMOPUM\nty0jewgZg1qpSxtnOOtZqe6EP3QNHBt6/mClH5OjaFuq+DozX+XSzMMYtn6gTAlA\n2pzKxpRfrwKBgQCD4e1L/u4BigcF158Eh/j4DZDbkC1wXMHMGZuAQBgHKgQbyf8E\nW8pUoz06bEXoj3TlzYd6fzr+Qc7ZgUIpAX5+GFlivMxoFMuL7iVMpYhq/NhAdzyo\n7Z9kaeYs3YskpFnkJkObh0HQXabIl+1beDJs1c7Z05/6lHD1px7GUu1pDQKBgFoh\nX1/jh0vem0jGM7zFXlqrmu0EfkL+pHlo9k8yc8aCABuvOCxcf/yA58vIRYoYE05h\nxXy4nYF/cuJoBIebtH/C1GqVy5g56vlKgNBNX/C2/bhV7UPhv7XOTHlZp+meg9Ov\ny/xGfx5vsrULzqKfmZDHJJy1/nxrAy5jbX/MTasTAoGAUQp3qnEfU4NFoQeWvUNZ\nKelbY9AMuBAyfw43lnbmbDxNuThWv4jY/AuUBtJrn4nK3Ztu4Skm3Pj49MRAOl3G\nmUPt+gRJCBROigbNDdE4mfWuBaVkkqSt7+m8rulO4xeiMghnDKJ8YXrZSq2GuRiB\nIUQCkG7ciXmPPbuLWMnZwZc=\n-----END PRIVATE KEY-----\n",
  "client_email": "bot-assitente-calendar@botasistente-fr9t.iam.gserviceaccount.com",
  "client_id": "108199692913951524915",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/bot-assitente-calendar%40botasistente-fr9t.iam.gserviceaccount.com"
}

const timeZoneOffset = '-04:00';

const serviceAccountAuth = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: 'https://www.googleapis.com/auth/calendar'
});

const calendar = google.calendar('v3');



const mysql = require("mysql");
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASS = process.env.MYSQL_PASS;
const MYSQL_DB = process.env.MYSQL_DB;

app.post("/asistente", function (request, response) {

  let intentName = request.body.queryResult.intent.displayName;

  if (intentName === "Default Welcome Intent - yes") {

    let nombre = request.body.queryResult.parameters['nombre-cliente'];
    let telefono = request.body.queryResult.parameters['telefono-cliente'];

    let sql_query = "insert into clientes values ('" + nombre + "','" + telefono + "')";

    let connection = mysql.createConnection({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASS,
      database: MYSQL_DB
    });
    connection.connect()

    connection.query(sql_query, function (error, results, fields) {
      if (error) throw error;
      connection.end()
      response.json({ "fulfillmentText": "Tus datos se guardaron con éxito, ¿quieres programar ahora?" })
    })

  } else if (intentName === "Default Welcome Intent - yes") {

    let cliente = request.body.queryResult.outputContexts[1].parameters['nombre-cliente'];

    let tipo = request.body.queryResult.parameters['tipo'];
    let servico = request.body.queryResult.parameters['servico'];
    let fecha = request.body.queryResult.parameters['fecha'];
    let hora = request.body.queryResult.parameters['hora'];

    const dateTimeStart = new Date(Date.parse(fecha.split('T')[0] + 'T' + hora.split('T')[1].split('-')[0] + timeZoneOffset));
    const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
    const agendamientoString = formatData(new Date(fecha.split('T')[0])) + " as " + hora.split('T')[1].split('-')[0];

    return crearEventoCalendario(dateTimeStart, dateTimeEnd, servico, tipo, cliente).then(() => {
      let mensaje = `Excelente, su servicio esta agendado para ${agendamientoString} `;
      console.log(mensaje);
      response.json({ "fulfillmentText": mensaje });
    }).catch(() => {
      let mensaje = `Lo sentimos, no tenemos disponible para ${agendamientoString}.`;
      console.log(mensaje);
      response.json({ "fulfillmentText": mensaje });
    });

  }
})

function crearEventoCalendario(dateTimeStart, dateTimeEnd, servico, tipo, cliente) {
  return new Promise((resolve, reject) => {
    calendar.events.list({
      auth: serviceAccountAuth, // List events for time period
      calendarId: calendarId,
      timeMin: dateTimeStart.toISOString(),
      timeMax: dateTimeEnd.toISOString()
    }, (err, calendarResponse) => {
      // Check if there is a event already on the Calendar
      if (err || calendarResponse.data.items.length > 0) {
        reject(err || new Error('Solicitud de conflictos con otras citas'));
      } else {
        // Create event for the requested time period
        calendar.events.insert({
          auth: serviceAccountAuth,
          calendarId: calendarId,
          resource: {
            summary: servico + '-' + tipo + '-', description: '[' + cliente + '][' + servico + '][' + tipo + ']',
            start: { dateTime: dateTimeStart },
            end: { dateTime: dateTimeEnd }
          }
        }, (err, event) => {
          err ? reject(err) : resolve(event);
        }
        );
      }
    });
  });
}

function formatData(date) {
  var nombreMes = [
    "Enero", "Febrero", "Marzo",
    "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre",
    "Noviembre", "Diciembre"
  ];

  var dia = date.getDate();
  var mesIndex = date.getMonth();
  var ano = date.getFullYear();

  return dia + ' ' + nombreMes[mesIndex] + ' ' + ano;
}

// listen for requests :)
var port = process.env.PORT || 3000;
const listener = app.listen(port, function () {
  console.log('Your app is listening on port no ' + listener.address().port);
});
