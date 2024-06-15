const express = require('express');
const axios = require('axios');
const elevenlabs = require('./elevenlabs');
const fs = require('fs');
const alerts = require('./weatherAlerts');
const alertReport = require('./alertreport');
const nwsweather = require('./nwsweather');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

app.get('/alerts/:zone', async (req, res) => {
    const zone = req.params.zone;
    try {
        const alertData = await alerts(zone);
        if(alertData.hasAlerts){
            speachData = {
                fileName: 'alert.mp3',
                text: alertReport(alertData)
            }
            //console.log(speachData)
             const audioData = await elevenlabs(speachData);
           if (audioData) {
                fs.writeFileSync('alert', audioData);
                console.log('Weather alert audio saved as alert.mp3');
            }   
          }
        res.status(200).send(alertData);
    } catch (error) {
        res.status(500).send('Error fetching alerts');
    }
   

})

app.get('/nwsforecast/:officeCode/:x/:y/:location', async (req, res) => {
    const officeCode = req.params.officeCode;
    const x = req.params.x;
    const y = req.params.y;
    const location = req.params.location;
    try {
        const forecast = await nwsweather(officeCode, x, y,location);
        speechData = {
            fileName: 'forecast.mp3',
            text: forecast
        }
        const audioData = await elevenlabs(speechData);
        if (audioData) {
             fs.writeFileSync('alert', audioData);
             console.log('Weather alert audio saved as alert.mp3');
         }   
        res.status(200).send(forecast);
    } catch (error) {
        res.status(500).send('Error fetching NWS forecast');
    }
  
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


