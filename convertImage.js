var imageInput;
var fakeImageInput;
var imageCenterDiv;

var imagePreviewCanvas;

var imageData = null;

var outputObjects = [];
var outputStringBitmap = "";

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
    imageInput.addEventListener("change", processImageFile);
}

function processImageFile(){
    var img = imageInput.files[0];
    var imgURL = URL.createObjectURL(img);
    var file = new Image();
    file.src = imgURL;
    file.onload = function(){
        console.log(img.type);
        if(img.type == "image/png"){
            turnImgToRGB(file);
            createObjectsFromBitmap(imageData.data);
        }
    }
}

function turnImgToRGB(img){

    // creates temp canvas
    temp = document.createElement("canvas");
    temp.width = img.width;
    temp.height = img.height;

    // gets context and draws image on it
    var context = temp.getContext("2d");
    context.drawImage(img,0,0);
    document.body.appendChild(temp);
    temp.style.display = "none";

    // gets the image data
    console.log();
    imageData = context.getImageData(0, 0, temp.width, temp.height);
    
    // removes temporary canvas
    document.body.removeChild(temp);

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
        (Math.round(percentRoundFn(v * 100)) / 100)
    ];
}

class GDObject {
    constructor(id, x, y, size, rotation, colorValA, colorValB, colorValC, colorType, channel = 1){
        this.id = id;
        this.x = x;
        this.y = y;
        this.size = size;
        this.rotation = rotation;
        this.channel = channel;
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
        this.newH = this.h < 180 ? this.h : this.h - 360;
        this.toString = function(){
            //console.log(this.newH, this.s, this.v);
            return "1," + this.id + ",2," + this.x + ",3," + this.y + ",6," + this.rotation + ",28," + this.size + ",41," + this.channel + ",43," + (this.newH + "a" + this.s + "a" + this.v + "a0a0");
        }
        return this;
    }
}

class GDBitmapObject extends GDObject{
    constructor(x, y, colorValA, colorValB, colorValC, channel = 1){
        super(917, x, y, 0.5, 0, colorValA, colorValB, colorValC, "rgb", channel);
    }

    toString(){
        return super.toString();
    }
}

function createObjectsFromBitmap(data) {
    var r = [];
    var g = [];
    var b = [];
    var a = [];
    
    for(let d = 0; d < data.length; d += 4){
        r.push(data[d]);
        g.push(data[d + 1]);
        b.push(data[d + 2]);
        a.push(data[d + 3]);
    }

    //console.log(r, g, b, a);

    var index = 0;

    for(let i = 0; i < imageData.height; i++){
        for(let j = 0; j < imageData.width; j++){
            outputObjects.push(new GDBitmapObject(i * 3.5, j * 3.5, r[index], g[index], b[index]));
            index++;
        }
    }
    
    outputObjects.forEach(obj => {
        outputStringBitmap += obj.toString() + ";";
    });
    
    console.log(outputStringBitmap);
}