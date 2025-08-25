let gameSeq = []; //Array for game for making color pressing sequence amd store in that array
let userSeq = []; //Array for user for making color pressing sequence amd store in that array

let btns = ["yellow", "red", "purple", "green"]; //Button Array is created to choose random button to flash

let started = false; //Here it will check if user pressed any key or not
let level = 0; //When the key is not pressed the level is 0

let h2 = document.querySelector("h2"); //Access for changing the value in web page when game is started

document.addEventListener("keypress", function () {
  if (started == false) {
    //Here if is checking the game is start yet or not
    console.log("Game started");
    started = true;
    //By this our game will start only once

    levelUp(); //function is called when game is started
  }
});

function gameFlash(btn) {
  //Function for flashing the button
  btn.classList.add("flash");
  //To add flash class from CSS we use classList to access flash

  setTimeout(function () {
    //Here timeout is set to remove the flash class from button OR for removing background color from button
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  //Function for flashing the button to color green
  btn.classList.add("userflash");
  //To add userflash class from CSS we use classList to access flash of green color

  setTimeout(function () {
    //Here timeout is set to remove the userflash class from button OR for removing background color from button
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = []; //this will empty the array userSeq --for pressing button from starting
  level++; //level value will increase by 1
  h2.innerText = `Level ${level}`; //to display level value on web page

  let randIdx = Math.floor(Math.random() * 3); //For choosing any random color from buttons color with index 0 to 3
  let randColor = btns[randIdx]; //This will give as a random color
  let randbtn = document.querySelector(`.${randColor}`); //for accessing random color with class name
  gameSeq.push(randColor); //To add that color which is generated randomly will get stored in gameSeq Array
  console.log(gameSeq);

  gameFlash(randbtn); //It will flash the button that comes through index by above code
}

function checkAns(idx) {
  // console.log(`Current level ${level}`); //Here in the level when user press any key the number of item which is same as the level will add to both Array
  // let idx = level - 1;
  if (userSeq[idx] === gameSeq[idx]) {
    //it will check when userSeq and gameSeq idx are eual or not
    if (userSeq.length == gameSeq.length) {
      //when user reaches the last index of gameSeq then levelUp() will exucute
      setTimeout(levelUp, 1000); //it will go to next level after 1sec
    }
  } else {
    h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to start`;
    //we can give tags in innerHTML
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset(); //To reset game when user press the wrong button
  }
}

function btnPress() {
  let btn = this; //Used to check which button is pressed
  userFlash(btn); //To flash the button

  let userColor = btn.getAttribute("id"); //It will give you the id of that color when user press that color
  userSeq.push(userColor); //It will add that color which we get from above line to the userSeq Array

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn"); //To access all button from the html
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  //for reseting the game when user press the wrong key
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
