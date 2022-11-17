//index.js
$(function(){
    
    //declare variables
    var myArray;
    var inputLength;
    var reading = false;
    var counter;
    var action;
    var frequency = 200;
    //on page load hide elements we don't need, leave only text area and start button
    $("#new").hide();
    $("#resume").hide();
    $("#pause").hide();
    $("#controls").hide();
    $("#result").hide();
    $("#error").hide();
    
    //click on Start Reading
    $("#start").click(function(){
        //get text and split it to words inside an array
        //\s matches spaces, tabs, new lines, etc and + means one or more.
        myArray = $("#userInput").val().split(/\s+/);
        
        //get the number of words
        inputLength = myArray.length;
        // you could probably use myarray.Length always but its cleaner to just define it all first and then set it so you only have to reference inputLength from here. 
        
        if(inputLength>1){//there is enough input and words aere in the box. 
            
            //move to reading mode
            reading = true;
            
            //hide Start/error/userInput, show New/Pause/Controls
            $("#start").hide();
            $("#error").hide();
            $("#userInput").hide();
            $("#new").show();
            $("#pause").show();
            $("#controls").show();
            
            //set progress slider max
            $("#progressslider").attr("max", inputLength-1);
            // why set this at inputlength-1. it is set at input length -1 as it has transformed the text into an array where index[0] is the first word. therefore the final word index is the length -1
            
            //start the counter at zero
            counter = 0;
            
            //show reading box with the first word
            $("#result").show();
            $("#result").text(myArray[counter]);
            
            //start reading from the first word
            action = setInterval(read, frequency);
            
        }else{//not enough text input
            $("#error").show(); 
        }
        
    });
    //Click on New
    $("#new").click(function(){
        //reload page
        location.reload();
        // reloads a new page.
    });
    
    //Click on Pause
    $("#pause").click(function(){
        //stop reading and switch to none reading mode
        clearInterval(action);
        reading = false;
        
        //hide pause and show resume
        $("#pause").hide();
        $("#resume").show();
        
    });
    
    //Click on Resume
    $("#resume").click(function(){
        
        //start reading
        action = setInterval(read, frequency);
        
        //go back to reading mode
        reading = true;
        
        //hide resume and show pause
        $("#resume").hide();
        $("#pause").show();
        
    });
    
    //Change fontSize
    $("#fontsizeslider").on("slidestop", function(event,ui){
        //refresh the slider
        $("#fontsizeslider").slider("refresh");
        
        //get the value of slider
        // parseinteger to extract the value of the slider and then change the size of result to that size and change the text of font size to the value of the slider.
        var slidervalue = parseInt($("#fontsizeslider").val());
        
        $("#result").css("fontSize", slidervalue);
        $("#fontsize").text(slidervalue);
    });
    
    //change speed
    $("#speedslider").on("slidestop", function(event,ui){
        
        //refresh the slider- needs to happen first
        $("#speedslider").slider("refresh");
        
        //get the value of slider
        var slidervalue = parseInt($("#speedslider").val());
        
        $("#speed").text(slidervalue);
        
        //stop reading - needed in order to change. 
        clearInterval(action);
        
        //change frequency - 1 minute is 60 000ms
        // the lower the slider value, the higher the frequency, the higher the frequency, the longer it takes for set interval to prgress, therefore the wpm is lower.
        frequency = 60000/slidervalue;
        
        //resume reading if we are in reading mode
        if(reading){
               action = setInterval(read, frequency);
        }
    });
    
    //progress slider
$("#progressslider").on("slidestop", function(event,ui){
        
        //refresh the slider
        $("#progressslider").slider("refresh");
        
        //get the value of slider
        var slidervalue = parseInt($("#progressslider").val());
        
        //stop reading
        clearInterval(action);
        
        //change counter
        counter = slidervalue;
        
        //change word
        $("#result").text(myArray[counter]);    
    
        //change value of progress
        $("#percentage").text(Math.floor(counter/(inputLength-1)*100));
        // counter is where we currently are in the array and input length -1 is the max value of the array. you get the floor of that and multiple by 100 to get a percentage. 
    
        //resume reading if we are in reading mode
        if(reading){
               action = setInterval(read, frequency);
        }
    });
    //functions
    
    function read(){
        if(counter == inputLength-1){//last word
            clearInterval(action);
            reading = false; //move to none reading mode
            $("#pause").hide();
        }else{
            //counter goes up by one
            counter++;
            
            //get word
            $("#result").text(myArray[counter]);
            
            //change progress slider value and refresh
            $("#progressslider").val(counter).slider('refresh');
            // use val to set the value to that of counter. and then once you have that refresh the slider. 
            
            //change text of percentage
            $("#percentage").text(Math.floor(counter/(inputLength-1)*100));
        }
        
        
        
    }
    
});