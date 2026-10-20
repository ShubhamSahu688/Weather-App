import SearchBox from "./searchBox";
import InfoBox from "./infoBox.jsx";
import { useState } from 'react';
import "./weatherApp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";



export default function WeatherApp() {
    
   const [weatherInfo, setWeatherInfo] = useState({
    city: "Delhi",
    temp: 25.0,
    tempMin: 20.0,
    tempMax: 30.0,
    humidity: 60,
    feelsLike: 27.0,
    weather: "sunny",
    aqi: 50,
    pollutants: { pm2_5: 15, pm10: 25, o3: 30 },
});
    
    const updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }

    return (
        <div className="WeatherApp" style={{textAlign: "center"}}>
            <h2> <FontAwesomeIcon icon={faCloud} style={{ color: "#4a90e2" }} /> Weather Report </h2>
            <SearchBox updateInfo={updateInfo} />
            <InfoBox Info={weatherInfo}  />
        </div>
    );
}