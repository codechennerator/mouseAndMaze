# mouseAndMaze
A software version of the robotics competition Micromouse. The 'mouse' object will be able to find its way through any maze, memorize the quickest route, and take it again if necessary.

Used this originally to test movement of mouse. 
Changing it so that the mouse instead rotates to face a direction depending on which arrow key is pressed. 
```javascript
    function keyUpHandler(e){
        switch(e.keyCode){
            case 38: //UP
                if(mouse.y - rectHeight >= 0){
                    mouse.y -= rectHeight;
                }
                break;
            case 40: //DOWN
                if(mouse.y + rectHeight < canvas.height){
                    mouse.y += rectHeight;
                }
                break;
            case 39: //RIGHT
                if(mouse.x + rectWidth < canvas.width){
                    mouse.x += rectWidth;
                }
                break;
            case 37: //LEFT
                if(mouse.x - rectWidth >= 0){
                    mouse.x -= rectWidth;
                }
                break;
        }
    }
```