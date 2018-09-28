///////////////
//GET KEYCODE//
///////////////
// document.addEventListener('keydown', function(event) {
//   console.log(event.keyCode)
// });
///////////////
// 37 left
// 39 right
// 32 spacebar
// 38 up
// 40 down
///////////////


//////////////////////////////
// SET GLOBAL DOM VARIABLES //
//////////////////////////////
  const body = document.querySelector('body');
  const header = document.querySelector('.header');
  const footer = document.querySelector('.footer');
  const par = document.getElementById('gamebox-parent');
  const p1 = document.getElementById('plane1');       // user-interactive elements (buttons, etc.)
  const p2 = document.getElementById('plane2');       // HUD display, titles, tutorial
  const p3 = document.getElementById('plane3');       // 'mute' layer (transparent grayed out gamefield)
  const p4 = document.getElementById('plane4');       // player car
  const p5 = document.getElementById('plane5');       // powerups (*option)
  const p6 = document.getElementById('plane6');       // other cars
  const p7 = document.getElementById('plane7');       // background elements (trees, lanes, etc)
  const p8 = document.getElementById('plane8');       // road backplane
  const p9 = document.getElementById('plane9');       // sky (parallax?)
  const p10 = document.getElementById('plane10');     //
  const displayUnit = Math.floor(Math.min(window.innerWidth / 18, window.innerHeight / 11));
  const fullW = displayUnit * 16;
  const fullH = displayUnit * 9;
  const w = fullW / 16;
  const h = fullH / 9;
  const gameboxPadding = Math.floor((window.innerHeight - fullH) / 2);
//////////////////////////////


////////////////////////////////
// FUNCTION BUILD PAGE LAYOUT //
////////////////////////////////
  function buildGamePage() {
    par.style.width = fullW + 'px';
    par.style.height = fullH + 'px';
    header.style.height = gameboxPadding + 'px';
    footer.style.height = gameboxPadding + 'px';
    body.style.fontSize = gameboxPadding / 2 + 'px';
    body.style.lineHeight = gameboxPadding + 'px';
  };
////////////////////////////////
buildGamePage();


////////////////////////////////
// FUNCTION CREATE PLAYER CAR //
////////////////////////////////
  function makePlayerCar(gamePlane) {
    let div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.backgroundImage = "url('img/car1.png')";
    div.style.backgroundSize = '100%';
    div.style.backgroundRepeat = 'no-repeat';
    div.style.left = 6 * w + 'px';
    div.style.top = 9 * h + 'px';
    div.style.width = 4 * w + 'px';
    div.style.height = 2 * h + 'px';
    div.id = 'playerCar';
    gamePlane.appendChild(div);
  };
////////////////////////////////
makePlayerCar(p4);


//////////////////////////////////////////////
// FUNCTION SLIDE PLAYER CAR INTO GAMEFIELD //
//////////////////////////////////////////////
  function initializePlayerCar() {
    // playerCar.style.transition = '1s ease-in-out';
    playerCar.style.transitionDuration = '1s';
    playerCar.style.transitionTimingFunction = 'ease-in-out';
    playerCar.style.top = 7 * h + 'px';
  };
//////////////////////////////////////////////
setTimeout(function() {
  initializePlayerCar();
}, 1000);


////////////////////////////////
// KEYBOARD LISTENER MOVE CAR //
////////////////////////////////
  document.addEventListener('keydown', function(event) {
    if (parseInt(playerCar.style.top.replace(/px/g, '')) < (h * 9)) {
      movePlayerCar(event.keyCode);
    };
  });
////////////////////////////////


//////////////////////////////
// FUNCTION MOVE PLAYER CAR //
//////////////////////////////
  function movePlayerCar(key) {
    // playerCar.style.transitionDuration = '1s';
    // playerCar.style.TransitionTimingFunction = 'ease-in-out';
    let left = parseInt(playerCar.style.left.replace(/px/g, ''));
    let top = parseInt(playerCar.style.top.replace(/px/g, ''));
// move left
    if (key === 37 && left >= (w * 6)) {
      playerCar.style.left = left - (w * 4) + 'px';
// move right
    } else if (key === 39 && left <= (w * 6)) {
      playerCar.style.left = left + (w * 4) + 'px';
// jump
    } else if (key === 32 && top >= (w * 7) && playerCar.classList[0] !== 'jump') {
      playerCar.classList.add('jump');
      playerCar.style.top = top - (h * 2) + 'px';
      setTimeout(function() {
        playerCar.style.top = top + 'px';
      }, 1000);
      setTimeout(function() {
        playerCar.classList.remove('jump');
      }, 2000);
    };
  };
//////////////////////////////


/////////////////////////////////////
// KEYBOARD LISTENERS SPEED CHANGE //
/////////////////////////////////////
  document.addEventListener('keydown', function(event) {
    if (event.keyCode === 38) {
      speedUp();
      speedChange = true;
    } else if (event.keyCode === 40) {
      speedDown();
      speedChange = true;
    };
  });
  document.addEventListener('keyup', function(event) {
    if (event.keyCode === 38) {
      speedChange = false;
    } else if (event.keyCode === 40) {
      speedChange = false;
    };
  });
/////////////////////////////////////
let speedChange = false;


////////////////////////////
// FUNCTIONS SPEED CHANGE //
////////////////////////////
  function speedUp() {
    speed += ((maxSpeed - speed) / (maxSpeed / 4));
  };
  function speedDown() {
    speed += ((minSpeed - speed) / (maxSpeed / 20));
  };
////////////////////////////
const maxSpeed = 150;
const minSpeed = 25;
let speed = 25;


//////////////////////////////////
// FUNCTION GET PLAYER CAR LANE //
//////////////////////////////////
  function getPlayerLane() {
    left = parseInt(playerCar.style.left.replace(/px/g, ''));
    if (left >= w * 8) {
      return 3;
    } else if (left >= 4 * w) {
      return 2;
    } else {
      return 1;
    };
  };
//////////////////////////////////


///////////////////////////////////
// FUNCTION MAKE MOVEABLE OBJECT //
///////////////////////////////////
  function newGameObject(timestamp, gamePlane, objectClass, imgSrc, startL, endL, aspect, endW, tScale) {
    let div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.backgroundImage = imgSrc;
    div.style.backgroundSize = '100%';
    div.style.backgroundRepeat = 'no-repeat';
    div.classList.add(objectClass, 'moving', timestamp, startL, endL, aspect, endW, tScale);
    gamePlane.appendChild(div);
    return div;
  };
///////////////////////////////////

// [0]'tree'
// [1]'moving'
// [2](timestamp)
// [3](startL)
// [4](endL)
// [5](aspect)
// [6](endW)
// [7](tScale)


// moving = box.classList[1]
// timetamp = box.classList[2]
// startL = box.classList[3]
// endL = box.classList[4]
// aspect = box.classList[5]
// endW = box.classList[6]
// tScale = box.classList[7]

/////////////////////////////////
// FUNCTION MOVE ARBITRARY BOX //
/////////////////////////////////
function moveBox(element, t) {
  let box = element;
  let startLeft = box.classList[3] * w;
  let startTop = horizon;
  let startWidth = 0;
  let startHeight = 0;
  let endLeft = box.classList[4] * w;
  let endTop = fullH;
  let endWidth = box.classList[6] * w;
  let endHeight = endWidth * box.classList[5] * h;
  let topMove = (endTop - startTop);
  let leftMove = (endLeft - startLeft);
  let heightMove = (endHeight - startHeight);
  let widthMove = (endWidth - startWidth);

  let distanceTotal = box.classList[7];
  let distanceOld = 0;
  if (box.classList[8]) {
    distanceOld = box.classList[8];
  };
  let distance = distanceOld + speed * (t - box.classList[2]);
  box.classList[8] = distance;
  let rate = Math.pow(distance, 5) / Math.pow(distanceTotal, 5);


  // let rate = (Math.pow(t, 5) / Math.pow((refreshFactor - 1), 5));

  // // console.log(distance)
  // let distance = speed * (t - box.classList[2])
  // let tScale = box.classList[7]
  // let rate = distance / tScale

  box.style.left = startLeft + (leftMove * rate) + 'px';
  box.style.top = startTop + (topMove * rate) + 'px';
  box.style.width = startWidth + (widthMove * rate) + 'px';
  box.style.height = startHeight + (heightMove * rate) + 'px';
  if (distance > distanceTotal) {
    box.remove();
  };
};
/////////////////////////////////
const horizon = 3 * h;




/////////////////////////
// FUNCTION MAKE TREES //
/////////////////////////
  function makeTrees(t) {
    let treeInt = (tScaleTree / speed) / (treesToMake / 2);
    if (t >= (lastTreeT + treeInt)) {
      newGameObject(t, p7, 'tree', "url('img/tree.png')", 6.25, -12.5, 0.5, 6, tScaleTree);
      newGameObject(t, p7, 'tree', "url('img/tree.png')", 9.75, 22.5, 0.5, 6, tScaleTree);
      lastTreeT = t;
    };
  };
/////////////////////////
let treesToMake = 20;
let lastTreeT = 0;
let tScaleTree = 7500;




function redraw(t) {
  let movers = document.querySelectorAll('.moving');
  for (let i = 0; i < movers.length; i++) {
    moveBox(movers[i], t);
  };
};







let t = 0;
speed = 90
function drawGame(timestamp) {
  t = timestamp / 16;
  makeTrees(t);
  redraw(t);
  window.requestAnimationFrame(drawGame);
  // console.log(speed, t)
};
window.requestAnimationFrame(drawGame);








// let t = 0;
// let tS = 0
// function drawGame(timestamp) {
//   t++;
//   // tS += timestamp;
//   makeTrees(t);
//   redraw(t);
//   window.requestAnimationFrame(drawGame);

//   (console.log(timestamp, tS / t))
// };
// window.requestAnimationFrame(drawGame)













/////////////////////////
// MOVE TREES AT SPEED //
/////////////////////////

/////////////////////////





/////////////////////////
// FUNCTION MAKE TREES //
/////////////////////////
  // function makeTrees(lastTreeT, treeInt) {
  //   moveBox(newGameObject(p7, 'tree', "url('img/tree.png')"), 6.25, -12.5, 6, 12, lastTreeT, treeInt);
  //   moveBox(newGameObject(p7, 'tree', "url('img/tree.png')"), 10, 24, 8, 16, lastTreeT, treeInt);
  // };
/////////////////////////


// makeTree
// moveBox(newGameObject(p7, 'tree', "url('img/tree.png')", timeStamp), 6.25, -12.5, 6, 12, lastTreeT, treeInt);


// let movers = document.querySelectorAll('.moving')
// for (let i = 0, i < movers.length; i++) {
//   let timestamp = movers[i].classList[1];
//   moveBox(movers[i], 6.25, -12.5, 6, 12, timestamp, treeInt)
// }































// var start = null;
// var element = par;
// element.style.position = 'absolute';

// function step(timestamp) {
//   if (!start) start = timestamp;
//   // var progress = timestamp - start;

//   // element.style.left = Math.min(progress / 10, 200) + 'px';

//   // if (progress < 2000) {
//   //   window.requestAnimationFrame(step);
//   // }
// }

// window.requestAnimationFrame(step);



// var start = null;
// var element = document.getElementById('SomeElementYouWantToAnimate');
// element.style.position = 'absolute';

// function step(timestamp) {
//   if (!start) start = timestamp;
//   var progress = timestamp - start;
//   element.style.left = Math.min(progress / 10, 200) + 'px';
//   if (progress < 2000) {
//     window.requestAnimationFrame(step);
//   }
// }

// window.requestAnimationFrame(step);















// setInterval(function() {
//   speed = 10
// }, 5000)




  // if (treesMade <= treesToMake) {
  //   makeTrees();
  // };


// if (speedChange && treesMade < treesToMake)
  // moveTrees = setTimeout(move, Math.min(treeInt, 800));



// let moveTrees = setTimeout(function move() {
//   treeSpeed = speed / 2000;
//   treeTime = 100 / treeSpeed;
//   treeInt = treeTime / (treesToMake / 2);
//   if (treeInt > 250) {
//     moveTrees = setTimeout(move, 1);
//     treesMade = document.querySelectorAll('.tree').length;
//     if (treesMade < treesToMake) {
//       moveBox(newGameObject(p7, 'tree', "url('img/tree.png')"), 6, -8, 4, 8);
//       moveBox(newGameObject(p7, 'tree', "url('img/tree.png')"), 10, 20, 4, 8);
//     };
//   } else {
//     moveTrees = setTimeout(move, treeInt)
//     moveBox(newGameObject(p7, 'tree', "url('img/tree.png')"), 6, -8, 4, 8);
//     moveBox(newGameObject(p7, 'tree', "url('img/tree.png')"), 10, 20, 4, 8);
//   };
//   console.log('speed ' + speed.toFixed(2), 'treeSpeed ' + treeSpeed.toFixed(2), 'treeTime ' + treeTime.toFixed(2), 'treeInt ' + treeInt.toFixed(2), 'treesMade ' + treesMade, treeTime / treeInt)
// }, treeInt);















// let moveTrees = setTimeout(function move() {
//   treeSpeed = speed / 2000;
//   treeTime = 100 / treeSpeed;
//   treeInt = treeTime / (treesToMake / 2);
//   let treesMade = document.querySelectorAll('.tree').length;

//       moveTrees = setTimeout(move, treeInt);
//   if (treesMade < treesToMake) {
//       moveBox(makeTree(p5), 6, -8, 4, 8);
//       moveBox(makeTree(p5), 10, 20, 4, 8);
//     } else {
//       moveBox(makeTree(p5), 6, -8, 4, 8);
//       moveBox(makeTree(p5), 10, 20, 4, 8);
//     }
//   console.log('speed ' + speed.toFixed(2), 'treeSpeed ' + treeSpeed.toFixed(2), 'treeTime ' + treeTime.toFixed(2), 'treeInt ' + treeInt.toFixed(2), 'treesMade ' + treesMade, treeTime / treeInt)
// }, treeInt);



// setInterval(function() {
//   let treesMade = document.querySelectorAll('.tree').length;
//   if (treesMade < treesToMake) {
//     moveBox(makeTree(p5), 6, -8, 4, 8);
//     moveBox(makeTree(p5), 10, 20, 4, 8);
//   };
// },10)

// function refreshInterval() {
//   let treesMade = document.querySelectorAll('.tree').length;
//   if (treesMade < treesToMake) {
//     moveBox(makeTree(p5), 6, -8, 4, 8);
//     moveBox(makeTree(p5), 10, 20, 4, 8);
//   };
//   // setTimeout(moveTrees, 1);
// }





// let moveTrees = setTimeout(function move() {
//   treeSpeed = speed / 2000;
//   treeTime = 100 / treeSpeed;
//   treeInt = treeTime / (treesToMake / 2);
//   if (treeInt > 1000) {
//     moveTrees = setTimeout(move, 1000);
//   } else {
//     moveTrees = setTimeout(move, treeInt)
//   }
//   // moveTrees = setTimeout(move, treeInt);
//   moveBox(makeTree(p5), 6, -8, 4, 8);
//   moveBox(makeTree(p5), 10, 20, 4, 8);
//   let treesMade = document.querySelectorAll('.tree').length;
//   if (treesMade < treesToMake) {
//     moveBox(makeTree(p5), 6, -8, 4, 8);
//     moveBox(makeTree(p5), 10, 20, 4, 8);
//   };
//   console.log('speed ' + speed.toFixed(2), 'treeSpeed ' + treeSpeed.toFixed(2), 'treeTime ' + treeTime.toFixed(2), 'treeInt ' + treeInt.toFixed(2), 'treesMade ' + treesMade, treeTime / treeInt)
// }, treeInt);











// let moveTrees = setInterval(function() {

//   moveBox(makeTree(p1), 6, -8, 4, 8, treeTime);
//   moveBox(makeTree(p1), 10, 20, 4, 8, treeTime);
//   console.log(treeInt)

// }, treeInt)




// setInterval(function() {
//   treeSpeed = speed / 2000;
//   treeTime = 100 / treeSpeed;
//   treeInt = treeTime / (treesToMake / 2);
//   setInterval(moveTrees, treeInt);
// }, 10)



// let moveTrees = setInterval(function() {
//   treeSpeed = speed / 100;
//   treeTime = 1000 / treeSpeed;
//   numTrees = 20;
//   treeInt = treeTime / numTrees;
//   treesMade = document.querySelectorAll('.tree').length;
//   if (treesMade < numTrees)  {
//     moveBox(makeTree(p5), 6, -8, 4, 8, treeTime);
//     moveBox(makeTree(p5), 10, 20, 4, 8, treeTime);
//   };
//   console.log(treesMade)
//   setInterval(moveTrees, treeInt);
// }, treeInt)








// let treeSpeed = 0;
// let numTrees = 20
// let treeTime = 0;
// let treeInt = 1000;
// let treeInt = treeTime / numTrees;

//   treeSpeed = speed / 10;
//   treeTime = 1000 / treeSpeed;
//   treeInt = treeTime / numTrees;
//   // clearInterval(drawTrees);
//   setInterval(drawTrees, treeInt);




// let drawTrees = setInterval(function() {
//   moveBox(makeTree(p5), 6, -8, 4, 8, treeTime);
//   moveBox(makeTree(p5), 10, 20, 4, 8, treeTime);
// }, treeInt);





// setInterval(function() {
//   treeSpeed += 0.1
//   treeTime = 1000 / treeSpeed
//   treeInt = treeTime / numTrees
// }, 1000)




  // treeSpeed = speed / 10;
  // treeTime = 1000 / treeSpeed;
  // treeInt = treeTime / numTrees;
  // // clearInterval(drawTrees);
  // setInterval(drawTrees, treeInt);

















// function makeTree(par, no) {
//   let div = document.createElement('div');
//   div.style.position = 'absolute';
//   div.style.backgroundImage = "url('img/tree.png')";
//   div.style.backgroundSize = '100%';
//   div.style.backgroundRepeat = 'no-repeat';
//   div.classList.add('tree')
//   div.id = 'tree.L.' + no;
//   par.appendChild(div);
//   return div;
// };
// // makeTree(p5, 0)


// setInterval(function() {
//   moveTreeRight(makeTree(p5, 0));
//   moveTreeLeft(makeTree(p5, 0));
// }, 250)



// function moveTreeRight(tree) {
//   let startLeft = w * (6 / 16);
//   let endLeft = w * (-8 / 16);
//   let startTop = h * (2 / 9);
//   let endTop = h;
//   let startWidth = 0;
//   let endWidth = w * (4 / 16);
//   let startHeight = 0;
//   let endHeight = h * (8 / 9);
//   let leftMove = (endLeft - startLeft);
//   let topMove = (endTop - startTop);
//   let widthMove = (endWidth - startWidth);
//   let heightMove = (endHeight - startHeight);
//   tree.style.transitionDuration = '25ms';
//   tree.style.TransitionTimingFunction = 'liner';
//   let t = 0;
//   let drawTree = setInterval(function() {
//     if (t <= 1000) {
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
//   }, 25)
// }


// function moveTreeLeft(tree) {
//   let startLeft = w * (10 / 16);
//   let endLeft = w * (20 / 16);
//   let startTop = h * (2 / 9);
//   let endTop = h;
//   let startWidth = 0;
//   let endWidth = w * (4 / 16);
//   let startHeight = 0;
//   let endHeight = h * (8 / 9);
//   let leftMove = (endLeft - startLeft);
//   let topMove = (endTop - startTop);
//   let widthMove = (endWidth - startWidth);
//   let heightMove = (endHeight - startHeight);
//   let t = 0;
//   tree.style.transitionDuration = '25ms';
//   tree.style.TransitionTimingFunction = 'liner';
//   let drawTree = setInterval(function() {
//     if (t <= 1000) {
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
//   }, 25)
// }




















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






