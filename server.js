const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./db");

require("./models/User");

const authRoutes =
    require("./routes/authRoutes");


const app = express();


app.use(cors());

app.use(express.json());

app.use(express.static("public"));


app.use(
    "/api",
    authRoutes
);


sequelize
    .sync()
    .then(() => {

        console.log(
            "Database tables created successfully"
        );


        app.listen(
            process.env.PORT || 3000,
            () => {

                console.log(
                    `Server running on http://localhost:${process.env.PORT || 3000}`
                );

            }
        );

    })
    .catch((error) => {

        console.error(
            "Database connection failed:",
            error
        );

    });