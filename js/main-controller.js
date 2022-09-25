'use strict';

var gIsGrabOn = false;

function init() {
   createCanvasArea();
   createAddListners();
   onAddLine();
   updaeMemeGallery();
   // updateStyle()
}

// creating canvas area
function createCanvasArea() {
   gCanvas = document.getElementById('my-canvas');
   gCtx = gCanvas.getContext('2d');
   gCtx.fillStyle = '#ede5ff';
   gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
}

// adding listners
function createAddListners() {
   var elInput0 = document.querySelector('#input0');
   elInput0.addEventListener('keyup', () => {
      gMeme.lines[gMeme.selectedLineIdx].txt = elInput0.value;
      renderMeme();
   });
}

// adding new line
function onAddLine() {
   AddLine();
}

// menu for mobile
function toggleMenu() {
   var elMenu = document.querySelector('.nav');
   elMenu.classList.toggle('close-menu');
}

// switching between lines
function onSwitchLines() {
   switchLines();
   renderMeme();
}

// rendering the canvas
function renderMeme() {
   var idx = gMeme.selectedImgId;
   gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
   drawImg(idx);
   drawText();
}

// click event on canvas
// validating if we are inside a line of text
function onCanvasClick(ev) {
   ev.stopPropagation();
   ev.preventDefault();

   var xClick = ev.offsetX;
   var yClick = ev.offsetY;

   for (var i = 0; i < gMeme.lines.length; i++) {
      var x1 = gMeme.lines[i].coord.x1;
      var y1 = gMeme.lines[i].coord.y1;
      var x2 = gMeme.lines[i].coord.x2;
      var y2 = gMeme.lines[i].coord.y2;

      if (xClick > x1 && xClick < x2 && yClick < y1 && yClick > y2) {
         gMeme.selectedLineIdx = i;
         var elInput0 = document.querySelector('#input0');
         elInput0.value = gMeme.lines[gMeme.selectedLineIdx].txt;
         gIsClickOutTxt = false;
         renderMeme();
         break;
      } else {
         gIsClickOutTxt = true;
         renderMeme();
      }
   }
}

// grabing the text
function grabText(ev) {
   var xClick = ev.offsetX;
   var yClick = ev.offsetY;

   gMeme.lines.forEach((line, idx) => {
      var x1 = line.coord.x1;
      var y1 = line.coord.y1;
      var x2 = line.coord.x2;
      var y2 = line.coord.y2;

      if (xClick > x1 && xClick < x2 && yClick < y1 && yClick > y2)
         gMeme.selectedLineIdx = idx;
      gIsGrabOn = true;
   });
}

// moving the text
function moveText(ev) {
   if (!gIsGrabOn) return;
   gMeme.lines[gMeme.selectedLineIdx].coord.x1 = ev.offsetX;
   gMeme.lines[gMeme.selectedLineIdx].coord.y1 = ev.offsetY;

   renderMeme();
}

// leaving the text
function putText(ev) {
   gIsGrabOn = false;
}

// deleting text
function onDeleteText() {
   deleteText();
   renderMeme();
}

// changing the font type
function onChangeFontType() {
   // selecting the font type
   var elInputSelect = document.querySelector('.input-font-type');
   var idx = elInputSelect.selectedIndex;
   var fontFamily = elInputSelect.options[idx].text;

   // changing the font inside the selctor
   elInputSelect.style.fontFamily = fontFamily;

   // hanging the font inside the main input
   var elTxtInput = document.querySelector('#input0');
   elTxtInput.style.fontFamily = fontFamily;

   // updating the font family on the canvas
   ChangeFontType(fontFamily);
   renderMeme();
}

// moving to diffrent areas in the app
function onMemesGallery() {
   updaeMemeGallery();
   var elContainerImage = document.querySelector('.image-gallery');
   var elContainerMeme = document.querySelector('.meme-editor');
   var elContainerMemeGallery = document.querySelector('.meme-gallery');
   elContainerImage.style.display = 'none';
   elContainerMeme.style.display = 'none';
   elContainerMemeGallery.style.display = 'grid';
   //   toggleMenu();
   clearMemeEditor();
}

// moving to the main gallery
function onGallery() {
   var elContainerImage = document.querySelector('.image-gallery');
   var elContainerMeme = document.querySelector('.meme-editor');
   var elContainerMemeGallery = document.querySelector('.meme-gallery');
   elContainerImage.style.display = 'block';
   elContainerMeme.style.display = 'none';
   elContainerMemeGallery.style.display = 'none';
   clearMemeEditor();
}

// opeing the about
function onAbout() {
   var elModal = document.querySelector('.modal');
   elModal.classList.toggle('modal-hide');
}

// clearing the meme editor
function clearMemeEditor() {
   gMeme.lines.forEach((line) => {
      line.txt = '';
   });
   console.log(gMeme.lines);
   var elInput0 = document.querySelector('#input0');
   var elInput1 = document.querySelector('#input1');
   elInput0.value = null;
   elInput1.value = null;
}

// saving
function onSave() {
   ('on share');
   alert('Meme saved!')
   gIsClickOutTxt = true;
   renderMeme();
   saveToStorage();
}

// loading
function loadImg() {
   var imgUrl = `/meme-imgs (square)/1.jpg`;
   var img = new Image();
   img.src = imgUrl;
   img.onload = () => {
      gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
   };
}

function changeFontColor() {
   var color = document.querySelector('#color');
   gMeme.lines[gMeme.selectedLineIdx].color = color.value;
   // var logo = document.querySelector('.logo');
   // logo.style.display = 'none';
   var elColorBtn = document.querySelector('.font-color');
   elColorBtn.style.display = 'block';
   var elColorInput = document.querySelector('#color');
   // elColorInput.style.display = 'none';
   renderMeme();
}

function changeStrokeColor() {
   var color = document.querySelector('#stroke-color');
   gMeme.lines[gMeme.selectedLineIdx].strokeColor = color.value;
   var elColorBtn = document.querySelector('.stroke-color');
   elColorBtn.style.display = 'block';
   var elColorInput = document.querySelector('#stroke-color');
   // elColorInput.style.display = 'none';
   renderMeme();
}

function updateStyle() {
   var elHeader = document.querySelector('header')
   var elMain = document.querySelector('Main')
   var elFooter = document.querySelector('Footer')

   var maxHeight = window.screen.availHeight - (window.outerHeight - window.innerHeight)
   // var maxHeight = window.screen.availHeight
   // var maxHeight = 754
   // console.log('maxHeight:', maxHeight)
   var diff = window.outerHeight - window.innerHeight
   // console.log('diff:', diff)

   elHeader.style.minHeight = 0.1 * maxHeight + 'px'
   elMain.style.minHeight = 0.8 * maxHeight + 'px'
   elFooter.style.minHeight = 0.1 * maxHeight + 'px'

   // elHeader.style.minHeight = 0.1 + 'vh'
   // elMain.style.minHeight = 0.8 + 'vh'
   // elFooter.style.minHeight = 0.1 + 'vh'


   // elHeader.style.height=
   // elMain.style.height=
   // elFooter.style.height=

}


// window.addEventListener('resize', updateStyle)