var imageInput;
var fakeImageInput;
var imageCenterDiv;

var imagePreviewCanvas;

function imagePopulateHTML(toolDivider){
    // resets the div
    toolDivider.innerHTML = "";

    // creates elements
    imageInput = document.createElement("input");
    fakeImageInput = document.createElement("button");
    imageCenterDiv = document.createElement("div");
    imagePreviewCanvas = document.createElement("canvas");

    // sets their styles
    imageCenterDiv.style = "display:flex; justify-content:center;";
    fakeImageInput.innerHTML = "Upload SVG or PNG Image";
    imageInput.style.display = "none";
    imageInput.type = "file";

    imagePreviewCanvas.style.border = "3px solid black";
    imagePreviewCanvas.style.margin = "auto";
    imagePreviewCanvas.width = 500;
    imagePreviewCanvas.height = 500;
    imagePreviewCanvas.id = "geometry_dash";

    // adds them to the div
    toolDivider.appendChild(imageInput);
    toolDivider.appendChild(imageCenterDiv);
    imageCenterDiv.appendChild(fakeImageInput);
    toolDivider.appendChild(document.createElement("br"));
    toolDivider.appendChild(document.createElement("br"));
    toolDivider.appendChild(imagePreviewCanvas);

    // event listeners
    fakeImageInput.addEventListener("click", uploadImage);
}

function uploadImage(){
    imageInput.click();
}

function rgb2hsv (r, g, b) { // someone on stackoverflow named Mic wrote this, huge thanks!
    let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs),
    diff = v - Math.min(rabs, gabs, babs);
    diffc = c => (v - c) / 6 / diff + 1 / 2;
    percentRoundFn = num => Math.round(num * 100) / 100;
    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = (1 / 3) + rr - bb;
        } else if (babs === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return [
        Math.round(h * 360),
        Math.round(percentRoundFn(s * 100)) / 100,
        Math.round(percentRoundFn(v * 100) / 100)
    ];
}

class GDObject {
    constructor(id, x, y, size, rotation, colorValA, colorValB, colorValC, colorType){
        this.id = id;
        this.x = x;
        this.y = y;
        this.size = size;
        this.rotation = rotation;
        switch(colorType){
            case "rgb":
                [this.h, this.s, this.v] = rgb2hsv(colorValA, colorValB, colorValC);
                break;
            case "hsv":
                this.h = colorValA;
                this.s = colorValB;
                this.v = colorValC;
                break;
        }
        this.toString = function(){
            return "1," + this.id + ",2," + this.x + ",3," + this.y + ",6," + this.rotation + ",28," + this.size;
        }
    }
}