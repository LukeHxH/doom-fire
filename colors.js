let _colors = [];

function loadColors() {
    const colorsPromise = fetch("colors.json")
        .then(response => response.json())
        .then(colors => _colors = colors);
    
    return colorsPromise;
}

const colors = function () {
    return _colors;
}

export {loadColors, colors};