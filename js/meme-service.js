'use stirct';

var gIsClickOutTxt = false;
var gCanvas;
var gCtx;
var gInputIdx = 0;
var gInputs = [];
var gImgs = [];
var gMeme = {
   selectedImgId: 0,
   selectedLineIdx: 0,
   lines: [],
};

function createImgs() {
   for (var i = 1; i < 17; i++) {
      var img = createImg(i);
      gImgs.push(img);
   }
}

function createImg(id) {
   return { id: id, url: `meme-imgs(square)/${id}.jpg`, keywords: ['happy'] };
}

function drawImg(idx) {
   var elImg = document.querySelector(`.img-${idx}`);
   gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}

// function drawImg(idx) {
//   var imgUrl = `/meme-imgs (square)/${idx}.jpg`;
//   var img = new Image();
//   img.src = imgUrl;
//   img.onload = () => {
//     gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
//     drawText();
//   };
// }

function createLine(x1, y1, text = '') {
   return {
      txt: text,
      size: 40,
      align: 'left',
      color: 'white',
      strokeColor: 'black',
      coord: { x1: x1, y1: y1, x2: '', y2: '' },
      fontFamily: 'Impact',
   };
}

function drawText() {
   gMeme.lines.forEach((line, idx) => {
      gCtx.fillStyle = line.color;
      gCtx.strokeStyle = line.strokeColor;
      gCtx.lineWidth = 2;
      gCtx.textAlign = line.align;
      gCtx.font = `${line.size}px ${line.fontFamily}`;
      gCtx.canvas.style.letterSpacing = '0.3rem';
      gCtx.fillText(line.txt, line.coord.x1, line.coord.y1);
      gCtx.strokeText(line.txt, line.coord.x1, line.coord.y1);

      line.coord.x2 = line.coord.x1 + gCtx.measureText(line.txt).width;
      line.coord.y2 = line.coord.y1 - line.size;

      if (idx === gMeme.selectedLineIdx && !gIsClickOutTxt) {
         var text_width = gCtx.measureText(line.txt).width;
         var text_height = line.size * 1.286;

         gCtx.beginPath();
         gCtx.lineWidth = 2;
         gCtx.rect(line.coord.x1, line.coord.y2, text_width, text_height);
         gCtx.strokeStyle = 'black';
         gCtx.stroke();
      }
   });
}

function changeFontSize(diff) {
   gMeme.lines[gMeme.selectedLineIdx].size += diff;
   renderMeme();
}

function openColorMenu() {
   var elColorBtn = document.querySelector('.font-color');
   elColorBtn.style.display = 'none';
   var color = document.querySelector('#color');
   color.style.display = 'block';
}

function openStrokeColorMenu() {
   var elColorBtn = document.querySelector('.stroke-color');
   // elColorBtn.style.display = 'none';
   var color = document.querySelector('#stroke-color');
   color.style.display = 'block';
}

function changeDirection(direction) {
   var x;
   switch (direction) {
      case 'left':
         x = 25;
         break;
      case 'right':
         x = 350;
         break;
      case 'center':
         x = 150;
         break;

      default:
         break;
   }

   gMeme.lines[gMeme.selectedLineIdx].coord.x1 = x;
   renderMeme();
}

function putPicOnCanvas(idx) {
   gMeme.selectedImgId = idx;
   drawImg(idx);
   var elContainerImage = document.querySelector('.image-gallery');
   var elContainerMeme = document.querySelector('.meme-editor');
   var elContainerMemeGallery = document.querySelector('.meme-gallery');

   elContainerImage.style.display = 'none';
   elContainerMeme.style.display = 'flex';
   elContainerMemeGallery.style.display = 'none';
}

function changeLocation(diff) {
   gMeme.lines[gMeme.selectedLineIdx].coord.y1 += 5 * diff;
   renderMeme();
}

function downloadCanvas(elLink) {
   console.log('elLink:', elLink)
   const data = gCanvas.toDataURL();
   elLink.href = data;
   // console.log('elLink.href:', elLink.href)
   elLink.download = 'meme';
   // elLink.download = 'meme1';
   // console.log('elLink.download:', elLink.download)
   // console.log('done')
}

function AddLine() {
   var elInput0 = document.querySelector('#input0');
   elInput0.placeholder = 'Enter text here';
   var x;
   var y;

   switch (gMeme.lines.length) {
      case 0:
         var x = 150;
         var y = 50;
         break;
      case 1:
         var x = 150;
         var y = 450;
         break;
      default:
         var x = 150;
         var y = 250;
         break;
   }

   var line = createLine(x, y, '');
   gMeme.lines.push(line);
   switchLines();
}

function switchLines() {
   // updating the line
   gMeme.selectedLineIdx++;
   // if the line idx is outside the array, return to the first line
   if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0;
   // updating the input with the current line txt
   var elInput0 = document.querySelector('#input0');
   elInput0.value = gMeme.lines[gMeme.selectedLineIdx].txt;
}

function deleteText() {
   gMeme.lines.splice(gMeme.selectedLineIdx, 1);
   var elInput0 = document.querySelector('#input0');
   elInput0.value = '';
   if (gMeme.lines.length === 0)
      elInput0.placeholder = 'Add text with the + icon';
}

function ChangeFontType(fontFamily) {
   gMeme.lines[gMeme.selectedLineIdx].fontFamily = fontFamily;
}

function saveMemestoStorage() {
   saveToStorage(txtKey, gMeme);
   saveToStorage(imgKey, selectedImgId);
}
