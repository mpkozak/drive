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

/////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  MASTER DRAW STACK  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////////

// Initialization Parameters
    let t = 0;

// Function Master Animation Frame Stack
    function drawGame(timestamp) {
      t = timestamp / 16;
      window.requestAnimationFrame(drawGame);
      setSpeed(t);
      setClock(timestamp);
      redraw(t);
    };
    window.requestAnimationFrame(drawGame);

// Function Redraw All Moving Elements
    function redraw(t) {
      refreshHud(t);
      bgElements(t);
      makeEnemies(t);
      let movers = document.querySelectorAll('.moving');
      for (let i = 0; i < movers.length; i++) {
        moveBox(movers[i], t);
      };
    };


////////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  INITIALIZATION FUNCTIONS  //  //  //  //  //  //  //  //
////////////////////////////////////////////////////////////////////////////////////////

// Set Global DOM Variables
    const body = document.querySelector('body');
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    const par = document.getElementById('gamebox-parent');
    const p1 = document.getElementById('plane1');       // user-interactive elements (buttons, etc.)
    const p2 = document.getElementById('plane2');       // HUD display, titles, tutorial
    const p3 = document.getElementById('plane3');       // 'mute' layer (transparent grayed out gamefield)   --- OR ---   powerups (*option)
    const p4 = document.getElementById('plane4');       // enemy cars that pass player car
    const p5 = document.getElementById('plane5');       // player car
    const p6 = document.getElementById('plane6');       // enemy cars
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

// Function Build Page Layout
    function buildGamePage() {
      par.style.width = fullW + 'px';
      par.style.height = fullH + 'px';
      header.style.height = gameboxPadding + 'px';
      footer.style.height = gameboxPadding + 'px';
      body.style.fontSize = gameboxPadding / 2 + 'px';
      body.style.lineHeight = gameboxPadding + 'px';
    };
    buildGamePage();

// Function Create Player Car
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
    makePlayerCar(p5);


/////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  HUD FUNCTIONS  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////

// Function Master HUD Stack
    function refreshHud(t) {
      speedBoxRefresh();
      timeBoxRefresh();
    };

// Function Make Arbitrary Box
    function makeHudBox(gamePlane, id, left, top, width, height, color) {
      let div = document.createElement('div');
      div.style.position = 'absolute';
      // div.style.backgroundImage = "url('img/car1.png')";
      // div.style.backgroundSize = '100%';
      // div.style.backgroundRepeat = 'no-repeat';
      div.style.backgroundColor = color;
      div.style.left = left * w + 'px';
      div.style.top = top * h + 'px';
      div.style.width = width * w + 'px';
      div.style.height = height * h + 'px';
      div.id = id;
      gamePlane.appendChild(div);
    };
    makeHudBox(p2, 'speedBox', 0, 1, 3, 2, 'yellow');
    makeHudBox(p2, 'timeBox', 13, 1, 3, 2, 'blue');

// Function Refresh Speed Text
    function speedBoxRefresh() {
      speedBox.innerText = 'Speed:\n' + Math.floor(speed) + ' mph';
    };

// Function Refresh Time Text
    function timeBoxRefresh() {
      timeBox.innerText = 'Time:\n' + runTimeRemain;
    };


//////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  TIME FUNCTIONS  //  //  //  //  //  //  //  //
//////////////////////////////////////////////////////////////////////////////

// Initialization Parameters
    const runTimeTotal = 100;
    let runTimeElapsed = 0;
    let runTimeRemain = runTimeTotal - runTimeElapsed;

// Function Update Clock
    function setClock(t) {
      runTimeElapsed = Math.floor(t / 60);
      runTimeRemain = runTimeTotal - runTimeElapsed
    };


///////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  SPEED FUNCTIONS  //  //  //  //  //  //  //  //
///////////////////////////////////////////////////////////////////////////////

// Initialization Parameters
    const maxSpeed = 120;
    const minSpeed = 10;
    let speedUp = false;
    let speedDown = false;
    let speed = 50;

// Function Change Speed
    function setSpeed(t) {
      if (speedUp) {
        speed += ((maxSpeed - speed) / maxSpeed);
      } else if (speedDown) {
        speed += ((minSpeed - speed) / (minSpeed * 5));
      };
    };

// Keyboard Speed Event Listeners
    document.addEventListener('keydown', function(event) {
      if (event.keyCode === 38) {
        speedUp = true;
      } else if (event.keyCode === 40) {
        speedDown = true;
      };
    });
    document.addEventListener('keyup', function(event) {
      if (event.keyCode === 38) {
        speedUp = false;
      } else if (event.keyCode === 40) {
        speedDown = false;
      };
    });


///////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  MOVING OBJECT FUNCTIONS  //  //  //  //  //  //  //  //
///////////////////////////////////////////////////////////////////////////////////////

// Initialization Parameters
    const horizon = 3 * h;

// Function Make Dynamic Object
    function newGameObject(timestamp, gamePlane, objectClass, imgSrc, startL, endL, aspect, endW, distScale) {
      let div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.backgroundImage = imgSrc;
      div.style.backgroundSize = '100%';
      div.style.backgroundRepeat = 'no-repeat';
      div.classList.add(objectClass, 'moving', timestamp, startL, endL, aspect, endW, distScale, 0);
      gamePlane.appendChild(div);
      return div;
    };

// Moving Object ClassList
    // [0]'tree'
    // [1]'moving'
    // [2](timestamp)
    // [3](startL)
    // [4](endL)
    // [5](aspect)
    // [6](endW)
    // [7](distScale)
    // [8](distMoved)

// Function Move + Scale Dynamic Object Then Remove
    function moveBox(element, t) {
      let box = element;
      let moveSpeed = speed;
      if (box.classList[0] === 'enemy') {
        moveSpeed = (speed - enemySpeed);
      };
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
      let distanceOld = parseInt(box.classList[8]);
      let distance = distanceOld + moveSpeed * (t - box.classList[2]);
      box.classList.replace(box.classList[2], t);
      box.classList.replace(box.classList[8], distance);
      let rate = Math.pow(distance, 5) / Math.pow(distanceTotal, 5);
      box.style.left = startLeft + (leftMove * rate) + 'px';
      box.style.top = startTop + (topMove * rate) + 'px';
      box.style.width = startWidth + (widthMove * rate) + 'px';
      box.style.height = startHeight + (heightMove * rate) + 'px';
      clearObject(box);
    };


/////////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  BACKGROUND DRAW FUNCTIONS  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////////////////

// Function Master Background Stack
    function bgElements(t) {
      makeTrees(t);
      // makeLanes(t);
    };

// Initialization Parameters
    const treesToMake = 20;
    const distScaleTree = 7500;
    // const lanesToMake = 10;
    // const distScaleLanes = null;
    let lastTreeT = 0;
    // let lastLaneT = 0;

// Function Make Trees
    function makeTrees(t) {
      let treeInt = (distScaleTree / speed) / (treesToMake / 2);
      if (t >= (lastTreeT + treeInt)) {
        newGameObject(t, p7, 'tree', `url('img/tree.png')`, 6.25, -12.5, 0.5, 6, distScaleTree);
        newGameObject(t, p7, 'tree', `url('img/tree.png')`, 9.75, 22.5, 0.5, 6, distScaleTree);
        lastTreeT = t;
      };
    };

// Function Make Lanes
    // function makeLanes(t) {
    //   let laneInt = (distScaleLanes / speed) / (lanesToMake / 2);
    //   if (t >= (lastLaneT + laneInt)) {
    //     newGameObject(t, p7, 'lane', imgSrc, startL, endL, aspect, endW, distScaleLanes);
    //     newGameObject(t, p7, 'lane', imgSrc, startL, endL, aspect, endW, distScaleLanes);
    //     lastLaneT = t;
    //   };
    // };

// Function Clear Background Objects
    function clearObject(element) {
      let top = parseInt(element.style.top.replace(/px/g, ''));
      let type = element.classList[0];
      if (top > 9 * h && type !== 'enemy') {
        element.remove();
      } else if (top > 18 * h) {
        element.remove();
      };
    };


////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  ENEMY DRAW FUNCTIONS  //  //  //  //  //  //  //  //
////////////////////////////////////////////////////////////////////////////////////

// Initialization Parameters
    const enemiesToMake = 20;
    const distScaleEnemy = 20000;
    const enemySpeed = 50;
    let lastEnemyT = 0;

// Function Random Lane Generator
    function randomThree() {
      return Math.floor(Math.random() * 3) + 1;
    };

// Function Make Enemies
    function makeEnemies(t) {
      let enemyInt = (distScaleEnemy / Math.min(enemySpeed, speed)) / (enemiesToMake / 3);
      // let numEnemies = document.querySelectorAll('.enemy').length
      if (t >= (lastEnemyT + enemyInt)) {
        let lane = randomThree();
        let color = randomThree() + 1;
        switch(lane) {
          case 1:
            newGameObject(t, p6, 'enemy', `url('img/car${color}.png')`, 7, -0.5, 2, 6, distScaleEnemy);
          break;
          case 2:
            newGameObject(t, p6, 'enemy', `url('img/car${color}.png')`, 8, 5, 2, 6, distScaleEnemy);
          break;
          case 3:
            newGameObject(t, p6, 'enemy', `url('img/car${color}.png')`, 9, 10.5, 2, 6, distScaleEnemy);
          break;
        };
        lastEnemyT = t;
      };
      enemyDeltaZ();
    };

// Function Change Enemy Z-Index
    function enemyDeltaZ() {
      let enemies = document.querySelectorAll('.enemy');
      for (let i = 0; i < enemies.length; i++) {
        let top = parseInt(enemies[i].style.top.replace(/px/g, ''));
        if (top >= 7 * h) {
          enemies[i].parentNode.removeChild(enemies[i]);
          p4.appendChild(enemies[i]);
        } else if (top < 7 * h) {
          enemies[i].parentNode.removeChild(enemies[i]);
          p6.appendChild(enemies[i]);
        };
      };
    };




/////////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  PLAYER MOVEMENT FUNCTIONS  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////////////////

                        //////////////////////////////////////////////
                        // Function Slide Player Car Into Gamefield //
                        //////////////////////////////////////////////
                          function initializePlayerCar() {
                            // playerCar.style.transition = '1s ease-in-out';
                            playerCar.style.transitionDuration = '100ms';
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









///////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  COLLISION FUNCTIONS  //  //  //  //  //  //  //  //
///////////////////////////////////////////////////////////////////////////////////


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

///////////////////////////////////////////////////////////////////////////////////







// moving = box.classList[1]
// timetamp = box.classList[2]
// startL = box.classList[3]
// endL = box.classList[4]
// aspect = box.classList[5]
// endW = box.classList[6]
// distScale = box.classList[7]





