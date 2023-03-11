import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import request from "request";
import { keyGeneratorRSA } from "../../src/crypto-helper/keyGeneration.js";
import { RSASignVerify } from "../../src/crypto-helper/rsaCryptography.js";
import { AESDecrypt } from "../../src/crypto-helper/aesCryptography.js";

const url = "http://localhost:3001/getkey";

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

// let userLog = [];

app.post("/", urlencodedParser, function (req, res) {
  if (!req.body) return response.sendStatus(400);
  res.end();
});

app.get("/getdatatable", (req, res) => {
  //   console.log(table);
  res.send(table);
});

app.post("/postencr", jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  let { uniqueLabelCorrection, encrBulletin, signRegistrator, blindEncrypt } =
    req.body;
  let { registrarKeyPub } = keyRegistrar;

  //   console.log(registrarKeyPub);
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
      signRegistrator,
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
    let bullenetin = AESDecrypt(table[index].encrBulletin, secretVotingKey);
    console.log(bullenetin);
    table[index].secretVotingKey = secretVotingKey;
    if (bullenetin == "1") {
      table[index].bulleten = "Да";
    } else {
      table[index].bulleten = "Нет";
    }
  }
  //   console.log(index);
  res.send(table);
});
// app.post("/postloguser", jsonParser, (req, res) => {
//   if (!req.body) return res.sendStatus(400);

//   userLog.push(req.body.log);
//   console.log(userLog);
//   res.end();
// });
// app.get("/getloguser", jsonParser, (req, res) => {
//   if (!req.body) return res.sendStatus(400);
//   console.log(32131);
//   res.send(userLog);
// });
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
});
