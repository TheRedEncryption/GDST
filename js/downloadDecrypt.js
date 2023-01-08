function ddPopulateHTML(toolDivider){
    toolDivider.innerHTML = "";
    var DDButton = document.createElement("button");
    var DDCenterDiv = document.createElement("div");
    DDCenterDiv.style = "display:flex; justify-content:center;";
    DDButton.innerHTML = "Download Decrypted";
    toolDivider.appendChild(DDCenterDiv)
    DDCenterDiv.appendChild(DDButton);
    DDButton.addEventListener("click", downloadConverted);
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