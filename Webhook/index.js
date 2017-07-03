exports.helloHttp = function helloHttp (req, res) {

  //response = "This is a sample response from your webhook!" //Default response from the webhook to show it's working
  response = "The time is: " + new Date().toLocaleTimeString('sv-SE');

  res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  res.send(JSON.stringify({ 
      "speech": response, 
      "displayText": response
    }));
};
