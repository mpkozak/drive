///////////////////////////////////////////////////////////////////////////////////
// // *** NOT MY CODE *** // // *** NOT MY CODE *** // // *** NOT MY CODE *** // //
///////////////////////////////////////////////////////////////////////////////////

// requestAnimationFrame Polyfill  ---  Adapted From https://gist.github.com/amsul/3691721
    window.requestAnimFrame = (function() {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        }
      );
    })();

// Function Detect Mobile Browser  ---  Adapted From https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    function isMobile() {
      if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
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
      let mobileW = Math.max(screen.availWidth, screen.availHeight);
      let mobileH = Math.min(screen.availWidth, screen.availHeight);
      displayUnit = Math.floor(Math.min(mobileW / 16, mobileH / 9));
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
      mobile ? makeMobileLayout() : makeDesktopLayout();
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

// Function Overlay Dark
    function overlayDark(ms) {
      let opacity = Number(p3.style.opacity);
      p3.style.transitionDuration = ms + 'ms';
      p3.style.backgroundColor = '#000000';
      opacity ? p3.style.opacity = 0 : p3.style.opacity = 0.5;
    };


/////////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  SCREEN ROTATION FUNCTIONS  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////////////////

// Function Initialize Mobile Rotation Splash Screen + Event Listener
    function mobileRotateSplash() {
      if (window.innerWidth < window.innerHeight) {
        rotationHandler();
      };
      window.addEventListener('orientationchange', rotationHandler);
    };

// Function Rotation Handler
    function rotationHandler() {
      if (Math.abs(window.orientation) === 90) {
        par.style.display = 'block';
        rotate.style.display = 'none';
      } else {
        rotate.style.display = 'block';
        par.style.display = 'none';
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


////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  SPLASH FUNCTIONS  //  //  //  //  //  //  //  //
////////////////////////////////////////////////////////////////////////////////

// Function Make Title Text Boxes
    function makeTitleBox(gamePlane, id, text, top, width, height) {
      let div = document.createElement('div');
      div.id = id;
      div.classList.add('title');
      div.innerText = text;
      div.style.fontSize = height * h + 'px';
      div.style.left = -10 * w + 'px';
      div.style.top = top * h + 'px';
      div.style.width = width * w + 'px';
      div.style.height = height * h + 'px';
      gamePlane.appendChild(div);
      return div;
    };

// Function Make Play Button
    function makePlayButton(gamePlane, id, text, bgColor) {
      let button = document.createElement('button');
      button.id = id;
      button.classList.add('button');
      button.style.backgroundColor = bgColor;
      button.style.borderRadius = w / 2 + 'px';
      button.innerText = text;
      button.style.left = 8 * w + 'px';
      button.style.top = 7.5 * h + 'px';
      gamePlane.appendChild(button);
      return button;
    };

// Function Titles Fly In
    function titleFlyIn(title) {
      let titles = title.split(' ').map((t, i) => makeTitleBox(p2, `title${i}`, t, (i * 2), 10, 2))
      Array.from(titles).map((t, i) => { setTimeout(() => { t.style.left = 3 * h + 'px' }, (i * 200)) });
    };

// Function Titles Fly Out + Removed
    function titleFlyOut() {
      let titles = document.querySelectorAll('.title');
      Array.from(titles).map((t, i) => { setTimeout(() => { t.style.left = 16 * h + 'px' }, (i * 200)) });
      setTimeout(() => { Array.from(titles).map(t => t.remove()) }, 2000);
    };

// Function Make Play Button Appear
    function playButtonAppear(gamePlane, id, text, bgColor, delay, fn) {
      let playButton = makePlayButton(gamePlane, id, text, bgColor);
      setTimeout(() => {
        playButton.style.left = 6.5 * w + 'px';
        playButton.style.top = 7 * h + 'px';
        playButton.style.width = 3 * w + 'px';
        playButton.style.height = 1 * h + 'px';
        playButton.style.fontSize = h / 1.5 + 'px';
        playButton.style.opacity = 0.8;
        playButton.addEventListener('click', fn);
      }, delay)
    };

// Function Explode Play Button + Remove
    function playButtonExplode(fn) {
      playButton.style.borderRadius = w + 'px';
      playButton.style.left = 5 * w + 'px';
      playButton.style.top = 6.5 * h + 'px';
      playButton.style.width = 6 * w + 'px';
      playButton.style.height = 2 * h + 'px';
      playButton.style.fontSize = (h / 1.5) * 2 + 'px';
      playButton.style.opacity = 0;
      playButton.removeEventListener('click', fn);
      setTimeout(() => { playButton.remove() }, 300);
    };

// Function Create Player Car
    function makePlayerCar() {
      let div = document.createElement('div');
      div.style.transitionDuration = '1s';
      div.style.left = 6 * w + 'px';
      div.style.top = 9 * h + 'px';
      div.style.width = 4 * w + 'px';
      div.style.height = 2 * h + 'px';
      div.id = 'playerCar';
      p5.appendChild(div);
      return div;
    };

// Function Slide Player Car Into Gamefield
    function initializePlayerCar() {
      makePlayerCar();
      setTimeout(() => {playerCar.style.top = 7 * h + 'px'}, 10);
      setTimeout(() => { playerCar.style.transitionDuration = '250ms' }, 1000);
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
      let keyMap = document.querySelector('.key-map');
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
      let swipeMap = document.querySelector('.swipe-map');
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
      tutorial.remove();
      p2.appendChild(tutorial);
      setTimeout(() => { par.addEventListener('click', initializeGamePlay) }, 100);
    };

// Function Tutorial Appear
    function tutorialAppear(ms) {
      mobile ? drawTutorialMobile() : drawTutorialDesktop();
      tutorial.style.transitionDuration = ms + 'ms';
      setTimeout(() => { tutorial.style.opacity = 1 }, 100);
    };

// Function Tutorial Remove
    function tutorialRemove(ms) {
      tutorial.style.transitionDuration = ms + 'ms';
      tutorial.style.opacity = 0;
      setTimeout(() => { tutorial.remove() }, ms * 2);
      document.removeEventListener('keydown', initializeGamePlay);
      par.removeEventListener('click', initializeGamePlay);
    };


/////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  HUD FUNCTIONS  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////

// Function Make Arbitrary HUD Box
    function makeHudBox(gamePlane, id, left, top, width, height, textAlign, fontScale) {
      let div = document.createElement('div');
      div.id = id;
      div.classList.add('HUD');
      div.style.left = left * w + 'px';
      div.style.top = top * h + 'px';
      div.style.width = width * w + 'px';
      div.style.height = height * h + 'px';
      gamePlane.appendChild(div);
      let textBox = document.createElement('div');
      textBox.style.textAlign = textAlign;
      textBox.id = id + 'Text';
      div.appendChild(textBox);
      textBox.style.fontSize = h * fontScale + 'px';
    };

// Function Make Speed Needle
    function makeNeedle() {
      let div = document.createElement('div');
      div.style.position = 'absolute';
      div.id = 'needle';
      speedBox.appendChild(div);
    };

// Function HUD Boxes Fade + Slide In
    function hudFadeIn() {
      Array.from(document.querySelectorAll('.HUD')).map(t => { t.style.opacity = 1 });
      speedBox.style.left = 0 * w + 'px';
      timeBox.style.top = 1 * h + 'px';
      distBox.style.left = 13 * w + 'px';
    };

// Function HUD Boxes Fade + Slide Out
    function hudFadeOut() {
      Array.from(document.querySelectorAll('.HUD')).map(t => { t.style.opacity = 0 });
      speedBox.style.left = -3 * w + 'px';
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
//legacy supported
      needle.style.webkitTransform = `rotate(${rotation}deg)`;
      needle.style.mozTransform = `rotate(${rotation}deg)`;
      needle.style.msTransform = `rotate(${rotation}deg)`;
      needle.style.oTransform = `rotate(${rotation}deg)`;
// modern browser supported
      needle.style.transform = `rotate(${rotation}deg)`;
// break
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
    function setClock(tStamp) {
      runTimeElapsed = Math.floor(tStamp / 1000) - runTimeStart;
      runTimeRemain = runTimeTotal - runTimeElapsed;
    };


///////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  SPEED FUNCTIONS  //  //  //  //  //  //  //  //
///////////////////////////////////////////////////////////////////////////////

// Variable Initial States
    let speedUp = false;
    let speedDown = false;

// Function Refresh Speed
    function setSpeed() {
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
    function setDistance(tStamp) {
      let interval = (tStamp - lastTimeDistanceSet) / 1000;
      distance += interval * (speed / 3600);
      distanceRemain = trackLength - distance;
      lastTimeDistanceSet = tStamp;
    };


/////////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  PLAYER MOVEMENT FUNCTIONS  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////////////////

// Function Move Left
    function moveLeft() {
      let left = parseInt(playerCar.style.left.replace(/px/g, ''));
      (left >= w * 6) ? (playerCar.style.left = left - (w * 4) + 'px') : null;
    };

// Function Move Right
    function moveRight() {
      let left = parseInt(playerCar.style.left.replace(/px/g, ''));
      (left <= w * 6) ? (playerCar.style.left = left + (w * 4) + 'px') : null;
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

// Class Moving Object
    class MovingObject {
      constructor(timestamp, gamePlane, type, imgSrc, startL, endL, aspect, startW, endW, distScale) {
        this.timestamp = timestamp;
        this.gamePlane = gamePlane;
        this.type = type;
        this.imgSrc = imgSrc;
        this.startL = startL;
        this.endL = endL;
        this.aspect = aspect;
        this.startW = startW;
        this.endW = endW;
        this.leftMove = (endL - startL) * w;
        this.topMove = fullH - horizon;
        this.widthMove = (endW - startW) * w;
        this.heightMove = (endW / aspect) * h;
        this.distScale = distScale;
        this.dist = 0;
        this.top = 0;
        this.node = this.make();
        this.canRemove = false;
      };
      make() {
        let div = document.createElement('div');
        div.style.backgroundImage = this.imgSrc;
        div.classList.add(this.type, 'moving');
        this.gamePlane.appendChild(div);
        return div;
      };
      move(t) {
        let moveSpeed = (this.type === 'enemy') ? (speed - enemySpeed) : speed;
        let distance = this.dist + moveSpeed * (t - this.timestamp);
        let rate = Math.pow(distance, 5) / Math.pow(this.distScale, 5);
        this.timestamp = t;
        this.dist = distance;
        this.node.style.left = (this.startL * w) + (this.leftMove * rate) + 'px';
        this.node.style.top = horizon + (this.topMove * rate) + 'px';
        this.node.style.width = (this.startW * w) + (this.widthMove * rate) + 'px';
        this.node.style.height = (this.heightMove * rate) + 'px';
        this.top = parseInt(this.node.style.top.replace(/px/g, ''));
      };
      clear() {
        this.node.remove();
        this.canRemove = true;
      };
    };

// Class Enemy
    class Enemy extends MovingObject {
      constructor(timestamp, gamePlane, type, imgSrc, startL, endL, aspect, startW, endW, distScale) {
        super(timestamp, gamePlane, type, imgSrc, startL, endL, aspect, startW, endW, distScale);
      };
      deltaZ() {
        if (!this.canRemove) {
          if (this.top > 7 * h) {
            this.node.remove();
            p4.appendChild(this.node);
          } else {
            this.node.remove();
            p6.appendChild(this.node);
          };
        };
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
    function makeTrees() {
      if (bgDist >= lastTreeD + treeSpacing) {
        movers.push(new MovingObject(t, p7, 'treeL', `url('img/tree.png')`, 6.25, -12.5, 0.5, 0, 6, drawDistScale));
        movers.push(new MovingObject(t, p7, 'treeR', `url('img/tree.png')`, 9.75, 22.5, 0.5, 0, 6, drawDistScale));
        lastTreeD = bgDist;
      };
    };

// Function Make Lanes
    function makeLanes() {
      if (bgDist >= lastLaneD + laneSpacing) {
        movers.push(new MovingObject(t, p7, 'laneL', `url('img/laneL.png')`, 7.5, 4.5, 1, 0, 2, drawDistScale));
        movers.push(new MovingObject(t, p7, 'laneR', `url('img/laneR.png')`, 8.5, 9.5, 1, 0, 2, drawDistScale));
        lastLaneD = bgDist;
      };
    };

// Function Background Distance Refresh
    function bgDistRefresh(tStamp) {
      let interval = (tStamp - lastTimeBgDistSet) / 1000;
      bgDist += interval * (speed / 3600);
      lastTimeBgDistSet = tStamp;
    };

// Function Master Background Stack
    function bgElements(tStamp) {
      bgDistRefresh(tStamp);
      makeTrees();
      makeLanes();
    };


////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  ENEMY DRAW FUNCTIONS  //  //  //  //  //  //  //  //
////////////////////////////////////////////////////////////////////////////////////

// Variable Initial States
    let lastEnemyD = 0;

// Function Make Enemies
    function makeEnemies() {
      if (distance >= lastEnemyD + enemySpacing && speed > enemySpeed * 2) {
        let lane = Math.floor(Math.random() * 3) + 1;
        let color = Math.floor(Math.random() * 5) + 2;
        switch(lane) {
          case 1:
            enemies.push(new Enemy(t, p6, 'enemy', `url('img/car${color}.png')`, 7, -0.5, 2, 0, 6, drawDistScale));
          break;
          case 2:
            enemies.push(new Enemy(t, p6, 'enemy', `url('img/car${color}.png')`, 8, 5, 2, 0, 6, drawDistScale));
          break;
          case 3:
            enemies.push(new Enemy(t, p6, 'enemy', `url('img/car${color}.png')`, 9, 10.5, 2, 0, 6, drawDistScale));
          break;
        };
        lastEnemyD = distance;
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
    function checkForHit(object) {
      getPlayerHitSpot();
      let hitDistLeft = Math.abs(getEnemyHitSpotLeft(object.node) - playerHitSpotLeft);
      let hitDistTop = Math.abs(getEnemyHitSpotTop(object.node) - playerHitSpotTop);
      if (hitDistTop < h / 2 && hitDistLeft < w / 4 && playerCar.classList[0] !== 'jump') {
        collisionEvent(object);
      };
    };

// Function Collision Event
    function collisionEvent(object) {
      speed = enemySpeed * 0.9;
      setTimeout(() => {
        object.node.remove();
        object.canRemove = true;
      }, 100);
      !finished ? overlayFlash(100) : null;
    };

// Function Overlay Flash
    function overlayFlash(ms) {
      p3.style.opacity = 0;
      p3.style.transitionDuration = ms + 'ms';
      p3.style.backgroundColor = '#FFFFFF';
      p3.style.opacity = 0.5;
      setTimeout(() => { p3.style.opacity = 0 }, ms);
    };


/////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  ENDGAME FUNCTIONS  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////////

// Function Make Finish Line
    function makeFinish() {
      movers.push(new MovingObject(t, p7, 'finish', `url('img/finish.png')`, 6.5, 1.875, 12, 3, 12.25, drawDistScale));
      finishLine = true;
    };

// Function Make Endgame Text Box
    function makeEndgameBox(text) {
      let div = document.createElement('div');
      div.id = 'endgameText';
      div.classList.add('endgame');
      div.innerText = text;
      div.style.left = 8 * w + 'px';
      div.style.top = 4.5 * h + 'px';
      p2.appendChild(div);
    };

// Function Endgame Text Pop In
    function endgamePopIn() {
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
      runTimeTotal += 5;
      if (enemySpacing > 0.005) {
        enemySpacing -= 0.0005;
      };
      if (maxSpeed < 200) {
        maxSpeed += 5;
      };
    };


/////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  MASTER RUNTIME STACKS  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////////////

// Global Constant Declarations
    const horizon = 3 * h;
    const minSpeed = 10;
    const startSpeed = 65;
    const drawDistScale = 7500;
    const treeSpacing = 0.004;
    const laneSpacing = 0.005;

// Global Difficulty Variable Initial States
    let runTimeTotal = 60;
    let trackLength = 1.5;
    let maxSpeed = mobile ? 100 : 120;
    let enemySpeed = maxSpeed / 3;
    let enemySpacing = 0.01;

// Global Variable Initial States
    let tStamp = 0;
    let t = 0;
    let movers = [];
    let enemies = [];
    let speed = startSpeed;
    let speedInput = false;
    let tutorial = false;
    let splashState = true;
    let finishLine = false;
    let finished = false;

// Initialization Functions Master Stack
    mobile ? mobileRotateSplash() : null;
    buildGamePage();
    overlayDark(0);
    titleFlyIn('Drive My Car');
    playButtonAppear(p1, 'playButton', 'Play!', '#FFFF0C', 1000, togglePlay);

// Function Clear Splash Master Stack
    function togglePlay() {
      playButtonExplode(togglePlay);
      initializePlayerCar();
      titleFlyOut();
      makeHud();
      tutorialAppear(1000);
    };

// Function Initialize Gameplay Master Stack
    function initializeGamePlay() {
      resetClock();
      resetDistance();
      splashState = false;
      speed = startSpeed;
      lastEnemyD = 0;
      finishLine = false;
      finished = false;
      tutorialRemove(500);
      overlayDark(2500);
      mobile ? addSwipeListener() : addKeyListener();
      setTimeout(() => {
        hudFadeIn();
        resetClock();
        resetDistance();
      }, 100);
      mobile ? speedUp = true : null;
    };

// Function Gameplay Runtime Master Stack
    function gameStack(t) {
      if (distanceRemain > 0 && runTimeRemain > 0) {
        refreshHud();
        makeEnemies();
        if (distanceRemain < 0.038 && !finishLine) {
          makeFinish();
        };
      } else if (distanceRemain <= 0 || runTimeRemain <= 0) {
        endgame();
      };
    };

// Function Endgame Master Stack
    function endgame() {
      finished = true;
      mobile ? removeSwipeListener() : removeKeyListener();
      speedInput = false;
      speedUp = false;
      speedDown = false;
      hudFadeOut();
      overlayDark(1000);
      (distanceRemain > 0) ? makeEndgameBox('You Lose!') : (makeEndgameBox('You Win!'), makeHarder());
      endgamePopIn();
      playButtonAppear(p1, 'playButton', 'More?', 'yellow', 500, replay);
    };

// Function Replay Master Stack
    function replay() {
      endgameFlyOut();
      playButtonExplode(replay);
      initializeGamePlay();
    };


//////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  MASTER DRAW STACKS  //  //  //  //  //  //  //  //
//////////////////////////////////////////////////////////////////////////////////

// Function Refresh Global Variables
    function globalRefresh(tStamp) {
      setClock(tStamp);
      setSpeed();
      setDistance(tStamp);
    };

// Function Redraw All Moving Elements
    function redraw(tStamp) {
      globalRefresh(tStamp);
      bgElements(tStamp);
      if (!splashState && !finished) {
        gameStack(t);
      };
      movers.map((m, i) => {
        m.canRemove ? movers.splice(i, 1) : null
        m.move(t);
        if (m.top > 9 * h) {
          m.clear();
        };
      });
      enemies.map((m, i) => {
        m.canRemove ? enemies.splice(i, 1) : null
        m.move(t);
        if (m.top > 6 * h) {
          m.deltaZ();
          checkForHit(m);
        } else if (m.top > 18 * h) {
          m.clear();
        };
      });
    };

// Function Master Animation Frame Stack
    function drawGame(timestamp) {
      tStamp = timestamp;
      t++;
      redraw(tStamp, t);
      window.requestAnimFrame(drawGame);
    };

// rAF Initialize
    window.requestAnimFrame(drawGame);
