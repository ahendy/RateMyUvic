var myArray = [
	{
		"firstname": <name>,
		"lastname": <lastname>,
		"url": <url>,
	},
]


function profFinder() {
    var button = $("<button id ='btn'>Hover for info: </button>");

    subArr = [];
    $(".datadisplaytable.tablesorter tr").each(function (index) {
        $cells = $(this).find("td");

        //background script pushes professor names to local storage

        $cells.each(function (cellIndex) { //search column to find the professor name one

            if (cellIndex == 19) { //once found send message to background script
                //background script pushes professor names to local storage
                var name = $(this).text(); //popup reads local storage to
                var result = $.grep(myArray, function (e) {
                    return name.includes(e.firstname) && name.includes(e.lastname);
                }); //contains object of professor



                if (name.includes("TBA") || subArr.indexOf(name) > -1 || result.length == 0) {
                    // console.log("tba or already found");
                } else {


                    var hasAppended = false;
                    $(this).wrap(button);
                    var moveLeft = -100;
                    var moveDown = 10;


                    $(this).hover(
						
						 function (e) { //onhover

                        	console.log(result[0].url);
	                        if (hasAppended == false) {

		                            for (var each = 0; each < result.length; each++) { //use for each in case of two professors for one course.					                                    	

		                                chrome.runtime.sendMessage({
		                                    teach: result[each],
		                                    each: each
		                                }, function (response) {
		                                    //sendmessage and on return use callback to filter data from (response)
		                                    myCallBack(response);


		                                });
		                                hasAppended = true;

		                                //when hasAPpend = true ajax will never be called again, saving time for each onhover


		                            } //end for



	                        } else { //else we have already used ajax 

                            var btnSelector = $("button td.dddefault:contains('" + name + "')").parent();
                            var popupSelector = btnSelector.parent().next();


                            $(popupSelector).show().css('top', e.pageY + moveDown)
                                .css('left', e.pageX + moveLeft);

                            $('div#pop-up2:eq(0)').show().css('top', e.pageY + moveDown)
                                .css('left', e.pageX + moveLeft);

                        } //end else


                        //end onhover       	
                    }, function () { //offhover
                        $('div#pop-up').hide();
                        $('div#pop-up2').hide();
                    }); //end off hover

                    $(this).mousemove(function (e) {
                        $("div#pop-up").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft + 20);
                        $("div#pop-up2").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft - 150);

                    });

                    $(this).click(function () {
                        for (var i = 0; i < result.length; i++) {
                            window.open(result[i].url); //opens urls of professors when name clicked
                        };

                    });


                    subArr.push(name); //subArr contains list of professors 
                    console.log("button appended to " + name);

                }




            };





        });

    });





    chrome.extension.sendMessage({
        professors: subArr
    }); //pushes list of professors to Localstorage for use in popup HTML






}





function myCallBack(response) { //function that relies on returned ratings
    var each = response.each;
    var array = response.teachObj;		//distribute ajax response into variables   . each == counter, array == professor object, response == ajax 
    var $response = response.infos;


    var total = "/5.0";
    overallRating = $($response).find("div.grade").eq(0).text() + total;
    avgGrade = $($response).find('div.grade').eq(1).text();

    helpfulness = $($response).find('div.rating').eq(0).text() + total;
    clarity = $($response).find('div.rating').eq(1).text() + total;
    easiness = $($response).find('div.rating').eq(2).text() + total;

    numRatings = $($response).find("div.table-toggle.rating-count.active").eq(0).text();
    //numRatings =  numRatings.slice(0,11) + " Ratings"
    //hot = chrome.extension.getURL("scorching-chili.png");



    var btnSelector = $("button td.dddefault:contains('" +" "+ array.lastname + "')").parent(); // [dddefault^='"+  array.firstname +"']


    if (each == 0) {
        console.log("length 2");
        var div = "<div id ='pop-up'>\
		    				<h1><a href='" + array.url + "'</a>" + array.firstname + " " + array.lastname + "</h1>\
		    				<h2>" + numRatings + "\
		    			</div>";

       

        if (overallRating.indexOf("Select") > -1) { //professor has not been rated yet, but has a ratemyprof URL
            $(btnSelector.parent()).after(div);
            $(popupSelector).append("<div id ='error-message'>This Professor has not yet been rated.");


        } else {

            $(btnSelector.parent()).after(div); //initializes popup div

            var popupSelector = butSelector.parent().next();
            $(popupSelector).append("<div id ='overallRating'>Overall Rating: " + overallRating);
            $(popupSelector).append("<div id ='avgGrade'>Average Grade: " + avgGrade);
            $(popupSelector).append("<div id ='helpfulness'>Helpfulness: " + helpfulness);
            $(popupSelector).append("<div id ='easiness'>Clarity: " + clarity);
            $(popupSelector).append("<div id ='easiness'>Easiness: " + easiness);
            $(popupSelector).show();


        }



    } else { //case of two professors for single course


        var div = "<div id ='pop-up2'>\
		    				<h1><a href='" + array.url + "'</a>" + array.firstname + " " + array.lastname + "</h1>\
		    				<h2>" + numRatings + "\
		    			</div>";



        $("#pop-up").after(div);
        $("#pop-up2").append("<div id ='overallRating'>Overall Rating: " + overallRating);
        $("#pop-up2").append("<div id ='avgGrade'>Average Grade: " + avgGrade);
        $("#pop-up2").append("<div id ='helpfulness'>Helpfulness: " + helpfulness);
        $("#pop-up2").append("<div id ='easiness'>Clarity: " + clarity);
        $("#pop-up2").append("<div id ='easiness'>Easiness: " + easiness);
        $('div#pop-up2:eq(0)').show();
    }




    // testSelector = $("button td.dddefault:contains('"+ array.lastname +"')");							

    //console.log(testSelector.parent().next().get());

}







profFinder();
