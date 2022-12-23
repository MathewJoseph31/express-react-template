const url = require("url");

const storeData = {};

exports.getStoreData = (req, res, next) => {
  let storeCd = "";

  if (req.url.lastIndexOf("/") + 1 < req.url.length)
    storeCd = req.url.substring(req.url.lastIndexOf("/") + 1);

  let storeObj = storeData[storeCd];
  if (storeObj === undefined) {
    storeObj = {};
    storeObj.storeCd = storeCd;
    storeObj.OpenFloorThreshold = -1;
    let now = new Date();

    storeObj.LastTimeStamp =
      now.getFullYear() +
      "-" +
      now.getMonth() +
      1 +
      "-" +
      now.getDate() +
      " " +
      now.getHours() +
      ":" +
      now.getMinutes() +
      ":" +
      now.getSeconds() +
      "." +
      now.getMilliseconds();
    storeObj.NextUpsList = null;
    storeObj.Duration = "minutes 0 seconds:0";
  } else {
    let date2 = new Date();
    let date1 = Date.parse(storeObj.LastTimeStamp);
    const diffTime = Math.abs(date2 - date1);
    console.log("date " + diffTime);
    const minutes = Math.floor(diffTime / (1000 * 60));
    const seconds = Math.ceil((diffTime - minutes * 1000 * 60) / 1000);
    storeObj.Duration = `minutes:${minutes} seconds:${seconds}`;
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.json(storeObj);
};

exports.postStoreData = (req, res, next) => {
  let storeObj = JSON.parse(Object.keys(req.body)[0]);
  let storeCd = storeObj["StoreCd"];
  storeData[storeCd] = Object.assign({}, storeObj);
  //console.log("hell1 " + Object.keys(storeObj));
  res.json("OK");
};
