var popupHtml = document.getElementById("popupId")

function openPopup() {
    popupHtml.firstElementChild.classList.add("open-popup");
    popupHtml.classList.add("open-popup__dimer");
}

function closePopup() {
    popupHtml.firstElementChild.classList.remove("open-popup");
    popupHtml.classList.remove("open-popup__dimer");
}