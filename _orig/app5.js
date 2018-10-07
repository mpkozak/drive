"use strict";
window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(a) {
      window.setTimeout(a, 1e3 / 60);
    }
  );
})();
function isMobile() {
  return (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  );
}
var mobile = isMobile(),
  body = document.querySelector("body"),
  header = document.querySelector(".header"),
  footer = document.querySelector(".footer"),
  par = document.getElementById("gamebox-parent"),
  p1 = document.getElementById("plane1"),
  p2 = document.getElementById("plane2"),
  p3 = document.getElementById("plane3"),
  p4 = document.getElementById("plane4"),
  p5 = document.getElementById("plane5"),
  p6 = document.getElementById("plane6"),
  p7 = document.getElementById("plane7"),
  p8 = document.getElementById("plane8"),
  p9 = document.getElementById("plane9"),
  p10 = document.getElementById("plane10"),
  displayUnit = Math.floor(
    Math.min(window.innerWidth / 18, window.innerHeight / 11)
  );
if (mobile) {
  var mobileW = Math.max(screen.availWidth, screen.availHeight),
    mobileH = Math.min(screen.availWidth, screen.availHeight);
  displayUnit = Math.floor(Math.min(mobileW / 16, mobileH / 9));
}
var fullW = 16 * displayUnit,
  fullH = 9 * displayUnit,
  w = fullW / 16,
  h = fullH / 9,
  gameboxPadding = Math.floor((window.innerHeight - fullH) / 2);
function buildGamePage() {
  (par.style.width = fullW + "px"),
    (par.style.height = fullH + "px"),
    mobile ? makeMobileLayout() : makeDesktopLayout();
}
function makeDesktopLayout() {
  (header.style.height = gameboxPadding + "px"),
    (footer.style.height = gameboxPadding + "px");
}
function makeMobileLayout() {
  (header.style.display = "none"), (footer.style.display = "none");
}
function makeBackplane() {
  (p8.style.backgroundImage = "url('img/backplane.png')"),
    (p8.style.backgroundSize = "100%"),
    (p8.style.backgroundRepeat = "no-repeat");
}
function makeSky() {
  setTimeout(function() {
    p10.style.backgroundColor = "#00BFFF";
  }, 1);
}
function makePlayerCar(a) {
  var b = document.createElement("div");
  (b.style.position = "absolute"),
    (b.style.backgroundImage = "url('img/car1.png')"),
    (b.style.backgroundSize = "100%"),
    (b.style.backgroundRepeat = "no-repeat"),
    (b.style.left = 6 * w + "px"),
    (b.style.top = 9 * h + "px"),
    (b.style.width = 4 * w + "px"),
    (b.style.height = 2 * h + "px"),
    (b.id = "playerCar"),
    a.appendChild(b);
}
function showMobileGamebox() {
  var a = document.getElementById("rotate");
  window.innerWidth < window.innerHeight
    ? ((par.style.display = "none"), (a.style.display = "block"))
    : ((a.style.display = "none"), (par.style.display = "block"));
}
window.addEventListener("orientationchange", rotationHandler);
function rotationHandler() {
  var a = Math.abs(window.orientation);
  90 === a
    ? ((rotate.style.display = "none"), (par.style.display = "block"))
    : ((par.style.display = "none"), (rotate.style.display = "block"));
}
function keyDownHandler(a) {
  38 === a.keyCode
    ? ((speedInput = !0), (speedUp = !0))
    : 40 === a.keyCode
      ? ((speedInput = !0), (speedDown = !0))
      : 37 === a.keyCode
        ? moveLeft()
        : 39 === a.keyCode
          ? moveRight()
          : 32 === a.keyCode && jump();
}
function keyUpHandler(a) {
  38 === a.keyCode ? (speedUp = !1) : 40 === a.keyCode && (speedDown = !1);
}
function addKeyListener() {
  document.addEventListener("keydown", keyDownHandler),
    document.addEventListener("keyup", keyUpHandler);
}
function removeKeyListener() {
  document.removeEventListener("keydown", keyDownHandler),
    document.removeEventListener("keyup", keyUpHandler);
}
var xStart = 0,
  xEnd = 0,
  deltaX = 0,
  yStart = 0,
  yEnd = 0,
  deltaY = 0;
function touchStart(a) {
  a.preventDefault(),
    (xStart = a.changedTouches[0].screenX),
    (yStart = a.changedTouches[0].screenY);
}
function touchEnd(a) {
  a.preventDefault(),
    (xEnd = a.changedTouches[0].screenX),
    (yEnd = a.changedTouches[0].screenY),
    (deltaX = Math.abs(xEnd - xStart)),
    (deltaY = Math.abs(yEnd - yStart)),
    swipeHandler();
}
function swipeHandler() {
  deltaX > deltaY && xEnd < xStart
    ? moveLeft()
    : deltaX > deltaY && xEnd > xStart
      ? moveRight()
      : deltaX < deltaY && yEnd < yStart && jump();
}
function addSwipeListener() {
  par.addEventListener("touchstart", touchStart),
    par.addEventListener("touchend", touchEnd);
}
function removeSwipeListener() {
  par.removeEventListener("touchstart", touchStart),
    par.removeEventListener("touchend", touchEnd);
}
function addInputListener() {
  mobile ? addSwipeListener() : addKeyListener();
}
function removeInputListener() {
  mobile ? removeSwipeListener() : removeKeyListener();
}
function makeTitleBox(a, b, c, d, e, f) {
  var g = document.createElement("div");
  (g.id = b),
    g.classList.add("title"),
    (g.style.position = "absolute"),
    (g.style.transitionDuration = "1s"),
    (g.style.transitionTimingFunction = "ease-in-out"),
    (g.innerText = c),
    (g.style.textShadow = "5px 5px 5px #222222"),
    (g.style.fontFamily = "'Faster One', Futura, sans-serif"),
    (g.style.color = "#FB0006"),
    (g.style.fontSize = f * h + "px"),
    (g.style.left = -10 * w + "px"),
    (g.style.top = d * h + "px"),
    (g.style.width = e * w + "px"),
    (g.style.height = f * h + "px"),
    a.appendChild(g);
}
function makePlayButton(a, b, c, d) {
  var e = document.createElement("button");
  (e.id = b),
    e.classList.add("button"),
    (e.style.position = "absolute"),
    (e.style.transitionDuration = "250ms"),
    (e.style.transitionTimingFunction = "ease-in"),
    (e.style.backgroundColor = d),
    (e.style.boxShadow = "5px 5px 5px #222222"),
    (e.style.border = "1px solid #000000"),
    (e.style.borderRadius = w / 2 + "px"),
    (e.innerText = c),
    (e.style.fontFamily = "'Faster One', Futura, sans-serif"),
    (e.style.opacity = 0),
    (e.style.fontSize = 0),
    (e.style.left = 8 * w + "px"),
    (e.style.top = 7.5 * h + "px"),
    (e.style.width = 0),
    (e.style.height = 0),
    a.appendChild(e);
}
function makeSplashElements() {
  makeTitleBox(p2, "title1", "Drive", 0, 10, 2),
    makeTitleBox(p2, "title2", "My", 2, 10, 2),
    makeTitleBox(p2, "title3", "Car", 4, 10, 2),
    makePlayButton(p1, "playButton", "Play!", "#FFFF0C");
}
function titleFlyIn() {
  (title1.style.left = 3 * h + "px"),
    setTimeout(function() {
      title2.style.left = 3 * h + "px";
    }, 200),
    setTimeout(function() {
      title3.style.left = 3 * h + "px";
    }, 400);
}
function titleFlyOut() {
  (title1.style.left = 16 * h + "px"),
    setTimeout(function() {
      title2.style.left = 16 * h + "px";
    }, 200),
    setTimeout(function() {
      title3.style.left = 16 * h + "px";
    }, 400),
    setTimeout(function() {
      title1.remove(), title2.remove(), title3.remove();
    }, 2e3);
}
function playButtonAppear() {
  (playButton.style.left = 6.5 * w + "px"),
    (playButton.style.top = 7 * h + "px"),
    (playButton.style.width = 3 * w + "px"),
    (playButton.style.height = 1 * h + "px"),
    (playButton.style.fontSize = h / 1.5 + "px"),
    (playButton.style.opacity = 0.8);
}
function playButtonExplode() {
  (playButton.style.borderRadius = w + "px"),
    (playButton.style.left = 5 * w + "px"),
    (playButton.style.top = 6.5 * h + "px"),
    (playButton.style.width = 6 * w + "px"),
    (playButton.style.height = 2 * h + "px"),
    (playButton.style.fontSize = 2 * (h / 1.5) + "px"),
    (playButton.style.opacity = 0),
    setTimeout(function() {
      playButton.remove();
    }, 300);
}
function initializePlayerCar() {
  (playerCar.style.transitionDuration = "1s"),
    (playerCar.style.transitionTimingFunction = "ease-in-out"),
    (playerCar.style.top = 7 * h + "px"),
    setTimeout(function() {
      playerCar.style.transitionDuration = "250ms";
    }, 1e3);
}
function drawTutorialDesktop() {
  var a = document.getElementById("instructions-desktop");
  (a.style.left = 1 * w + "px"),
    (a.style.top = h / 2 + "px"),
    (a.style.width = 14 * w + "px"),
    (a.style.fontSize = h / 2 + "px");
  var b = document.querySelector(".key-map");
  (b.style.backgroundColor = "rgba(1,1,1,0.2)"),
    (b.style.padding = w / 5 + "px"),
    (b.style.left = 5.55 * w + "px"),
    (b.style.top = 2 * h + "px"),
    (b.style.width = 4.5 * w + "px"),
    (b.style.fontSize = h / 2 + "px");
  for (var c = document.querySelectorAll("kbd"), d = 0; d < c.length; d++)
    (c[d].style.marginTop = (1 / 8) * h + "px"),
      (c[d].style.marginLeft = (3 / 4) * w + "px"),
      (c[d].style.width = (3 / 4) * w + "px"),
      (c[d].style.height = (3 / 4) * h + "px"),
      (c[d].style.fontSize = (3 / 8) * h + "px"),
      (c[d].style.lineHeight = (3 / 4) * w + "px");
  var e = document.querySelector(".space");
  (e.style.marginLeft = "0"), (e.style.width = 1.5 * w + "px");
  var f = document.getElementById("continue-desktop");
  (f.style.left = 1 * w + "px"),
    (f.style.top = 8 * h + "px"),
    (f.style.width = 14 * w + "px"),
    (f.style.fontSize = h / 2 + "px"),
    (tutorial = document.getElementById("tutorial-desktop")),
    (tutorial.style.display = "block"),
    (tutorial.style.opacity = 0),
    tutorial.remove(),
    p2.appendChild(tutorial),
    document.addEventListener("keydown", initializeGamePlay);
}
function drawTutorialMobile() {
  var a = document.getElementById("instructions-mobile");
  (a.style.left = 1 * w + "px"),
    (a.style.top = h / 2 + "px"),
    (a.style.width = 14 * w + "px"),
    (a.style.fontSize = h / 2 + "px");
  var b = document.querySelector(".swipe-map");
  (b.style.backgroundColor = "rgba(1,1,1,0.2)"),
    (b.style.padding = w / 5 + "px"),
    (b.style.left = 5.55 * w + "px"),
    (b.style.top = 2.5 * h + "px"),
    (b.style.width = 4.5 * w + "px"),
    (b.style.fontSize = h / 2 + "px");
  for (var c = document.querySelectorAll(".swipe"), d = 0; d < c.length; d++)
    (c[d].style.marginTop = (1 / 8) * h + "px"),
      (c[d].style.marginLeft = w + "px"),
      (c[d].style.width = (3 / 4) * w + "px"),
      (c[d].style.height = (3 / 4) * h + "px");
  var e = document.getElementById("continue-mobile");
  (e.style.left = 1 * w + "px"),
    (e.style.top = 8 * h + "px"),
    (e.style.width = 14 * w + "px"),
    (e.style.fontSize = h / 2 + "px"),
    (tutorial = document.getElementById("tutorial-mobile")),
    (tutorial.style.display = "block"),
    (tutorial.style.opacity = 0),
    tutorial.remove(),
    p2.appendChild(tutorial),
    setTimeout(function() {
      par.addEventListener("click", initializeGamePlay);
    }, 100);
}
function makeTutorial() {
  mobile ? drawTutorialMobile() : drawTutorialDesktop();
}
function tutorialAppear() {
  (tutorial.style.transitionDuration = "1s"),
    (tutorial.style.transitionTimingFunction = "ease-in"),
    (tutorial.style.opacity = 1);
}
function tutorialRemove() {
  (tutorial.style.transitionDuration = "500ms"),
    (tutorial.style.opacity = 0),
    setTimeout(function() {
      tutorial.remove();
    }, 500);
}
function makeHudBox(a, b, c, d, e, f, g, j) {
  var k = document.createElement("div");
  (k.id = b),
    k.classList.add("HUD"),
    (k.style.position = "absolute"),
    (k.style.transitionDuration = "1s"),
    (k.style.opacity = 0),
    (k.style.fontFamily = "'Seven Segment', Helvetica, sans-serif"),
    (k.style.color = "#FD9408"),
    (k.style.left = c * w + "px"),
    (k.style.top = d * h + "px"),
    (k.style.width = e * w + "px"),
    (k.style.height = f * h + "px"),
    a.appendChild(k);
  var l = document.createElement("div");
  (l.style.textAlign = g),
    (l.style.textShadow = "2px 2px 5px #222222"),
    (l.id = b + "Text"),
    k.appendChild(l),
    (l.style.fontSize = h * j + "px");
}
function makeNeedle() {
  var a = document.createElement("div");
  (a.style.position = "absolute"),
    (a.style.transitionDuration = "100ms"),
    (a.style.backgroundColor = "#FB0006"),
    (a.style.boxShadow = "2px 2px 5px #222222"),
    (a.style.webkitTransformOrigin = "100% 100%"),
    (a.style.mozTransformOrigin = "100% 100%"),
    (a.style.msTransformOrigin = "100% 100%"),
    (a.style.oTransformOrigin = "100% 100%"),
    (a.style.transformOrigin = "100% 100%"),
    (a.style.left = "21%"),
    (a.style.top = "90%"),
    (a.style.width = "29%"),
    (a.style.height = "1%"),
    (a.id = "needle"),
    speedBox.appendChild(a),
    (speedBox.style.backgroundImage = "url('img/speedometer.png')"),
    (speedBox.style.backgroundSize = "100%"),
    (speedBox.style.backgroundRepeat = "no-repeat");
}
function hudFadeIn() {
  for (var a = document.querySelectorAll(".HUD"), b = 0; b < a.length; b++)
    a[b].style.opacity = 1;
  (speedBox.style.left = "0px"),
    (timeBox.style.top = 1 * h + "px"),
    (distBox.style.left = 13 * w + "px");
}
function hudFadeOut() {
  for (var a = document.querySelectorAll(".HUD"), b = 0; b < a.length; b++)
    a[b].style.opacity = 0;
  (speedBox.style.left = "-3px"),
    (timeBox.style.top = -2 * h + "px"),
    (distBox.style.left = 16 * w + "px");
}
function leadZeros(a, b) {
  for (var d = a + ""; d.length < b; ) d = "0" + d;
  return d;
}
function rotateNeedle() {
  var a = 190 * (speed / maxSpeed) - 12;
  (needle.style.webkitTransform = "rotate(" + a + "deg)"),
    (needle.style.mozTransform = "rotate(" + a + "deg)"),
    (needle.style.msTransform = "rotate(" + a + "deg)"),
    (needle.style.oTransform = "rotate(" + a + "deg)"),
    (needle.style.transform = "rotate(" + a + "deg)");
}
function speedBoxRefresh() {
  (speedBoxText.innerText = Math.floor(speed) + " mph"), rotateNeedle();
}
function timeBoxRefresh() {
  var a = "";
  if (60 <= runTimeRemain) {
    var b = Math.floor(runTimeRemain / 60),
      c = runTimeRemain - 60 * b,
      d = leadZeros(b, 2),
      e = leadZeros(c, 2);
    a = d + ":" + e;
  } else {
    var f = leadZeros(runTimeRemain, 2);
    a = "00:" + f;
  }
  timeBoxText.innerText = a;
}
function distBoxRefresh() {
  distBoxText.innerText = distanceRemain.toFixed(2) + " mi";
}
function makeHud() {
  makeHudBox(p2, "speedBox", -3, 1, 3, 2, "right", 0.75),
    makeHudBox(p2, "timeBox", 6, -2, 4, 2, "center", 1.5),
    makeHudBox(p2, "distBox", 16, 1, 2.5, 2, "right", 0.75),
    makeNeedle();
}
function refreshHud() {
  speedBoxRefresh(), timeBoxRefresh(), distBoxRefresh();
}
var runTimeStart = 0,
  runTimeElapsed = 0,
  runTimeRemain = 0;
function resetClock() {
  runTimeStart = Math.floor(tStamp / 1e3);
}
function setClock(a) {
  (runTimeElapsed = Math.floor(a / 1e3) - runTimeStart),
    (runTimeRemain = runTimeTotal - runTimeElapsed);
}
var speedUp = !1,
  speedDown = !1;
function setSpeed() {
  speedUp
    ? (speed += (maxSpeed - speed) / maxSpeed)
    : speedDown
      ? (speed += (minSpeed - speed) / (5 * minSpeed))
      : speedInput &&
        !speedUp &&
        !speedDown &&
        speed > minSpeed + 1 &&
        (speed *= 0.995);
}
var distance = 0,
  distanceRemain = 0,
  lastTimeDistanceSet = 0;
function resetDistance() {
  (distance = 0), (lastTimeDistanceSet = tStamp);
}
function setDistance(a) {
  var b = (a - lastTimeDistanceSet) / 1e3;
  (distance += b * (speed / 3600)),
    (distanceRemain = trackLength - distance),
    (lastTimeDistanceSet = a);
}
function moveLeft() {
  var a = parseInt(playerCar.style.left.replace(/px/g, ""));
  a >= 6 * w && (playerCar.style.left = a - 4 * w + "px");
}
function moveRight() {
  var a = parseInt(playerCar.style.left.replace(/px/g, ""));
  a <= 6 * w && (playerCar.style.left = a + 4 * w + "px");
}
function jump() {
  var a = parseInt(playerCar.style.top.replace(/px/g, ""));
  a >= 7 * w &&
    "jump" !== playerCar.classList[0] &&
    (playerCar.classList.add("jump"),
    (playerCar.style.top = a - 2 * h + "px"),
    setTimeout(function() {
      playerCar.style.top = a + "px";
    }, 250),
    setTimeout(function() {
      playerCar.classList.remove("jump");
    }, 500));
}
function newGameObject(a, b, c, d, e, f, g, j, k) {
  var l = document.createElement("div");
  return (
    (l.style.position = "absolute"),
    (l.style.backgroundImage = d),
    (l.style.backgroundSize = "100%"),
    (l.style.backgroundRepeat = "no-repeat"),
    l.classList.add(c, "moving", a, e, f, g, j, k, 0),
    b.appendChild(l),
    l
  );
}
function moveBox(a, b) {
  var c = a,
    d = c.classList[0],
    e = speed;
  "enemy" === d && (e = speed - enemySpeed);
  var f = c.classList[3] * w,
    g = horizon,
    j = 0;
  "finish" === d && (j = 3 * w);
  var k = 0,
    l = c.classList[4] * w,
    n = c.classList[6] * w,
    o = (c.classList[6] / c.classList[5]) * h,
    s = n - j,
    u = c.classList[7],
    v = parseInt(c.classList[8]),
    x = v + e * (b - c.classList[2]),
    y = c.classList[0],
    z = c.classList[1],
    A = c.classList[3],
    B = c.classList[4],
    C = c.classList[5],
    D = c.classList[6],
    E = c.classList[7];
  (c.className = ""), c.classList.add(y, z, b, A, B, C, D, E, x);
  var F = Math.pow(x, 5) / Math.pow(u, 5);
  (c.style.left = f + (l - f) * F + "px"),
    (c.style.top = g + (fullH - g) * F + "px"),
    (c.style.width = j + s * F + "px"),
    (c.style.height = k + (o - k) * F + "px");
  var G = parseInt(a.style.top.replace(/px/g, ""));
  "enemy" === d && 6 <= G && (checkForHit(c), enemyDeltaZ(c, G));
  G >= 9 * h && clearObject(c, d, G);
}
function clearObject(a, b, c) {
  c > 9 * h && "enemy" !== b ? a.remove() : c > 18 * h && a.remove();
}
var bgDist = 0,
  lastTimeBgDistSet = 0,
  lastTreeD = 0,
  lastLaneD = 0;
function makeTrees(a) {
  bgDist >= lastTreeD + treeSpacing &&
    (newGameObject(
      a,
      p7,
      "tree",
      "url('img/tree.png')",
      6.25,
      -12.5,
      0.5,
      6,
      drawDistScale
    ),
    newGameObject(
      a,
      p7,
      "tree",
      "url('img/tree.png')",
      9.75,
      22.5,
      0.5,
      6,
      drawDistScale
    ),
    (lastTreeD = bgDist));
}
function makeLanes(a) {
  bgDist >= lastLaneD + laneSpacing &&
    (newGameObject(
      a,
      p7,
      "lane",
      "url('img/laneL.png')",
      7.5,
      4.5,
      1,
      2,
      drawDistScale
    ),
    newGameObject(
      a,
      p7,
      "lane",
      "url('img/laneR.png')",
      8.5,
      9.5,
      1,
      2,
      drawDistScale
    ),
    (lastLaneD = bgDist));
}
function bgDistRefresh() {
  var a = (tStamp - lastTimeBgDistSet) / 1e3;
  (bgDist += a * (speed / 3600)), (lastTimeBgDistSet = tStamp);
}
function bgElements(a) {
  bgDistRefresh(), makeTrees(a), makeLanes(a);
}
var lastEnemyD = 0;
function randomThree() {
  return Math.floor(3 * Math.random()) + 1;
}
function randomFive() {
  return Math.floor(5 * Math.random()) + 2;
}
function makeEnemies(a) {
  if (distance >= lastEnemyD + enemySpacing && speed > 2 * enemySpeed) {
    var b = randomThree(),
      c = randomFive();
    1 === b
      ? newGameObject(
          a,
          p6,
          "enemy",
          "url('img/car" + c + ".png')",
          7,
          -0.5,
          2,
          6,
          drawDistScale
        )
      : 2 === b
        ? newGameObject(
            a,
            p6,
            "enemy",
            "url('img/car" + c + ".png')",
            8,
            5,
            2,
            6,
            drawDistScale
          )
        : 3 === b
          ? newGameObject(
              a,
              p6,
              "enemy",
              "url('img/car" + c + ".png')",
              9,
              10.5,
              2,
              6,
              drawDistScale
            )
          : void 0;
    lastEnemyD = distance;
  }
}
function enemyDeltaZ(a, b) {
  b >= 7 * h
    ? (a.remove(), p4.appendChild(a))
    : b < 7 * h && (a.remove(), p6.appendChild(a));
}
var playerHitSpotLeft = 0,
  playerHitSpotTop = 0;
function getPlayerHitSpot() {
  var a = parseInt(playerCar.style.left.replace(/px/g, "")),
    b = parseInt(playerCar.style.top.replace(/px/g, "")),
    c = parseInt(playerCar.style.width.replace(/px/g, "")),
    d = parseInt(playerCar.style.height.replace(/px/g, ""));
  (playerHitSpotLeft = a + c / 2), (playerHitSpotTop = b + d / 2);
}
function getEnemyHitSpotLeft(a) {
  var b = parseInt(a.style.left.replace(/px/g, "")),
    c = parseInt(a.style.width.replace(/px/g, ""));
  return b + c / 2;
}
function getEnemyHitSpotTop(a) {
  var b = parseInt(a.style.top.replace(/px/g, "")),
    c = parseInt(a.style.height.replace(/px/g, ""));
  return b + c / 2;
}
function checkForHit(a) {
  getPlayerHitSpot();
  var b = Math.abs(getEnemyHitSpotLeft(a) - playerHitSpotLeft),
    c = Math.abs(getEnemyHitSpotTop(a) - playerHitSpotTop);
  c < h / 2 &&
    b < w / 4 &&
    "jump" !== playerCar.classList[0] &&
    collisionEvent(a);
}
function collisionEvent(a) {
  (speed = 0.9 * enemySpeed),
    setTimeout(function() {
      a.remove();
    }, 100),
    finished ||
      ((p3.style.opacity = 0),
      (p3.style.transitionDuration = "100ms"),
      (p3.style.backgroundColor = "#FFFFFF"),
      (p3.style.opacity = 0.5),
      setTimeout(function() {
        p3.style.opacity = 0;
      }, 100));
}
function makeFinish(a) {
  newGameObject(
    a,
    p7,
    "finish",
    "url('img/finish.png')",
    6.5,
    1.875,
    12,
    12.25,
    drawDistScale
  ),
    (finishLine = !0);
}
function makeEndgameBox(a) {
  var b = document.createElement("div");
  (b.id = "endgameText"),
    b.classList.add("endgame"),
    (b.style.position = "absolute"),
    (b.innerText = a),
    (b.style.textShadow = "5px 5px 5px #222222"),
    (b.style.fontFamily = "'Faster One', Futura, sans-serif"),
    (b.style.color = "#FB0006"),
    (b.style.opacity = 0),
    (b.style.fontSize = 0),
    (b.style.left = 8 * w + "px"),
    (b.style.top = 4.5 * h + "px"),
    (b.style.width = 0),
    (b.style.height = 0),
    p2.appendChild(b);
}
function endgamePopIn() {
  (endgameText.style.transitionDuration = "200ms"),
    (endgameText.style.transitionTimingFunction = "ease-in"),
    (endgameText.style.opacity = 1),
    (endgameText.style.fontSize = 2 * h + "px"),
    (endgameText.style.left = 1 * w + "px"),
    (endgameText.style.top = 3 * h + "px"),
    (endgameText.style.width = 14 * w + "px"),
    (endgameText.style.height = 3 * h + "px");
}
function endgameFlyOut() {
  (endgameText.style.left = 16 * h + "px"),
    setTimeout(function() {
      endgameText.remove();
    }, 2e3);
}
function makeHarder() {
  (trackLength += 0.1), 5e-3 < enemySpacing && (enemySpacing -= 1e-3);
  200 > maxSpeed && ((maxSpeed += 10), (enemySpeed += 5));
}
var horizon = 3 * h,
  runTimeTotal = 60,
  minSpeed = 10,
  startSpeed = 65,
  drawDistScale = 7500,
  treeSpacing = 4e-3,
  laneSpacing = 5e-3,
  trackLength = 1.5,
  maxSpeed = 120;
mobile && (maxSpeed = 100);
var enemySpeed = 35,
  enemySpacing = 0.01,
  tStamp = 0,
  t = 0,
  speed = startSpeed,
  speedInput = !1,
  splashState = !0,
  finishLine = !1,
  finished = !1;
mobile && showMobileGamebox();
(p3.style.backgroundColor = "#000000"),
  (p3.style.opacity = 0.5),
  buildGamePage(),
  makeBackplane(),
  makeSky(),
  makePlayerCar(p5),
  makeSplashElements(),
  (window.onload = function() {
    splash();
  });
function splash() {
  titleFlyIn(),
    setTimeout(function() {
      playButtonAppear();
    }, 1200),
    playButton.addEventListener("click", togglePlay);
}
function togglePlay() {
  playButton.removeEventListener("click", togglePlay),
    initializePlayerCar(),
    titleFlyOut(),
    playButtonExplode(),
    makeHud(),
    tutorial();
}
function tutorial() {
  makeTutorial(),
    setTimeout(function() {
      tutorialAppear();
    }, 200);
}
function initializeGamePlay() {
  resetClock(),
    resetDistance(),
    (speed = startSpeed),
    (lastEnemyD = 0),
    (finishLine = !1),
    (finished = !1),
    document.removeEventListener("keydown", initializeGamePlay),
    par.removeEventListener("click", initializeGamePlay),
    tutorialRemove(),
    (splashState = !1),
    (p3.style.transitionDuration = "2s"),
    setTimeout(function() {
      p3.style.opacity = 0;
    }, 500),
    addInputListener(),
    setTimeout(function() {
      hudFadeIn(), resetClock(), resetDistance();
    }, 500),
    mobile &&
      setTimeout(function() {
        speedUp = !0;
      }, 1e3);
}
function gameStack(a, b) {
  finished ||
    (0 < distanceRemain && 0 < runTimeRemain
      ? (refreshHud(b),
        makeEnemies(b),
        0.038 > distanceRemain && !finishLine && makeFinish(b))
      : (0 >= distanceRemain || 0 >= runTimeRemain) && endgame());
}
function endgame() {
  (finished = !0),
    removeInputListener(),
    (speedInput = !1),
    (speedUp = !1),
    (speedDown = !1),
    hudFadeOut(),
    0 < distanceRemain
      ? makeEndgameBox("You Lose!")
      : (makeEndgameBox("You Win!"), makeHarder());
  makePlayButton(p1, "playButton", "More?", "yellow"),
    playButton.addEventListener("click", replay),
    setTimeout(function() {
      (p3.style.transitionDuration = "1s"),
        (p3.style.backgroundColor = "#000000"),
        (p3.style.opacity = 0.5),
        endgamePopIn();
    }, 100),
    setTimeout(function() {
      playButtonAppear();
    }, 500);
}
function replay() {
  playButton.removeEventListener("click", replay),
    endgameFlyOut(),
    playButtonExplode(),
    initializeGamePlay();
}
function globalRefresh(a, b) {
  setClock(a), setSpeed(b), setDistance(a);
}
function redraw(a, b) {
  globalRefresh(a, b), bgElements(b), splashState || gameStack(a, b);
  for (var c = document.querySelectorAll(".moving"), d = 0; d < c.length; d++)
    moveBox(c[d], b);
}
function drawGame(a) {
  (tStamp = a), (t = a / 16), redraw(a, t), window.requestAnimFrame(drawGame);
}
window.requestAnimFrame(drawGame);
