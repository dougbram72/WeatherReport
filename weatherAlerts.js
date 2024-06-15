const axios = require('axios');
const alerts = async(zone)=>{

    const url = `https://api.weather.gov/alerts/active?zone=${zone}`
    let hasAlerts = false;
    const alertArray = [];
    try {
        const result = await axios.get(url);
        const title = result.data.title;
        const data = result.data.features;
       if(Array.isArray(data)){
       
        data.forEach(alert => {
            hasAlerts = true;
            tmpalert = {
                type: alert.properties.event,
                headline: alert.properties.headline,
                description: alert.properties.description,
                instruction: alert.properties.instruction
            }
            alertArray.push(tmpalert);
           
        });
       }

     
        return {hasAlerts,title, alertArray};
    } catch (error) {
        console.log('Error fetching alerts:', error);
    }

}

module.exports = alerts;