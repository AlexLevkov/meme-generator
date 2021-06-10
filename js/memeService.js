'use stirct';

var gCanvas;
var gCtx;
var gInputIdx = 0;
var gInputs = [];

var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [],
};

function createCanvasArea() {
  gCanvas = document.getElementById('my-canvas');
  gCtx = gCanvas.getContext('2d');
}

function renderMeme() {
  var idx = gMeme.selectedImgId;
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  drawImg(idx);
  drawText();
}

function drawImg(idx) {
  var elImg = document.querySelector(`.img-${idx}`);
  gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
  // console.log(gCanvas.width);
}

function createLine(x, y, text) {
  return {
    txt: text,
    size: 40,
    align: 'center',
    color: 'white',
    coord: { x: x, y: y },
  };
}

function drawText() {
  gMeme.lines.forEach((line) => {
    gCtx.fillStyle = line.color;
    var text = line.txt;
    // var fontSize = gMeme.lines[gMeme.selectedLineIdx].size;
    var fontSize = line.size;
    gCtx.font = `${fontSize}px Impact`;
    gCtx.canvas.style.letterSpacing = '0.3rem';
    gCtx.fillText(text, line.coord.x, line.coord.y);
    gCtx.strokeText(text, line.coord.x, line.coord.y);
  });
}

function changeFontSize(diff) {
  console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx);
  gMeme.lines[gMeme.selectedLineIdx].size += diff;
  renderMeme();
}

function createNewInput() {
  gInputIdx++;
  var elContainer = document.querySelector('.test');
  elContainer.innerHTML += `<input onclick=selectInput(event) id="input${gInputIdx}" name="${gInputIdx}" type="text" placeholder="enter text here">`;
  var newInput = document.querySelector(`#input${gInputIdx}`);
  gInputs.push(newInput);

  createAddListners();
}

function changeFontColor() {
  var color = document.querySelector('#color');
  gMeme.lines[gMeme.selectedLineIdx].color = color.value;
  renderMeme();
}

function openColorMenu() {
  var color = document.querySelector('#color');
  color.style.display = 'block';
}

function changeDirection(direction) {
  console.log(direction);
  gMeme.lines[gMeme.selectedLineIdx].align = direction;
  renderMeme();
}

function createCanvasArea() {
  gCanvas = document.getElementById('my-canvas');
  gCtx = gCanvas.getContext('2d');
  gCtx.fillStyle = '#ede5ff';
  gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
}

function putPicOnCanvas(idx) {
  gMeme.selectedImgId = idx;
  drawImg(idx);
  var elContainerImage = document.querySelector('.image-gallery');
  var elContainerMeme = document.querySelector('.meme-editor');
  // console.log(elContainer);
  elContainerImage.style.display = 'none';
  elContainerMeme.style.display = 'flex';
}

function backToGallery() {
  var elContainerImage = document.querySelector('.image-gallery');
  var elContainerMeme = document.querySelector('.meme-editor');
  // console.log(elContainer);
  elContainerImage.style.display = 'block';
  elContainerMeme.style.display = 'none';
  gMeme.lines.forEach((line) => {
    line.txt = '';
  });
  console.log(gMeme.lines);
  var elInput0 = document.querySelector('#input0');
  var elInput1 = document.querySelector('#input1');
  elInput0.value = null;
  elInput1.value = null;
}

function changeLocation(diff) {
  gMeme.lines[gMeme.selectedLineIdx].coord.y += 5 * diff;
  renderMeme();
  console.log('gMeme.lines[0].coord.x', gMeme.lines[0].coord.x);
  console.log('gMeme.lines[0].coord.y', gMeme.lines[0].coord.y);
}

function selectInput(ev) {
  console.log('ev', ev.target.name);
  gMeme.selectedLineIdx = ev.target.name;
}

function downloadCanvas(elLink) {
  const data = gCanvas.toDataURL();
  console.log('DATA', data);
  elLink.href = data;
  elLink.download = 'meme';
}
