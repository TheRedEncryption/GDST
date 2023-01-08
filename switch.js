// this script is for the funky lil "select tool to use" dropdown menu LMAO
var dropdown;
var toolDiv;
addEventListener('DOMContentLoaded', (event) => { 
    dropdown = document.getElementById("toolselect");
    toolDiv = document.getElementById("tool");
    change();
    dropdown.addEventListener('change', change);
});

// ON GOD I FEEL SO HECKIN' SMORT BECAUSE I USED THE SQUIGGLY SPLOINKY s w i t c h  s t a t e m e n t!!! (its like if else but less ugly)
function change(){
    switch(dropdown.value){
        case "decrypt":
            ddPopulateHTML(toolDiv);
            break;
        case "image":
            imagePopulateHTML(toolDiv);
            break;
        case "vector":
            toolDiv.innerHTML = "whaaaa";
            break;
    }
}