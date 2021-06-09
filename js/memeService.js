'use stirct';

var gCanvas;
var gCtx;
var gMemeLine = 0;

var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [],
};

function drawImg(idx) {
  var elImg = document.querySelector(`.img-${idx}`);
  gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
  // console.log(gCanvas.width);
}

function createLine(x, y, text) {
  return {
    txt: text,
    size: 30,
    align: 'left',
    color: 'red',
    coord: { x: x, y: y },
  };
}

function drawText() {
  gMeme.lines.forEach((line) => {
    var text = line.txt;
    var fontSize = gMeme.lines[gMeme.selectedLineIdx].size;
    gCtx.font = `${fontSize}px Impact`;
    gCtx.canvas.style.letterSpacing = '0.3rem';
    gCtx.fillText(text, line.coord.x, line.coord.y);
    gCtx.strokeText(text, line.coord.x, line.coord.y);
  });
}

function changeFontSize(diff) {
  gMeme.lines[gMeme.selectedLineIdx].size += diff;
  renderMeme();
}

// var text = gMeme.lines[gMeme.selectedLineIdx].txt;
// gCtx.lineWidth = 2;
// gCtx.font = `${fontSize}px Impact`;
// gCtx.canvas.style.letterSpacing = '0.3rem';
// // gCtx.textAlign = 'center';
// gCtx.fillText(text, x, y);
// gCtx.strokeText(text, x, y);
