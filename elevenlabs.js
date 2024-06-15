
const ElevenLabs = require("elevenlabs-node");



module.exports = (speechData) =>{
    const text = speechData.text;
    const fileName = speechData.fileName;
    console.log(text);
    const voice = new ElevenLabs(
        {
            apiKey:  "sk_e36f8a3500b13f9ca0ec256b258a67d5a4a17cc90567a1fe", // Your API key from Elevenlabs
            voiceId: "nPczCjzI2devNBz1zQrb",             // A Voice ID from Elevenlabs
        }
    );

   
    
    voice.textToSpeech({
        // Required Parameters
        fileName:        fileName,                    // The name of your audio file
        textInput:        text,                          // The text you wish to convert to speech
    
        // Optional Parameters
        //voiceId:         "21m00Tcm4TlvDq8ikWAM",         // A different Voice ID from the default
        stability:       0.54,                            // The stability for the converted speech
        similarityBoost: 0.75,                            // The similarity boost for the converted speech
        modelId:         "eleven_multilingual_v2",       // The ElevenLabs Model ID
        style:           0.29,                              // The style exaggeration for the converted speech
        speakerBoost:    true                            // The speaker boost for the converted speech
      }).then((res) => {
        console.log(res);
        return res;
    });
}