document.addEventListener('DOMContentLoaded',()=>{
    const arenaSize = 800;
    const cellSize = 20;
    let score =0;
    let food = {x:100,y:120};
    let gameStarted = false;
    let position = [{x:120,y:140},{x:140,y:140},{x:160,y:140}];
    const Arena = document.getElementById('Arena')

    function drawDiv(x, y, classname) {
        const d = document.createElement('div')
        d.classList.add(classname)
        d.style.top=`${y}px`
        d.style.left=`${x}px`
        return d;
    }

    function drawScoreBoard(){
        const scoreBoard = document.getElementById('score-board')
        scoreBoard.textContent=`Score: ${score}`
    }
    function drawFoodandSnake(){
        Arena.innerHTML=''
        const foodDiv = drawDiv(food.x,food.y,'food')
        Arena.appendChild(foodDiv)
    }
    function gameLoop() {
        setInterval(() => {
            drawScoreBoard();
            drawFoodandSnake();
        }, 1000);
    }

    function runGame() {
        gameStarted = false;
        gameLoop();
    }

    function initiateGame() {
        const body = document.body
        const scoreBoard = document.getElementById('score-board')
        const startButton = document.createElement('button')
        startButton.setAttribute('id','start-button')
        startButton.innerHTML='Start'
        body.appendChild(startButton);
        startButton.addEventListener('click',()=>{
            startButton.style.display = 'none';
            runGame();
        })
    }
    initiateGame();

    
})