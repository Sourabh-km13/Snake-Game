document.addEventListener('DOMContentLoaded', () => {
    const arenaSize = 800;
    const cellSize = 20;
    let score = 0;
    let food = { x: 680, y: 140 };
    let dx = 20;
    let dy=0;
    let gameStarted = false;
    let snakePosition = [{ x: 460, y: 140 }, { x: 440, y: 140 }, { x: 420, y: 140 }];
    const Arena = document.getElementById('Arena')
    let time = 200;
    let intervalid;
    
        function updateSnake() {
            const newhead = {x:snakePosition[0].x + dx , y:snakePosition[0].y + dy}
            snakePosition.unshift(newhead);
            if (newhead.x===food.x && newhead.y===food.y) {
                score+=5;
                moveFood();
                if(time>50){
                    clearInterval(intervalid);
                    time-=10;
                    gameLoop(); 
                }
                
            }
            else{
                snakePosition.pop()
            }

        }
        function moveFood() {
            let newX, newY;
            do {
                newX = Math.floor((Math.random()*(arenaSize-cellSize))/cellSize)*cellSize
                newY = Math.floor((Math.random()*(arenaSize-cellSize))/cellSize)*cellSize
            } while (snakePosition.some(snakecell=>snakecell.x===newX && snakecell.y===newY ));
            food.x=newX
            food.y=newY
        }
        function isGameover(){
            for(let i = 1;i<snakePosition.length;i++){
                if(snakePosition[0].x===snakePosition[i].x && snakePosition[0].y===snakePosition[i].y){
                    console.log(i);
                    
                    return true;
                }
            }
            const isHittingLeftwall= snakePosition[0].x<0;
            const isHittingRightwall= snakePosition[0].x>=arenaSize;
            const isHittingTopwall= snakePosition[0].y<0;
            const isHittingBottomwall= snakePosition[0].y>=arenaSize;

            return isHittingBottomwall|| isHittingLeftwall || isHittingRightwall ||isHittingTopwall;
        }
        function drawDiv(x, y, classname) {
            const d = document.createElement('div')
            d.classList.add(classname)
            d.style.top = `${y}px`
            d.style.left = `${x}px`
            return d;
        }

        function drawScoreBoard() {
            const scoreBoard = document.getElementById('score-board')
            scoreBoard.textContent = `Score: ${score}`

        }
        function drawFoodandSnake() {
            Arena.innerHTML = ''
            const foodDiv = drawDiv(food.x, food.y, 'food')
            Arena.appendChild(foodDiv)
            snakePosition.forEach(pos => {
                const element = drawDiv(pos.x, pos.y, 'snake');
                Arena.appendChild(element)
                

            })
        
        }
        function gameLoop() {
          
            intervalid = setInterval(() => {
                console.log(time);
                
                if(!gameStarted) return;
                if(isGameover()){
                    
                    gameStarted=false;
                    alert(`Game over your score- ${score}`)
                    window.location.reload();
                    return;
                }
                updateSnake();
                drawScoreBoard();
                drawFoodandSnake();
            },time);
        }

        function runGame() {
            if(!gameStarted) {
                gameStarted=true;
                gameLoop();
                document.addEventListener('keydown',(event)=>{
                    const isgoingDown = dy===cellSize;
                    const isgoingUp = dy===-cellSize;
                    const isgoingRight = dx===cellSize;
                    const isgoingLeft = dx===-cellSize;
                    if(event.key==='ArrowUp'&& !isgoingDown){
                        dx=0;
                        dy=-cellSize;
                    }
                    if(event.key==='ArrowDown'&& !isgoingUp){
                        dx=0;
                        dy=cellSize;
                    }
                    if(event.key==='ArrowLeft'&& !isgoingRight){
                        dx=-cellSize;
                        dy=0;
                    }
                    if(event.key==='ArrowRight' && !isgoingLeft){
                        dx=cellSize;
                        dy=0;
                    }
                })
            }
        }

        function initiateGame() {
            const body = document.body
            const scoreBoard = document.getElementById('score-board')
            const startButton = document.createElement('button')
            startButton.setAttribute('id', 'start-button')
            startButton.innerHTML = 'Start'
            body.appendChild(startButton);
            startButton.addEventListener('click', () => {
                startButton.style.display = 'none';
                runGame();
            })
            
        }
        initiateGame();


    })