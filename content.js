// console.log(Array.from(document.querySelectorAll('.cue')).map((c)=>{return c.innerHTML.trim()}).join(' '));
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {
        // var firstHref = $("a[href^='http']").eq(0).attr("href");
        const cuesElements = document.querySelectorAll('.cue');
        if(document.querySelectorAll('.cue').length === 0){
            alert('click `...` and `open Transcript` then try again');
        }
        else{
            const cuesElementsArray = Array.from(cuesElements);
            const cuesElementsArrayInnerText = cuesElementsArray.map((c)=>{return c.innerHTML.trim()})
            const text = cuesElementsArrayInnerText.join(' ');
            console.log(text);

            const responseCliboard = confirm("Would you like to copy the text to clipboard?");
            if ( responseCliboard === true) {
                // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
                // https://barrysimpson.net/posts/copy-paste-chrome-ext
                navigator.clipboard.writeText(text).then(function() {
                /* clipboard successfully set */
                    alert('copied onto your clipboard')
                }, function() {
                    /* clipboard write failed */
                    alert('there was an error copying it onto your clipboard')
                });
            } else {
                alert(`Transcript Text: ${text}`);
            }
            
            // const responseTTS = confirm("Would you like to use Text To Speech?");
            // if (responseTTS === true) {
            //     var msg = new SpeechSynthesisUtterance();
            //     var voices = window.speechSynthesis.getVoices();
            //     msg.voice = voices[0]; // Note: some voices don't support altering params
            //     msg.voiceURI = 'native';
            //     msg.volume = 1; // 0 to 1
            //     msg.rate = 2;//1; // 0.1 to 10
            //     msg.pitch = 2; //0 to 2
            //     msg.text = text;//'Hello World';
            //     msg.lang = 'en-US';
                
            //     msg.onend = function(e) {
            //       console.log('Finished in ' + event.elapsedTime + ' seconds.');
            //     };
                
            //     speechSynthesis.speak(msg);
            // } 
        }
      }
    }
  );