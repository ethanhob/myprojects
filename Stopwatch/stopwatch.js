//stopwatch.js
$(function(){
    //variables
    var mode = 0;//App mode - this is the standard start and stop 0 stop start 1
    var timeCounter = 0;//time counter
    var lapCounter = 0;//time for lap counter
    var action;//variable for setInterval
    var lapNumber = 0;//Number of Laps
        
        //minutes,seconds,centiseconds for time and lap
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;
    
    //On App load show start and lap buttons
    hideshowButtons("#startButton","#lapButton");
    //click on startButton
    $("#startButton").click(function(){
        //mode on
        mode = 1;
        //show stop and lap buttons
        hideshowButtons("#stopButton","#lapButton");
        //start counter
        startAction();
    });

    
    //click on stopButton
    $("#stopButton").click(function(){
        //show resume and reset buttons
        hideshowButtons("#resumeButton","#resetButton");
        //stop counter
        clearInterval(action);
    });
    
    //click on resumeButton
    $("#resumeButton").click(function(){
        //show stop and lap buttons
        hideshowButtons("#stopButton","#lapButton");
        //start counter
        startAction();
    });
    
    //click on resetButton
    $("#resetButton").click(function(){
        //reload the page
        location.reload();
    });
    
    //click on lapButton
    $("#lapButton").click(function(){
        //if mode is ON
        if(mode){
            // if(mode) is the same as if(mode == true)
            //stop action - this has to be in there so it records it at the snapshot correctly. otherwise itll compound. 
            clearInterval(action);
            //resetLap and print lap details
            lapCounter = 0;
            // this relates to the time being displayed on the right. 
            addLap();
            //start action
            startAction();
        }
    });

    
    //functions
    //hideshowButtons function shows two buttons - hides everything with the class control and shows x and y.
    function hideshowButtons(x,y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
    
    //start the counter
    function startAction(){
        action = setInterval(function(){
            // this just starts the time again and ensures upper limits arent exceeded by resetting 99m to 0
            timeCounter++;
            if(timeCounter == 100*60*100){
                timeCounter = 0;   
            }
            lapCounter++;
            if(lapCounter == 100*60*100){
                lapCounter = 0;   
            }
            updateTime();
        },10);
        // value set to 10 as regular time is defined as milliseconds whereas here we have centiseconds so we need the interval to be every 10ms or 1cs. Cannot be fractional.
    }
    
    //updateTime: converts counters to min,sec,centisec
    // the percentage seems to truncate the millisecond counter at a specific point and then allows you to perform calculations.
    function updateTime(){
        //1min=60*100centiseconds=6000centiseconds
        timeMinutes = Math.floor(timeCounter/6000);
        //1sec=100centiseconds
        timeSeconds = Math.floor((timeCounter%6000)/100);
        timeCentiseconds = (timeCounter%6000)%100;
        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentisecond").text(format(timeCentiseconds));
        
        //1min=60*100centiseconds=6000centiseconds
        lapMinutes = Math.floor(lapCounter/6000);
        //1sec=100centiseconds
        lapSeconds = Math.floor((lapCounter%6000)/100);
        lapCentiseconds = (lapCounter%6000)%100;
        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSeconds));
        $("#lapcentisecond").text(format(lapCentiseconds));
    }
    
    //format numbers
    function format(number){
        if(number<10){
            return '0'+number;   
        }else{
            return number;   
        }
    }
    
    //addLap function: print lap details inside the lap box
    function addLap(){
        lapNumber++;
           var myLapDetails =
               '<div class="lap">'+
                    '<div class="laptimetitle">'+
                        'Lap'+ lapNumber +
                    '</div>'+
                    '<div class="laptime">'+
                        '<span>'+ format(lapMinutes) +'</span>'+
                        ':<span>'+ format(lapSeconds) +'</span>'+
                        ':<span>'+ format(lapCentiseconds) +'</span>'+
                    '</div>'+
               '</div>';
            //    create the variable and then select this and add it to lap. 
        $(myLapDetails).prependTo("#laps");
        // to go backwards. 
        // this was confusing. basically the two times are displayed via html and then we format the computer running time to mins, seconds and centiseconds. 
        //then we run both timers. once lap is clicked lapCOunter time is reset to 0 and then we start the time again. 
        //the time continues to run until you click stop then you just clear interval action. 
        // once you click lap it is styled and formatted to show the lap times underneath. 
    }
});