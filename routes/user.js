const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("", (req, res, next) => {
  if(req.body.email !== "luckydw07@gmail.com"){
    return res.status(401).json({
      message: "Auth failed"
    });
  }
  if (req.body.password === "Lucky@777"){

    const token = jwt.sign(
      { email: "luckydw07@gmail.com", userId: "123777" },
      "secret_this_should_be_longer",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600
    });

  } else {
    return res.status(401).json({
      message: "Auth failed"
    });
  }
});

module.exports = router;
