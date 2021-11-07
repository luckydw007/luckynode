const express = require("express");

const checkAuth = require("../middleware/check-auth")
const router = express.Router();

let finalDrawResult;
let finalDrawResultTime = new Date();
let finalDrawTimeHistory = [];
let finalDrawResultHistory = [];

let lastDrawTimeHistory = [];
let lastDrawResultHistory = [];

const time = new Date();

router.post(
    "/setDrawResult", 
    checkAuth,
    (req, res, next) => {
    const drawResult = req.body;
        finalDrawResult = req.body.result;
        finalDrawResultTime = new Date(req.body.time);
        const records = finalDrawResultHistory.length;
        const date = new Date(req.body.time);
        const hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM' ;
        let hour = hours % 12;
        hour = hour ? hour : 12;
        hour = hour < 10 ? '0' + hour : hour;
        const minutes = date.getMinutes();
        const minute = minutes < 10 ? '0' + minutes : minutes.toString();

        const drawTime = hour + ":" + minute + " " + ampm;

        if (records<10 && records > 0){
            lastDrawResultHistory[records - 1] = finalDrawResultHistory [ records - 1 ];
            lastDrawTimeHistory[ records - 1] = finalDrawTimeHistory[ records - 1];
            finalDrawTimeHistory.push(drawTime);
            finalDrawResultHistory.push(finalDrawResult);
        } else if (records < 1) {
            finalDrawResultHistory.push(finalDrawResult);
            finalDrawTimeHistory.push(drawTime);
        } else {
            lastDrawResultHistory.shift();
            lastDrawTimeHistory.shift();
            lastDrawResultHistory[records - 1] = finalDrawResultHistory [ records - 1 ];
            lastDrawTimeHistory[ records - 1] = finalDrawTimeHistory[ records - 1];

            finalDrawResultHistory.shift();
            finalDrawTimeHistory.shift();
            finalDrawTimeHistory.push(drawTime);
            finalDrawResultHistory.push(finalDrawResult);
        }
    res.status(201).json({
        message: "result updated successfully"
    });
});

router.get('/drawResult',(req, res, next) => {
    res.send({"result": finalDrawResult});
});

router.get('/drawHistory',(req, res, next) => {
    if((finalDrawResultTime.getTime() + 20000 - (new Date()).getTime() ) > 0 ) {
        const drawHistory = {
            drawTimeHistory: lastDrawTimeHistory,
            drawResultHistory: lastDrawResultHistory,
            currentTime: new Date()
        };
        res.send(drawHistory);

    } else {
        const drawHistory = {
            drawTimeHistory: finalDrawTimeHistory,
            drawResultHistory: finalDrawResultHistory,
            currentTime: new Date()
        };
        res.send(drawHistory);
    }
});


module.exports = router;
