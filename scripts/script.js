const KEY_CODE_SPACE = 32;
const INIT_POSITION_DINO = 472;
const DINO_WIDTH = 60;
const DINO_HEIGHT = 60;
const INIT_POSITION_CACTURS = window.innerWidth;

let points = 0;
let record = 0;
let isGameOver = false;

let isJumping = false;
let position = INIT_POSITION_DINO;

const background = document.querySelector('.background');
const dino = document.querySelector('.dino');
const titulo = document.querySelector('.titulo');

function keySpacePressed (event) {
    if(event.keyCode === KEY_CODE_SPACE){
        if(!isJumping){
            jump();
        }
    }
}

function jump(){
    
    isJumping = true;
    
    let upInterval = setInterval(() => {
        // condiçao parar de subir
        if(position <= 300){
            clearInterval(upInterval);
            //descendo
            
            let downInterval = setInterval(() => {
                // condiçao parar de descer
                if(position >= INIT_POSITION_DINO){
                    clearInterval(downInterval);
                    isJumping = false;
                }else {
                    position += 20;
                    
                    dino.style.top = position + 'px';
                }
            }, 30)
        }else {
            // subindo
            position -= 20;
            dino.style.top = position + 'px'; 
            
        }
        
    }, 30) 
}


function createCactus () {
    const cactus = document.createElement('div');
    let cactusPosition = INIT_POSITION_CACTURS;
    let time = Math.random() * 6000;


    if(isGameOver)  return;
    
    
    cactus.classList.add('cacto')
    cactus.style.left = cactusPosition + 'px';
    cactus.style.top = INIT_POSITION_DINO + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        
        //marcou ponto
        if(cactusPosition <= -60){
            
            points += 10;

            updatePoints(points);
            clearInterval(leftInterval);
            background.removeChild(cactus);

            // game over
        }else if(cactusPosition > 0 && cactusPosition <= DINO_WIDTH && position >= INIT_POSITION_DINO - DINO_WIDTH){
            
            isGameOver = true;
            titulo.textContent = 'Fim de JOGO :(';
            
            //atualizando recorde
            record = points;
            points = 0;
            updateRecord();

            //removendo recursos
            clearInterval(leftInterval);
            clearTimeout(generateCactrus);
            document.removeEventListener('keyup', keySpacePressed);

            background.style.display = 'none';

            
        }else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    let generateCactrus = setTimeout(createCactus, time);

    
}

document.addEventListener('keyup', keySpacePressed);

startGame();

function startGame() {
   createCactus();
}


function updatePoints() {
    var spamScore = document.getElementById('#score');
    spamScore.textContent = points;
}

function updateRecord() {
    var spamRecord = document.getElementById('#record');
    spamRecord.textContent = record;
}


