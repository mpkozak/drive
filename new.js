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
    let width, height, wUnit, hUnit, horizon;

// Static Image Defs
    const player = document.querySelector('#player-car');
    const ps = player.style;
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
      width = gamebox.clientWidth;
      height = gamebox.clientHeight;
      wUnit = width / 16;
      hUnit = height / 9;
      horizon = hUnit * 3;
      c1.width = c2.width = c3.width = width;
      c1.height = c2.height = c3.height = height;
    };
    // window.addEventListener('resize', () => setSize());
    setSize();

// Initialize Player Car
    const initPlayer = () => {
      ps.top = 7 * hUnit + 'px';
      ps.transform = `translate(${6 * wUnit}px, ${2 * hUnit}px)`;
      setTimeout(() => {
        ps.opacity = 1;
        ps.transform = `translate(${6 * wUnit}px, 0)`
      }, 1000);
    }




initPlayer()


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


    let playerLane = 2;


    const moveLeft = () => {
      if (playerLane > 1) {
        playerLane -= 1;
        ps.transform = `translateX(${wUnit * (playerLane * 4 - 2)}px)`
      };
    };

    const moveRight = () => {
      if (playerLane < 3) {
        playerLane += 1;
        ps.transform = `translateX(${wUnit * (playerLane * 4 - 2)}px)`
      };
    };

    const jump = () => {
      // let top = parseInt(playerCar.style.top.replace(/px/g, ''));
      if (player.classList[0] !== 'jump') {
        player.classList.add('jump');
        ps.transform = `translate(${wUnit * (playerLane * 4 - 2)}px, -${hUnit * 2}px)`;
        setTimeout(() => ps.transform = `translate(${wUnit * (playerLane * 4 - 2)}px, 0)`, 250);
        setTimeout(() => player.classList.remove('jump'), 500);
      };
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
    constructor(tInit, ctx, img, width, aspect, xStart, xEnd, type) {
      this.type = type;
      this.ctx = ctx;
      this.img = img;
      this.width = width;
      this.height = width * aspect;
      this.xStart = xStart;
      this.yStart = 3;
      this.xRange = xEnd - xStart;
      this.yRange = 6;
      this.y = horizon;
      this.dist = 0;
      this.t = tInit;
    };
    move() {
      const moveSpeed = (this.type === 'enemy') ? (speed - enemySpeed) : speed;
      const moveDistance = this.dist + moveSpeed * (tStamp - this.t) / 16;
      this.dist = moveDistance;
      this.t = tStamp;
      const adv = Math.pow(moveDistance, 3) / distExp;
      const x = Math.round((this.xStart + adv * this.xRange) * wUnit);
      const y = Math.round((this.yStart + adv * this.yRange) * hUnit);
      const w = Math.round(adv * this.width * wUnit);
      const h = Math.round(adv * this.height * hUnit);
      // this.ctx.drawImage(this.img, x, y, w, h);
      this.ctx.fillRect(x, y, w, h)
      this.y = y;
    };
  };


    const treeSpacing = 0.004;
    const laneSpacing = 0.005;
    const enemySpacing = .01;
    let lastTree = 0;
    let lastLane = 0;
    let lastEnemy = 0;

    let trackLength = 1.5;
    let distScale = trackLength * 5000;
    let distExp = Math.pow(distScale, 3);
    let bg = [];
    let enemies = [];


// Make Trees
    const makeTrees = () => {
      if (distance - lastTree >= treeSpacing) {
        bg.push(new MovingObject(tStamp, ctx3, tree, 5, 2, 6.25, -12, 'bg'));
        bg.push(new MovingObject(tStamp, ctx3, tree, 5, 2, 9.75, 22, 'bg'));
        lastTree = distance;
      };
    };

// Make Lanes
    const makeLanes = () => {
      if (distance - lastLane >= laneSpacing) {
        bg.push(new MovingObject(tStamp, ctx3, laneL, 2, 1, 7.5, 4.5, 'bg'));
        bg.push(new MovingObject(tStamp, ctx3, laneR, 2, 1, 8.5, 9.5, 'bg'));
        lastLane = distance;
      };
    };

// Make Enemies
    const makeEnemies = () => {
      if (distance >= lastEnemy + enemySpacing && speed > enemySpeed * 2) {
        const lane = Math.floor(Math.random() * 3) + 1;
        const img = enemyImg[Math.floor(Math.random() * 5)];
        switch (lane) {
          case 1:
            enemies.push(new MovingObject(tStamp, ctx3, img, 6, .5, 7, -.5, 'enemy'));
            break;
          case 2:
            enemies.push(new MovingObject(tStamp, ctx3, img, 6, .5, 8, 5, 'enemy'));
            break;
          case 3:
            enemies.push(new MovingObject(tStamp, ctx3, img, 6, .5, 9, 10.5, 'enemy'));
            break;
        };
        lastEnemy = distance;
      };
    };

// Refresh Background
    const refreshBg = () => {
      makeTrees();
      makeLanes();
      makeEnemies();
    };


//////////////////////////////////////////////////////////////////////////////////
//  //  //  //  //  //  //  //  MASTER DRAW STACKS  //  //  //  //  //  //  //  //
//////////////////////////////////////////////////////////////////////////////////

    let frame = 0;
    let tStamp = 0;

    let timeTotal = 60;
    let maxSpeed = 120;
    let minSpeed = 10;
    let enemySpeed = maxSpeed / 3;
    let speed = 60;
    const cutoff = 7 * hUnit;


// Function Refresh Global Variables
    const refresh = () => {
      refreshClock();
      refreshSpeed();
      refreshDistance();
    };

// Function Redraw All Moving Elements
    const animate = () => {
      refreshBg();

      ctx1.clearRect(0, 0, width, height);
      ctx3.clearRect(0, 0, width, height);
      bg = bg.filter(a => a.y <= height);
      // bg.forEach(d => d.move());

      enemies = enemies.filter(a => a.y >= horizon * .9 && a.y <= height * 2);
      // enemies.forEach(d => {
      //   d.ctx = d.y >= cutoff ? ctx1 : ctx3;
      //   d.move();
      // })

      let eLength = enemies.length;
      for (let i = 0; i < eLength; i++) {
        const enemy = enemies[i];
        enemy.ctx = enemy.y >= cutoff ? ctx1 : ctx3;
        enemy.move();
      }

      let bLength = bg.length;
      for (let i = 0; i < bLength; i++) {
        bg[i].move();
      }

      // let bgLength = bg.length
      // for (let i = 0; i < bgLength; i++) {
      //   bg[i].move();
      // }
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


