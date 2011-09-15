// Img src information about the current page
var img = document.getElementById("fbPhotoImage") || document.getElementsByClassName("spotlight")[0];

// Send the information back to the extension
chrome.extension.sendRequest(img.src);