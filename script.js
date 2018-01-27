document.addEventListener("DOMContentLoaded", function(event) { 
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");

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
    const mousePadding = 3;
    let rectHeight = canvas.height/gridRowCount;
    let rectWidth = canvas.width/gridColumnCount;
    
    //Mouse
    let mouse = {
        img_s: new Image(),
        img_n: new Image(),
        img_e: new Image(),
        img_w: new Image(),
        x: 0 + mousePadding,
        y: 0 + mousePadding,
        facing: "S"
    }
    function init(){
        mouse.img_s.src = "assets/images/mouse_20x20_down.png";
        mouse.img_n.src = "assets/images/mouse_20x20_up.png";
        mouse.img_e.src = "assets/images/mouse_20x20_right.png";
        mouse.img_w.src = "assets/images/mouse_20x20_left.png";
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


    var moveForward = () =>{
        switch(mouse.facing){
            case "N":
                mouse.y -= rectHeight;
                break;
            case "S":
                mouse.y += rectHeight;
                break;
            case "E":
                mouse.x += rectWidth;
                break;
            case "W":
                mouse.x -= rectHeight;
                break;
        }
    }

    mouse.faceN = () => {
        console.log("Face north!");
        mouse.facing = "N";
    }
    mouse.faceS = () => {
        console.log("Face south!");
        mouse.facing = "S";
    }
    mouse.faceE = () => {
        console.log("Face east!");
        mouse.facing = "E";
    }
    mouse.faceW = () => {
        console.log("Face west!");
        mouse.facing = "W";
    }
    var keyUpHandler = (e) =>{
        switch(e.keyCode){
            case 38: //UP
                mouse.faceN();
                break;
            case 40: //DOWN
                mouse.faceS();
                break;
            case 39: //RIGHT
                mouse.faceE();
                break;
            case 37: //LEFT
                mouse.faceW();
                break;
            case 32: //SPACE
                moveForward();
                break;
        }
    }



    var drawMouse = () =>{
        switch(mouse.facing){
            case "N":
                ctx.drawImage(mouse.img_n, mouse.x, mouse.y);              
                break;
            case "S":
                ctx.drawImage(mouse.img_s, mouse.x, mouse.y); 
                break;
            case "E":
                ctx.drawImage(mouse.img_e, mouse.x, mouse.y); 
                // mouse.img.src = "assets/images/mouse_20x20.png";
                break;
            case "W":
                ctx.drawImage(mouse.img_w, mouse.x, mouse.y); 
                // mouse.img.src = "assets/images/mouse_20x20_left.png";
                break;
        }
        
    }
    document.addEventListener("keyup", keyUpHandler, true);

    var drawMaze = () => {
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

    var draw = () =>{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMaze();
        drawMouse();
        window.requestAnimationFrame(draw);
    }
   
    init();
});

