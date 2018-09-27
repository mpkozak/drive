const par = document.getElementById('gamebox-parent');
const p1 = document.getElementById('plane1');
const p2 = document.getElementById('plane2');
const p3 = document.getElementById('plane3');
const p4 = document.getElementById('plane4');
const p5 = document.getElementById('plane5');
const p6 = document.getElementById('plane6');
const p7 = document.getElementById('plane7');
const p8 = document.getElementById('plane8');
const p9 = document.getElementById('plane9');
const p10 = document.getElementById('plane10');
const w = 1280;
const h = 720;
par.style.width = w + 'px';
par.style.height = h + 'px';



function drawPlayerCar(par) {
  let div = document.createElement('div');
  div.style.width = w * (4 / 16) + 'px';
  div.style.height = h * (2 / 9) + 'px';
  div.style.position = 'absolute';
  div.style.top = h * (7 / 9) + 'px';
  div.style.left = 480 + 'px';
  div.style.backgroundImage = "url('img/car1.png')";
  div.id = 'playerCar';
  par.appendChild(div);
};
drawPlayerCar(p3)
// const playerCar = document.getElementById('playerCar');


document.addEventListener('keydown', function(event) {
  movePlayerCar(event.keyCode);
})


///////////////////////////
//MOVE CAR CSS TRANSITION//
///////////////////////////
function movePlayerCar(key) {
  playerCar.style.transitionDuration = '1s';
  playerCar.style.TransitionTimingFunction = 'ease-in-out';
  let left = parseInt(playerCar.style.left.replace(/px/g, ''));
  let top = parseInt(playerCar.style.top.replace(/px/g, ''));
  if (key === 37 && left >= 480) {
    // move left
    playerCar.style.left = left - 320 + 'px';
  } else if (key === 39 && left <= 480) {
    // move right
    playerCar.style.left = left + 320 + 'px';
  } else if (key === 32 && top >= 560) {
    // jump
    playerCar.style.top = top - 160 + 'px';
    setTimeout(function() {
        playerCar.style.top = top + 'px';
    },1000)
  };
};
///////////////////////////
///////////////////////////
///////////////////////////

function getPlayerLane(car) {
  left = parseInt(playerCar.style.left.replace(/px/g, ''));
  if (left >= 640) {
    return 800;
  } else if (left >= 320) {
    return 380;
  } else {
    return 160;
  }
}







function makeTree(par, no) {
  let div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.backgroundSize = '100%';
  div.style.backgroundImage = "url('img/tree.png')";
  div.style.backgroundRepeat = 'no-repeat';
  div.classList.add('tree')
  div.id = 'tree.L.' + no;
  par.appendChild(div);
  return div;
};


// makeTree(p5, 0)


setInterval(function() {
  moveTreeRight(makeTree(p5, 0));
  moveTreeLeft(makeTree(p5, 0));
}, 250)



function moveTreeRight(tree) {
  let startLeft = w * (6 / 16);
  let endLeft = w * (-8 / 16);
  let startTop = h * (2 / 9);
  let endTop = h;
  let startWidth = 0;
  let endWidth = w * (4 / 16);
  let startHeight = 0;
  let endHeight = h * (8 / 9);
  let leftMove = (endLeft - startLeft);
  let topMove = (endTop - startTop);
  let widthMove = (endWidth - startWidth);
  let heightMove = (endHeight - startHeight);
  tree.style.transitionDuration = '25ms';
  tree.style.TransitionTimingFunction = 'liner';
  let t = 0;
  let drawTree = setInterval(function() {
    if (t <= 1000) {
      let rate = (Math.pow(t, 5) / Math.pow(1000, 5));
      tree.style.left = startLeft + (leftMove * rate) + 'px';
      tree.style.top = startTop + (topMove * rate) + 'px';
      tree.style.width = startWidth + (widthMove * rate) + 'px';
      tree.style.height = startHeight + (heightMove * rate) + 'px';
      t += 10;
    } else {
      clearInterval(drawTree);
      tree.remove();
    };
  }, 25)
}


function moveTreeLeft(tree) {
  let startLeft = w * (10 / 16);
  let endLeft = w * (20 / 16);
  let startTop = h * (2 / 9);
  let endTop = h;
  let startWidth = 0;
  let endWidth = w * (4 / 16);
  let startHeight = 0;
  let endHeight = h * (8 / 9);
  let leftMove = (endLeft - startLeft);
  let topMove = (endTop - startTop);
  let widthMove = (endWidth - startWidth);
  let heightMove = (endHeight - startHeight);
  let t = 0;
  tree.style.transitionDuration = '25ms';
  tree.style.TransitionTimingFunction = 'liner';
  let drawTree = setInterval(function() {
    if (t <= 1000) {
      let rate = (Math.pow(t, 5) / Math.pow(1000, 5));
      tree.style.left = startLeft + (leftMove * rate) + 'px';
      tree.style.top = startTop + (topMove * rate) + 'px';
      tree.style.width = startWidth + (widthMove * rate) + 'px';
      tree.style.height = startHeight + (heightMove * rate) + 'px';
      t += 10;
    } else {
      clearInterval(drawTree);
      tree.remove();
    };
  }, 25)
}




















// for (let i = 0; i < 5; i++) {
//   makeTree(p5, i)
// }





// function moveTree(tree) {

//   let startLeft = w * (4 / 16);
//   let endLeft = w * (0 / 16);

//   let startTop = h * (2 / 9);
//   let endTop = h * (5 / 9);

//   let startWidth = w * (0.5 / 16);
//   let endWidth = w * (2 / 16);

//   let startHeight = h * (1 / 9);
//   let endHeight = h * (4 / 9);

//   let leftMove = (endLeft - startLeft);
//   let topMove = (endTop - startTop);
//   let widthMove = (endWidth - startWidth);
//   let heightMove = (endHeight - startHeight);

//   tree.style.visibility = 'hidden';
//   tree.style.transitionDuration = '0';
//   tree.style.display = 'none';
//   // tree.style.top = startTop + 'px';
//   // tree.style.left = startLeft + 'px';
//   // tree.style.width = startWidth + 'px';
//   // tree.style.height = startHeight + 'px';

//   let t = 0;
//   let drawTree = setInterval(function() {
//     tree.style.display = 'block';
//     tree.style.transitionDuration = '50ms';
//     tree.style.TransitionTimingFunction = 'liner';
//     tree.style.visibility = 'visible';
//     if (t <= 500) {
//       // let rate = t / 500;
//       // tree.style.opacity = rate;
//       // tree.style.top = (startTop + (startHeight / 2)) - (startHeight / 2) * rate + 'px';
//       // tree.style.left = (startLeft + (startWidth)) - (startWidth) * rate + 'px';
//       // tree.style.width = startWidth * rate + 'px';
//       // tree.style.height = startHeight * rate + 'px';
//       t += 10;
//     } else if (t <= 1000) {
//       let rate = (Math.pow(t, 5) / Math.pow(1000, 5));
//       tree.style.left = startLeft + (leftMove * rate) + 'px';
//       tree.style.top = startTop + (topMove * rate) + 'px';
//       tree.style.width = startWidth + (widthMove * rate) + 'px';
//       tree.style.height = startHeight + (heightMove * rate) + 'px';
//       t += 10;
//     } else {
//       clearInterval(drawTree);
//       tree.remove();
//     };
//   },50)
// }




// startTop        (startTop + (startHeight / 2))
// 0               100


// startTop + (startHeight / 2) / rate



// setInterval(function() {
//   let moveTreeNo = 0;
//   if (moveTreeNo < 4) {
//     let trees = document.querySelectorAll('.tree')
//     console.log(trees)
//     moveTree(trees[moveTreeNo]);
//     moveTreeNo += 1
//   } else if (moveTreeNo >= 4) {
//     moveTree = 0;
//   };
// }, 1500)


// setInterval(function() {
//   let moveTreeNo = 0;
//   if (moveTreeNo < 4) {
//     moveTree(document.querySelectorAll('.tree')[moveTreeNo]);
//     moveTreeNo += 1
//   } else if (moveTreeNo >= 4) {
//     moveTree = 0;
//   };
// }, 1500)





// document.getElementById('tree.L.' + moveTreeNo)

// lanes: 160, 480, 800

// 320 640





























// function movePlayerCar(key) {
//   // playerCar.style.transitionDuration = '1s';
//   // playerCar.style.TransitionTimingFunction - 'ease-in-out';
//   let left = parseInt(playerCar.style.left.replace(/px/g, ''));
//   let top = parseInt(playerCar.style.top.replace(/px/g, ''));
//   if (key === 37 && left >= 480) {
//     // move left
//         let left = parseInt(playerCar.style.left.replace(/px/g, ''));
//         let newLeft = getPlayerLane(playerCar) - 320;
//         let dist = (left - newLeft);
//         console.log(left, newLeft, dist)
//         let t = 0;
//         let moveLeft = setInterval(function() {
//           if (t < 1000) {
//             playerCar.style.left = left - dist * (t / 1000) + 'px';
//             t += 25;
//           } else {
//             clearInterval(moveLeft)
//           };
//         }, 25)
//   } else if (key === 39 && left <= 480) {
//     // move right
//         let left = parseInt(playerCar.style.left.replace(/px/g, ''));
//         let newLeft = getPlayerLane(playerCar) + 320;
//         let dist = (newLeft - left);
//         console.log(left, newLeft, dist)
//         let t = 0;
//         let moveRight = setInterval(function() {
//           if (t < 1000) {
//             playerCar.style.left = left + dist * (t / 1000) + 'px';
//             t += 25;
//           } else {
//             clearInterval(moveRight)
//           };
//         }, 25)
//   } else if (key === 32 && top >= 560) {
//     // jump
//     playerCar.style.top = top - 160 + 'px';
//     setTimeout(function() {
//         playerCar.style.top = top + 'px';
//     },1000)
//   };
// };


// let t = 0
// let jump = setInterval(function() {
//   if (t < 500) {
//     playerCar.style.top = top - (160 * ) + 'px'
//     t++
//   };
// }, 10)







// document.onkeydown = checkKey;

// function checkKey(e) {

//     e = e || window.event;

//     if (e.keyCode == '38') {
//         // up arrow
//     }
//     else if (e.keyCode == '40') {
//         // down arrow
//     }
//     else if (e.keyCode == '37') {
//        // left arrow
//     }
//     else if (e.keyCode == '39') {
//        // right arrow
//     }

// }


///////////////
//GET KEYCODE//
///////////////
// document.addEventListener('keydown', function(event) {
//   console.log(event.keyCode)
// })
///////////////
// 37 left
// 39 right
// 32 spacebar
///////////////












// const initButton = document.getElementById('initButton');
// const stopButton = document.getElementById('stopButton');

// let speedBox;
// let timeBox;


// function init() {
//   // swipeOut(speedBox, 100)
//   timeBox = swipeIn(p5, 'time', 'l', 'text content', 10, 15, 25, 'blue', 0.8, 100, 100);
// }

// function drop() {
//   swipeOut(timeBox, 50)
//   // speedBox = swipeIn(p5, 'speed', 'r', 'text content', 30, 20, 25, 'blue', 0.8, 100, 100)
// }



// //parentNode, 'newChildId', 'l/r', 'textContent', top-offset (%), height (%), width (%), 'color', opacity, fontSize (%), ms//
// // parentNode | 'newChildId' | 'l/r' | 'textContent' | top-offset (%) | height (%) | width (%) | 'color' | opacity | fontSize (%) | ms //
// function swipeIn(par, id, side, text, top, h, w, color, op, fSize, ms) {
//   let div = document.createElement('div');
//   par.appendChild(div);
//   div.id = id;
//   div.style.opacity = 0;
//   div.textContent = text;
//   div.style.position = 'absolute';
//   div.style.top = top + '%';
//   div.style.height = h + '%';
//   div.style.width = 0 + '%';
//   div.style.fontSize = 0 + '%';
//   div.style.backgroundColor = color;
//       div.style.display = 'flex';
//       div.style.alignItems = 'center';
//       div.style.justifyContent = 'center';
//   if (side == 'l') {
//     div.style.left = 0;
//   } else if (side == 'r') {
//     div.style.right = 0;
//   };
//   let runT = 0;
//   let run = setInterval(swipe, 1);
//   function swipe() {
//     if (runT < ms) {
//       runT++;
//       div.style.width = (runT / ms) * w + '%';
//       div.style.fontSize = (runT / ms) * fSize + '%';
//       div.style.opacity = (runT / ms) * op;
//     } else {
//       clearInterval(run);
//     };
//   };
//   return div;
// };


// function swipeOut(div, ms) {
//   let w = parseInt(div.style.width.match(/\d+/g));
//   let fSize = parseInt(div.style.fontSize.match(/\d+/g));
//   let op = div.style.opacity;
//   let runT = 0;
//   let run = setInterval(swipe, 1);
//   function swipe() {
//     if (runT < ms) {
//       runT++;
//       div.style.width = w - (runT / ms) * w + '%';
//       div.style.fontSize = fSize - (runT / ms) * fSize + '%';
//       div.style.opacity = op - (runT / ms) * op;
//     } else {
//       clearInterval(run);
//       div.remove()
//     };
//   };
// };

































// function makeSwipe = {
//   let par =
//   let id =
//   let text =
//   let side =
//   let top =
//   let h =
//   let w =
//   let color =
//   let op =
//   let fSize =
//   let ms =
// }










// function buttonShow(button) {
//   let tB = 0;
//   let startShow = setInterval(show, 1);
//   function show() {
//     if (tB <= 50) {
//       tB++;
//       button.style.opacity = tB / 50;
//       button.style.width = tB + '%';
//       button.style.height = tB + '%';
//       button.style.fontSize = (Math.pow(tB, 2) / 50) + 'pt';
//     } else {
//       clearInterval(startShow);
//     };
//   };
// };









// function makePlayButton() {
//   let playButton = document.createElement('button');
//   playButton.id = "playButton";
//   playButton.textContent = `Play!`;
//   playButton.style.opacity = 0;
//   playButton.style.backgroundColor = "yellow";
//   p1.appendChild(playButton);
//   // playButton.addEventListener('click', initialize);
//   buttonShow(playButton);
// }


// function buttonShow(button) {
//   let tB = 0;
//   let startShow = setInterval(show, 1);
//   function show() {
//     if (tB <= 50) {
//       tB++;
//       button.style.opacity = tB / 50;
//       button.style.width = tB + '%';
//       button.style.height = tB + '%';
//       button.style.fontSize = (Math.pow(tB, 2) / 50) + 'pt';
//     } else {
//       clearInterval(startShow);
//     };
//   };
// };

// function buttonFade(button) {
//   let tB = 0;
//   let startFade = setInterval(fade, 1);
//   function fade() {
//     if (tB <= 50) {
//       tB++;
//       button.style.opacity = (50 - tB) / 50;
//       button.style.width = (tB + 50) + '%';
//       button.style.height = (tB + 50) + '%';
//     } else {
//       clearInterval(startFade);
//       button.remove();
//     };
//   };
// };












// let gameBox = document.getElementById('gamebox');
// let speedBox = document.getElementById('speedbox');
// let timeBox = document.getElementById('timebox');
// let center = document.getElementById('gamebox-center');
// let hud = document.getElementsByClassName('hud');



// initButton.addEventListener('click', init);

// function init() {
//   makePlayButton();
//   // OTHER FUNCTIONS to run at static launch
// };





// function makeHud() {
//   let tH = 0;
//   let startHud = setInterval(hudShow, 1)
//   function hudShow() {
//     if (tH < 100) {
//       tH++;
//       for (let i = 0; i < hud.length; i++) {
//         hud[i].style.fontSize = (Math.pow(tH, 2) / 400) + 'pt';
//         hud[i].style.opacity = tH / 100;
//         hud[i].style.width = (tH / 4) + '%';
//       };
//     } else {
//       clearInterval(startHud);
//     };
//   };
// };




// function initialize() {
//   buttonFade(playButton);
//   makeHud();
//   // let t = 0;
//   runTime();
// }

// function runTime() {
//   t = 0;
//   let gameClock = setInterval(timer, 1);
//   function timer() {
//     t++;
//     playGame();
//   };
//   stopButton.addEventListener('click', stopGameClock);
//   function stopGameClock() {
//     clearInterval(gameClock);
//   };
// };

// function playGame() {
//   showSpeed();
//   showTime();
// }

// function showSpeed() {
//   speedBox.textContent = Math.floor(idealSpeed(t * 4));
// };

// function showTime() {
//   // timeBox.textContent = Math.floor(t / 250);
//   timeBox.textContent = 1000 - Math.floor(t / 25);
// };

// function idealSpeed(elapsed) {
//   let output = 0;
//   if (elapsed < 2000) {
//     output = 0;
//   } else if (elapsed >= 2000 && elapsed < 4000) {
//     output = (elapsed - 2000) / 100;
//   } else if (elapsed >= 4000 && elapsed < 9000) {
//     output = 20;
//   } else if (elapsed >= 9000 && elapsed < 11000) {
//     output = 20 + (elapsed - 9000) / 100;
//   } else if (elapsed >= 11000) {
//     output = 40 + (elapsed - 11000) / 2500;
//   };
//   return output;
// };



















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






