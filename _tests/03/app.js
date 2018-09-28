let initButton = document.getElementById('initButton');
let stopButton = document.getElementById('stopButton');
let gameBox = document.getElementById('gamebox');
let speedBox = document.getElementById('speedbox');
let timeBox = document.getElementById('timebox');
let center = document.getElementById('gamebox-center');
let hud = document.getElementsByClassName('hud');

initButton.addEventListener('click', init);

function init() {
  makePlayButton();
  // OTHER FUNCTIONS to run at static launch
};

function makePlayButton() {
  let playButton = document.createElement('button');
  playButton.id = "playButton";
  playButton.textContent = `Play!`;
  playButton.style.opacity = 0;
  center.appendChild(playButton);
  playButton.addEventListener('click', initialize);
  buttonShow(playButton);
}

function buttonShow(button) {
  let tB = 0;
  let startShow = setInterval(show, 1);
  function show() {
    if (tB <= 50) {
      tB++;
      button.style.opacity = tB / 50;
      button.style.width = tB + '%';
      button.style.height = tB + '%';
      button.style.fontSize = (Math.pow(tB, 2) / 50) + 'pt';
    } else {
      clearInterval(startShow);
    };
  };
};

function buttonFade(button) {
  let tB = 0;
  let startFade = setInterval(fade, 1);
  function fade() {
    if (tB <= 50) {
      tB++;
      button.style.opacity = (50 - tB) / 50;
      button.style.width = (tB + 50) + '%';
      button.style.height = (tB + 50) + '%';
    } else {
      clearInterval(startFade);
      button.remove();
    };
  };
};

function makeHud() {
  let tH = 0;
  let startHud = setInterval(hudShow, 1)
  function hudShow() {
    if (tH < 100) {
      tH++;
      for (let i = 0; i < hud.length; i++) {
        hud[i].style.fontSize = (Math.pow(tH, 2) / 400) + 'pt';
        hud[i].style.opacity = tH / 100;
        hud[i].style.width = (tH / 4) + '%';
      };
    } else {
      clearInterval(startHud);
    };
  };
};




function initialize() {
  buttonFade(playButton);
  makeHud();
  // let t = 0;
  runTime();
}

function runTime() {
  t = 0;
  let gameClock = setInterval(timer, 1);
  function timer() {
    t++;
    playGame();
  };
  stopButton.addEventListener('click', stopGameClock);
  function stopGameClock() {
    clearInterval(gameClock);
  };
};

function playGame() {
  showSpeed();
  showTime();
}

function showSpeed() {
  speedBox.textContent = Math.floor(idealSpeed(t * 4));
};

function showTime() {
  // timeBox.textContent = Math.floor(t / 250);
  timeBox.textContent = 1000 - Math.floor(t / 25);
};

function idealSpeed(elapsed) {
  let output = 0;
  if (elapsed < 2000) {
    output = 0;
  } else if (elapsed >= 2000 && elapsed < 4000) {
    output = (elapsed - 2000) / 100;
  } else if (elapsed >= 4000 && elapsed < 9000) {
    output = 20;
  } else if (elapsed >= 9000 && elapsed < 11000) {
    output = 20 + (elapsed - 9000) / 100;
  } else if (elapsed >= 11000) {
    output = 40 + (elapsed - 11000) / 2500;
  };
  return output;
};



















// function introSplash() {
//   if (t === 1) {
//     let playButton = document.createElement('button');
//     playButton.textContent = `Play!`;
//     playButton.id = "playButton";
//     center.appendChild(playButton);
//   } else {
//     playButton.addEventListener('click', test);
//     // scale button
//   }
// }













//   let elapsed = 0;
//   let clock = setInterval(timer, 10);
//   function timer(event) {
//     elapsed = t++;
//     time.textContent = elapsed;
//     speed.textContent = Math.floor(idealSpeed(elapsed));

//   };

// };







// let playButton = center.createElement('button').textContent = 'Play'
// play.id = "playButton"












// function idealSpeed(elapsed) {
//   let output = 0;
//   if (elapsed < 200) {
//     output = 0;
//   } else if (elapsed >= 200 && elapsed < 400) {
//     output = (elapsed - 200) / 10;
//   } else if (elapsed >= 400 && elapsed < 900) {
//     output = 20;
//   } else if (elapsed >= 900 && elapsed < 1100) {
//     output = 20 + (elapsed - 900) / 10;
//   } else if (elapsed >= 1100) {
//     output = 40 + (elapsed - 1100) / 250;
//   };
//   return output;
// };






