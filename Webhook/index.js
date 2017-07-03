//const ApiAiApp = require('actions-on-google').ApiAiApp;

exports.responseHandler = function responseHandler (req, res) {
  //const application = new ApiAiApp({request: req, response: res});

  //let intent = application.getIntent();
  //let response = "You called intent: " + intent;

  let intent = req.body.result.metadata.intentName;
  let response = "You called intent: " + intent;

  //response = "This is a sample response from your webhook!"; //Default response from the webhook to show it's working
  //response = "The time is: " + new Date().toLocaleTimeString('sv-SE');

  res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  res.send(JSON.stringify({ 
      "speech": response, 
      "displayText": response
    }));
};
