var imageInput;
var fakeImageInput;

var imagePreviewCanvas;

var imageData = null;

var outputObjects = [];
var outputStringBitmap = "";

const levelHeader = "<k>k_0</k><d><k>kCEK</k><i>4</i><k>k2</k><s>Output</s><k>k3</k><s>R2VuZXJhdGVkIGJ5IFRoZVJlZEVuY3J5cHRpb24ncyBHRFNUIQ==</s><k>k4</k><s>kS38,1_40_2_125_3_255_11_255_12_255_13_255_4_-1_6_1000_7_1_15_1_18_0_8_1|1_0_2_102_3_255_11_255_12_255_13_255_4_-1_6_1001_7_1_15_1_18_0_8_1|1_0_2_102_3_255_11_255_12_255_13_255_4_-1_6_1009_7_1_15_1_18_0_8_1|1_255_2_255_3_255_11_255_12_255_13_255_4_-1_6_1002_5_1_7_1_15_1_18_0_8_1|1_255_2_0_3_0_11_255_12_255_13_255_4_-1_6_1005_5_1_7_1_15_1_18_0_8_1|1_255_2_255_3_255_11_255_12_255_13_255_4_-1_6_1006_5_1_7_1_15_1_18_0_8_1|1_255_2_0_3_0_11_255_12_255_13_255_4_-1_6_1_7_1_15_1_18_0_8_1|,kA13,0,kA15,0,kA16,0,kA14,,kA6,0,kA7,0,kA17,0,kA18,0,kS39,0,kA2,0,kA3,0,kA8,0,kA4,0,kA9,0,kA10,0,kA11,0;";
const levelFooter = "</s><k>k5</k><s>TheRedEncryption's GDST</s><k>k13</k><t /><k>k21</k><i>2</i><k>k16</k><i>1</i><k>k80</k><i>22</i><k>k50</k><i>35</i><k>k47</k><t /><k>kI1</k><r>-1.35003</r><k>kI2</k><r>25.2</r><k>kI3</k><r>0.7</r><k>kI6</k><d><k>0</k><s>0</s><k>1</k><s>0</s><k>2</k><s>0</s><k>3</k><s>0</s><k>4</k><s>0</s><k>5</k><s>0</s><k>6</k><s>0</s><k>7</k><s>0</s><k>8</k><s>0</s><k>9</k><s>0</s><k>10</k><s>0</s><k>11</k><s>0</s><k>12</k><s>0</s></d></d>";

function imagePopulateHTML(toolDivider){
    // resets the div
    toolDivider.innerHTML = "";

    // creates elements
    imageInput = document.createElement("input");
    fakeImageInput = document.createElement("button");
    imagePreviewCanvas = document.createElement("canvas");

    // sets their styles
    fakeImageInput.innerHTML = "Upload SVG or PNG Image";
    fakeImageInput.className = "u-full-width";
    imageInput.style.display = "none";
    imageInput.type = "file";

    imagePreviewCanvas.style.border = "3px solid black";
    imagePreviewCanvas.className = "u-full-width"
    imagePreviewCanvas.height = 500;
    imagePreviewCanvas.width = 500;
    imagePreviewCanvas.id = "geometry_dash";

    // adds them to the div
    toolDivider.appendChild(imageInput);
    toolDivider.appendChild(fakeImageInput);
    toolDivider.appendChild(document.createElement("br"));
    toolDivider.appendChild(document.createElement("br"));
    toolDivider.appendChild(imagePreviewCanvas);

    // event listeners
    fakeImageInput.addEventListener("click", uploadImage);
    imageInput.addEventListener("change", processImageFile);
}

function processImageFile(){

    // takes the latest file
    var img = imageInput.files[0];

    // creates new Image object from image
    var imgURL = URL.createObjectURL(img);
    var file = new Image();
    file.src = imgURL;

    // upon loading, do this:
    file.onload = function(){
        console.log(img.type);

        // if image is png, then
        if(img.type == "image/png"){
            turnImgToRGB(file);
            createObjectsFromBitmap(imageData.data);
            downloadBlob(URL.createObjectURL(new Blob([insertLevel()])), "CCLocalLevels.dat");
        }

        //otherwise, if svg, then
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
        // the "1" is the scale, originally it was 0.5
        super(917, x, y, 1, 0, colorValA, colorValB, colorValC, "rgb", channel);
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
            // the "7" is the space between objects, originally it was 3.5
            outputObjects.push(new GDBitmapObject(i * 7, j * 7, r[index], g[index], b[index]));
            index++;
        }
    }
    
    outputObjects.forEach(obj => {
        outputStringBitmap += obj.toString() + ";";
    });
    
}

function insertLevel(){

    // the magic number 18 is the length of the matching string
    let matchIndex = convertedText.match(/<k>_isArr<\/k><t \/>/).index + 18;
    console.log(matchIndex);
    return (convertedText.slice(0, matchIndex) + (levelHeader + outputStringBitmap + levelFooter) + convertedText.slice(matchIndex));
}

function downloadBlob(dlurl, name = "output.dat"){
    link = document.createElement("a");
    link.href = dlurl;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    link.remove();
}
