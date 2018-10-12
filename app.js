"use strict";
var _createClass = (function() {
  function a(b, c) {
    for (var e, d = 0; d < c.length; d++)
      (e = c[d]),
        (e.enumerable = e.enumerable || !1),
        (e.configurable = !0),
        "value" in e && (e.writable = !0),
        Object.defineProperty(b, e.key, e);
  }
  return function(b, c, d) {
    return c && a(b.prototype, c), d && a(b, d), b;
  };
})();
function _possibleConstructorReturn(a, b) {
  if (!a)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return b && ("object" == typeof b || "function" == typeof b) ? b : a;
}
function _inherits(a, b) {
  if ("function" != typeof b && null !== b)
    throw new TypeError(
      "Super expression must either be null or a function, not " + typeof b
    );
  (a.prototype = Object.create(b && b.prototype, {
    constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 }
  })),
    b &&
      (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : (a.__proto__ = b));
}
function _classCallCheck(a, b) {
  if (!(a instanceof b))
    throw new TypeError("Cannot call a class as a function");
}
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
function overlayDark(a) {
  var b = +p3.style.opacity;
  (p3.style.transitionDuration = a + "ms"),
    (p3.style.backgroundColor = "#000000"),
    (p3.style.opacity = b ? 0 : 0.5);
}
function makePlayerCar(a) {
  var b = document.createElement("div");
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
function makeTitleBox(a, b, c, d, e, f) {
  var g = document.createElement("div");
  (g.id = b),
    g.classList.add("title"),
    (g.innerText = c),
    (g.style.fontSize = f * h + "px"),
    (g.style.left = -10 * w + "px"),
    (g.style.top = d * h + "px"),
    (g.style.width = e * w + "px"),
    (g.style.height = f * h + "px"),
    a.appendChild(g);
}
function makePlayButton(a, b, c, d) {
  var e = document.createElement("button");
  return (
    (e.id = b),
    e.classList.add("button"),
    (e.style.backgroundColor = d),
    (e.style.borderRadius = w / 2 + "px"),
    (e.innerText = c),
    (e.style.left = 8 * w + "px"),
    (e.style.top = 7.5 * h + "px"),
    a.appendChild(e),
    e
  );
}
function makeSplashElements() {
  makeTitleBox(p2, "title1", "Drive", 0, 10, 2),
    makeTitleBox(p2, "title2", "My", 2, 10, 2),
    makeTitleBox(p2, "title3", "Car", 4, 10, 2);
}
function titleFlyIn() {
  var a = document.querySelectorAll(".title");
  Array.from(a).map(function(b, c) {
    setTimeout(function() {
      b.style.left = 3 * h + "px";
    }, 200 * c);
  });
}
function titleFlyOut() {
  var a = document.querySelectorAll(".title");
  Array.from(a).map(function(b, c) {
    setTimeout(function() {
      b.style.left = 16 * h + "px";
    }, 200 * c);
  }),
    setTimeout(function() {
      Array.from(a).map(function(b) {
        return b.remove();
      });
    }, 2e3);
}
function playButtonAppear(a, b, c, d, e, f) {
  var g = makePlayButton(a, b, c, d);
  setTimeout(function() {
    (g.style.left = 6.5 * w + "px"),
      (g.style.top = 7 * h + "px"),
      (g.style.width = 3 * w + "px"),
      (g.style.height = 1 * h + "px"),
      (g.style.fontSize = h / 1.5 + "px"),
      (g.style.opacity = 0.8),
      g.addEventListener("click", f);
  }, e);
}
function playButtonExplode(a) {
  (playButton.style.borderRadius = w + "px"),
    (playButton.style.left = 5 * w + "px"),
    (playButton.style.top = 6.5 * h + "px"),
    (playButton.style.width = 6 * w + "px"),
    (playButton.style.height = 2 * h + "px"),
    (playButton.style.fontSize = 2 * (h / 1.5) + "px"),
    (playButton.style.opacity = 0),
    playButton.removeEventListener("click", a),
    setTimeout(function() {
      playButton.remove();
    }, 300);
}
function initializePlayerCar() {
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
    tutorial.remove(),
    p2.appendChild(tutorial),
    setTimeout(function() {
      par.addEventListener("click", initializeGamePlay);
    }, 100);
}
function tutorialAppear(a) {
  mobile ? drawTutorialMobile() : drawTutorialDesktop(),
    (tutorial.style.transitionDuration = a + "ms"),
    setTimeout(function() {
      tutorial.style.opacity = 1;
    }, 100);
}
function tutorialRemove(a) {
  (tutorial.style.transitionDuration = a + "ms"),
    (tutorial.style.opacity = 0),
    setTimeout(function() {
      tutorial.remove();
    }, 2 * a),
    document.removeEventListener("keydown", initializeGamePlay),
    par.removeEventListener("click", initializeGamePlay);
}
function makeHudBox(a, b, c, d, e, f, g, j) {
  var k = document.createElement("div");
  (k.id = b),
    k.classList.add("HUD"),
    (k.style.left = c * w + "px"),
    (k.style.top = d * h + "px"),
    (k.style.width = e * w + "px"),
    (k.style.height = f * h + "px"),
    a.appendChild(k);
  var l = document.createElement("div");
  (l.style.textAlign = g),
    (l.id = b + "Text"),
    k.appendChild(l),
    (l.style.fontSize = h * j + "px");
}
function makeNeedle() {
  var a = document.createElement("div");
  (a.style.position = "absolute"), (a.id = "needle"), speedBox.appendChild(a);
}
function hudFadeIn() {
  Array.from(document.querySelectorAll(".HUD")).map(function(a) {
    a.style.opacity = 1;
  }),
    (speedBox.style.left = 0 * w + "px"),
    (timeBox.style.top = 1 * h + "px"),
    (distBox.style.left = 13 * w + "px");
}
function hudFadeOut() {
  Array.from(document.querySelectorAll(".HUD")).map(function(a) {
    a.style.opacity = 0;
  }),
    (speedBox.style.left = -3 * w + "px"),
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
function setClock() {
  (runTimeElapsed = Math.floor(tStamp / 1e3) - runTimeStart),
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
function setDistance() {
  var a = (tStamp - lastTimeDistanceSet) / 1e3;
  (distance += a * (speed / 3600)),
    (distanceRemain = trackLength - distance),
    (lastTimeDistanceSet = tStamp);
}
function moveLeft() {
  var a = parseInt(playerCar.style.left.replace(/px/g, ""));
  a >= 6 * w ? (playerCar.style.left = a - 4 * w + "px") : null;
}
function moveRight() {
  var a = parseInt(playerCar.style.left.replace(/px/g, ""));
  a <= 6 * w ? (playerCar.style.left = a + 4 * w + "px") : null;
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
var MovingObject = (function() {
  function a(b, c, d, e, f, g, j, k, l, n) {
    _classCallCheck(this, a),
      (this.timestamp = b),
      (this.gamePlane = c),
      (this.type = d),
      (this.imgSrc = e),
      (this.startL = f),
      (this.endL = g),
      (this.aspect = j),
      (this.startW = k),
      (this.endW = l),
      (this.distScale = n),
      (this.dist = 0),
      (this.top = 0),
      (this.node = this.make()),
      (this.canRemove = !1);
  }
  return (
    _createClass(a, [
      {
        key: "make",
        value: function make() {
          var b = document.createElement("div");
          return (
            (b.style.backgroundImage = this.imgSrc),
            b.classList.add(this.type, "moving"),
            this.gamePlane.appendChild(b),
            b
          );
        }
      },
      {
        key: "move",
        value: function move() {
          var b = "enemy" === this.type ? speed - enemySpeed : speed,
            c = this.endW * w - this.startW * w,
            d = (this.endW / this.aspect) * h,
            e = this.endL * w - this.startL * w,
            g = this.dist + b * (t - this.timestamp);
          (this.timestamp = t), (this.dist = g);
          var j = Math.pow(g, 5) / Math.pow(this.distScale, 5);
          (this.node.style.left = this.startL * w + e * j + "px"),
            (this.node.style.top = horizon + (fullH - horizon) * j + "px"),
            (this.node.style.width = this.startW * w + c * j + "px"),
            (this.node.style.height = 0 + d * j + "px"),
            (this.top = parseInt(this.node.style.top.replace(/px/g, "")));
        }
      },
      {
        key: "clear",
        value: function clear() {
          this.node.remove(), (this.canRemove = !0);
        }
      }
    ]),
    a
  );
})();
var Enemy = (function(a) {
  function b(c, d, e, f, g, j, k, l, n, o) {
    return (
      _classCallCheck(this, b),
      _possibleConstructorReturn(
        this,
        (b.__proto__ || Object.getPrototypeOf(b)).call(
          this,
          c,
          d,
          e,
          f,
          g,
          j,
          k,
          l,
          n,
          o
        )
      )
    );
  }
  return (
    _inherits(b, a),
    _createClass(b, [
      {
        key: "deltaZ",
        value: function deltaZ() {
          this.canRemove
            ? null
            : this.top > 7 * h
              ? (this.node.remove(), p4.appendChild(this.node))
              : (this.node.remove(), p6.appendChild(this.node));
        }
      },
      {
        key: "clear",
        value: function clear() {
          this.top > 18 * h
            ? (this.node.remove(), (this.canRemove = !0))
            : null;
        }
      }
    ]),
    b
  );
})(MovingObject);
var bgDist = 0,
  lastTimeBgDistSet = 0,
  lastTreeD = 0,
  lastLaneD = 0;
function makeTrees() {
  bgDist >= lastTreeD + treeSpacing &&
    (movers.push(
      new MovingObject(
        t,
        p7,
        "treeL",
        "url('img/tree.png')",
        6.25,
        -12.5,
        0.5,
        0,
        6,
        drawDistScale
      )
    ),
    movers.push(
      new MovingObject(
        t,
        p7,
        "treeR",
        "url('img/tree.png')",
        9.75,
        22.5,
        0.5,
        0,
        6,
        drawDistScale
      )
    ),
    (lastTreeD = bgDist));
}
function makeLanes() {
  bgDist >= lastLaneD + laneSpacing &&
    (movers.push(
      new MovingObject(
        t,
        p7,
        "laneL",
        "url('img/laneL.png')",
        7.5,
        4.5,
        1,
        0,
        2,
        drawDistScale
      )
    ),
    movers.push(
      new MovingObject(
        t,
        p7,
        "laneR",
        "url('img/laneR.png')",
        8.5,
        9.5,
        1,
        0,
        2,
        drawDistScale
      )
    ),
    (lastLaneD = bgDist));
}
function bgDistRefresh() {
  var a = (tStamp - lastTimeBgDistSet) / 1e3;
  (bgDist += a * (speed / 3600)), (lastTimeBgDistSet = tStamp);
}
function bgElements() {
  bgDistRefresh(), makeTrees(), makeLanes();
}
var lastEnemyD = 0;
function makeEnemies() {
  if (distance >= lastEnemyD + enemySpacing && speed > 2 * enemySpeed) {
    var a = Math.floor(3 * Math.random()) + 1,
      b = Math.floor(5 * Math.random()) + 2;
    1 === a
      ? movers.push(
          new Enemy(
            t,
            p6,
            "enemy",
            "url('img/car" + b + ".png')",
            7,
            -0.5,
            2,
            0,
            6,
            drawDistScale
          )
        )
      : 2 === a
        ? movers.push(
            new Enemy(
              t,
              p6,
              "enemy",
              "url('img/car" + b + ".png')",
              8,
              5,
              2,
              0,
              6,
              drawDistScale
            )
          )
        : 3 === a
          ? movers.push(
              new Enemy(
                t,
                p6,
                "enemy",
                "url('img/car" + b + ".png')",
                9,
                10.5,
                2,
                0,
                6,
                drawDistScale
              )
            )
          : void 0;
    lastEnemyD = distance;
  }
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
  var b = Math.abs(getEnemyHitSpotLeft(a.node) - playerHitSpotLeft),
    c = Math.abs(getEnemyHitSpotTop(a.node) - playerHitSpotTop);
  c < h / 2 &&
    b < w / 4 &&
    "jump" !== playerCar.classList[0] &&
    collisionEvent(a);
}
function collisionEvent(a) {
  (speed = 0.9 * enemySpeed),
    setTimeout(function() {
      a.node.remove(), (a.canRemove = !0);
    }, 100),
    finished ? null : overlayFlash(100);
}
function overlayFlash(a) {
  (p3.style.opacity = 0),
    (p3.style.transitionDuration = a + "ms"),
    (p3.style.backgroundColor = "#FFFFFF"),
    (p3.style.opacity = 0.5),
    setTimeout(function() {
      p3.style.opacity = 0;
    }, a);
}
function makeFinish() {
  movers.push(
    new MovingObject(
      t,
      p7,
      "finish",
      "url('img/finish.png')",
      6.5,
      1.875,
      12,
      3,
      12.25,
      drawDistScale
    )
  ),
    (finishLine = !0);
}
function makeEndgameBox(a) {
  var b = document.createElement("div");
  (b.id = "endgameText"),
    b.classList.add("endgame"),
    (b.innerText = a),
    (b.style.left = 8 * w + "px"),
    (b.style.top = 4.5 * h + "px"),
    p2.appendChild(b);
}
function endgamePopIn() {
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
  (trackLength += 0.1),
    (runTimeTotal += 5),
    5e-3 < enemySpacing ? (enemySpacing -= 5e-4) : null,
    200 > maxSpeed ? (maxSpeed += 5) : null;
}
var horizon = 3 * h,
  minSpeed = 10,
  startSpeed = 65,
  drawDistScale = 7500,
  treeSpacing = 4e-3,
  laneSpacing = 5e-3,
  runTimeTotal = 60,
  trackLength = 1.5,
  maxSpeed = mobile ? 100 : 120,
  enemySpeed = maxSpeed / 3,
  enemySpacing = 0.01,
  tStamp = 0,
  t = 0,
  movers = [],
  speed = startSpeed,
  speedInput = !1,
  tutorial = !1,
  splashState = !0,
  finishLine = !1,
  finished = !1;
mobile ? showMobileGamebox() : null,
  buildGamePage(),
  overlayDark(0),
  makePlayerCar(p5),
  makeSplashElements(),
  titleFlyIn(),
  playButtonAppear(p1, "playButton", "Play!", "#FFFF0C", 1e3, togglePlay);
function togglePlay() {
  initializePlayerCar(),
    titleFlyOut(),
    playButtonExplode(togglePlay),
    makeHud(),
    tutorialAppear(1e3);
}
function initializeGamePlay() {
  resetClock(),
    resetDistance(),
    (splashState = !1),
    (speed = startSpeed),
    (lastEnemyD = 0),
    (finishLine = !1),
    (finished = !1),
    tutorialRemove(500),
    overlayDark(2500),
    mobile ? addSwipeListener() : addKeyListener(),
    setTimeout(function() {
      hudFadeIn(), resetClock(), resetDistance();
    }, 100),
    mobile
      ? setTimeout(function() {
          speedUp = !0;
        }, 1e3)
      : null;
}
function gameStack() {
  finished ||
    (0 < distanceRemain && 0 < runTimeRemain
      ? (refreshHud(),
        makeEnemies(),
        0.038 > distanceRemain && !finishLine && makeFinish())
      : (0 >= distanceRemain || 0 >= runTimeRemain) && endgame());
}
function endgame() {
  (finished = !0),
    mobile ? removeSwipeListener() : removeKeyListener(),
    (speedInput = !1),
    (speedUp = !1),
    (speedDown = !1),
    hudFadeOut(),
    overlayDark(1e3),
    0 < distanceRemain
      ? makeEndgameBox("You Lose!")
      : (makeEndgameBox("You Win!"), makeHarder()),
    endgamePopIn(),
    playButtonAppear(p1, "playButton", "More?", "yellow", 500, replay);
}
function replay() {
  endgameFlyOut(), playButtonExplode(replay), initializeGamePlay();
}
function globalRefresh() {
  setClock(), setSpeed(), setDistance();
}
function redraw() {
  globalRefresh(),
    bgElements(),
    splashState ? null : gameStack(),
    movers.map(function(a, b) {
      a.move(),
        a.top > 9 * h ? a.clear() : null,
        a.canRemove ? movers.splice(b, 1) : null,
        "enemy" === a.type && a.top > 6 * h
          ? (a.deltaZ(), checkForHit(a))
          : null;
    });
}
function drawGame(a) {
  (tStamp = a), (t = a / 16), redraw(), window.requestAnimationFrame(drawGame);
}
window.requestAnimationFrame(drawGame);
