const replaceStateAbbreviations = require('./convertstate');
const alertReport = (speechData)=>{
let text = `The National Weather Service has issued the following alerts:`
speechData.alertArray.forEach(alert =>{
    text += alert.headline + ', ';
})

text = text.replace('CST', 'central standard time');
text = text.replace('CDT', 'central daylight time');
text = replaceStateAbbreviations(text)
console.log(text)
return text;
}

module.exports = alertReport;