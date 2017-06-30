cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-apiai.Q",
        "file": "plugins/cordova-plugin-apiai/www/lib/q.js",
        "pluginId": "cordova-plugin-apiai",
        "runs": true
    },
    {
        "id": "cordova-plugin-apiai.ApiAIPlugin",
        "file": "plugins/cordova-plugin-apiai/www/ApiAIPlugin.js",
        "pluginId": "cordova-plugin-apiai",
        "clobbers": [
            "window.ApiAIPlugin"
        ]
    },
    {
        "id": "cordova-plugin-apiai.ApiAIPromises",
        "file": "plugins/cordova-plugin-apiai/www/ApiAIPromises.js",
        "pluginId": "cordova-plugin-apiai",
        "clobbers": [
            "window.ApiAIPromises"
        ]
    },
    {
        "id": "cordova-plugin-tts.tts",
        "file": "plugins/cordova-plugin-tts/www/tts.js",
        "pluginId": "cordova-plugin-tts",
        "clobbers": [
            "TTS"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-apiai": "1.7.4",
    "cordova-plugin-tts": "0.2.3"
};
// BOTTOM OF METADATA
});