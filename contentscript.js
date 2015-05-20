function profFinder() {
       
	 
        subArr = [];
        $(".datadisplaytable.tablesorter tr").each(function (index) {
            console.log($(this));
            $cells = $(this).find("td");
           
            $cells.each(function (cellIndex) {          //search column to find the professor name one
                if (cellIndex == 19) {                          //once found send message to background script
                	//console.log($(this).text());                   //background script pushes professor names to local storage
               		var name = $(this).text();                     //popup reads local storage to
                    if(name.includes("TBA") || subArr.indexOf(name)>-1 ){
                            console.log("tba or already found");
                    }else{

                        subArr.push(name);
                    }
                        
                    
                }


            });

        });
        




    chrome.extension.sendMessage({professors: subArr});



 


}

profFinder();


