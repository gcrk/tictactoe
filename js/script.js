const circle = "<img src='img/circle.png'>";
const cross = "<img src='img/cross.png'>";
let scoreCross = 0;
let scoreCircle = 0;
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
let theWinnerIs = 'nowinneryet';

$(document).ready(function(){
  $( ".square").mouseover(function(e){
    let turn = wichTurn();
    let position = $(this).attr('id');
    if ( theWinnerIs === 'draw' || theWinnerIs === 'crosswin' || theWinnerIs === 'circlewin' ){
      e.preventDefault();
    } else if ( gridCross[position] || gridCircle[position] ){
      e.preventDefault();
    } else if ( turn === 'crossturn'){
      $('.cross', this).show();
      $('.cross', this).css('opacity', '0.5');
    } else {
      $('.circle', this).show();
      $('.circle', this).css('opacity', '0.5');
    }
  });
  $( ".square").mouseout(function(e){
    let turn = wichTurn();
    let position = $(this).attr('id');
    if ( theWinnerIs === 'draw' || theWinnerIs === 'crosswin' || theWinnerIs === 'circlewin' ){
      e.preventDefault();
    } else if ( gridCross[position] || gridCircle[position] ){
      e.preventDefault();
    } else if ( turn === 'crossturn'){
      $('.cross', this).hide();
      $('.cross', this).css('opacity', '1');
    } else {
      $('.circle', this).hide();
      $('.circle', this).css('opacity', '1');
    }
  });

  $( ".square" ).click(function(e) {
    let position = $(this).attr('id');
    if ( theWinnerIs === 'draw' || theWinnerIs === 'crosswin' || theWinnerIs === 'circlewin' ){
      reset();
    } else if ( gridCross[position] || gridCircle[position] ){
      e.preventDefault();
    } else {
      crossCircle( position );
    }
  });
  $('#restart').click(function(){
    restart();
  });

});

function winner() {

  const crtl = gridCross.topleft;
  const crtc = gridCross.topcenter;
  const crtr = gridCross.topright;
  const crml = gridCross.middleleft;
  const crmc = gridCross.middlecenter;
  const crmr = gridCross.middleright;
  const crbl = gridCross.bottomleft;
  const crbc = gridCross.bottomcenter;
  const crbr = gridCross.bottomright;
  const citl = gridCircle.topleft;
  const citc = gridCircle.topcenter;
  const citr = gridCircle.topright;
  const ciml = gridCircle.middleleft;
  const cimc = gridCircle.middlecenter;
  const cimr = gridCircle.middleright;
  const cibl = gridCircle.bottomleft;
  const cibc = gridCircle.bottomcenter;
  const cibr = gridCircle.bottomright;

  if ( ( crtl && crtc && crtr ) || ( crml && crmc && crmr ) || ( crbl && crbc && crbr ) || ( crtl && crml && crbl ) || ( crtc && crmc && crbc ) || ( crtr && crmr && crbr ) || ( crtl && crmc && crbr ) || ( crtr && crmc && crbl ) ){
    $('#wichturn').html(`Game Over: ${cross} WIN !!!<br>Replay?`);
    scoreCross += 1;
    updateScore();
    theWinnerIs = "crosswin"
  } else if ( ( citl && citc && citr ) || ( ciml && cimc && cimr ) || ( cibl && cibc && cibr ) || ( citl && ciml && cibl ) || ( citc && cimc && cibc ) || ( citr && cimr && cibr ) || ( citl && cimc && cibr ) || ( citr && cimc && cibl ) ){
    // console.log(' circle WIN !!!!');
    $('#wichturn').html(`Game Over: ${circle} WIN !!!<br>Replay?`);
    scoreCircle += 1;
    updateScore();
    theWinnerIs = "circlewin"
  } else if (wichTurn() === 'draw') {
    $('#wichturn').html(`Game Over: ${cross} DRAW !!! ${circle}<br>Replay?`);
    theWinnerIs = "draw"
  } else {
    theWinnerIs = "nowinneryet"
  }
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
  if ( turn === 9) {
    return 'draw'
  }
  if ( (turn % 2) === 0 ){
    // $('#wichturn').html(`${cross}: Your Move !!!`)
    return 'crossturn'
  } else {
    // $('#wichturn').html(`${circle}: Your Move !!!`)
    return 'circleturn'
  }
};

function reset(){
  Object.keys(gridCross).forEach(function(index) {
    gridCross[index] = null
  });
  Object.keys(gridCircle).forEach(function(index) {
    gridCircle[index] = null
  });
  $('.square img').hide();
  $('#wichturn').html(``)
  theWinnerIs = 'nowinneryet'
};
function restart(){
  Object.keys(gridCross).forEach(function(index) {
    gridCross[index] = null
  });
  Object.keys(gridCircle).forEach(function(index) {
    gridCircle[index] = null
  });
  $('.square img').hide();
  $('#wichturn').html(``)
  theWinnerIs = 'nowinneryet'
  scoreCross = 0;
  scoreCircle = 0;
  updateScore();
};

function crossCircle(i){
  let turn = wichTurn();
  if (turn  === 'crossturn') {
    gridCross[`${i}`] = true;
    $(`#${i} .cross`).show();
    $(`#${i} .cross`).css('opacity', '1');
  } else {
    gridCircle[`${i}`] = true;
    $(`#${i} .circle`).show();
    $(`#${i} .circle`).css('opacity', '1');
  }
  wichTurn();
  winner();
};
function updateScore(){
  $('#cross-score').html(`${scoreCross}`);
  $('#circle-score').html(`${scoreCircle}`);
}
