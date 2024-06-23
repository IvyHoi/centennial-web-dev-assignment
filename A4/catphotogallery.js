$(document).ready(function () {
    let currentIndex = 0;
    let catImageList = [];
    let timeout;
    let txt = "images2.txt";


    $("#previousButton").click(previousCatImage);
    $("#nextButton").click(nextCatImage);
    $("#updateButton").click(updateCatImageList);


    function loadCatImageList(images, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", images, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                catImageList = JSON.parse(xhr.responseText);
                currentIndex = 0;
                displayCurrentCatImage();
                callback && callback();
            }
        }
        xhr.send();


    }

    function displayCurrentCatImage() {
        clearTimeout(timeout);
        // $('#currentImage').attr('src', catImageList[currentIndex].image);
        $('#currentImage').addClass('fade-out');
        setTimeout(function () {
            // Set the new cat image source
            $('#currentImage').attr('src', catImageList[currentIndex].image);

            // Remove fade-out class (fade-in will happen automatically)
            $('#currentImage').removeClass('fade-out');
            $('#catImageText').text(catImageList[currentIndex].text);

        }, 400); // Wait for the fade-out animation to complete

        timeout = setTimeout(nextCatImage, catImageList[currentIndex].duration);
    }

    function nextCatImage() {
        currentIndex = (currentIndex + 1) % catImageList.length;
        displayCurrentCatImage();
    }

    function previousCatImage() {
        currentIndex = (currentIndex - 1 + catImageList.length) % catImageList.length;
        displayCurrentCatImage();
    }

    function updateCatImageList() {
        if (txt === "images2.txt") {
            txt = "images1.txt"
            loadCatImageList("images2.txt", () => {
                displayCurrentCatImage();
            });
        }
        else {
            txt = "images2.txt"
            loadCatImageList("images1.txt", () => {
                displayCurrentCatImage();
            });
        }

    }

    loadCatImageList("images1.txt");
})