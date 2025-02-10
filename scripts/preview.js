//preview function

function previewHTML(updatedHTML) {
    const previewContainer = document.getElementById("preview-box");
    previewContainer.innerHTML = ""; // Clear previous preview

    const iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "600px";
    iframe.style.border = "1px solid #ddd";

    previewContainer.appendChild(iframe);

    iframe.contentDocument.open();
    iframe.contentDocument.write(updatedHTML);
    iframe.contentDocument.close();
}

document.getElementById("preview-btn").addEventListener("click", function () {
    fetch("source.html")
        .then(response => response.text())
        .then(sourceHTML => previewHTML(sourceHTML))
        .catch(error => console.error("Error fetching source.html:", error));
});


