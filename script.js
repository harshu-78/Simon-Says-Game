let gameSeq=[];
let userSeq=[];
let btns = ["orange","red","blue","green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;

document.addEventListener("keypress",function(){
   if(started == false){
    console.log("Game is started");
    started = true;
   levelUp();
   }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },210);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },210);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}


 function checkAns(idx) {
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
         setTimeout(levelUp,1000);
        }
    }
    else{
        if (level > highScore) {
            highScore = level;
            localStorage.setItem('highScore', highScore);
            console.log(`New High Score: ${highScore}`);
        }

        h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br>  High Score: <b>${highScore}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress() { 
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
   userSeq.push(userColor);

   checkAns(userSeq.length-1);
   
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click" , btnPress);
};

function reset() {
    started =  false;
    gameSeq = [];
    userSeq = [];
    level = 0;

}

function startGame() {
    if (started == false) {
        console.log("Game is started");
        started = true;
        levelUp();
    }
}

document.addEventListener("keypress", startGame);
document.addEventListener("touchstart", startGame);
