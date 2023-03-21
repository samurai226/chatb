require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";


let app = express();

viewEngine(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

initWebRoutes(app);

let PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("En cours..."+ PORT);
});