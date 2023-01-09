function ddPopulateHTML(toolDivider){
    toolDivider.innerHTML = "";
    var DDButton = document.createElement("button");
    var DDShow = document.createElement("button");
    var DDCenterDiv = document.createElement("div");
    DDCenterDiv.style = "display:flex; justify-content:center;";
    DDButton.innerHTML = "Download Decrypted";
    DDShow.innerHTML = "Show Decrypted";
    toolDivider.appendChild(DDCenterDiv)
    DDCenterDiv.appendChild(DDButton);
    DDCenterDiv.appendChild(DDShow);
    DDButton.addEventListener("click", downloadConverted);
    DDShow.addEventListener("click", openDecoded);
}

function downloadConverted(){
    if(convertedURL){
        link = document.createElement("a");
        link.href = convertedURL;
        link.setAttribute("download", "output.dat");
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    else{
        alert("Upload something first!");
    }
}

function openDecoded(){
    if(!convertedURL){
        return;
    }
    window.open(convertedURL, "_blank");
}