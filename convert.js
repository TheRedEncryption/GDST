// global variables, woohoo (/s)

//import {decode} from "./base64.js";

var levelInput;
var inputFile;
var inputURL;
var outputURL;
var inputContent;

var step1;
var step2;
var step3;

// when the content is loaded, then this happens
addEventListener('DOMContentLoaded', (event) => { 
    levelInput = document.getElementById("levelinput");
    levelInput.addEventListener("change", setupFile);
});

function setupFile() {
    inputURL = URL.createObjectURL(levelInput.files[0]);
    inputFile = levelInput.files[0];
    inputFile.text().then(text => {
        inputContent = text;
        console.log(convert(inputContent));
    })
}

// the xor traverses the string, applies bitwise xor with the key, then returns the result (e.g. "amogus" with key 5 results in "djhbpv")
function xor(input, key){
    var result = "";
    for(let i = 0; i < input.length; i++){
        result += String.fromCodePoint(input[i].charCodeAt() ^ key);
    }
    return result;
}

// this is the biggest pain since the uninvention of sliced bread (someone seriously had to go back in time to stop it for some reason)
function convert(input){
    // step 0: get input
    var result;
    // step 1: xor cipher with key 11
    step1 = xor(input, 11); 
    // step 2: decode base64
    step2 = base64.decode(utf8.encode(step1));
    return result;
}