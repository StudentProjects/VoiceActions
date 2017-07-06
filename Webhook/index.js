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
  const HELP_INTENT = "help.get";
  const YES_REGISTER_INTENT = "illness.yes";
  const NO_REGISTER_INTENT = "illness.no";

  const REGISTRATION_CONTEXT = "registration";
  const REGISTER_YES_NO_CONTEXT = "register_yes_no";

  const TEST_PROMPTS = ["This is a smaple response from your webhook!", "You are now connected to the webhook!", "This is the webhook speaking :)"];
  const ILLNESS_ASK_FOR_NAME_PROMPTS = ["Who is ill?", "Who is the poor sick bastard?"];

  const NO_INPUT_PROMPTS = ["What was that?", "What was that?", "What was that?"];
  const SICK_NO_INPUT_PROMPTS = ["Are you gonna call someone in sick or what??", "Have I gone deaf or you mute?", "Goodbye you didn't say anything"];

  let actionMap = new Map();
  actionMap.set(TEST_INTENT, getSample);
  actionMap.set(TIME_INTENT, getTime);
  actionMap.set(LENGTH_INTENT, getLength);
  actionMap.set(ILLNESS_INTENT, registerIllness);
  actionMap.set(HELP_INTENT, getHelp);
  actionMap.set(YES_REGISTER_INTENT, yesReg);
  actionMap.set(NO_REGISTER_INTENT, noReg);
  app.handleRequest(actionMap);

  /***INTENT FUNCTIONS***/
  function getSample(){
    console.log('getSample');
    let prompt = getRandomPrompt(app, TEST_PROMPTS);
    ask(app, prompt);
  }

  function getTime(){
    console.log('getTime');
    let prompt = "The time is: " + new Date().toLocaleTimeString('sv-SE');
    ask(app, prompt);    
  }

  function getLength(){
    console.log('getLength');
    let prompt = app.getArgument("name") + " is " + Math.trunc(Math.random()*1000)/100 + "m long";
    ask(app, prompt);
  }

  function registerIllness(){
    console.log('registerIllness');
 
    let names = app.getArgument('given-name');
    let nameLen = names.length;
    let date = app.getArgument('date');

    if(nameLen == 0){
      ask(app, getRandomPrompt(app, ILLNESS_ASK_FOR_NAME_PROMPTS), SICK_NO_INPUT_PROMPTS);
    }
    else{
      let prompt = buildIllnessPrompt(names, nameLen);
      app.setContext(REGISTER_YES_NO_CONTEXT);
      if(!date){
        date = "today";
      }

      ask(app, prompt, NO_INPUT_PROMPTS);
    }
  }

  function getHelp(){
    console.log('getHelp');
    tell(app, "I can't help you, thihi")
  }

  function yesReg(){

  }

  function noReg(){

  }

  /***INTERNAL FUNCTIONS***/
  function buildIllnessPrompt(names, nameLen){
    let prompt = "";
      for(var i = 0 ; i < nameLen ; i++){
        prompt += names[i];

        if(nameLen > 1){
          if(i == nameLen-1){
            prompt += " are";
          }
          else if(i == nameLen-2){
            prompt += " and ";
          }
          else{
            prompt += ", ";
          }
        }
        else{
          prompt += " is";
        }
      }
      prompt += " now ill. Is that right?";
      return prompt;
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
