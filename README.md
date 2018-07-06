# mouseAndMaze
A software version of the robotics competition Micromouse. The 'mouse' object will be able to find its way through any maze, memorize the quickest route, and take it again if necessary.

Currently I've only implemented a mouse that follows the "right-hand" rule. It prioritized right turns if there is one, but will prioritize left turns if it senses that it's already been in that location more than once. 

## Known issues
* Needs to be refactored. Code is getting too long! I also think it would be cool to have a Mouse class and have several of them use different alogrithms to find the goal to compare speeds.
* I have many different mazes in JSON format. I want to be able to select them so the user can change mazes. 
* Mouse can't sense the goal yet, have to stop the algorithm when it senses the goal.
    * Once the mouse finds the goal it needs to find its way back to the beginning.
    * Once the mouse finds its way back to the beginning, it needs to calculate the best route to the goal again.
* Mouse programmed to go over the same place TWICE before it starts prioritizing left turns. Makes for a slower finder.
* Mouse can get stuck in a loop depending on the maze design. (This is a known weakness to the right/left hand rules)
    *  I want to make a "flood-fill" algorithm that mouse competitors use to solve this problem.


## Right hand rule
```javascript
const rightAlgo = () =>{
        clearInterval(searchingInterval);
        searchingInterval = setInterval(() =>{
            let mouseLocation = grid[mouse.trackY][mouse.trackX];
            console.log(mouseLocation);
            if(mouse.memory.filter(location => location === mouseLocation).length <= 1){ //If this isn't the second time at the location, prioritize right turns.
                if(mouseLocation.openings.indexOf(mouse.facing) <= -1 && !checkLeftExists(mouseLocation.openings) && !checkRightExists(mouseLocation.openings)){
                    turnAround(); //If complete dead end, turn around.
                }else if (mouseLocation.openings.indexOf(mouse.facing) <= -1 && checkRightExists(mouseLocation.openings)){
                    turnRight(); //If you run into a wall, turn right first.
                }else if (mouseLocation.openings.indexOf(mouse.facing) <= -1 && checkLeftExists(mouseLocation.openings) && !checkRightExists(mouseLocation.openings)){
                    turnLeft(); //If you run into a wall, and the right turn doesn't exist, turn left. 
                }else if (checkRightExists(mouseLocation.openings)){
                    turnRight();
                }
            }else if(mouse.memory.indexOf(mouseLocation) >= 0 && mouse.memory.filter(location => location === mouseLocation).length > 1){ //If this is the second time, prioritize left turns. 
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
```