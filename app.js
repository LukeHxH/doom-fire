import {colors, loadColors} from "./colors.js"

const firePixelsArray = [];

let tableWidth = 50;
let tableHeight = 40;

let fireColorsPalette = [];

let showStructure = false;

let interval;

function start() {
    fireColorsPalette = colors();
    createFireDataStructure();
    createFireSource();
    setUpListeners();
    render();

    interval = setInterval(calculateFirePropagation, 50);
}

function setWidthAndHeight(width, height) {
    tableWidth = width;
    tableHeight = height;
}

function setUpListeners() {
    const buttonWidget = document.querySelector("#change-view");
    buttonWidget.onclick = changeView;
}

function changeView() {
    showStructure = !showStructure;
    clearInterval(interval);

    if (showStructure)
        setWidthAndHeight(10, 10);
    else
        setWidthAndHeight(50, 40);

    start();
}

function createFireDataStructure() {
    const numberOfPixels = tableWidth * tableHeight;

    for (let i = 0; i < numberOfPixels; i++) {
        firePixelsArray[i] = 0;
    }
}

function createFireSource() {
    for (let column = 0; column <= tableWidth; column++) {
        const overflowPixelIndex = tableWidth * tableHeight;
        const pixelIndex = (overflowPixelIndex - tableWidth) + column;

        firePixelsArray[pixelIndex] = 36;
    }
}

function calculateFirePropagation() {
    for (let column = 0; column < tableWidth; column++) {
        for (let row = 0; row < tableHeight; row++) {
            const pixelIndex = calcultePixelIndex(column, row);
            updatePixelsFireIntensity(pixelIndex);
        }
    }
    render();
}

function updatePixelsFireIntensity(currPixelIndex) {
    const belowPixelIndex = currPixelIndex + tableWidth;

    if (belowPixelIndex < (tableWidth * tableHeight)) {
        const decay = Math.floor(Math.random() * 3);
        const belowPixelFireIntenxity = firePixelsArray[belowPixelIndex];
        const newFireIntensity = Math.max(belowPixelFireIntenxity - decay, 0);

        firePixelsArray[currPixelIndex - decay] = newFireIntensity;
    }
}

function render() {
    let tableHtml = '<table cellspacing=0 cellpadding=0>';

    for (let row = 0; row < tableHeight; row++) {
        tableHtml += '<tr>';

        for (let column = 0; column < tableWidth; column++) {
            const pixelIndex = calcultePixelIndex(column, row);
            const fireIntensity = firePixelsArray[pixelIndex];

            const color = fireColorsPalette[fireIntensity];
            const colorStringRGB = `${color.r}, ${color.g}, ${color.b}`;

            if (showStructure) {
                tableHtml += `<td class="structure">`;
                tableHtml += `<div class="pixel-index">${pixelIndex}</div>`;
                tableHtml += `<div class="fire-intensity">${fireIntensity}</div>`
                tableHtml += '</td>';
            } else {
                tableHtml += `<td class="pixel" style="background-color:rgb(${colorStringRGB})">`;
                tableHtml += '</td>';
            }

        }

        tableHtml += '</tr>';
    }

    tableHtml += '</table>'

    let fireCanvasWidget = document.querySelector("#fire-canvas");
    fireCanvasWidget.innerHTML = tableHtml;
}

function calcultePixelIndex(column, row) {
    return column + (tableWidth * row);
}

loadColors().then(function () {
    start();
});