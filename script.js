// document.addEventListener("DOMContentLoaded", function(event) { 
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    //Maze Consts
    const mazeJSON = [
        ["ES", "SW", "ES", "SW", "ES", "SW", "ES", "SW", "S", "S", "ES", "ESW", "W", "ES", "EW", "SW"],
        ["NS", "NS", "NS", "NES", "NSW", "NES", "NSW", "NES", "NESW", "NESW", "NW", "NES", "SW", "NE", "SW", "NS"],
        ["NS", "NS", "NS", "N", "NE", "NW", "NE", "NW", "N", "NS", "ES", "NSW", "NES", "SW", "NS", "NS"],
        ["NS", "NS", "NS", "S", "ES", "SW", "S", "ES", "SW", "NE", "NW", "NE", "NSW", "NS", "NS", "NS"],
        ["NS", "NS", "NS", "NES", "NW", "NE", "NSW", "NS", "NS", "ES", "EW", "SW", "NE", "NSW", "NS", "NS"],
        ["NS", "NS", "NS", "NES", "EW", "SW", "NE", "NW", "NE", "NW", "ES", "NEW", "EW", "NW", "NS", "NS"],
        ["NS", "NS", "NS", "N", "ES", "NEW", "SW", "ES", "EW", "SW", "NE", "EW", "SW", "ES", "NW", "NS"],
        ["NS", "NS", "NS", "S", "NE", "ESW", "NW", "NES", "SW", "NES", "EW", "EW", "NW", "NE", "SW", "NS"],
        ["NS", "NS", "NES", "NSW", "ES", "NEW", "W", "NES", "NW", "NS", "ES", "SW", "ES", "SW", "NS", "NS"],
        ["NS", "NS", "NS", "NS", "NE", "SW", "S", "NE", "EW", "NEW", "NW", "NE", "NW", "NE", "NW", "NS"],
        ["NS", "NES", "NW", "NES", "SW", "NE", "NESW", "W", "ES", "SW", "ES", "SW", "ES", "SW", "ES", "NW"],
        ["NS", "NS", "ES", "NW", "NE", "EW", "NEW", "W", "NS", "NES", "NW", "NE", "NSW", "NS", "NE", "SW"],
        ["NS", "NE", "NW", "ES", "SW", "ES", "SW", "S", "NES", "NEW", "W", "E", "NEW", "NSW", "S", "NS"],
        ["NS", "S", "S", "NS", "NS", "NS", "NS", "NES", "NESW", "SW", "ES", "SW", "ES", "NEW", "NSW", "NS"],
        ["NES", "NESW", "NESW", "NESW", "NESW", "NESW", "NESW", "NSW", "NS", "NES", "NSW", "NES", "NSW", "ES", "NSW", "NS"],
        ["N", "N", "N", "N", "N", "N", "N", "NE", "NEW", "NW", "NE", "NW", "NE", "NW", "NE", "NW"]
     ];   
     
    
    const directions = ["N","S","E","W"];
    const mazeStartDim = 2;
    const gridColumnCount = mazeJSON[0].length;
    const gridRowCount = mazeJSON.length;
    var rectHeight = canvas.height/gridRowCount;
    var rectWidth = canvas.width/gridColumnCount;
    
    //Key Variables
    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;
    //Mouse
    var mouse = new Image();
    var mouseX = 0;
    var mouseY = 0;
    var mouseLoaded = false;
    mouse.onload = function(){
        ctx.drawImage(mouse, mouseX, mouseY);
        mouseLoaded = true;
    }

    mouse.src = "assets/images/mouse_20x20.png";

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    //Grid
    var grid = [];
    for(let r = 0; r<gridRowCount; r++){
        grid[r] = [];
        for(let c = 0; c<gridRowCount; c++){
            var gridX = (c*(rectWidth));
            var gridY = (r*(rectHeight));
            
            grid[r][c] = {  
                        x:gridX, 
                        y:gridY,
                        openings: mazeJSON[r][c]
                    }; 
        }
    }

    function keyDownHandler(e){
        switch(e.keyCode){
            case 38:
                upPressed = true;
                break;
            case 40:
                downPressed = true;
                break;
            case 39:
                rightPressed = true;
                break;
            case 37:
                leftPressed = true;
                break;
        }
    }
    function keyUpHandler(e){
        console.log("keyup");
        switch(e.keyCode){
            case 38:
                upPressed = false;
                break;
            case 40:
                downPressed = false;
                break;
            case 39:
                rightPressed = false;
                break;
            case 37:
                leftPressed = false;
                break;
        }
    }
    function drawMaze(){
        for (let r = 0; r< gridRowCount; r++){
            for(let c = 0; c< gridRowCount; c++){
                var currentGrid = grid[r][c];
                
                var wallDirections = [];
                for(let i = 0; i<directions.length; i++){
                    if (currentGrid.openings.indexOf(directions[i]) === -1){
                        wallDirections.push(directions[i]);
                    }
                }

                for (let j = 0; j<wallDirections.length; j++){
                    ctx.beginPath();
                    switch(wallDirections[j]) {
                        case "N":
                            ctx.moveTo(currentGrid.x, currentGrid.y);
                            ctx.lineTo(currentGrid.x + rectWidth, currentGrid.y);
                            break;
                        case "S":
                            var blCornerY = currentGrid.y + rectHeight; 
                            ctx.moveTo(currentGrid.x, blCornerY);
                            ctx.lineTo(currentGrid.x + rectWidth, blCornerY);
                            break;
                        case "E":
                            var trCornerX = currentGrid.x + rectWidth;
                            ctx.moveTo(trCornerX, currentGrid.y);
                            ctx.lineTo(trCornerX, currentGrid.y + rectHeight);
                            break;
                        case "W":
                            var blCornerY = currentGrid.y + rectHeight; 
                            ctx.moveTo(currentGrid.x, currentGrid.y);
                            ctx.lineTo(currentGrid.x, blCornerY);
                            break;
                    }
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    function draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMaze();
        if (mouseLoaded){
            ctx.drawImage(mouse, mouseX, mouseY);
        }
        if(downPressed && mouseY < canvas.height-mouse.height){
            mouseY +=2;
        }
        if(upPressed && mouseY > 0){
            mouseY -=2;
        }
        if(rightPressed && mouseX <canvas.width-mouse.width){
            mouseX +=2;
        }
        if(leftPressed && mouseX > 0){
            mouseX -=2;
        }
       
        requestAnimationFrame(draw);

    }

    draw();

// });