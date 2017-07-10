const ApiAiApp = require('actions-on-google').ApiAiApp;

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
  const GOODBYE_INTENT = "goodbye.message"
  const NEWS_INTENT = "news.get";

  const REGISTER_YES_NO_CONTEXT = "register_yes_no";

  const TEST_PROMPTS = ["This is a smaple response from your webhook!", "You are now connected to the webhook!", "This is the webhook speaking :)"];
  const HELP_PROMPTS = ["Try checking out the news at the school this week or maybe one of your kids needs to be called in sick."];
  const ILLNESS_ASK_FOR_NAME_PROMPTS = ["Who is ill?", "Who is the poor sick bastard?"];
  const YES_REGISTERED_PROMPTS = ["Awesome! I've taken care of that now. Was there anything else?"];
  const NO_REGISTERED_NO_CORRECTION_PROMPTS = ["What would you like to change?"];
  const NEWS_PROMPTS = ["Something cool is happening on friday!!", "Mrs. Teacherson has been promoted to headmistress."];
  const GOODBYE_PROMPTS = ["Goodbye!", "Have a good day!", "Have a nice day!"];

  const NO_INPUT_PROMPTS = ["What was that?1", "What was that?2", "What was that?3"];
  const SICK_NO_INPUT_PROMPTS = ["Are you gonna call someone in sick or what??", "Have I gone deaf or you mute?", "Goodbye you didn't say anything"];

  let actionMap = new Map();
  actionMap.set(TEST_INTENT, getSample);
  actionMap.set(TIME_INTENT, getTime);
  actionMap.set(LENGTH_INTENT, getLength);
  actionMap.set(ILLNESS_INTENT, registerIllness);
  actionMap.set(HELP_INTENT, getHelp);
  actionMap.set(YES_REGISTER_INTENT, yesReg);
  actionMap.set(NO_REGISTER_INTENT, noReg);
  actionMap.set(GOODBYE_INTENT, goodbyeMessage);
  actionMap.set(NEWS_INTENT, getNews);
  app.handleRequest(actionMap);

  /***INTENT FUNCTIONS***/
  function getSample(){
    console.log('getSample');
    let prompt = getRandomPrompt(TEST_PROMPTS);
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

    if(nameLen == 0){
      ask(app, getRandomPrompt(ILLNESS_ASK_FOR_NAME_PROMPTS), SICK_NO_INPUT_PROMPTS);
      return;
    }
    else{
      let date = "today";
      
      if(app.getContextArgument(REGISTER_YES_NO_CONTEXT, 'date-time')){
        date = app.getContextArgument(REGISTER_YES_NO_CONTEXT, 'date-time').original;
      }

      let prompt = buildIllnessPrompt(names, nameLen, date);
      ask(app, prompt, NO_INPUT_PROMPTS);
      return;
    }
  }

  function getHelp(){
    console.log('getHelp');
    ask(app, getRandomPrompt(HELP_PROMPTS), NO_INPUT_PROMPTS);
  }

  function yesReg(){
    console.log('yesReg');
    ask(app, getRandomPrompt(YES_REGISTERED_PROMPTS), NO_INPUT_PROMPTS);
  }

  function noReg(){
    console.log('noReg');

    let names = app.getArgument('given-name-no');
    let nameLen = names.length;
    let date = app.getContextArgument(REGISTER_YES_NO_CONTEXT, 'date-time-no');

    if(!date && nameLen == 0){
      ask(app, getRandomPrompt(NO_REGISTERED_NO_CORRECTION_PROMPTS), NO_INPUT_PROMPTS);
      return;
    }

    if(date && nameLen > 0){
      let prompt = buildIllnessPrompt(names, nameLen, date.original);
      ask(app, prompt, NO_INPUT_PROMPTS);
      return;
    }

    if(!date){
      date = app.getContextArgument(REGISTER_YES_NO_CONTEXT, 'date-time').original;
    }
    else if(nameLen == 0){
      names = app.getContextArgument(REGISTER_YES_NO_CONTEXT, 'given-name').value;
      nameLen = names.length;
      date = date.original;
    }

    let prompt = buildIllnessPrompt(names, nameLen, date);

    ask(app, prompt, NO_INPUT_PROMPTS);
  }
  
  function getNews(){
    console.log("getNews");
    ask(app, getRandomPrompt(NEWS_PROMPTS), NO_INPUT_PROMPTS);
  }
  
  function goodbyeMessage(){
    console.log('goodbyeMessage');
    tell(app, getRandomPrompt(GOODBYE_PROMPTS));
  }

  /***INTERNAL FUNCTIONS***/
  function buildIllnessPrompt(names, nameLen, date){
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
      prompt += " ill " + date + ". ";
      prompt += "Is that right?";
      return prompt;
  }

  function getRandomPrompt(array){
    let prompt = array[Math.floor(Math.random() * (array.length))];
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
