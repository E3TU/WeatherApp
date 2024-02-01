import express from "express";
import cors from "cors";
import { fetchWeatherData, updateCity } from "./weatherService.js";
import dotenv from "dotenv";

dotenv.config();


const app = express();
// Define what port to use
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/weather", async (req, res) => {
    try {
        // Call the getWeatherData function from puppeteer-scraper
        const weatherData = await fetchWeatherData();
        // Send the weatherData as response
        res.json({ weatherData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error"});
    }
});

app.post("/update", (req, res) => {
    const { newCity } = req.body;
    updateCity(newCity);

    res.status(200).json({ message: "location updated" });
});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});