import express from 'express';
import axios from 'axios';
import morgan from 'morgan';

// Variables
const app = express();
const PORT = 3003;
const API_URL = "https://secrets-api.appbrewery.com";

// JOKE API
const JOKE_API_URL = "https://v2.jokeapi.dev/joke";
const categories = ["Any", "Misc", "Programming", "Dark", "Pun", "Spooky", "Christmas"];

// Middlewares
app.use(express.static("public"));
app.use(morgan("dev"));

// Routes
app.get("/", async (req, res) => {
    try {
        const result = await axios.get(`${JOKE_API_URL}/${categories}`);
        res.render("index.ejs", { 
            setup: result.data.setup,
            delivery: result.data.delivery,
            category: result.data.category,
         });
    } catch (error) {
        res.render("index.ejs", { setup: "Sorry! Error fetching data!" });
    }
});

// Express Listener
app.listen(PORT, () => {
    console.log(`The server is running in port ${PORT}`);
});