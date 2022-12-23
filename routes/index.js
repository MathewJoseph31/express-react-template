const path = require("path");
var express = require("express");
var router = express.Router();
const StoreCacheController = require("../StoreCacheController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile(path.join(__basedir, "views/MenuList.html"));
  //res.render("index", { title: "Express" });
});

router.get("/BiDigitalUps", function (req, res, next) {
  res.sendFile(path.join(__basedir, "views/BiDigitalUps.html"));
  //res.render("index", { title: "Express" });
});

router.get("/api/users", function (req, res, next) {
  res.json(["A", "B", "C"]);
});

router.get("/api/BiDigitalUpsApi/*", StoreCacheController.getStoreData);

router.post("/api/BiDigitalUpsApi", StoreCacheController.postStoreData);

module.exports = router;
