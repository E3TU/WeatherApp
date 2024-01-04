import express from "express";
import cors from "cors";
import puppeteerScraper from "../scripts/puppeteer-scraper.js";

const app = express();
// Define what port to use
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/weather", async (req, res) => {
    try {
        // Call the getWeatherData function from puppeteer-scraper
        const weatherData = await puppeteerScraper();
        // Send the weatherData as response
        res.json({ weatherData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error"});
    }
});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});