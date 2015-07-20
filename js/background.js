


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if ("professors" in request){
		console.log(JSON.stringify(request));
		localStorage["professors"] = JSON.stringify(request);			//if message sent from html
		console.log("msg recieved!");


	}else{ //else message sent for content script

			try{
			     $.get(request.teach.url, function(data){
			                var $response = (data);
			                var respObj {infos: $response, teachObj: request.teach, each: request.each};
			                sendResponse(respObj);

			        });
			    }catch(err){
			        console.log(err);

			    }


			return true; //prevents callback being sent too early
	}
	
	
});






		
		