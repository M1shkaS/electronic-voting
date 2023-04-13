import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import request from "request";
import { RSASignVerify } from "../../src/services/rsaSign.js";
import { AESDecrypt } from "../../src/services/aesCryptography.js";

const url = "http://localhost:3001/getkey";
const urlTime = "http://localhost:3001/gettime";

const app = express();

const PORT = 3002;

const jsonParser = bodyParser.json();
const urlencodedParser = express.urlencoded({ extended: false });

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

let keyRegistrar = {};

let table = [];

let timeVot = {
  startYear: null,
  startMonth: null,
  startDay: null,
  startH: null,
  startM: null,
  endYear: null,
  endMonth: null,
  endDay: null,
  endH: null,
  endM: null,
};

app.post("/", urlencodedParser, function (req, res) {
  if (!req.body) return response.sendStatus(400);
  res.end();
});

app.get("/getdatatable", (req, res) => {
  //Проверка времени
  let timeRes = isValid(
    new Date(),
    timeVot.startH,
    timeVot.startM,
    timeVot.endH,
    timeVot.endM
  );

  if (!timeRes) {
    res.send(table);
  } else {
    res.send({ message: "timeTicking", timeVot, table });
  }
});

// !
app.get("/gettime", (req, res) => {
  let timeRes = isValid(
    new Date(),
    timeVot.startH,
    timeVot.startM,
    timeVot.endH,
    timeVot.endM
  );

  if (!timeRes) {
    res.send("isEnd");
  } else {
    res.send("notOverYet");
  }
});

app.post("/addTimeCon", jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  timeVot = req.body;
  res.end();
});

app.post("/postencr", jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  let {
    uniqueLabelCorrection,
    encrBulletin,
    signRegistrator,
    blindEncrypt,
    signRegistrarWithoutMask,
  } = req.body;

  let { registrarKeyPub } = keyRegistrar;

  let signVerify = RSASignVerify(
    signRegistrator,
    blindEncrypt,
    registrarKeyPub
  );

  //Если подпись регистратора верна
  if (signVerify) {
    const newVot = {
      uniqueLabelCorrection,
      encrBulletin,
      signRegistrarWithoutMask,
      secretVotingKey: "",
      bulleten: "",
    };

    table.push(newVot);

    res.end();
  }
  res.end();
});

app.post("/postvotingkey", jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  let { uniqueLabelCorrection, secretVotingKey } = req.body;

  let index = table.findIndex(
    (person) => person.uniqueLabelCorrection === uniqueLabelCorrection
  );
  if (index >= 0) {
    let endDate = new Date(
      timeVot.endYear,
      timeVot.endMonth - 1,
      timeVot.endDay,
      timeVot.endH,
      timeVot.endM + 1
    );

    // получаем текущую дату
    let currentDate = new Date();

    let millisecondsLeft = endDate.getTime() - currentDate.getTime();

    setTimeout(() => {
      let bullenetin = AESDecrypt(table[index].encrBulletin, secretVotingKey);
      table[index].secretVotingKey = secretVotingKey;
      table[index].bulleten = bullenetin;
    }, millisecondsLeft);
  }
  res.send("всё хорошо");
});

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
  request(
    {
      method: "GET",
      url: url,
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        keyRegistrar = JSON.parse(body);
      }
    }
  );
  request(
    {
      method: "GET",
      url: urlTime,
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        let timeObj = JSON.parse(body);
        timeVot.startYear = timeObj.startYear;
        timeVot.startMonth = timeObj.startMonth;
        timeVot.startDay = timeObj.startDay;
        timeVot.startH = timeObj.startH;
        timeVot.startM = timeObj.startM;

        timeVot.endYear = timeObj.endYear;
        timeVot.endMonth = timeObj.endMonth;
        timeVot.endDay = timeObj.endDay;
        timeVot.endH = timeObj.endH;
        timeVot.endM = timeObj.endM - 1;
      }
    }
  );
});

function isValid(date, h1, m1, h2, m2) {
  let h = date.getHours();
  let m = date.getMinutes();
  return (h1 < h || (h1 == h && m1 <= m)) && (h < h2 || (h == h2 && m <= m2));
}
