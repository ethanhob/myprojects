//jquery.js
var playing = false;
var score;
var trialsLeft;
var step;
var action; //used for setInterval
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango'];
$(function(){
    
//click on start reset button
    
$("#startreset").click(function(){

    //we are playing
    if(playing == true){

        //reload page
        location.reload();
    }else{

        //we are not playing
        playing = true; //game initiated

        //set score to 0
        score = 0; //set score to 0
        $("#scorevalue").text(score);

        //show trials left 
        $("#trialsLeft").show();
        trialsLeft = 3;
        addHearts();

        //hide game over box
        $("#gameOver").hide();

        //change button text to reset game
        $("#startreset").text("Reset Game");

        //start sending fruits
        startAction();
    }
});

    
//slice a fruit
    
$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score); //update score
//    document.getElementById("slicesound").play();
    $("#slicesound")[0].play();//play sound
    
    //stop fruit
    clearInterval(action);
    
    //hide fruit
    $("#fruit1").hide("explode", 500); //slice fruit
    
    //send new fruit
    setTimeout(startAction, 800);
});
 
//functions

//fill trialLeft box with hearts
    
function addHearts(){
    $("#trialsLeft").empty();
    // so to add hearts you need to empty the box and then readd it every time it changes. Here it is a for loop where if you have three lives it appends three images because
    //  trials left was set to 3 to the for loop loops three times, where i is 0,1,2. trialsleft only changes when fruit hits th ebottom of the screen.
    for(i = 0; i < trialsLeft; i++){
        $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}

//start sending fruits

function startAction(){
    
    //generate a fruit
    $("#fruit1").show();
    chooseFruit(); //choose a random fruit
    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position
    
    //generate a random step
    step = 1+ Math.round(10*Math.random()); // change step between 1 and 6 spaces
    
    // Move fruit down by one step every 10ms
    action = setInterval(function(){
        
        //move fruit by one step - get posistion of the top and move it by one step
        $("#fruit1").css('top', $("#fruit1").position().top + step);                              
    
        //check if the fruit is too low - absolute positioning starts at top left corner. so if the top is greater than the bottom of the container then you lose
        if($("#fruit1").position().top > $("#fruitsContainer").height()){
            //check if we have trials left
            if(trialsLeft > 1 ){
                //generate a fruit
                $("#fruit1").show();
                chooseFruit(); //choose a random fruit
                $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position for a container of fixed dimensions.

                //generate a random step
                step = 1+ Math.round(10*Math.random()); // change step
                
                //reduce trials by one
                trialsLeft --;
                
                //populate trialsLeft box
                addHearts();
                
            }else{ // game over
                playing = false; //we are not playing anymore
                $("#startreset").text("Start Game"); // change button to Start Game
                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
                // this seems stupid. wouldnt you just create the html element in the html file?
                $("#trialsLeft").hide();
                stopAction();
            }
        }
    }, 10);
}

// generate a random fruit

function chooseFruit(){
    $("#fruit1").attr('src' , 'images/' + fruits[Math.floor(5*Math.random())]+'.png');   
    // fruits[Math.round(5*Math.random())] 
}

//Stop dropping fruits

function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
});