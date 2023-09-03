var express = require("express");
var router = express.Router();
const db = require("./../db/models");
const Url = db.Url;

router.get("/:urlId", async (req, res) => {
  try {
    const url = await Url.findOne({
      shortend: req.params.urlId,
    });

    if (url) {
      return res.redirect(url.adress);
    } 

    else
      res.status(404).send({
        message: err.message || "Not found",
      });

  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: err.message || "Internal Server Error",
    });

  }
});

module.exports = router;
