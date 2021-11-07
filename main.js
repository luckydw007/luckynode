const path = require('path');
const express = require('express');

const userRoutes = require("./routes/user");
const resultRoutes = require("./routes/results");

const app = express();



app.use(express.json());
app.use("/", express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-width, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});


app.use("/api/results", resultRoutes);
app.use("/api/login", userRoutes);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "public","index.html"));
});

module.exports = app;