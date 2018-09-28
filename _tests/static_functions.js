




function buttonShow(button,width,height,) {
  let tB = 0;
  let startShow = setInterval(show, 1);
  function show() {
    if (tB <= 50) {
      tB++;
      button.style.opacity = tB / 50;
      button.style.width = tB + '%';
      button.style.height = tB + '%';
      button.style.fontSize = (Math.pow(tB, 2) / 50) + 'pt';
    } else {
      clearInterval(startShow);
    };
  };
};



// INPUT button dom object,
function buttonSplode(button) {
  let tB = 0;
  let startFade = setInterval(fade, 1);
  function fade() {
    if (tB <= 50) {
      tB++;
      button.style.opacity = (50 - tB) / 50;
      button.style.width = (tB + 50) + '%';
      button.style.height = (tB + 50) + '%';
    } else {
      clearInterval(startFade);
      button.remove();
    };
  };
};


replace(/[^0-9]/g, '')
replace(/[0-9]/g, '')

let getOpacity = button.style.opacity;
let getWidth = button.style.width.replace(/[^0-9]/g, '');
let getHeight = button.style.height;

let getWidthUnit = button.style.width.replace(/[0-9]/g, '');
let getHeightUnit = button.style.height;

