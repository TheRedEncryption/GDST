function ddPopulateHTML(toolDivider){
    
    // resets the toolDivider
    toolDivider.innerHTML = "";

    // creates elements
    var DDButton = document.createElement("button");
    var DDShow = document.createElement("button");
    var DDCenterDiv = document.createElement("div");

    // styles elements
    DDCenterDiv.style = "display:flex; justify-content:center;";
    DDButton.innerHTML = "Download Decrypted";
    DDShow.innerHTML = "Show Decrypted";

    // appends elements
    toolDivider.appendChild(DDCenterDiv);
    DDCenterDiv.appendChild(DDButton);
    DDCenterDiv.appendChild(DDShow);

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