import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";
import { keyGeneratorRSA } from "../../src/services/keyGeneration.js";
import { hash } from "../../src/services/hash.js";
import { RSASign, RSASignVerify } from "../../src/services/rsaSign.js";

const app = express();

const PORT = 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonParser = bodyParser.json();
const urlencodedParser = express.urlencoded({ extended: false });

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

let voters = [
  { name: "Дима", passport: "1", state: "registered" },
  { name: "Дима", passport: "2", state: "registered" },
  { name: "Дима", passport: "3", state: "registered" },
  { name: "Дима", passport: "4", state: "registered" },
  { name: "Дима", passport: "5", state: "registered" },
  { name: "Дима", passport: "6", state: "registered" },
  { name: "Дима", passport: "7", state: "registered" },
  { name: "Дима", passport: "8", state: "registered" },
];

let keyRegistrar = {};

let KDC = {
  registrar: {},
  voters: [],
};

let timeVot = {
  startYear: 2023,
  startMonth: 4,
  startDay: 7,
  startH: 8,
  startM: 0,
  endYear: 2023,
  endMonth: 4,
  endDay: 7,
  endH: 14,
  endM: 14,
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/getkey", (req, res) => {
  res.send({ registrarKeyPub: KDC.registrar.pubKey });
});
app.get("/gettime", (req, res) => {
  res.send(timeVot);
});

app.post("/", urlencodedParser, function (req, res) {
  if (!req.body) return response.sendStatus(400);
  //   res.end();
});

app.post("/addvoter", jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  //  Добавление избириталея
  const obj = {
    ...req.body,
    state: "registered",
  };
  voters.push(obj);
  res.end();
});

app.post("/voters", jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  //Проверка времени
  let timeRes = isValid(
    new Date(),
    timeVot.startH,
    timeVot.startM,
    timeVot.endH,
    timeVot.endM - 1
  );

  if (!timeRes) {
    res.send({ status: "timesUp" });
  } else {
    //Находим нужного человека, который  был занесён в список всех правомочных избирателей по id(паспорту)
    let index = voters.findIndex((person) => person.passport === req.body.pass);
    if (index !== -1) {
      let statePeson = voters[index].state;
      if (voters[index].state === "went") {
        voters[index].state = "preparation";
        res.send({ status: statePeson });
      } else if (voters[index].state !== "preparation") {
        voters[index].state = "went";
        res.send({ status: statePeson });
      } else {
        res.send({ status: statePeson });
      }
    } else {
      res.send({ status: "nouser" });
    }
  }
});

app.post("/postkeyvoters", jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  KDC.voters.push(req.body);

  res.send({ registrarKeyPub: KDC.registrar.pubKey.e });
});

app.post("/postencrvoting", jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  let { id, signEncrypt, blindEncrypt } = req.body;

  let index = KDC.voters.findIndex((person) => person.id === id);

  //   Проверка подписи избирателя, с помощью вычилсения хеша
  if (index >= 0) {
    let haskVot = hash(blindEncrypt);

    let keyOpenVoter = KDC.voters[index].keyPub;

    let signVerify = RSASignVerify(signEncrypt, haskVot, keyOpenVoter);

    //Подписывает Регситратор
    if (signVerify) {
      let signByRegistrator = RSASign(blindEncrypt, keyRegistrar.privKey);

      res.send({ signByRegistrator });
    }
  }

  res.end();
});

app.listen(PORT, (error) => {
  keyRegistrar = keyGeneratorRSA();
  KDC.registrar.pubKey = keyRegistrar.pubKey;
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

function isValid(date, h1, m1, h2, m2) {
  let h = date.getHours();
  let m = date.getMinutes();
  return (h1 < h || (h1 == h && m1 <= m)) && (h < h2 || (h == h2 && m <= m2));
}
