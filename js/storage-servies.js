'use strict';

var gImgArr = [];

function loadFromStorage(key) {
  console.log('LOAD');
  var val = localStorage.getItem('img');
  return JSON.parse(val);
}

function saveToStorage() {
  if (!gImgArr) gImgArr = [];
  console.log('SAVE');
  var img = gCanvas.toDataURL();
  gImgArr.push(img);
  localStorage.setItem('img', JSON.stringify(gImgArr));
}

function updaeMemeGallery() {
  var dataURL = localStorage.getItem('img');
  gImgArr = JSON.parse(dataURL);
  if (!gImgArr) return;
  console.log('UPDATE');
  var elCoontainer = document.querySelector('.meme-gallery');
  elCoontainer.innerHTML = '';

  gImgArr.forEach((img, idx) => {
    img = new Image();
    img.src = gImgArr[idx];
    var elCoontainer = document.querySelector('.meme-gallery');
    elCoontainer.appendChild(img);
  });
}
