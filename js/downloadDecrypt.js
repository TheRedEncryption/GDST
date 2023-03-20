function ddPopulateHTML(toolDivider){
    
    // resets the toolDivider
    toolDivider.innerHTML = "";

    // creates elements
    var DDButton = document.createElement("button");
    var DDShow = document.createElement("button");

    // styles elements
    DDButton.innerHTML = "Download Decrypted";
    DDButton.className = "u-full-width";
    DDShow.innerHTML = "Show Decrypted";
    DDShow.className = "u-full-width";

    // appends elements
    toolDivider.appendChild(DDButton);
    toolDivider.appendChild(DDShow);

    // adds event listeners to the elements
    DDButton.addEventListener("click", downloadConverted);
    DDShow.addEventListener("click", openDecoded);
}

function downloadConverted(){
    if(convertedURL){
        downloadBlob(convertedURL);
    }
    else{
        alert("Upload something first before you may download!");
    }
}

function openDecoded(){
    if(!convertedURL){
        alert("Upload something first before you may view!");
        return;
    }
    window.open(convertedURL, "_blank");
}