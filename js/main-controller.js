'use strict';

function init() {
  createCanvasArea();
  createAddListners();
  // drawText();
}

function createAddListners() {
  var elInput1 = document.querySelector('#input1');
  var elInput2 = document.querySelector('#input2');

  elInput1.addEventListener(
    'keyup',
    () => {
      var line = createLine(50, 50, elInput1.value);
      gMeme.lines.push(line);
      console.log('input 1 once');
      console.log('elInput1.value', elInput1.value);
      renderMeme();
    },
    { once: true }
  );

  elInput1.addEventListener('keyup', () => {
    var gMemeLine = 0;
    gMeme.lines[gMemeLine].txt = elInput1.value;
    renderMeme();
    // drawText(50, 400);
    // drawText(elInput.value);
  });

  elInput2.addEventListener(
    'keyup',
    () => {
      var line = createLine(50, 450, elInput2.value);
      gMeme.lines.push(line);
    },
    { once: true }
  );

  elInput2.addEventListener('keyup', () => {
    var gMemeLine = 1;
    gMeme.lines[gMemeLine].txt = elInput2.value;
    renderMeme();
    // drawText(50, 400);
    // drawText(elInput.value);
  });
}

function renderMeme() {
  var idx = gMeme.selectedImgId;
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  drawImg(idx);
  // loop txt
  drawText();
}

function putPicOnCanvas(idx) {
  gMeme.selectedImgId = idx;
  drawImg(idx);
  var elContainerImage = document.querySelector('.image-gallery');
  var elContainerMeme = document.querySelector('.meme-editor');
  // console.log(elContainer);
  elContainerImage.style.display = 'none';
  elContainerMeme.style.display = 'block';
}

function createCanvasArea() {
  gCanvas = document.getElementById('my-canvas');
  gCtx = gCanvas.getContext('2d');
  gCtx.fillStyle = '#ede5ff';
  gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
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

function backToGallery() {
  var elContainerImage = document.querySelector('.image-gallery');
  var elContainerMeme = document.querySelector('.meme-editor');
  // console.log(elContainer);
  elContainerImage.style.display = 'block';
  elContainerMeme.style.display = 'none';
}
