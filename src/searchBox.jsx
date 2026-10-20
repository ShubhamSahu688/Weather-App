import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import "./searchBox.css";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {

    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "051253649a51e3bb6a1f4b47f5c5d80f";

    async function getExactAQI(city) {
        const response = await fetch(
            `https://api.waqi.info/feed/${city}/?token=c8df8efefa1916f31e872da701f34aa62cacf061`
        );
        const data = await response.json();

        if (data.status !== "ok") {
            return { aqi: "N/A", pollutants: {} };
        }
        return {
            aqi: data.data.aqi, // exact AQI number (0–500)
            pollutants: data.data.iaqi // pollutant breakdown
        };
    }

    let fetchWeather = async () => {

        let respone = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let data = await respone.json();
        let exactAqiData = await getExactAQI(city);
        
        try {
            let result = {
                city: city,
                temp: data.main.temp,
                tempMin: data.main.temp_min,
                tempMax: data.main.temp_max,
                humidity: data.main.humidity,
                feelsLike: data.main.feels_like,
                weather: data.weather[0].description,
                aqi: exactAqiData.aqi,
                Pollutants: {
                pm2_5: exactAqiData.pollutants?.pm25?.v ?? "N/A",
                pm10: exactAqiData.pollutants?.pm10?.v ?? "N/A",
                o3: exactAqiData.pollutants?.o3?.v ?? "N/A"
                }
            };
            console.log(result);
            return result;
        } catch (err) {
            throw err;
        }
    }

    let handleChange = (evt) => {
        setCity(evt.target.value);
    }

    let handleSubmit = async (evt) => {
        evt.preventDefault();
        setCity("");
        try {
            const newInfo = await fetchWeather();
            updateInfo(newInfo);
        } catch (err) {
            setError(true);
            console.error(err);
        }
    }

    return (
        <div className="Search">
            <h3>Search For A City</h3>
            <br></br>
            <form onSubmit={handleSubmit}>
                <TextField id="city" label=""
                    variant="outlined" required
                    onChange={handleChange} />
                <br></br>  <br></br>
                <Button variant="contained" type="submit">Search</Button>
            </form>
            {error && <p style={{ color: "red" }}>No Such Place Exists!</p>}
        </div>
    );
}