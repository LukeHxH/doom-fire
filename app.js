const firePixelsArray = [];
const fireWidth = 10;
const fireHeight = 10;

function init() {
    createFireDataStructure();

    render();
}

function createFireDataStructure() {
    const numberOfPixels = fireWidth * fireHeight;

    for (let i = 0; i < numberOfPixels; i++) {
        firePixelsArray[i] = 1;
    }
}

function render() {
    let tableHtml = '<table cellspacing=0 cellpadding=0>';

    for (let row = 0; row < fireHeight; row++) {
        tableHtml += '<tr>';

        for (let column = 0; column < fireWidth; column++) {
            const pixelIndex = column + (fireWidth * row);
            const fireIntensity = firePixelsArray[pixelIndex];

            tableHtml += '<td>';
            tableHtml += `<div class="pixel-index">${pixelIndex}</div>`;
            tableHtml += `<div class="fire-intensity">${fireIntensity}</div>`
            tableHtml += '</td>';
        }

        tableHtml += '</tr>';
    }

    tableHtml += '</table>'

    let fireCanvasWidget = document.querySelector("#fire-canvas");
    fireCanvasWidget.innerHTML = tableHtml;
}

init();