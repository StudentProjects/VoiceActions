/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {};

app.initialize = function() {
    document.addEventListener('deviceready', app.onDeviceReady, false);
};

app.onDeviceReady = function() {
    ApiAIPlugin.init(
        {
            //clientAccessToken: "cb0d6579d6fc46cc87b23317386aecd0", // Jonas token (insert your client access key here)
            clientAccessToken: "21089ec943e2460eb655d53fd5733e1b",  // Alice token
            lang: "en" // set lang tag from list of supported languages 
        }, 
        function(result) { /* success processing */ },
        function(error) { /* error processing */ }
    );

    function sendVoice() {
        try {     
            ApiAIPlugin.requestVoice(
                {}, // empty for simple requests, some optional parameters can be here 
                function (response) {
                    // place your result processing here
                    document.getElementById("resp").innerHTML = response.result.fulfillment.speech;
                    TTS.speak({
                            text: response.result.fulfillment.speech,
                            locale: 'en-US',
                        }, function () {
                            //alert(response.result.fulfillment.speech);
                        }, function (reason) {
                            alert(reason);
                        });
                },
                function (error) {
                    // place your error processing here 
                    alert(error);
                });                
        } catch (e) {
            alert(e);
        }
    }

    document.getElementById("btn").addEventListener("click", sendVoice);
}

app.initialize();