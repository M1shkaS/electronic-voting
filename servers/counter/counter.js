import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import request from "request";
import { keyGeneratorRSA } from "../../src/crypto-helper/keyGeneration.js";
import { RSASignVerify } from "../../src/crypto-helper/rsaCryptography.js";

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

app.post("/", urlencodedParser, function (req, res) {
  if (!req.body) return response.sendStatus(400);
  //   res.end();
});

app.get("/getdatatable", (req, res) => {
  console.log(table);
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
    table.push({ uniqueLabelCorrection, encrBulletin, signRegistrator });

    res.end();
  }

  res.end();
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
});
