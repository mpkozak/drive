


function trafficMove() {
  let gamebox = document.getElementById("gamebox");
  let car1 = gamebox.getContext("2d");
  // let car2 = gamebox.getContext("2d");
  let sprite = document.getElementById("car");
  // car.drawImage(sprite,250,50,50,50);
  // context.fillStyle = "#555555";
  // context.fillRect(0,0,150,100);
  gamebox.style.backgroundColor = "gray";
  let time = 0;
  let elapsed = 0;
  let scale = 0
  let posX = 500;
  let posY = 400;
  let sizeX = 0;
  let sizeY = 0;
  let transPosX = -150;
  let transPosY = 400;
  let maxSizeX = 300;
  let maxSizeY = 200;

  car1.drawImage(sprite, 700, 600, 300, 200);
  let runTime = setInterval(timer, 10);
  function timer() {
    if (elapsed === 5000) {
      clearInterval(runTime);
    } else {
      elapsed = time++ / 10;
      scale = Math.pow(elapsed, 2) / 5000;
      car1.clearRect(0, 0, gamebox.width, gamebox.height);
      car1.drawImage(sprite, posX + (transPosX * scale), posY + (transPosY * scale), sizeX + (maxSizeX * scale), sizeY + ( maxSizeY * scale));

      // car2.clearRect(0, 0, gamebox.width, gamebox.height);
      // car2.drawImage(sprite, posX - (transPosY * scale), posY + (transPosY * scale), sizeX + (maxSizeX * scale), sizeY + ( maxSizeY * scale));
    }
  }
}





let buttonRun = document.getElementById('button2');

console.log(buttonRun);
buttonRun.addEventListener('click', trafficMove)








// let button2 = document.querySelector('button');


// // button.addEventListener('click', trafficMove);
// button2.addEventListener('click', function() {
//   console.log('buttonworks');
// });




// document.getElementById("play").addEventListener('click', trafficMove);


// posX + transPosY / scale
// posY + transPosY / scale
// sizeX + maxSizeX / scale
// sizeY + maxSizeY / scale




// context.fillRect(posX, posY, sizeX, sizeY);

  // context.fillStyle = "#555555";
  // context.fillRect(0,0,100,100);




// function trafficMove() {
//   let traffic = document.getElementById("car");
//   let elapsed = 0;
//   let time = 0;
//   let size = 0;
//   let posX = 0;
//   let posY = 0;
//   let runTime = setInterval(timer, 1);
//   function timer() {
//     if (elapsed === 1500) {
//       clearInterval(runTime);
//     } else {
//       elapsed = time++;
//       size = Math.pow(elapsed, 2) / 5625;
//       traffic.style.width = size + 'px';
//       posX = size/3;
//       posY = size/1.5;
//       traffic.style.transform = `translate(${posX}%, ${posY}%)`
//     };
//   };
// };




