var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var DETAIL_NUMBER_SELECTOR = '[data-number-role]';

var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

function setDetails(imageUrl, titleText, imageNum) {
    'use strict';

    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;

    var detailNumber = document.querySelector(DETAIL_NUMBER_SELECTOR);
    detailNumber.setAttribute('data-number-role', imageNum);
}

function imageFromThumb(thumb) {
    'use strict';
    return thumb.getAttribute('data-image-url');
}

function titleFromThumb(thumb) {
    'use strict';
    return thumb.getAttribute('data-image-title');
}

function numFromThumb(thumb) {
    'use strict';
    return thumb.getAttribute('data-num-role');
}

function setDetailsFromThumb(thumb) {
    setDetails(imageFromThumb(thumb), titleFromThumb(thumb), numFromThumb(thumb));
}

function addThumbClickHandler(thumb) { 
    'use strict';
    thumb.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('clicked');
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() { 
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';

    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function() {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() { 
    'use strict';
    document.body.addEventListener('keyup', function(event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) { 
            hideDetails();
        }
    });
}
/*Assignment 2 Additions
===========================================================================*/
function getArrayValue() {
    var arrayVal = document.querySelector(DETAIL_NUMBER_SELECTOR);
    return parseInt(arrayVal.getAttribute('data-number-role'));
}

function prev(){
    'use strict';
    var arrayVal = getArrayValue();
    --arrayVal;
    if (arrayVal !== 0) {
        var ar = getThumbnailsArray();
        var imageUrl = ar[arrayVal-1].getAttribute('data-image-url');
        var titleText = ar[arrayVal-1].getAttribute('data-image-title');
        var imageNum = ar[arrayVal-1].getAttribute('data-num-role');
        setDetails(imageUrl, titleText, imageNum);
        showDetails();
    }
}

function next(){
    'use strict';
    var arrayVal = getArrayValue();
    if (arrayVal !== 5) {
        var ar = getThumbnailsArray();
        var imageUrl = ar[arrayVal].getAttribute('data-image-url');
        var titleText = ar[arrayVal].getAttribute('data-image-title');
        var imageNum = ar[arrayVal].getAttribute('data-num-role');
        setDetails(imageUrl, titleText, imageNum);
        showDetails();
    }
}
//=========================================================================*/
function initializeEvents() {
    'use strict';

    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
}

initializeEvents();