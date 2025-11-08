import { colorPickers } from "./data.js";

const body = document.body;
const swatchColorsDiv = document.getElementById("swatch-colors");
const imageContainer = document.getElementById("image-container");
const rootStyles = getComputedStyle(document.documentElement);
const umbrellaImg = document.getElementById("umbrella-img");
const filePickerContainer = document.getElementById("file-picker-main");
const fileInput = document.getElementById("hidden-file-input");
const filePickerText = document.getElementById("file-picker-text");
const deleteIcon = document.getElementById("delete-icon");


const spinner = document.createElement("img");
spinner.src = "./assets/loader_icon.svg";
spinner.classList.add("spinner");
spinner.id = spinner;


colorPickers.forEach((itm) => {
    const picker = document.createElement("div");
    // color pickers are colored using css
    // we could have also used color config from imported array to style using js only
    picker.classList.add("color-picker");
    picker.id = itm.id;
    picker.addEventListener('click', () => {
        console.log(`${picker.id} clicked`);
        const lighterColor = rootStyles.getPropertyValue(`--${picker.id}-light`).trim();
        umbrellaImg.setAttribute('src', itm.img);
        filePickerContainer.style.backgroundColor = rootStyles.getPropertyValue(`--${itm.id}`).trim();
        body.style.backgroundColor = lighterColor;
    });
    swatchColorsDiv.appendChild(picker);
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files.length > 0 ? e.target.files[0] : null;
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const logo = document.createElement('img');
            logo.src = e.target.result;
            logo.alt = file.name;
            logo.id = "custom-logo";
            filePickerText.innerText = file.name;
            deleteIcon.style.visibility = "visible";
            // show spinner for 2000ms
            imageContainer.appendChild(spinner);
            imageContainer.removeChild(umbrellaImg);
            setTimeout(() => {
                imageContainer.removeChild(spinner);
                imageContainer.appendChild(umbrellaImg);
                imageContainer.appendChild(logo);
            }, 2000);
        };
        reader.readAsDataURL(file);
    }
});

deleteIcon.addEventListener('click', () => {
    const logo = document.getElementById("custom-logo");
    if (!logo) return;
    filePickerText.innerText = "UPLOAD LOGO";
    deleteIcon.style.visibility = "hidden";
    imageContainer.removeChild(umbrellaImg);
    imageContainer.removeChild(logo);
    imageContainer.appendChild(spinner);
    // show spinner 
    setTimeout(() => {
        imageContainer.appendChild(umbrellaImg);
        imageContainer.removeChild(spinner);
    }, 2000);
});


