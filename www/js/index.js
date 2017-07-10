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
            clientAccessToken: "2cf08909d19c476ab37067ae11e2dfe7",
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
                    document.getElementById("resp").innerHTML = response.result.resolvedQuery + '<br>' + response.result.fulfillment.speech;
                    TTS.speak({
                            text: response.result.fulfillment.speech,
                            locale: 'en-US',
                        }, function () {
                            //console.log(response.result.resolvedQuery + " " + response.result.fulfillment.speech);
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