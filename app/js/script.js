import mazeJSON from "../data/00japan.js";
import Mouse from "./Mouse.js";
document.addEventListener("DOMContentLoaded", (event) => {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let searchingInterval; //Will be the timer interval when enter is hit.     
    
    const directions = ["N","S","E","W"];
    const mazeStartDim = 2;
    const gridColumnCount = mazeJSON[0].length;
    const gridRowCount = mazeJSON.length;
    const MOUSE_PADDING = 3;
    let rectHeight = canvas.height/gridRowCount;
    let rectWidth = canvas.width/gridColumnCount;
    
    //Mouse
    let mouse = new Mouse(MOUSE_PADDING);
    
    let init = () =>{
        mouse.img_s.src = "app/images/mouse_20x20_down.png";
        mouse.img_n.src = "app/images/mouse_20x20_up.png";
        mouse.img_e.src = "app/images/mouse_20x20_right.png";
        mouse.img_w.src = "app/images/mouse_20x20_left.png";
        window.requestAnimationFrame(draw);
    }

    //Grid array
    let grid = [];
    for(let r = 0; r<gridRowCount; r++){
        grid[r] = [];
        for(let c = 0; c<gridRowCount; c++){
            let gridX = (c*(rectWidth));
            let gridY = (r*(rectHeight));
            
            grid[r][c] = {  
                        x:gridX, 
                        y:gridY,
                        openings: mazeJSON[r][c]
                    }; 
        }
    }
    mouse.faceN = () => {
        mouse.facing = "N";
    }
    mouse.faceS = () => {
        mouse.facing = "S";
    }
    mouse.faceE = () => {
        mouse.facing = "E";
    }
    mouse.faceW = () => {
        mouse.facing = "W";
    }

    const checkLeftExists = (openings) =>{
        switch(mouse.facing){
            case "N":
                return (openings.indexOf("W") > -1);
            case "S":
                return (openings.indexOf("E") > -1);
            case "E":
                return (openings.indexOf("N") > -1);
            case "W":
                return (openings.indexOf("S") > -1);
        }
    }
    const checkRightExists = (openings) =>{
        switch(mouse.facing){
            case "N":
                return (openings.indexOf("E") > -1);
            case "S":
                return (openings.indexOf("W") > -1);
            case "E":
                return (openings.indexOf("S") > -1);
            case "W":
                return (openings.indexOf("N") > -1);
        }
    }
    /**Movement Functions */
    const moveForward = () =>{
        switch(mouse.facing){
            case "N":
                mouse.y -= rectHeight;
                mouse.trackY -= 1;
                break;
            case "S":
                mouse.y += rectHeight;
                mouse.trackY += 1;
                break;
            case "E":
                mouse.x += rectWidth;
                mouse.trackX += 1;
                break;
            case "W":
                mouse.x -= rectHeight;
                mouse.trackX -= 1;
                break;
        }
    }
    const prepMoveForward = (mouseLocation) => {
        if (mouseLocation.openings.indexOf(mouse.facing) >= 0 ){
            mouse.memory.push(mouseLocation);
            moveForward();
        } 
    }
    const turnRight = () =>{
        switch(mouse.facing){
            case "N":
                mouse.faceE();
                break;
            case "S":
                mouse.faceW();
                break;
            case "E":
                mouse.faceS();
                break;
            case "W":
                mouse.faceN();
                break;
        }

        
    }
    const turnLeft = () => {
        switch(mouse.facing){
            case "N":
                mouse.faceW();
                break;
            case "S":
                mouse.faceE();
                break;
            case "E":
                mouse.faceN();
                break;
            case "W":
                mouse.faceS();
                break;
        }
    };
    const turnAround = () =>{
        turnRight();
        turnRight();
    }
    const rightAlgo = () =>{
        clearInterval(searchingInterval);
        searchingInterval = setInterval(() =>{
            let mouseLocation = grid[mouse.trackY][mouse.trackX];
            console.log(mouseLocation);
            if(mouse.memory.filter(location => location === mouseLocation).length <= 1){
                if(mouseLocation.openings.indexOf(mouse.facing) <= -1 && !checkLeftExists(mouseLocation.openings) && !checkRightExists(mouseLocation.openings)){
                    turnAround(); //If complete dead end, turn around.
                }else if (mouseLocation.openings.indexOf(mouse.facing) <= -1 && checkRightExists(mouseLocation.openings)){
                    turnRight(); //If you run into a wall, turn right first.
                }else if (mouseLocation.openings.indexOf(mouse.facing) <= -1 && checkLeftExists(mouseLocation.openings) && !checkRightExists(mouseLocation.openings)){
                    turnLeft(); //If you run into a wall, and the right turn doesn't exist, turn left. 
                }else if (checkRightExists(mouseLocation.openings)){
                    turnRight();
                }
            }else if(mouse.memory.indexOf(mouseLocation) >= 0 && mouse.memory.filter(location => location === mouseLocation).length > 1){
                if(mouseLocation.openings.indexOf(mouse.facing) <= -1 && !checkLeftExists(mouseLocation.openings) && !checkRightExists(mouseLocation.openings)){
                    turnAround(); //If complete dead end, turn around.
                }else if (mouseLocation.openings.indexOf(mouse.facing) <= -1 && checkRightExists(mouseLocation.openings)){
                    turnRight(); //If you run into a wall, turn right first.
                }else if (mouseLocation.openings.indexOf(mouse.facing) <= -1 && checkLeftExists(mouseLocation.openings) && !checkRightExists(mouseLocation.openings)){
                    turnLeft(); //If you run into a wall, and the right turn doesn't exist, turn left. 
                }else if (checkLeftExists(mouseLocation.openings)){
                    turnLeft();
                }
            }
            
            
            prepMoveForward(mouseLocation); 
            
            
        }, 200);
    }

    function keyUpHandler (e){
        switch(e.keyCode){
            // case 38: //UP
            //     mouse.faceN();
            //     break;
            // case 40: //DOWN
            //     mouse.faceS();
            //     break;
            // case 39: //RIGHT
            //     mouse.faceE();
            //     break;
            // case 37: //LEFT
            //     mouse.faceW();
            //     break;
            // case 32: //SPACE
            //     prepMoveForward();
            //     break;
            case 8:
                clearInterval(searchingInterval);
                break;
            case 13:
                rightAlgo();
                break;
        }
    }
    document.addEventListener("keyup", keyUpHandler, true);


// ============================================================Drawing Functions ===================================================

    const drawMouse = () =>{
        switch(mouse.facing){
            case "N":
                ctx.drawImage(mouse.img_n, mouse.x, mouse.y);              
                break;
            case "S":
                ctx.drawImage(mouse.img_s, mouse.x, mouse.y); 
                break;
            case "E":
                ctx.drawImage(mouse.img_e, mouse.x, mouse.y); 
                break;
            case "W":
                ctx.drawImage(mouse.img_w, mouse.x, mouse.y); 
                break;
        }
        
    }
    
    const drawMaze = () => {
        for (let r = 0; r< gridRowCount; r++){
            for(let c = 0; c< gridRowCount; c++){
                
                let currentGrid = grid[r][c];
                let wallDirections = [];

                //For each index of the array, get the directions where there is a wall.
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

    const draw = () =>{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMaze();
        drawMouse();
        window.requestAnimationFrame(draw);
    }
   
    init();
});

