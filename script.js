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
                switch(wallDirections[j]) {
                    case "N":
                        ctx.beginPath();
                        ctx.moveTo(currentGrid.x, currentGrid.y);
                        ctx.lineTo(currentGrid.x + rectWidth, currentGrid.y);
                        ctx.stroke();
                        ctx.closePath();
                        break;
                    case "S":
                        var blCornerY = currentGrid.y + rectHeight; 
                        ctx.beginPath();
                        ctx.moveTo(currentGrid.x, blCornerY);
                        ctx.lineTo(currentGrid.x + rectWidth, blCornerY);
                        ctx.stroke();
                        ctx.closePath();
                        break;
                    case "E":
                        var trCornerX = currentGrid.x + rectWidth;
                        ctx.beginPath();
                        ctx.moveTo(trCornerX, currentGrid.y);
                        ctx.lineTo(trCornerX, currentGrid.y + rectHeight);
                        ctx.stroke();
                        ctx.closePath();
                        break;
                    case "W":
                        var blCornerY = currentGrid.y + rectHeight; 
                        ctx.beginPath();
                        ctx.moveTo(currentGrid.x, currentGrid.y);
                        ctx.lineTo(currentGrid.x, blCornerY);
                        ctx.stroke();
                        ctx.closePath();
                        break;
                }
            }

            // ctx.beginPath();
            // ctx.rect(grid[c][r].x,grid[c][r].y,rectWidth,rectHeight);
            // ctx.strokeStyle = "black";
            // ctx.stroke();
            // ctx.closePath();
        }
    }

}

function draw(){
    drawMaze();


}

draw();

// });