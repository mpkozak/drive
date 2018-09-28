




function trafficMove() {
  let traffic = document.getElementById("car");
  let elapsed = 0;
  let time = 0;
  let size = 0;
  let posX = 0;
  let posY = 0;
  let runTime = setInterval(timer, 1);
  function timer() {
    if (elapsed === 1500) {
      clearInterval(runTime);
    } else {
      elapsed = time++;
      size = Math.pow(elapsed, 2) / 5625;
      traffic.style.width = size + 'px';
      posX = size/3;
      posY = size/1.5;
      traffic.style.transform = `translate(${posX}%, ${posY}%)`
    };
  };
};




