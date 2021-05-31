//import
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { Pool } = require('pg');
const md5 = require('md5');


// app config
const app = express();
const port = process.env.PORT || 9000;
const DATABASE_URL = process.env.DATABASE_URL;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


// middlewares
app.use(cors());
app.use(express.json());


// api routes
app.get('/', (req, res) => { res.send('Hello World!'); });

app.post('/registerUser', (req, res) => {
    const username = req.body.username;
    const password = md5(req.body.password);
    pool.query(`INSERT INTO register (username, password) VALUES ('${username}', '${password}')`, (err, res) => {
        if (err) { console.log(err.stack); }
    });
    res.send("registered user");;
});

app.post('/setUserPreferences', (req, res) => {
    const username = req.body.username;
    const preferences = JSON.stringify(req.body.preferences);
    pool.query(`UPDATE register SET preference = '${preferences}' WHERE username = '${username}'`, (err, res) => {
        if (err) { console.log(err.stack); }
    });
    res.send("preference set");
});

app.get('/userWeatherData', async (req, res) => {
    const cities = req.body.cities;
    let data;
    if (cities.length) {
        let values = cities.join("','");
        const { rows } = await pool.query(`select city, weather from current_weather WHERE city in('${values}')`);
        res.send(rows);
    }
    else { res.send('no data found'); }
});

app.get('/updateWeatherData', async (req, res) => {
    const { rows } = await pool.query('SELECT city from current_weather');
    const promises = [];
    for (let data of rows) {
        let city = data.city;
        promises.push(
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`)
                .then((res) => {
                    let weather = {};
                    weather.temp = res.data.main.temp;
                    weather.description = res.data.weather[0].description;
                    weather.temp_min = res.data.main.temp_min;
                    weather.temp_max = res.data.main.temp_max;
                    weather.wind = res.data.wind;
                    weather.clouds = res.data.clouds;
                    weather = JSON.stringify(weather);
                    pool.query(`UPDATE current_weather SET weather = '${weather}' WHERE city = '${city}'`);
                })
        );
    }
    axios.all(promises).then(() => res.send("updated weather")).catch((err) => console.log(err));
});


// listen
app.listen(port, () => console.log(`listening on localhost:${port}`));
