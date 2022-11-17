//javascript.js
$(function(){
    
    
    //declare variables
    
    //paintingerasing or not    
    var paint = false;
    
    //painting or erasing
    var paint_erase = "paint";
    
    //get the canvas and context
    var canvas = document.getElementById("paint");
    var ctx = canvas.getContext("2d");
    // this is important so you can actually paint. 
    
    //get the canvas container and store this id in a bvariable. 
    var container = $("#container");
        
    //mouse position
    var mouse = {x: 0, y: 0};
    // set a default position for the mouse at the top right corner. 
    
    //onload load saved work from localStorage - named the canvas image conovas. 
    if(localStorage.getItem("imgCanvas") != null){
        // if local storage is not null. create a new image object and on load and set it to the item imgcanvas.
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 10, 10);
        }
        img.src = localStorage.getItem("imgCanvas");
    };
    //set drawing parameters (lineWidth, lineJoin, lineCap)
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    
    //click inside container - as the container id was stored in teh container variable to begin with. 
    container.mousedown(function(e){
        // e is an event and since mouse down is an event you need to set it
        paint = true;
        // always good to set the variable here as true for down and false for up. 
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        // distance to edge of page - the offset left anf top of this from the edge. 
        ctx.moveTo(mouse.x, mouse.y);
        // the position is set so its just saying set the position to the current mouse position. 
    });
    
    //move the mouse while holding mouse key
    container.mousemove(function(e){
                // e is an event and since mouse down is an event you need to set it
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint == true){
            if(paint_erase == "paint"){
                //get color input   
                ctx.strokeStyle = $("#paintColor").val();
                // val is good as its getting the balue of an id. 
            }else{
                //white color 
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            // you need stroke to actually begin the action of creating a stroke. 
            // 
        }
    });
    //mouse up->we are not paintingerasing anymore
    container.mouseup(function(){
        paint = false;
    });
    
    //if we leave the container we are not paintingerasing anymore
    container.mouseleave(function(){
        paint = false;
    });
 
    //click on the reset button
    $("#reset").click(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // clear the rectangle going from the corner to the end of full width and height of the canvas. 
        paint_erase = "paint";
        // set mode to paint
        $("#erase").removeClass("eraseMode");
        // removeClass erasemode. 
    });
    //click on save button
    $("#save").click(function(){
        if(typeof(localStorage) != null){
              localStorage.setItem("imgCanvas", canvas.toDataURL()); 
            //   if local storage isnt null set the item image canvas to local storage via todataurl.
        }else{
            window.alert("Your browser does not support local storage!");   
        }
    });
    //click on the erase button - this is just saying change the mode to the other one and trigger the class eraseMode. if another paintmode class had been set up you could
    // just use toggleClass and wont have to fuck with states. 
    $("#erase").click(function(){
        if(paint_erase == "paint"){
            paint_erase = "erase";   
        }else{
            paint_erase = "paint";   
        }
        $(this).toggleClass("eraseMode");
    });
    
    //change color input
    $("#paintColor").change(function(){
        // change as a method is used for interactive elements so when one changes other change
        $("#circle").css("background-color", $(this).val());
    });
    //change lineWidth using slider
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event, ui){
            // because its an event that needs user interaction to affect the value.
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            // set height, width and lineWidth of the canvas to the ui.value. 
            ctx.lineWidth = ui.value;
        }
    });

});