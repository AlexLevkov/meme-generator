'use strict';

function init() {
  getCanvasArea();
  createAddListners();
}

function createAddListners() {
  var elInput0 = document.querySelector('#input0');
  var elInput1 = document.querySelector('#input1');

  elInput0.addEventListener(
    'keyup',
    () => {
      var line = createLine(50, 50, elInput0.value);
      gMeme.lines.push(line);
      console.log('input 0 once');
      console.log('elInput0.value', elInput0.value);
      renderMeme();
    },
    { once: true }
  );

  elInput0.addEventListener('keyup', () => {
    var gMemeLine = 0;
    gMeme.lines[gMemeLine].txt = elInput0.value;
    renderMeme();
    // drawText(50, 400);
    // drawText(elInput.value);
  });

  elInput1.addEventListener(
    'keyup',
    () => {
      var line = createLine(50, 450, elInput1.value);
      gMeme.lines.push(line);
    },
    { once: true }
  );

  elInput1.addEventListener('keyup', () => {
    var gMemeLine = 1;
    gMeme.lines[gMemeLine].txt = elInput1.value;
    renderMeme();
  });
}

function createNewInput() {
  var elContainer = document.querySelector('.buttons');
  // var newLine = document.createElement('input');
  // elContainer.append(newLine);
  elContainer.innerHTML +=
    '<input id="input" type="text" placeholder="enter text here">';
  // elContainer += '<input id="input" type="text" placeholder="enter text here">';

  // document.body.append(newLine);
}

function getCanvasArea() {
  createCanvasArea();
}

function toggleMenu() {
  var elMenu = document.querySelector('.nav');
  elMenu.classList.toggle('close-menu');
  console.log('I work!');
  console.log('elMenu:', elMenu);
}
