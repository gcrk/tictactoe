const circle = "<img src='img/circle.png'>";
const cross = "<img src='img/cross.png'>";

const gridCross = {
    topleft: null,
    topcenter: null,
    topright: null,
    middleleft: null,
    middlecenter: null,
    middleright: null,
    bottomleft: null,
    bottomcenter: null,
    bottomright: null
}
const gridCircle = {
    topleft: null,
    topcenter: null,
    topright: null,
    middleleft: null,
    middlecenter: null,
    middleright: null,
    bottomleft: null,
    bottomcenter: null,
    bottomright: null
}
function winner() {

}

// Function turn to define wich turn it is - if it return an even number it is circle turn / odd number cross turn
function wichTurn(){
  let turn = 0;
  let gridCrossValues = Object.values(gridCross);
  for( i = 0; i < gridCrossValues.length; i++){
    turn += gridCrossValues[i]
  }
  let gridCircleValues = Object.values(gridCircle);
  for( i = 0; i < gridCircleValues.length; i++){
    turn += gridCircleValues[i]
  }
  if( (turn % 2) === 0 ){
    $('#wichturn').html(`This is the ${cross} turn`)
  } else {
    $('#wichturn').html(`This is the ${circle} turn`)
  }
  return turn
};

// $('resetbutton').on('click', reset());
function reset(){
  Object.keys(gridCross).forEach(function(index) {
    gridCross[index] = null
  });
  Object.keys(gridCircle).forEach(function(index) {
    gridCircle[index] = null
  });
  $('.square').html('');
  $('#wichturn').html(`${cross} start !!!`)
};


function crossCircle(i){
  let turn = 0;
  turn = wichTurn();
  if (turn % 2 === 0) {
    gridCross[`${i}`] = true;
    $(`#${i}`).html(cross);
  } else {
    gridCircle[`${i}`] = true;
    $(`#${i}`).html(circle);
  }
  wichTurn();
};
