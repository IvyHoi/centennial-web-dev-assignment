"use strict";

window.addEventListener("load", createLightbox);

function createLightbox() {
   let lightBox = document.getElementById("lightbox");

   let lbTitle = document.createElement("h1");
   let lbCounter = document.createElement("div");
   let lbPrev = document.createElement("div");
   let lbNext = document.createElement("div");
   let lbPlay = document.createElement("div");
   let lbImages = document.createElement("div");

   let favArray = new Array();

   lightBox.appendChild(lbTitle);
   lbTitle.id = "lbTitle";
   lbTitle.textContent = lightboxTitle;

   lightBox.appendChild(lbCounter);
   lbCounter.id = "lbCounter";
   let currentImg = 1;
   lbCounter.textContent = currentImg + " / " + imgCount;

   lightBox.appendChild(lbPrev);
   lbPrev.id = "lbPrev";
   lbPrev.innerHTML = "&#9664;";
   lbPrev.onclick = showPrev;

   lightBox.appendChild(lbNext);
   lbNext.id = "lbNext";
   lbNext.innerHTML = "&#9654;";
   lbNext.onclick = showNext;

   lightBox.appendChild(lbPlay);
   lbPlay.id = "lbPlay";
   lbPlay.innerHTML = "&#9199;";
   let timeID;
   lbPlay.onclick = function () {
      if (timeID) {
         window.clearInterval(timeID);
         timeID = undefined;
      } else {
         showNext();
         timeID = window.setInterval(showNext, 1500);
      }
   }

   lightBox.appendChild(lbImages);
   lbImages.id = "lbImages";
   for (let i = 0; i < imgCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createOverlay;
      lbImages.appendChild(image);
   }

   function showNext() {
      lbImages.appendChild(lbImages.firstElementChild);
      (currentImg < imgCount) ? currentImg++ : currentImg = 1;
      lbCounter.textContent = currentImg + " / " + imgCount;
   }

   function showPrev() {
      lbImages.insertBefore(lbImages.lastElementChild, lbImages.firstElementChild);
      (currentImg > 1) ? currentImg-- : currentImg = imgCount;
      lbCounter.textContent = currentImg + " / " + imgCount;
   }

   function createOverlay() {
      let overlay = document.createElement("div");
      overlay.id = "lbOverlay";

      let figureBox = document.createElement("figure");
      overlay.appendChild(figureBox);

      let overlayImage = this.cloneNode("true");
      figureBox.appendChild(overlayImage);

      let overlayCaption = document.createElement("figcaption");
      overlayCaption.textContent = this.alt;
      figureBox.appendChild(overlayCaption);

      let overlayFavButton = document.createElement("button");
      overlayFavButton.textContent = "Add to my favorite";
      overlayFavButton.id = "AddFav"
      overlayFavButton.hidden = false
      overlayFavButton.onclick = function () {
         if (favArray.length == 5) {
            alert("You have selected five favorite pictures. Please remove at least a favorite first.");
         } else {
            AddFavImg()
         }
      }
      figureBox.appendChild(overlayFavButton);

      let closeBox = document.createElement("div");
      closeBox.id = "lbOverlayClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function () {
         document.body.removeChild(overlay);
      }
      overlay.appendChild(closeBox);
      document.body.appendChild(overlay);


      function AddFavImg() {
         let myFavArea = document.getElementById("myFavPic");

         let addImg = document.querySelector("#lbOverlay");
         let imgSrc = addImg.querySelector("img").src;

         favArray.push(imgSrc);

         myFavArea.textContent = ""; 
         Loadimg();

      }
      function Loadimg() {
         let myFavArea = document.getElementById("myFavPic");
         myFavArea.textContent = ""; 
       
         for (let i = 0; i < favArray.length; i++) {
           let favdiv = document.createElement("div");
           let removeButton = document.createElement("button");
           removeButton.textContent = "Remove From Favorite";
           removeButton.hidden = true;
           removeButton.id = "RemoveFavList" + i; 
           removeButton.onclick = function() {
             let imgSrc = this.previousElementSibling.src; 
             let index = favArray.indexOf(imgSrc);
             if (index !== -1) {
               favArray.splice(index, 1); 
             }
             Loadimg(); 
           };
       
           let image = document.createElement("img");
           image.src = favArray[i];
           image.className = "FavImg";
           image.onclick = function() {
             let removeButton = this.nextElementSibling; 
             removeButton.hidden = false; 
           };
       
           favdiv.style.float = "left"; 
           favdiv.appendChild(image);
           favdiv.appendChild(removeButton);
           myFavArea.appendChild(favdiv);
         }
       }
   }
}