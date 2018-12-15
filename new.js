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
    const isMobile = () => {
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
    const mobile = isMobile();


/////////////////////////////////////////////////////////////////////////////////////////////
// // *** MY CODE *** \\ // *** MY CODE *** \\ // *** MY CODE *** \\ // *** MY CODE *** // //
/////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  INITIALIZATION STACK  //  //  //  //  //  //  //  //
////////////////////////////////////////////////////////////////////////////////////

// DOM Defs
    const gamebox = document.querySelector('#gamebox-parent');
    const overlay = document.querySelector('#p2')
    const c1 = document.querySelector('#c1');
    const c2 = document.querySelector('#c2');
    const c3 = document.querySelector('#c3');
    const ctx1 = c1.getContext('2d');
    const ctx2 = c2.getContext('2d');
    const ctx3 = c3.getContext('2d');
    let width, height, wUnit, hUnit;

// Static Image Defs
    const car1 = document.querySelector('.car1');
    const car2 = document.querySelector('.car2');
    const car3 = document.querySelector('.car3');
    const car4 = document.querySelector('.car4');
    const car5 = document.querySelector('.car5');
    const car6 = document.querySelector('.car6');
    const enemyImg = [car2, car3, car4, car5, car6];
    const laneL = document.querySelector('.laneL');
    const laneR = document.querySelector('.laneR');
    const tree = document.querySelector('.tree');

// Viewport Size Calibrate + Refresh
    const setSize = () => {
      width = gamebox.clientWidth / 2;
      height = gamebox.clientHeight / 2;
      wUnit = width / 16;
      hUnit = height / 9;
      c1.width = c2.width = c3.width = width;
      c1.height = c2.height = c3.height = height;
    };
    window.addEventListener('resize', () => setSize());
    setSize();









////////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  KEYBOARD EVENT FUNCTIONS  //  //  //  //  //  //  //  //
////////////////////////////////////////////////////////////////////////////////////////

// Key Down Handler
    const keyDownHandler = (e) => {
      const key = e.key;
      if (key === 'ArrowLeft') {
        moveLeft();
      } else if (key === 'ArrowRight') {
        moveRight();
      } else if (key === ' ') {
        jump();
      } else if (key === 'ArrowUp') {
        speedInput = true;
        speedUp = true;
      } else if (key === 'ArrowDown') {
        speedInput = true;
        speedDown = true;
      };
    };

// Key Up Handler
    const keyUpHandler = (e) => {
      const key = e.key;
      if (key === 'ArrowUp') {
        speedUp = false;
      } else if (key === 'ArrowDown') {
        speedDown = false;
      };
    };

// Add Key Listeners
    const addKeyListener = () => {
      document.addEventListener('keydown', keyDownHandler);
      document.addEventListener('keyup', keyUpHandler);
    };

// Remove Key Listeners
    const removeKeyListener = () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    };


/////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  PLAYER MOVE FUNCTIONS  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////////////

    const moveLeft = () => {
      console.log('move left')
    };

    const moveRight = () => {
      console.log('move right')
    };

    const jump = () => {
      console.log('jump')
    };




//////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  TIME FUNCTIONS  //  //  //  //  //  //  //  //
//////////////////////////////////////////////////////////////////////////////

// Variable Initial States
    let timeStart = 0;
    let timeElapsed = 0;
    let timeRemain = 0;

// Reset Clock
    const resetClock = () => {
      timeStart = Math.floor(tStamp / 1000);
    };

// Refresh Clock
    const refreshClock = () => {
      timeElapsed = Math.floor(tStamp / 1000) - timeStart;
      timeRemain = timeTotal - timeElapsed;
    };


///////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  SPEED FUNCTIONS  //  //  //  //  //  //  //  //
///////////////////////////////////////////////////////////////////////////////

// Variable Initial States
    let speedInput = false;
    let speedUp = false;
    let speedDown = false;

// Refresh Speed
    const refreshSpeed = () => {
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

// Reset Distance
    const resetDistance = () => {
      distance = 0;
      lastTimeDistanceSet = tStamp;
    };

// Refresh Distance
    const refreshDistance = () => {
      const interval = (tStamp - lastTimeDistanceSet) / 1000;
      distance += interval * (speed / 3600);
      distanceRemain = trackLength - distance;
      lastTimeDistanceSet = tStamp;
    };


/////////////////////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  OBJECT MOTION + SCALING FUNCTIONS  //  //  //  //  //  //  //  //
/////////////////////////////////////////////////////////////////////////////////////////////////

// Moving Object Class Prototype
  class MovingObject {
    constructor(dInit, tInit, ctx, img, width, aspect, xStart, xEnd, type) {
      this.type = type;
      this.tInit = tInit;
      this.dInit = dInit;
      this.ctx = ctx;
      this.img = img;
      this.width = width;
      this.height = width * aspect;
      this.xStart = xStart;
      this.yStart = 3;
      this.xRange = xEnd - xStart;
      this.yRange = 6;
      this.y = 0;
    };
    move() {
      // const offset = (this.type === 'enemy') ? ((tStamp - this.tInit) / 1000 / (enemySpeed * 1)) : 0;
      const offset = (this.type === 'enemy') ? (speed / enemySpeed) : 1;

      const elapsed = distance - (this.dInit) ;
      const adv = Math.pow(elapsed / (distScale/ offset), 4);
      const x = (this.xStart + adv * this.xRange) * wUnit;
      const y = (this.yStart + adv * this.yRange) * hUnit;
      const w = adv * this.width * wUnit;
      const h = adv * this.height * hUnit;
      this.ctx.drawImage(this.img, x, y, w, h);
      this.y = y;
      // if (this.type === 'enemy') console.log(offset)
    };
  };


    const distScale = .05;
    let movers = [];
    let treeSpacing = .005;
    let laneSpacing = .01;
    let lastTree = 0;
    let lastLane = 0;

// Make Trees
    const makeTrees = () => {
      if (distance - lastTree >= treeSpacing) {
        movers.push(new MovingObject(distance, tStamp, ctx3, tree, 4, 2, 6.25, -12.5, 'bg'));
        movers.push(new MovingObject(distance, tStamp, ctx3, tree, 4, 2, 9.75, 22.5, 'bg'));
        lastTree = distance;
      };
    };

// Make Lanes
    const makeLanes = () => {
      if (distance - lastLane >= laneSpacing) {
        movers.push(new MovingObject(distance, tStamp, ctx3, laneL, 3, 1, 7.5, 3.5, 'bg'));
        movers.push(new MovingObject(distance, tStamp, ctx3, laneR, 3, 1, 8.5, 9.5, 'bg'));
        lastLane = distance;
      };
    };

// Refresh Background
    const refreshBg = () => {
      makeTrees();
      makeLanes();
      makeEnemies();
    };




    let lastEnemy = 0;
    let enemySpacing = .02;
    let enemySpeed = 65;

// Make Enemies
    const makeEnemies = () => {
      if (distance >= lastEnemy + enemySpacing) {
        const lane = Math.floor(Math.random() * 3) + 1;
        const img = enemyImg[Math.floor(Math.random() * 5)];
        switch (lane) {
          case 1:
            movers.push(new MovingObject(distance, tStamp, ctx3, img, 6, .5, 7, -.5, 'enemy'));
            break;
          case 2:
            movers.push(new MovingObject(distance, tStamp, ctx3, img, 6, .5, 8, 5, 'enemy'));
            break;
          case 3:
            movers.push(new MovingObject(distance, tStamp, ctx3, img, 6, .5, 9, 10.5, 'enemy'));
            break;
        };
        lastEnemy = distance;
      };
    };








//////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  MASTER DRAW STACKS  //  //  //  //  //  //  //  //
//////////////////////////////////////////////////////////////////////////////////

    let frame = 0;
    let tStamp = 0;

    let timeTotal = 60;
    let maxSpeed = 120;
    let minSpeed = 10;
    let speed = 60;
    let trackLength = 1.5;


// Function Refresh Global Variables
    const refresh = () => {
      refreshClock();
      refreshSpeed();
      refreshDistance();
    };

// Function Redraw All Moving Elements
    const animate = () => {
      refreshBg();
      // ctx1.clearRect(0, 0, width, height);
      // ctx2.clearRect(0, 0, width, height);
      ctx3.clearRect(0, 0, width, height);
      movers = movers.filter(a => a.y < height)
      movers.forEach(d => {
        d.move();
      });
    };

// Function Master Animation Frame Stack
    const masterDraw = (timestamp) => {
      tStamp = timestamp;
      frame++;
      animate();
      refresh();
      window.requestAnimFrame(masterDraw);
    };

// rAF Initialize
    window.requestAnimationFrame(masterDraw);



addKeyListener();





// // Class Moving Object
//     class MovingObject {
//       constructor(timestamp, gamePlane, type, imgSrc, startL, endL, aspect, startW, endW, distScale) {
//         this.timestamp = timestamp;
//         this.gamePlane = gamePlane;
//         this.type = type;
//         this.imgSrc = imgSrc;
//         this.startL = startL;
//         this.endL = endL;
//         this.aspect = aspect;
//         this.startW = startW;
//         this.endW = endW;
//         this.leftMove = (endL - startL) * w;
//         this.topMove = fullH - horizon;
//         this.widthMove = (endW - startW) * w;
//         this.heightMove = (endW / aspect) * h;
//         this.distScale = distScale;
//         this.dist = 0;
//         this.top = 0;
//         this.node = this.make();
//         this.canRemove = false;
//       };
//       make() {
//         let div = document.createElement('div');
//         div.style.backgroundImage = this.imgSrc;
//         div.classList.add(this.type, 'moving');
//         this.gamePlane.appendChild(div);
//         return div;
//       };
//       move(t) {
//         let moveSpeed = (this.type === 'enemy') ? (speed - enemySpeed) : speed;
//         let distance = this.dist + moveSpeed * (t - this.timestamp);
//         let rate = Math.pow(distance, 5) / Math.pow(this.distScale, 5);
//         this.timestamp = t;
//         this.dist = distance;
//         this.node.style.left = (this.startL * w) + (this.leftMove * rate) + 'px';
//         this.node.style.top = horizon + (this.topMove * rate) + 'px';
//         this.node.style.width = (this.startW * w) + (this.widthMove * rate) + 'px';
//         this.node.style.height = (this.heightMove * rate) + 'px';
//         this.top = parseInt(this.node.style.top.replace(/px/g, ''));
//       };
//       clear() {
//         this.node.remove();
//         this.canRemove = true;
//       };
//     };
























// let t = 0;
// const draw = () => {
//   requestAnimationFrame(draw);
//   setSpeed()
//   c1ctx.clearRect(0, 0, width, height);
//   c2ctx.clearRect(0, 0, width, height);
//   c3ctx.clearRect(0, 0, width, height);
//   t += 1
//   const x = (t / 600) * width
//   const y = (t / 600) * height
//   const size = (t / 600)
//   c1ctx.drawImage(car1, x, y, w * 4 * size, h * 2 * size)
//   c2ctx.drawImage(car3, x *1.1, y, w * 4 * size, h * 2 * size)
//   c2ctx.drawImage(car6, x *.9, y, w * 4 * size, h * 2 * size)
// }

// window.requestAnimationFrame(draw)






// const toggleOverlay = (flash) => {
//   const style = overlay.style;
//   if (flash) {
//     style.transitionDuration = 100 + 'ms';
//     style.backgroundColor = '#FFFFFF';
//     style.opacity = 0.5;
//     setTimeout(() => style.opacity = 0, 100);
//   } else {

//   }
// }


// setInterval(() => toggleOverlay(), 1000)


