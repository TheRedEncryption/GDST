// global variables, woohoo (/s)

var levelInput;
var inputFile;
var inputURL;
var convertedURL;
var inputContent;

var fakeUpload;

// when the content is loaded, then this happens
addEventListener('DOMContentLoaded', (event) => { 
    fakeUpload = document.getElementById("fakeinput");
    levelInput = document.getElementById("levelinput");
    levelInput.style.display = "none";
    fakeUpload.onclick = function(){
        levelInput.click();
    }
    levelInput.addEventListener("change", setupFile);
});

// sets up file after initial file upload
function setupFile() {
    inputURL = URL.createObjectURL(levelInput.files[0]);
    inputFile = levelInput.files[0];
    inputFile.text().then(text => {
        try {
            inputContent = text;
            convertedURL = URL.createObjectURL(new File([convert(inputContent)], {type: ".xml"}));
        } catch (error) {
            alert("Something went wrong with your file.\nIs it corrupted, or is it the correct file?");
        }
    })
}

// the xor traverses the string, applies bitwise xor with the key, then returns the result (e.g. "aomgus" with key 5 results in "djhbpv")
function xor(input, key){
    var result = "";
    for(let i = 0; i < input.length; i++){
        result += String.fromCodePoint(input[i].charCodeAt() ^ key);
    }
    return result;
}

// this is the biggest pain since the uninvention of sliced bread (someone seriously had to go back in time to stop it for some reason)
// this function might seem simple but it was the source of ~24 hours of pain so don't be fooled by its facade!!!!
function convert(input){

    // step 0: get input and also variables
    var step1;
    var step2;

    // step 1: xor cipher with key 11
    console.log(xor(input,11)[input.length - 1]);
    step1 = cleanUp(xor(input, 11)); // the last bytes are the "weird bytes" i talked about below

    // steps 2 and 3: decode base64 and ungzip
    step2 = decompress(step1);

    // free memory
    step1 = null;

    // this is the part where the fun begins (not really, there is no fun when it comes to coding in javascript)
    return step2;
}

// note for future me: there might be "weird bytes" at the end of the base 64 encoding that if trimmed, can allow the decoder to work

// clean up the string because robtop used - and _ instead of + and / to encode the base 64
function cleanUp(input){ // sometimes there is one messed up byte, sometimes there are two, sometimes none. thanks again, regex!
    var output = input.replace(/\x00/g,"");
    output = output.replace(/-/g,"+");                        // MOM LOOK I USED MY FIRST REGEX!!!!!!!!!!
    output = output.replace(/_/g,"/");                        // "that's cool honey now do your homework"
    return output;
}

function decompress(data){
    return pako.ungzip(Uint8Array.from(base64ToDecimal(cleanUp(data))), {to:"string"});
}

// Someone on github named abbasali made this. Thank you.
function base64ToDecimal(encodedString) {
    // Convert base 64 encoded string to text
    var text = atob(encodedString);
    var decimalArray = [];
    
    // Run a loop on all characters of the text and convert each character to decimal
    for (var i = 0; i < text.length; i++) {
        decimalArray.push(text.charAt(i).charCodeAt(0));
    }

    // Join all decimals to get the final decimal for the entire string
    //return parseInt(decimalArray.join('')); <-------- i had to do some MILD modification
    return decimalArray;
}