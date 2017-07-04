const ApiAiApp = require('actions-on-google').ApiAiApp;

exports.responseHandler = function responseHandler (req, res) {
  const application = new ApiAiApp({request: req, response: res});

  const TEST_INTENT = "hooktest.hello";
  const TIME_INTENT = "time.get";
  const TEST_TEST = "test.test";

  let intent = application.getIntent();
  let response = "BIG ERROR";

  //let intent = req.body.result.metadata.intentName;
  //let response = "You called intent: " + intent;

  switch (intent){
    case TEST_INTENT:
      response = "This is a sample response from your webhook!";
      break;
    case TIME_INTENT:
      response = "The time is: " + new Date().toLocaleTimeString('sv-SE');
      break;
    case TEST_TEST:
      response = application.getArgument("name") + " is " + Math.trunc(Math.random()*1000)/100 + "m long";
      break;
    default:
      response = "DEFAULT CASE";
      break;
  }

  application.tell(response);
  //application.ask(response);
  
  //res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  //res.send(JSON.stringify({ 
  //    "speech": response, 
  //    "displayText": response
  //  }));
};
