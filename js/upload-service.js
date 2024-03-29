// on submit call to this function
function uploadImg(elForm, ev) {

   ev.preventDefault();
   document.getElementById('imgData').value = gCanvas.toDataURL('image/jpeg');

   // A function to be called if request succeeds
   function onSuccess(uploadedImgUrl) {
      uploadedImgUrl = encodeURIComponent(uploadedImgUrl);

      window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title = "Share on Facebook" target = "_blank" onclick = "window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false`)
   }

   let inputVal = elForm.querySelector('input').value;
   doUploadImg(elForm, onSuccess, inputVal);
}

function doUploadImg(elForm, onSuccess) {
   var formData = new FormData(elForm);
   fetch('//ca-upload.com/here/upload.php', {
      method: 'POST',
      body: formData,
   })
      .then(function (res) {
         return res.text();
      })
      .then(onSuccess)
      .catch(function (err) {
         console.error(err);
      });
}

