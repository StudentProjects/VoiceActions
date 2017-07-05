const ApiAiApp = require('actions-on-google').ApiAiApp;
const children = ["Erik", "Jonas", "Alice"];
const news = {};

exports.schoolAgent = function schoolAgent (req, res) {
  console.log('Headers: ' + JSON.stringify(req.headers));
  console.log('Body: ' + JSON.stringify(req.body));

  const app = new ApiAiApp({request: req, response: res});

  const TEST_INTENT = "hooktest.hello";
  const TIME_INTENT = "time.get";
  const LENGTH_INTENT = "length.get";
  const ILLNESS_INTENT = "illness.register";

  const TEST_PROMPTS = ["This is a sample response from your webhook!", "You are now connected to the webhook!", "This is the webhook speaking :)"];
  const ILLNESS_ASK_FOR_NAME_PROMPTS = ["Who is ill?", "Who is the poor sick bastard?"];

  const NO_INPUT_PROMPTS = ["What was that?"];
  const SICK_NO_INPUT_PROMPTS = ["Are you gonna call someone in sick or what??"];

  let actionMap = new Map();
  actionMap.set(TEST_INTENT, getSample);
  actionMap.set(TIME_INTENT, getTime);
  actionMap.set(LENGTH_INTENT, getLength);
  actionMap.set(ILLNESS_INTENT, registerIllness);
  app.handleRequest(actionMap);

  function getSample(){
    console.log('getSample');
    let prompt = getRandomPrompt(app, TEST_PROMPTS);
    tell(app, prompt, true);
  }

  function getTime(){
    console.log('getTime');
    let prompt = "The time is: " + new Date().toLocaleTimeString('sv-SE');
    tell(app, prompt);    
  }

  function getLength(){
    console.log('getLength');
    let prompt = app.getArgument("name") + " is " + Math.trunc(Math.random()*1000)/100 + "m long";
    tell(app, prompt);
  }

  function registerIllness(){
    
    tell(app, "You are now ill");
  }

  function getRandomPrompt(app, array, persist){
    let lastPrompt = app.data.lastPrompt;
    let prompt = "";
    
    do{
      prompt = array[Math.floor(Math.random() * (array.length))];
    } while(persist && lastPrompt === prompt && array.length > 1);

    return prompt;
  }

  function ask(app, prompt, noInputs){
    console.log('ask: ' + prompt);
    app.data.lastPrompt = prompt;
    app.ask(prompt, noInputs);
  }

  function tell(app, prompt){
    console.log('tell: ' + prompt);
    app.data.lastPrompt = prompt;
    app.tell(prompt);
  }

}
