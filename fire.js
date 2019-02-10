const FIRE_PIXEL   = []
const TABLE_HEIGHT = 60 
const TABLE_WIDTH  = 60
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

function init(){
    createDataFire()
    createFireOrigin()
    renderFireTable()

    setInterval(firePropagation, 14)
    setInterval(fireCampSound, 1700)
}

function createDataFire(){
    const numberOfPixels = TABLE_HEIGHT * TABLE_WIDTH

    for (let x = 0; x <= numberOfPixels; x++)
        FIRE_PIXEL[x] = 0
}

function firePropagation(){
    for (let row = 0; row < TABLE_HEIGHT-1; row++){
        for(let column = 0; column < TABLE_WIDTH; column++){
            const currentPixel = row * TABLE_HEIGHT + column
            updateHeatness(currentPixel)
        }
    }

    renderFireTable()
}

function updateHeatness(curPixel){
    const pixelBellow = FIRE_PIXEL[curPixel + TABLE_WIDTH]
    const heatnessDecay = Math.floor(Math.random() * 3)
    const newHeatness = pixelBellow - heatnessDecay >= 0 ? pixelBellow - heatnessDecay : 0
    
    FIRE_PIXEL[curPixel - heatnessDecay] = newHeatness
}

function renderFireTable(){
    let html = '<table>'

    for (let row = 0; row < TABLE_HEIGHT; row++){
        
        html += '<tr>'
        
        for(let column = 0; column < TABLE_WIDTH; column++){
            const PIXEL_INDEX = row * TABLE_HEIGHT + column
            const PIXEL_INTENSITY = FIRE_PIXEL[PIXEL_INDEX]
            const color = fireColorsPalette[PIXEL_INTENSITY]
            const stringColor = `${color.r},${color.g},${color.b}`

            html += `<td style="background-color: rgb(${stringColor})">`
            html += '</td>'
        }
        
        html += '</tr>'
    }

    html += '</table>'

    document.getElementById("fireCanvas").innerHTML = html
};

function createFireOrigin(){
    for (let x = 0; x <= TABLE_WIDTH; x++){
        const lastColOfFire = (TABLE_HEIGHT * TABLE_WIDTH - TABLE_HEIGHT) + x

        FIRE_PIXEL[lastColOfFire] = 36
    }
}

function fireCampSound(){
    new Audio('fireloop.mp3').play();
}

init()

