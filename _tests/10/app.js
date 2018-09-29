
/////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  MASTER DRAW STACK  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////////

// Initialization Parameters
    let t = 0;
    let splashState = true;

// Function Master Animation Frame Stack
    function drawGame(timestamp) {
      t = timestamp / 16;
      window.requestAnimationFrame(drawGame);
      redraw(timestamp, t);
    };
    window.requestAnimationFrame(drawGame);

// Function Redraw All Moving Elements
    function redraw(timestamp, t) {
      bgElements(t);
      if (splashState === false) {
        gameStack(timestamp, t);
      };
      let movers = document.querySelectorAll('.moving');
      for (let i = 0; i < movers.length; i++) {
        moveBox(movers[i], t);
      };
    };

// Function Refresh Global Variables
    function globalRefresh(timestamp, t) {
      setClock(timestamp);
      setSpeed(t);
      setDistance(timestamp);
    };

// Function Master Game Runtime Stack
    function gameStack(timestamp, t) {
      globalRefresh(timestamp, t)
      refreshHud(t);
      makeEnemies(t);
      checkForHit();
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
      // body.style.fontSize = gameboxPadding / 2 + 'px';
      // body.style.lineHeight = gameboxPadding + 'px';
    };
    buildGamePage();

// Function Create Player Car
    function makePlayerCar(gamePlane) {
      let div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.backgroundImage = `url('img/car1.png')`;
      div.style.backgroundSize = '100%';
      div.style.backgroundRepeat = 'no-repeat';
      div.style.left = 6 * w + 'px';
      div.style.top = 9 * h + 'px';
      div.style.width = 4 * w + 'px';
      div.style.height = 2 * h + 'px';
      div.id = 'playerCar';
      gamePlane.appendChild(div);
    };


////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  SPLASH FUNCTIONS  //  //  //  //  //  //  //  //
////////////////////////////////////////////////////////////////////////////////

// Initialization Parameters
      makePlayerCar(p5);
      makeSplashElements();

// Function Splash Master Stack
    function splash() {
      p3.style.backgroundColor = 'black';
      p3.style.opacity = 0.5;
      titleFlyIn();
      setTimeout(() => playButtonAppear(), 1200);
      playButton.addEventListener('click', () => togglePlay());
    };

// Function Clear Splash
    function togglePlay() {
      setTimeout(() => playButton.remove(), 2000);
      initializePlayerCar();
      titleFlyOut();
      playButtonExplode();
      p3.style.transitionDuration = '2s';
      setTimeout(() => p3.style.opacity = 0, 500);
      splashState = false;
      playStack();
    };

// Function Make Title Text Boxes
    function makeTitleBox(gamePlane, id, text, top, width, height) {
      let div = document.createElement('div');
      div.id = id;
      div.classList.add('title');
      div.style.position = 'absolute';
      div.style.transitionDuration = '1s';
      div.style.transitionTimingFunction = 'ease-in-out';
      // div.style.textAlign = 'center';
      // div.style.backgroundColor = 'rgba(0,0,0,.5)';
      div.innerText = text;
      div.style.fontFamily = `'Faster One', cursive`;
      div.style.color = 'red';
      div.style.fontSize = height * h + 'px';
      div.style.left = -10 * w + 'px';
      div.style.top = top * h + 'px';
      div.style.width = width * w + 'px';
      div.style.height = height * h + 'px';
      gamePlane.appendChild(div);
    };

// Function Make Title
    function makeSplashElements() {
      makeTitleBox(p2, 'title1', 'Drive', 0, 10, 2);
      makeTitleBox(p2, 'title2', 'My', 2, 10, 2);
      makeTitleBox(p2, 'title3', 'Car', 4, 10, 2);
      makePlayButton(p1, 'playButton', 'Play!', 'yellow');
    };

// Function Titles Fly In
    function titleFlyIn() {
      title1.style.left = 3 * h + 'px';
      setTimeout(() =>
        title2.style.left = 3 * h + 'px'
      , 200);
      setTimeout(() =>
        title3.style.left = 3 * h + 'px'
      , 400);
    };

// Function Titles Fly Out
    function titleFlyOut() {
      title1.style.left = 16 * h + 'px';
      setTimeout(() =>
        title2.style.left = 16 * h + 'px'
      , 200);
      setTimeout(() =>
        title3.style.left = 16 * h + 'px'
      , 400);
    };

// Function Make Play Button
    function makePlayButton(gamePlane, id, text, bgColor) {
      let button = document.createElement('button');
      button.id = id;
      button.classList.add('button');
      button.style.position = 'absolute';
      button.style.backgroundColor = bgColor;
      button.style.borderRadius = w / 2 + 'px';
      button.innerText = text;
      button.style.fontFamily = `'Faster One', cursive`;
      button.style.opacity = 0;
      button.style.fontSize = 0;
      button.style.left = 8 * w + 'px';
      button.style.top = 7.5 * h + 'px';
      button.style.width = 0;
      button.style.height = 0;
      gamePlane.appendChild(button);
    };

// Function Make Play Button Appear
    function playButtonAppear() {
      playButton.style.transitionDuration = '250ms';
      playButton.style.transitionTimingFunction = 'ease-in';
      playButton.style.left = 6.5 * w + 'px';
      playButton.style.top = 7 * h + 'px';
      playButton.style.width = 3 * w + 'px';
      playButton.style.height = 1 * h + 'px';
      playButton.style.fontSize = h / 1.5 + 'px';
      playButton.style.opacity = 0.8;
    };

// Function Explode Play Button
    function playButtonExplode() {
      playButton.style.transitionDuration = '250ms';
      playButton.style.left = 5 * w + 'px';
      playButton.style.top = 6.5 * h + 'px';
      playButton.style.width = 6 * w + 'px';
      playButton.style.height = 2 * h + 'px';
      playButton.style.fontSize = (h / 1.5) * 2 + 'px';
      playButton.style.opacity = 0;
    };

// Function Slide Player Car Into Gamefield
    function initializePlayerCar() {
      playerCar.style.transitionDuration = '1s';
      playerCar.style.transitionTimingFunction = 'ease-in-out';
      playerCar.style.top = 7 * h + 'px';
    };

window.onload = () => splash();


/////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  HUD FUNCTIONS  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////

// Function Master HUD Refresh Stack
    function refreshHud(t) {
      speedBoxRefresh();
      timeBoxRefresh();
      distBoxRefresh();
    };

// Function Draw HUD
    function makeHud() {
      makeHudBox(p2, 'speedBox', -3, 1, 3, 2, 'right', 0.75, 'rgba(255,0,0,0.3)');
      makeHudBox(p2, 'timeBox', 6, -2, 4, 2, 'center', 1.5, 'rgba(0,255,0,0.3)');
      makeHudBox(p2, 'distBox', 16, 1, 2.5, 2, 'right', 0.75, 'rgba(0,0,255,0.3)');
      makeNeedle();
    };
    // makeHud();

// Function HUD Fade In
    function hudFadeIn() {
      let huds = document.querySelectorAll('.HUD');
      for (let i = 0; i < huds.length; i++) {
        huds[i].style.transitionDuration = '1s';
        huds[i].style.opacity = 1;
      };
      speedBox.style.left = 0 + 'px';
      timeBox.style.top = 1 * h + 'px';
      distBox.style.left = 13 * w + 'px';
    };

// Function Make Arbitrary HUD Box
    function makeHudBox(gamePlane, id, left, top, width, height, textAlign, fontScale, color) {
      let div = document.createElement('div');
      div.id = id;
      div.classList.add('HUD');
      div.style.position = 'absolute';
      div.style.opacity = 0;
      div.style.fontFamily = 'Seven Segment';
      // div.style.backgroundColor = 'rgba(5,5,5,0.5)'
      div.style.color = 'orange';
      gamePlane.appendChild(div);
      let textBox = document.createElement('div');
      // textBox.style.backgroundColor = color;
      textBox.style.textAlign = textAlign;
      textBox.id = id + 'Text';
      div.appendChild(textBox);
      div.style.left = left * w + 'px';
      div.style.top = top * h + 'px';
      div.style.width = width * w + 'px';
      div.style.height = height * h + 'px';
      textBox.style.fontSize = h * fontScale + 'px';
    };

// Function Make Speed Needle
    function makeNeedle() {
      let div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.backgroundColor = 'black';
      div.style.transitionDuration = '100ms';
      div.style.transformOrigin = '100% 100%';
      div.style.left = '21%';
      div.style.top = '90%';
      div.style.width = '29%';
      div.style.height = '1%';
      div.id = 'needle';
      speedBox.appendChild(div);
      speedBox.style.backgroundImage = `url('img/speedometer.png')`
      speedBox.style.backgroundSize = '100%';
      speedBox.style.backgroundRepeat = 'no-repeat';
    };

// Function Add Leading Zeros To Integer
    function leadZeros(num, digits) {
      let str = String(num);
      let output = str;
      while (output.length < digits) {
        output = `0${output}`;
      };
      return output;
    };

// Function Rotate Speed Needle
    function rotateNeedle() {
      let rotation = (speed / maxSpeed) * 170;
      needle.style.transform = `rotate(${rotation}deg)`;
    };

// Function Refresh Speed Text
    function speedBoxRefresh() {
      speedBoxText.innerText = Math.floor(speed) + ' mph';
      rotateNeedle()
    };

// Function Refresh Time Text
    function timeBoxRefresh() {
      let string = '';
      if (runTimeRemain >= 60) {
        let mins = Math.floor(runTimeRemain / 60);
        let secs = runTimeRemain - (mins * 60);
        let minStr = leadZeros(mins, 2);
        let secStr = leadZeros(secs, 2);
        string = `${minStr}:${secStr}`;
      } else {
        let secStr = leadZeros(runTimeRemain, 2);
        string = `00:${secStr}`;
      };
      timeBoxText.innerText = string;
    };

// Function Refresh Distance Text
    function distBoxRefresh() {
      distBoxText.innerText = distanceRemain.toFixed(2) + ' mi';
    };



function playStack() {
  makeHud()
  setTimeout(() => hudFadeIn(), 500)
  // hudFadeIn();
  runTimeElapsed = 0;
  distance = 0;
  // resetClock();
  // resetDistance();
}






//////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  TIME FUNCTIONS  //  //  //  //  //  //  //  //
//////////////////////////////////////////////////////////////////////////////

// Initialization Parameters
    const runTimeTotal = 90;
    let runTimeElapsed = 0;
    let runTimeRemain = runTimeTotal - runTimeElapsed;

// Function Update Clock
    function setClock(timestamp) {
      runTimeElapsed = Math.floor(timestamp / 1000);
      runTimeRemain = runTimeTotal - runTimeElapsed;
    };

// Function Reset Clock
    function resetClock() {
      runTimeElapsed = 0;
    };


///////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  SPEED FUNCTIONS  //  //  //  //  //  //  //  //
///////////////////////////////////////////////////////////////////////////////

// Initialization Parameters
    const maxSpeed = 120;
    const minSpeed = 10;
    let speedUp = false;
    let speedDown = false;
    let speed = 65;

// Function Change Speed
    function setSpeed(t) {
      if (speedUp) {
        speed += ((maxSpeed - speed) / maxSpeed);
      } else if (speedDown) {
        speed += ((minSpeed - speed) / (minSpeed * 5));
      } else if (!speedUp && !speedDown && speed > minSpeed) {
        //foot off gas, slow decay
        speed -= 0.25;
      }
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


//////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  DISTANCE FUNCTIONS  //  //  //  //  //  //  //  //
//////////////////////////////////////////////////////////////////////////////////

// Initialization Parameters
    const trackLength = 2.5;
    let distance = 0;
    let distanceRemain = trackLength - distance;
    let lastTimeDistanceSet = 0;

// Function Set Distance
    function setDistance(timestamp) {
      let interval = (timestamp - lastTimeDistanceSet) / 1000;
      distance += interval * (speed / 3600);
      distanceRemain = trackLength - distance
      lastTimeDistanceSet = timestamp;
};

// Function Reset Distance
    function resetDistance(timestamp) {
      distance = 0;
      lastTimeDistanceSet = timestamp;
    };


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
      let type = box.classList[0];
      let moveSpeed = speed;
      if (type === 'enemy') {
        moveSpeed = (speed - enemySpeed);
      };
      let startLeft = box.classList[3] * w;
      let startTop = horizon;
      let startWidth = 0;
      let startHeight = 0;
      let endLeft = box.classList[4] * w;
      let endTop = fullH;
      let endWidth = box.classList[6] * w;
      let endHeight = (box.classList[6] / box.classList[5]) * h;
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
      let top = parseInt(element.style.top.replace(/px/g, ''));
      if (top >= 9 * h) {
        clearObject(box, type, top);
      };
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
    function clearObject(element, type, top) {
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
    // const enemiesToMake = 20;
    const distScaleEnemy = 20000;
    // const distScaleEnemy = 7500;
    const enemySpeed = 35;
    // let lastEnemyT = 0;
    const enemyD = 0.02;
    let lastEnemyD = 0;
    // let lastEnemyLane = 2;
    // let lastEnemyDrawSpeed = speed;

// Function Random Lane Generator
    function randomThree() {
      return Math.floor(Math.random() * 3) + 1;
    };

// Function Make Enemies
    function makeEnemies(t) {
      // console.log(document.querySelectorAll('.enemy').length)
      // let enemyInt = (distScaleEnemy / speed) / (enemiesToMake / 3);
      // let numEnemies = document.querySelectorAll('.enemy').length
      // if (t >= (lastEnemyT + enemyInt) && speed >= enemySpeed && numEnemies <= enemiesToMake) {
      // if (distance >= (lastEnemyD + enemyD) && speed >= lastEnemyDrawSpeed && numEnemies <= enemiesToMake) {
      // if (distance >= (lastEnemyD + enemyD) && speed >= (lastEnemyDrawSpeed / 2)) {
      if (distance >= (lastEnemyD + enemyD) && speed > (enemySpeed * 2)) {

        let lane = randomThree();
        // let lane = 2
        // if (lane !== lastEnemyLane) {
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
        // };
        lastEnemyD = distance;
        // lastEnemyLane = lane;
        // lastEnemyDrawSpeed = speed;
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
                            playerCar.style.transitionDuration = '250ms';
                            playerCar.style.TransitionTimingFunction = 'ease-in-out';
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
                              }, 250);
                              setTimeout(function() {
                                playerCar.classList.remove('jump');
                              }, 500);
                            };
                          };
                        //////////////////////////////









///////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  COLLISION FUNCTIONS  //  //  //  //  //  //  //  //
///////////////////////////////////////////////////////////////////////////////////

// Initialization Parameters
    let playerHitSpotLeft = 0;
    let playerHitSpotTop = 0;

// Function Get Player Hit Spot
    function getPlayerHitSpot() {
      let left = parseInt(playerCar.style.left.replace(/px/g, ''));
      let top = parseInt(playerCar.style.top.replace(/px/g, ''));
      let width = parseInt(playerCar.style.width.replace(/px/g, ''));
      let height = parseInt(playerCar.style.height.replace(/px/g, ''));
      playerHitSpotLeft = left + (width / 2);
      playerHitSpotTop = top + (height / 2);
    };

// Function Get Enemy Hit Spot Left
    function getEnemyHitSpotLeft(element) {
      let left = parseInt(element.style.left.replace(/px/g, ''));
      let width = parseInt(element.style.width.replace(/px/g, ''));
      return (left + (width / 2));
    };

// Function Get Enemy Hit Spot Top
    function getEnemyHitSpotTop(element) {
      let top = parseInt(element.style.top.replace(/px/g, ''));
      let height = parseInt(element.style.height.replace(/px/g, ''));
      return (top + (height / 2));
    };

// Function Check For Hit
    function checkForHit() {
      getPlayerHitSpot();
      let enemies = document.querySelectorAll('.enemy');
      for (let i = 0; i < enemies.length; i++) {
        let element = enemies[i];
        let hitDistLeft = Math.abs(getEnemyHitSpotLeft(element) - playerHitSpotLeft);
        let hitDistTop = Math.abs(getEnemyHitSpotTop(element) - playerHitSpotTop);
        if (hitDistTop < h / 2 && hitDistLeft < w / 4 && playerCar.classList[0] !== 'jump') {
          speed = enemySpeed * 0.9;
          setTimeout(() => element.remove(), 500);
        };
      };
    };


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




// moving = box.classList[1]
// timetamp = box.classList[2]
// startL = box.classList[3]
// endL = box.classList[4]
// aspect = box.classList[5]
// endW = box.classList[6]
// distScale = box.classList[7]



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


