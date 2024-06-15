const axios = require('axios');

function replaceMph(text) {
    // Regular expression to match "mph" case-insensitively
    const regex = /\bmph\b/gi;

    // Replace all occurrences of "mph" with "miles per hour"
    return text.replace(regex, "miles per hour");
}



const nwsForecast = async (forcastOfficeCode, x, y,location) => {
    const url = `https://api.weather.gov/gridpoints/${forcastOfficeCode}/${x},${y}/forecast`;
    let forecast =``
    try {
        const response = await axios.get(url);
        const forcast = response.data
        forecast = {
            firstPeriodName: forcast.properties.periods[0].name,
            firstPeriodDetailedForecast: forcast.properties.periods[0].detailedForecast,
            secondPeriodName: forcast.properties.periods[1].name,
            secondPeriodDetailedForecast: forcast.properties.periods[1].detailedForecast
        }
        let text = `The forecast for ${forecast.firstPeriodName} in ${location}, ${forecast.firstPeriodDetailedForecast}. The forecast for ${forecast.secondPeriodName} is ${forecast.secondPeriodDetailedForecast}.`
        text = replaceMph(text);
        return text;
    } catch (error) {
        console.error('Error fetching NWS forecast:', error);
        return null;
    }
};

module.exports = nwsForecast;