const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const PORT = 3000;

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

let KDC = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
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
  console.log(voters);
});

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
