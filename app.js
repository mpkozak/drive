///////////////////////////////////////////////////////////////////////////////////
// // *** NOT MY CODE *** // // *** NOT MY CODE *** // // *** NOT MY CODE *** // //
///////////////////////////////////////////////////////////////////////////////////

// requestAnimationFrame Polyfill  ---  Adapted From https://gist.github.com/amsul/3691721
    window.requestAnimFrame = (function() {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback){
          window.setTimeout(callback, 1000 / 60);
        };
    })();

// Function Detect Mobile Browser  ---  Adapted From https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    function isMobile() {
      if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
      ) {
        return true;
      } else {
        return false;
      };
    };
    let mobile = isMobile();


/////////////////////////////////////////////////////////////////////////////////////////////
// // *** MY CODE *** \\ // *** MY CODE *** \\ // *** MY CODE *** \\ // *** MY CODE *** // //
/////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  INITIALIZATION FUNCTIONS  //  //  //  //  //  //  //  //
////////////////////////////////////////////////////////////////////////////////////////

// Set Global DOM Constands
    const body = document.querySelector('body');
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    const par = document.getElementById('gamebox-parent');
    const p1 = document.getElementById('plane1');       // buttons + click events
    const p2 = document.getElementById('plane2');       // titles, tutorial, HUD
    const p3 = document.getElementById('plane3');       // 'mute' layer during splash + endgame, 'flash' layer during collision event
    const p4 = document.getElementById('plane4');       // enemy cars behind player car
    const p5 = document.getElementById('plane5');       // player car
    const p6 = document.getElementById('plane6');       // enemy cars ahead of player car
    const p7 = document.getElementById('plane7');       // background elements (trees + lanes)
    const p8 = document.getElementById('plane8');       // road backplane
    const p9 = document.getElementById('plane9');       // mountains (post-mvp)
    const p10 = document.getElementById('plane10');     // sky

// Set Global Draw Dimension Variables
    let displayUnit = Math.floor(Math.min(window.innerWidth / 18, window.innerHeight / 11));
    if (mobile) {
      let width = Math.max(screen.availWidth, screen.availHeight);
      let height = Math.min(screen.availWidth, screen.availHeight);
      displayUnit = Math.floor(Math.min(width / 16, height / 9));
    };
    let fullW = displayUnit * 16;
    let fullH = displayUnit * 9;
    let w = fullW / 16;
    let h = fullH / 9;
    let gameboxPadding = Math.floor((window.innerHeight - fullH) / 2);

// Function Build Page Layout
    function buildGamePage() {
      par.style.width = fullW + 'px';
      par.style.height = fullH + 'px';
      if (mobile) {
        makeMobileLayout();
      } else {
        makeDesktopLayout();
      };
    };

// Function Build Desktop Page Layout
    function makeDesktopLayout() {
      header.style.height = gameboxPadding + 'px';
      footer.style.height = gameboxPadding + 'px';
    };

// Function Build Mobile Page Layout
    function makeMobileLayout() {
      header.style.display = 'none';
      footer.style.display = 'none';
    };

// Function Create Backplane
    function makeBackplane() {
      p8.style.backgroundImage = `url('img/backplane.png')`;
      p8.style.backgroundSize = '100%';
      p8.style.backgroundRepeat = 'no-repeat';
    };

// Function Create Sky
    function makeSky() {
      setTimeout(() => { p10.style.backgroundColor = '#00BFFF' }, 1);
    };

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


/////////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  SCREEN ROTATION FUNCTIONS  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////////////////

// Function Show Or Hide Mobile Gamebox
    function showMobileGamebox() {
      let rotate = document.getElementById('rotate');
      if (window.innerWidth < window.innerHeight) {
        par.style.display = 'none';
        rotate.style.display = 'block';
      } else {
        rotate.style.display = 'none';
        par.style.display = 'block';
      };
    };

// Rotation Event Listener
    window.addEventListener('orientationchange', rotationHandler);

// Function Rotation Handler
    function rotationHandler() {
      let orientation = Math.abs(window.orientation);
      if (orientation === 90) {
        rotate.style.display = 'none';
        par.style.display = 'block';
      } else {
        par.style.display = 'none';
        rotate.style.display = 'block';
      };
    };


////////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  KEYBOARD EVENT FUNCTIONS  //  //  //  //  //  //  //  //
////////////////////////////////////////////////////////////////////////////////////////

// Function Key Down Handler
    function keyDownHandler(event) {
      if (event.keyCode === 38) {
        speedInput = true;
        speedUp = true;
      } else if (event.keyCode === 40) {
        speedInput = true;
        speedDown = true;
      } else if (event.keyCode === 37) {
        moveLeft();
      } else if (event.keyCode === 39) {
        moveRight();
      } else if (event.keyCode === 32) {
        jump();
      };
    };

// Function Key Up Handler
    function keyUpHandler(event) {
      if (event.keyCode === 38) {
        speedUp = false;
      } else if (event.keyCode === 40) {
        speedDown = false;
      };
    };

// Function Add Key Listeners
    function addKeyListener() {
      document.addEventListener('keydown', keyDownHandler);
      document.addEventListener('keyup', keyUpHandler);
    };

// Function Remove Key Listeners
    function removeKeyListener() {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    };


/////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  SWIPE EVENT FUNCTIONS  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////////////

// Variable Initial States
    let xStart = 0;
    let xEnd = 0;
    let deltaX = 0;
    let yStart = 0;
    let yEnd = 0;
    let deltaY = 0;

// Function Touch Start
    function touchStart(event) {
      event.preventDefault();
      xStart = event.changedTouches[0].screenX;
      yStart = event.changedTouches[0].screenY;
    };

// Function Touch End
    function touchEnd(event) {
      event.preventDefault();
      xEnd = event.changedTouches[0].screenX;
      yEnd = event.changedTouches[0].screenY;
      deltaX = Math.abs(xEnd - xStart);
      deltaY = Math.abs(yEnd - yStart);
      swipeHandler();
    };

// Function Swipe Handler
    function swipeHandler() {
      if (deltaX > deltaY && xEnd < xStart) {
        moveLeft();
      } else if (deltaX > deltaY && xEnd > xStart) {
        moveRight();
      } else if (deltaX < deltaY && yEnd < yStart) {
        jump();
      };
    };

// Function Add Swipe Listeners
    function addSwipeListener() {
      par.addEventListener('touchstart', touchStart);
      par.addEventListener('touchend', touchEnd);
    };

// Function Remove Swipe Listeners
    function removeSwipeListener() {
      par.removeEventListener('touchstart', touchStart);
      par.removeEventListener('touchend', touchEnd);
    };


/////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  INPUT EVENT FUNCTIONS  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////////////

// Function Add User Input Listener
    function addInputListener() {
      if(!mobile) {
        addKeyListener();
      } else {
        addSwipeListener();
      };
    };

// Function Remove User Input Listener
    function removeInputListener() {
      if(!mobile) {
        removeKeyListener();
      } else {
        removeSwipeListener();
      };
    };


////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  SPLASH FUNCTIONS  //  //  //  //  //  //  //  //
////////////////////////////////////////////////////////////////////////////////

// Function Make Title Text Boxes
    function makeTitleBox(gamePlane, id, text, top, width, height) {
      let div = document.createElement('div');
      div.id = id;
      div.classList.add('title');
      div.style.position = 'absolute';
      div.style.transitionDuration = '1s';
      div.style.transitionTimingFunction = 'ease-in-out';
      div.innerText = text;
      div.style.textShadow = '5px 5px 5px #222222';
      div.style.fontFamily = `'Faster One', Futura, sans-serif`;
      div.style.color = '#FB0006';
      div.style.fontSize = height * h + 'px';
      div.style.left = -10 * w + 'px';
      div.style.top = top * h + 'px';
      div.style.width = width * w + 'px';
      div.style.height = height * h + 'px';
      gamePlane.appendChild(div);
    };

// Function Make Play Button
    function makePlayButton(gamePlane, id, text, bgColor) {
      let button = document.createElement('button');
      button.id = id;
      button.classList.add('button');
      button.style.position = 'absolute';
      button.style.transitionDuration = '250ms';
      button.style.transitionTimingFunction = 'ease-in';
      button.style.backgroundColor = bgColor;
      button.style.boxShadow = '5px 5px 5px #222222';
      button.style.border = '1px solid #000000';
      button.style.borderRadius = w / 2 + 'px';
      button.innerText = text;
      button.style.fontFamily = `'Faster One', Futura, sans-serif`;
      button.style.opacity = 0;
      button.style.fontSize = 0;
      button.style.left = 8 * w + 'px';
      button.style.top = 7.5 * h + 'px';
      button.style.width = 0;
      button.style.height = 0;
      gamePlane.appendChild(button);
    };

// Function Make Title Screen Elements
    function makeSplashElements() {
      makeTitleBox(p2, 'title1', 'Drive', 0, 10, 2);
      makeTitleBox(p2, 'title2', 'My', 2, 10, 2);
      makeTitleBox(p2, 'title3', 'Car', 4, 10, 2);
      makePlayButton(p1, 'playButton', 'Play!', '#FFFF0C');
    };

// Function Titles Fly In
    function titleFlyIn() {
      title1.style.left = 3 * h + 'px';
      setTimeout(() => { title2.style.left = 3 * h + 'px' }, 200);
      setTimeout(() => { title3.style.left = 3 * h + 'px' }, 400);
    };

// Function Titles Fly Out + Removed
    function titleFlyOut() {
      title1.style.left = 16 * h + 'px';
      setTimeout(() => { title2.style.left = 16 * h + 'px' }, 200);
      setTimeout(() => { title3.style.left = 16 * h + 'px' }, 400);
      setTimeout(() => {
        title1.remove();
        title2.remove();
        title3.remove();
      }, 2000);
    };

// Function Make Play Button Appear
    function playButtonAppear() {
      playButton.style.left = 6.5 * w + 'px';
      playButton.style.top = 7 * h + 'px';
      playButton.style.width = 3 * w + 'px';
      playButton.style.height = 1 * h + 'px';
      playButton.style.fontSize = h / 1.5 + 'px';
      playButton.style.opacity = 0.8;
    };

// Function Explode Play Button + Remove
    function playButtonExplode() {
      playButton.style.borderRadius = w + 'px';
      playButton.style.left = 5 * w + 'px';
      playButton.style.top = 6.5 * h + 'px';
      playButton.style.width = 6 * w + 'px';
      playButton.style.height = 2 * h + 'px';
      playButton.style.fontSize = (h / 1.5) * 2 + 'px';
      playButton.style.opacity = 0;
      setTimeout(() => { playButton.remove() }, 300);
    };

// Function Slide Player Car Into Gamefield
    function initializePlayerCar() {
      playerCar.style.transitionDuration = '1s';
      playerCar.style.transitionTimingFunction = 'ease-in-out';
      playerCar.style.top = 7 * h + 'px';
      setTimeout( () => {
        playerCar.style.transitionDuration = '250ms';
      }, 1000);
    };


//////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  TUTORIAL FUNCTIONS  //  //  //  //  //  //  //  //
//////////////////////////////////////////////////////////////////////////////////

// Function Desktop Tutorial Style + Size Conform
    function drawTutorialDesktop() {
      let instructions = document.getElementById('instructions-desktop');
      instructions.style.left = 1 * w + 'px';
      instructions.style.top = h / 2 + 'px';
      instructions.style.width = w * 14 + 'px';
      instructions.style.fontSize = h / 2 + 'px';
      let keyMap = document.querySelector('.key-map')
      keyMap.style.backgroundColor = 'rgba(1,1,1,0.2)';
      keyMap.style.padding = w / 5 + 'px';
      keyMap.style.left = 5.55 * w + 'px';
      keyMap.style.top = 2 * h + 'px';
      keyMap.style.width = 4.5 * w + 'px';
      keyMap.style.fontSize = h / 2 + 'px';
      let keys = document.querySelectorAll('kbd');
      for (let i = 0; i < keys.length; i++) {
        keys[i].style.marginTop = (1 / 8) * h + 'px';
        keys[i].style.marginLeft = (3 / 4) * w + 'px';
        keys[i].style.width = (3 / 4) * w + 'px';
        keys[i].style.height = (3 / 4) * h + 'px';
        keys[i].style.fontSize = (3 / 8) * h + 'px';
        keys[i].style.lineHeight = (3 / 4) * w + 'px';
      };
      let space = document.querySelector('.space');
      space.style.marginLeft = '0';
      space.style.width = 1.5 * w + 'px';
      let cont = document.getElementById('continue-desktop');
      cont.style.left = 1 * w + 'px';
      cont.style.top = 8 * h + 'px';
      cont.style.width = w * 14 + 'px';
      cont.style.fontSize = h / 2 + 'px';
      tutorial = document.getElementById('tutorial-desktop');
      tutorial.style.display = 'block';
      tutorial.style.opacity = 0;
      tutorial.remove();
      p2.appendChild(tutorial);
      document.addEventListener('keydown', initializeGamePlay);
    };

// Function Mobile Tutorial Style + Size Conform
    function drawTutorialMobile() {
      let instructions = document.getElementById('instructions-mobile');
      instructions.style.left = 1 * w + 'px';
      instructions.style.top = h / 2 + 'px';
      instructions.style.width = w * 14 + 'px';
      instructions.style.fontSize = h / 2 + 'px';
      let swipeMap = document.querySelector('.swipe-map')
      swipeMap.style.backgroundColor = 'rgba(1,1,1,0.2)';
      swipeMap.style.padding = w / 5 + 'px';
      swipeMap.style.left = 5.55 * w + 'px';
      swipeMap.style.top = 2.5 * h + 'px';
      swipeMap.style.width = 4.5 * w + 'px';
      swipeMap.style.fontSize = h / 2 + 'px';
      let swipes = document.querySelectorAll('.swipe')
      for (let i = 0; i < swipes.length; i++) {
        swipes[i].style.marginTop = (1 / 8) * h + 'px';
        swipes[i].style.marginLeft = w + 'px';
        swipes[i].style.width = (3 / 4) * w + 'px';
        swipes[i].style.height = (3 / 4) * h + 'px';
      };
      let cont = document.getElementById('continue-mobile');
      cont.style.left = 1 * w + 'px';
      cont.style.top = 8 * h + 'px';
      cont.style.width = w * 14 + 'px';
      cont.style.fontSize = h / 2 + 'px';
      tutorial = document.getElementById('tutorial-mobile');
      tutorial.style.display = 'block';
      tutorial.style.opacity = 0;
      tutorial.remove();
      p2.appendChild(tutorial);
      setTimeout(() => { par.addEventListener('click', initializeGamePlay) }, 100);
    };

// Function Select Tutorial
    function makeTutorial() {
      if (!mobile) {
        drawTutorialDesktop();
      } else {
        drawTutorialMobile();
      };
    };

// Function Tutorial Appear
    function tutorialAppear() {
      tutorial.style.transitionDuration = '1s';
      tutorial.style.transitionTimingFunction = 'ease-in';
      tutorial.style.opacity = 1;
    };

// Function Tutorial Remove
    function tutorialRemove() {
      tutorial.style.transitionDuration = '500ms';
      tutorial.style.opacity = 0;
      setTimeout(() => { tutorial.remove() }, 500);
    };


/////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  HUD FUNCTIONS  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////

// Function Make Arbitrary HUD Box
    function makeHudBox(gamePlane, id, left, top, width, height, textAlign, fontScale) {
      let div = document.createElement('div');
      div.id = id;
      div.classList.add('HUD');
      div.style.position = 'absolute';
      div.style.transitionDuration = '1s'
      div.style.opacity = 0;
      div.style.fontFamily = `'Seven Segment', Helvetica, sans-serif`;
      div.style.color = '#FD9408';
      div.style.left = left * w + 'px';
      div.style.top = top * h + 'px';
      div.style.width = width * w + 'px';
      div.style.height = height * h + 'px';
      gamePlane.appendChild(div);
      let textBox = document.createElement('div');
      textBox.style.textAlign = textAlign;
      textBox.style.textShadow = '2px 2px 5px #222222';
      textBox.id = id + 'Text';
      div.appendChild(textBox);
      textBox.style.fontSize = h * fontScale + 'px';
    };

// Function Make Speed Needle
    function makeNeedle() {
      let div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.transitionDuration = '100ms';
      div.style.backgroundColor = '#FB0006';
      div.style.boxShadow = '2px 2px 5px #222222';
      div.style.transformOrigin = '100% 100%';
      div.style.left = '21%';
      div.style.top = '90%';
      div.style.width = '29%';
      div.style.height = '1%';
      div.id = 'needle';
      speedBox.appendChild(div);
      speedBox.style.backgroundImage = `url('img/speedometer.png')`;
      speedBox.style.backgroundSize = '100%';
      speedBox.style.backgroundRepeat = 'no-repeat';
    };

// Function HUD Boxes Fade + Slide In
    function hudFadeIn() {
      let huds = document.querySelectorAll('.HUD');
      for (let i = 0; i < huds.length; i++) {
        huds[i].style.opacity = 1;
      };
      speedBox.style.left = 0 + 'px';
      timeBox.style.top = 1 * h + 'px';
      distBox.style.left = 13 * w + 'px';
    };

// Function HUD Boxes Fade + Slide Out
    function hudFadeOut() {
      let huds = document.querySelectorAll('.HUD');
      for (let i = 0; i < huds.length; i++) {
        huds[i].style.opacity = 0;
      };
      speedBox.style.left = -3 + 'px';
      timeBox.style.top = -2 * h + 'px';
      distBox.style.left = 16 * w + 'px';
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
      let rotation = (speed / maxSpeed) * 190 - 12;
      needle.style.transform = `rotate(${rotation}deg)`;
    };

// Function Refresh Speed Text + Needle
    function speedBoxRefresh() {
      speedBoxText.innerText = Math.floor(speed) + ' mph';
      rotateNeedle();
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

// Function Build HUD
    function makeHud() {
      makeHudBox(p2, 'speedBox', -3, 1, 3, 2, 'right', 0.75);
      makeHudBox(p2, 'timeBox', 6, -2, 4, 2, 'center', 1.5);
      makeHudBox(p2, 'distBox', 16, 1, 2.5, 2, 'right', 0.75);
      makeNeedle();
    };

// Function Master HUD Refresh Stack
    function refreshHud() {
      speedBoxRefresh();
      timeBoxRefresh();
      distBoxRefresh();
    };


//////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  TIME FUNCTIONS  //  //  //  //  //  //  //  //
//////////////////////////////////////////////////////////////////////////////

// Variable Initial States
    let runTimeStart = 0;
    let runTimeElapsed = 0;
    let runTimeRemain = 0;

// Function Reset Clock
    function resetClock() {
      runTimeStart = Math.floor(tStamp / 1000);
    };

// Function Refresh Clock
    function setClock(timestamp) {
      runTimeElapsed = Math.floor(timestamp / 1000) - runTimeStart;
      runTimeRemain = runTimeTotal - runTimeElapsed;
    };


///////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  SPEED FUNCTIONS  //  //  //  //  //  //  //  //
///////////////////////////////////////////////////////////////////////////////

// Variable Initial States
    let speedUp = false;
    let speedDown = false;

// Function Refresh Speed
    function setSpeed(t) {
      if (speedUp) {
        speed += ((maxSpeed - speed) / maxSpeed);
      } else if (speedDown) {
        speed += ((minSpeed - speed) / (minSpeed * 5));
      } else if (speedInput && !speedUp && !speedDown && speed > minSpeed + 1) {
        speed *= 0.995;
      };
    };


//////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  DISTANCE FUNCTIONS  //  //  //  //  //  //  //  //
//////////////////////////////////////////////////////////////////////////////////

// Variable Initial States
    let distance = 0;
    let distanceRemain = 0;
    let lastTimeDistanceSet = 0;

// Function Reset Distance
    function resetDistance() {
      distance = 0;
      lastTimeDistanceSet = tStamp;
    };

// Function Refresh Distance
    function setDistance(timestamp) {
      let interval = (timestamp - lastTimeDistanceSet) / 1000;
      distance += interval * (speed / 3600);
      distanceRemain = trackLength - distance;
      lastTimeDistanceSet = timestamp;
    };


/////////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  PLAYER MOVEMENT FUNCTIONS  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////////////////

// Function Move Left
    function moveLeft() {
      let left = parseInt(playerCar.style.left.replace(/px/g, ''));
      if (left >= w * 6) {
        playerCar.style.left = left - (w * 4) + 'px';
      };
    };

// Function Move Right
    function moveRight() {
      let left = parseInt(playerCar.style.left.replace(/px/g, ''));
      if (left <= w * 6) {
        playerCar.style.left = left + (w * 4) + 'px';
      };
    };

// Function Jump
    function jump() {
      let top = parseInt(playerCar.style.top.replace(/px/g, ''));
      if (top >= w * 7 && playerCar.classList[0] !== 'jump') {
        playerCar.classList.add('jump');
        playerCar.style.top = top - (h * 2) + 'px';
        setTimeout(() => { playerCar.style.top = top + 'px' }, 250);
        setTimeout(() => { playerCar.classList.remove('jump') }, 500);
      };
    };


/////////////////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  OBJECT MOTION + SCALING FUNCTIONS  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////////////////////////

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
      if (type === 'finish') {
        startWidth = 3 * w;
      };
      let startHeight = 0;
      let endLeft = box.classList[4] * w;
      let endTop = fullH;
      let endWidth = box.classList[6] * w;
      let endHeight = (box.classList[6] / box.classList[5]) * h;
      let topMove = endTop - startTop;
      let leftMove = endLeft - startLeft;
      let heightMove = endHeight - startHeight;
      let widthMove = endWidth - startWidth;
      let distanceTotal = box.classList[7];
      let distanceOld = parseInt(box.classList[8]);
      let distance = distanceOld + moveSpeed * (t - box.classList[2]);
// es5 compatable
      let c0 = box.classList[0];
      let c1 = box.classList[1];
      let c3 = box.classList[3];
      let c4 = box.classList[4];
      let c5 = box.classList[5];
      let c6 = box.classList[6];
      let c7 = box.classList[7];
      box.className = "";
      box.classList.add(c0, c1, t, c3, c4, c5, c6, c7, distance);
// es6 compatable
      // box.classList.replace(box.classList[2], t);
      // box.classList.replace(box.classList[8], distance);
// break
      let rate = Math.pow(distance, 5) / Math.pow(distanceTotal, 5);
      box.style.left = startLeft + (leftMove * rate) + 'px';
      box.style.top = startTop + (topMove * rate) + 'px';
      box.style.width = startWidth + (widthMove * rate) + 'px';
      box.style.height = startHeight + (heightMove * rate) + 'px';
      let top = parseInt(element.style.top.replace(/px/g, ''));
      if (type === 'enemy' && top >= 6) {
        checkForHit(box);
        enemyDeltaZ(box, top);
      };
      if (top >= 9 * h) {
        clearObject(box, type, top);
      };
    };

// Function Clear Background Objects
    function clearObject(element, type, top) {
      if (top > 9 * h && type !== 'enemy') {
        element.remove();
      } else if (top > 18 * h) {
        element.remove();
      };
    };


/////////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  BACKGROUND DRAW FUNCTIONS  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////////////////

// Variable Initial States
    let bgDist = 0;
    let lastTimeBgDistSet = 0;
    let lastTreeD = 0;
    let lastLaneD = 0;

// Function Make Trees
    function makeTrees(t) {
      if (bgDist >= lastTreeD + treeSpacing) {
        newGameObject(t, p7, 'tree', `url('img/tree.png')`, 6.25, -12.5, 0.5, 6, drawDistScale);
        newGameObject(t, p7, 'tree', `url('img/tree.png')`, 9.75, 22.5, 0.5, 6, drawDistScale);
        lastTreeD = bgDist;
      };
    };

// Function Make Lanes
    function makeLanes(t) {
      if (bgDist >= lastLaneD + laneSpacing) {
        newGameObject(t, p7, 'lane', `url('img/laneL.png')`, 7.5, 4.5, 1, 2, drawDistScale);
        newGameObject(t, p7, 'lane', `url('img/laneR.png')`, 8.5, 9.5, 1, 2, drawDistScale);
        lastLaneD = bgDist;
      };
    };

// Function Background Distance Refresh
    function bgDistRefresh() {
      let interval = (tStamp - lastTimeBgDistSet) / 1000;
      bgDist += interval * (speed / 3600);
      lastTimeBgDistSet = tStamp;
    };

// Function Master Background Stack
    function bgElements(t) {
      bgDistRefresh();
      makeTrees(t);
      makeLanes(t);
    };


////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  ENEMY DRAW FUNCTIONS  //  //  //  //  //  //  //  //
////////////////////////////////////////////////////////////////////////////////////

// Variable Initial States
    let lastEnemyD = 0;

// Function Random Lane Generator
    function randomThree() {
      return Math.floor(Math.random() * 3) + 1;
    };

// Function Random Car Color Generator
    function randomFive() {
      return Math.floor(Math.random() * 5) + 2;
    };

// Function Make Enemies
    function makeEnemies(t) {
      if (distance >= lastEnemyD + enemySpacing && speed > enemySpeed * 2) {
        let lane = randomThree();
        let color = randomFive();
        switch(lane) {
          case 1:
            newGameObject(t, p6, 'enemy', `url('img/car${color}.png')`, 7, -0.5, 2, 6, drawDistScale);
          break;
          case 2:
            newGameObject(t, p6, 'enemy', `url('img/car${color}.png')`, 8, 5, 2, 6, drawDistScale);
          break;
          case 3:
            newGameObject(t, p6, 'enemy', `url('img/car${color}.png')`, 9, 10.5, 2, 6, drawDistScale);
          break;
        };
        lastEnemyD = distance;
      };
    };

// Function Change Enemy Z-Index
    function enemyDeltaZ(element, top) {
      if (top >= 7 * h) {
        element.remove();
        p4.appendChild(element);
      } else if (top < 7 * h) {
        element.remove();
        p6.appendChild(element);
      };
    };


///////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  COLLISION FUNCTIONS  //  //  //  //  //  //  //  //
///////////////////////////////////////////////////////////////////////////////////

// Variable Initial States
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
    function checkForHit(element) {
      getPlayerHitSpot();
      let hitDistLeft = Math.abs(getEnemyHitSpotLeft(element) - playerHitSpotLeft);
      let hitDistTop = Math.abs(getEnemyHitSpotTop(element) - playerHitSpotTop);
      if (hitDistTop < h / 2 && hitDistLeft < w / 4 && playerCar.classList[0] !== 'jump') {
        collisionEvent(element);
      };
    };

// Function Collision Event
    function collisionEvent(element) {
      speed = enemySpeed * 0.9;
      setTimeout(() => { element.remove() }, 100);
      if (!finished) {
        p3.style.opacity = 0;
        p3.style.transitionDuration = '100ms';
        p3.style.backgroundColor = '#FFFFFF';
        p3.style.opacity = 0.5;
        setTimeout(() => { p3.style.opacity = 0 }, 100);
      };
    };


/////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  ENDGAME FUNCTIONS  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////////

// Function Make Finish Line
    function makeFinish(t) {
      newGameObject(t, p7, 'finish', `url('img/finish.png')`, 6.5, 1.875, 12, 12.25, drawDistScale);
      finishLine = true;
    };

// Function Make Endgame Text Box
    function makeEndgameBox(text) {
      let div = document.createElement('div');
      div.id = 'endgameText';
      div.classList.add('endgame');
      div.style.position = 'absolute';
      div.innerText = text;
      div.style.textShadow = '5px 5px 5px #222222';
      div.style.fontFamily = `'Faster One', Futura, sans-serif`;
      div.style.color = '#FB0006';
      div.style.opacity = 0;
      div.style.fontSize = 0;
      div.style.left = 8 * w + 'px';
      div.style.top = 4.5 * h + 'px';
      div.style.width = 0;
      div.style.height = 0;
      p2.appendChild(div);
    };

// Function Endgame Text Pop In
    function endgamePopIn() {
      endgameText.style.transitionDuration = '200ms';
      endgameText.style.transitionTimingFunction = 'ease-in';
      endgameText.style.opacity = 1;
      endgameText.style.fontSize = 2 * h + 'px';
      endgameText.style.left = 1 * w + 'px';
      endgameText.style.top = 3 * h + 'px';
      endgameText.style.width = 14 * w + 'px';
      endgameText.style.height = 3 * h + 'px';
    };

// Function Endgame Text Fly Out
    function endgameFlyOut() {
      endgameText.style.left = 16 * h + 'px';
      setTimeout(() => { endgameText.remove() }, 2000);
    };

// Function Increase Difficulty On Next Play
    function makeHarder() {
      trackLength += 0.1;
      if (enemySpacing > 0.005) {
        enemySpacing -= 0.001;
      };
      if (maxSpeed < 200) {
        maxSpeed += 10;
        enemySpeed += 5;
      };
    };


/////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  MASTER RUNTIME STACKS  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////////////

// Global Constant Declarations
    const horizon = 3 * h;
    const runTimeTotal = 60;
    const minSpeed = 10;
    const startSpeed = 65;
    const drawDistScale = 7500;
    const treeSpacing = 0.004;
    const laneSpacing = 0.005;

// Global Difficulty Variable Initial States
    let trackLength = 1.5;
    let maxSpeed = 120;
    if (mobile) {
      maxSpeed = 100;
    };
    let enemySpeed = 35;
    let enemySpacing = 0.01;

// Global Variable Initial States
    let tStamp = 0;
    let t = 0;
    let speed = startSpeed;
    let speedInput = false;
    let splashState = true;
    let finishLine = false;
    let finished = false;

// Initialization Functions Master Stack
    if (mobile) {
      showMobileGamebox();
    };
    p3.style.backgroundColor = '#000000';
    p3.style.opacity = 0.5;
    buildGamePage();
    makeBackplane();
    makeSky();
    makePlayerCar(p5);
    makeSplashElements();
    window.onload = () => { splash() };

// Function Splash Master Stack
    function splash() {
      titleFlyIn();
      setTimeout(() => { playButtonAppear() }, 1200);
      playButton.addEventListener('click', togglePlay);
    };

// Function Clear Splash Master Stack
    function togglePlay() {
      playButton.removeEventListener('click', togglePlay);
      initializePlayerCar();
      titleFlyOut();
      playButtonExplode();
      makeHud();
      tutorial();
    };

// Function Tutorial Master Stack
    function tutorial() {
      makeTutorial();
      setTimeout(() => { tutorialAppear() }, 200);
    };

// Function Initialize Gameplay Master Stack
    function initializeGamePlay() {
      resetClock();
      resetDistance();
      speed = startSpeed;
      lastEnemyD = 0;
      finishLine = false;
      finished = false;
      document.removeEventListener('keydown', initializeGamePlay);
      par.removeEventListener('click', initializeGamePlay);
      tutorialRemove();
      splashState = false;
      p3.style.transitionDuration = '2s';
      setTimeout(() => { p3.style.opacity = 0 }, 500);
      addInputListener();
      setTimeout(() => {
        hudFadeIn();
        resetClock();
        resetDistance();
      }, 500);
      if (mobile) {
        setTimeout( () => { speedUp = true }, 1000);
      };
    };

// Function Gameplay Runtime Master Stack
    function gameStack(timestamp, t) {
      if (!finished) {
        if (distanceRemain > 0 && runTimeRemain > 0) {
          refreshHud(t);
          makeEnemies(t);
          if (distanceRemain < 0.038 && !finishLine) {
            makeFinish(t);
          };
        } else if (distanceRemain <= 0 || runTimeRemain <= 0) {
          endgame();
        };
      };
    };

// Function Endgame Master Stack
    function endgame() {
      finished = true;
      removeInputListener();
      speedInput = false;
      speedUp = false;
      speedDown = false;
      hudFadeOut();
      if (distanceRemain > 0) {
        makeEndgameBox('You Lose!');
      } else {
        makeEndgameBox('You Win!');
        makeHarder();
      };
      makePlayButton(p1, 'playButton', 'More?', 'yellow');
      playButton.addEventListener('click', replay);
      setTimeout(() => {
        p3.style.transitionDuration = '1s';
        p3.style.backgroundColor = '#000000';
        p3.style.opacity = 0.5;
        endgamePopIn();
      }, 100);
      setTimeout(() => { playButtonAppear() }, 500);
    };

// Function Replay Master Stack
    function replay() {
      playButton.removeEventListener('click', replay)
      endgameFlyOut();
      playButtonExplode();
      initializeGamePlay();
    };


//////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  MASTER DRAW STACKS  //  //  //  //  //  //  //  //
//////////////////////////////////////////////////////////////////////////////////

// Function Refresh Global Variables
    function globalRefresh(timestamp, t) {
      setClock(timestamp);
      setSpeed(t);
      setDistance(timestamp);
    };

// Function Redraw All Moving Elements
    function redraw(timestamp, t) {
      globalRefresh(timestamp, t);
      bgElements(t);
      if (!splashState) {
        gameStack(timestamp, t);
      };
      let movers = document.querySelectorAll('.moving');
      for (let i = 0; i < movers.length; i++) {
        moveBox(movers[i], t);
      };
    };

// Function Master Animation Frame Stack
    function drawGame(timestamp) {
      tStamp = timestamp;
      t = timestamp / 16;
      redraw(timestamp, t);
      window.requestAnimFrame(drawGame);
    };

// rAF Initialize
    window.requestAnimFrame(drawGame);
