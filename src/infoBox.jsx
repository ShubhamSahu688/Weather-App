import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./infoBox.css";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SunnyIcon from '@mui/icons-material/Sunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

export default function InfoBox({ Info }) {
    let HOT_URL = "https://images.unsplash.com/photo-1774641128476-47d1e0a8d2c0?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";
    let RAIN_URL = "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";
    let COLD_URL = "https://plus.unsplash.com/premium_photo-1671127303910-754ac2224c7a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";

    return (
        <div className="InfoBox">
            <div className="card">
                <Card sx={{ maxWidth: 500 }}>
                    <div><CardMedia
                        sx={{ height: 140 }}
                        image={Info.humidity > 80 ? RAIN_URL : Info.temp < 15 ? COLD_URL : HOT_URL}
                        title="green iguana"
                    />
                    </div>
                    <div className="cardinfo" >
                        <CardContent style={{ border: "1px solid black" }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {Info.city}{Info.humidity > 80 ? <ThunderstormIcon color="primary" /> : Info.temp < 15 ? <AcUnitIcon color="secondary" /> : <SunnyIcon color="red" />}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
                                <p> Temperature : {Info.temp}&deg;C</p>
                                <p> Min Temperature : {Info.tempMin}&deg;C</p>
                                <p> Max Temperature : {Info.tempMax}&deg;C</p>
                                <p> Humidity : {Info.humidity}%</p>
                                <p> Feels Like : {Info.feelsLike}&deg;C</p>
                                <p> Weather : {Info.weather}</p>
                                <p> AQI : {Info.aqi}</p>
                                {Info.Pollutants ? (<>
                                    <p>PM2.5: {Info.Pollutants.pm2_5}</p>
                                    <p>PM10: {Info.Pollutants.pm10}</p>
                                    <p>O₃: {Info.Pollutants.o3}</p>
                                    </>
                                ) : ( <p>No pollutant data available</p>
                                )}
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </div>
        </div >
    );
}


