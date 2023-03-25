'use strict';

// src="ICONS/align-to-left.png"

var gImgArr = [];

function loadFromStorage(key) {
   var val = localStorage.getItem('img');
   return JSON.parse(val);
}

function saveToStorage() {
   if (!gImgArr) gImgArr = [];
   var img = gCanvas.toDataURL();
   gImgArr.push(img);
   localStorage.setItem('img', JSON.stringify(gImgArr));
}

function updaeMemeGallery() {
   var dataURL = localStorage.getItem('img');
   gImgArr = JSON.parse(dataURL);
   var elContainer = document.querySelector('.meme-gallery');
   if (!gImgArr.length){
      elContainer.innerHTML = '<h1 style="    width: 100vw;">Your gallery is empty, you can create some memes and they will be saved here 😁</h1>';
   } else{
      elContainer.innerHTML = '';
   }
   
   

   gImgArr.forEach((imgSrc, idx) => {
      // Create elements
      const img = new Image();
      const downloadIcon = new Image()
      const deleteIcon = new Image()

      const btnDownload = document.createElement('button');
      const btnDelete = document.createElement('button');
      const container = document.createElement('div');
    
      img.src = imgSrc

      btnDownload.classList.add("btn-gallery")
      deleteIcon.src = '../ICONS/trash.svg';

      btnDelete.classList.add("btn-gallery")
      downloadIcon.src = '../ICONS/download.svg';
      // Set attributes and content

      btnDownload.onclick = () => downloadMeme(imgSrc);
      btnDelete.onclick = () => deleteMeme(idx)
     
      btnDelete.appendChild(deleteIcon)
      btnDownload.appendChild(downloadIcon)
      
      
    
      // Add img and div to the container
      container.appendChild(img);
      container.appendChild(btnDownload);
      container.appendChild(btnDelete);
    
      // Append container to the meme-gallery
      const elContainer = document.querySelector('.meme-gallery');
      elContainer.appendChild(container);
    });
}

function downloadMeme(imgSrc) {
   const link = document.createElement('a');
   link.href = imgSrc;
   link.download = 'meme-image.png'; // you can change the file name and format here
   link.style.display = 'none';
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
}

function deleteMeme(idx){
   const ans = confirm('Are you sure you want to delete?')
   if (!ans) return;
   gImgArr.splice(idx, 1);
   localStorage.setItem('img', JSON.stringify(gImgArr));
   updaeMemeGallery();
}