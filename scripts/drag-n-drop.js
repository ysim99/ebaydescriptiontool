// Image Drag and Drop 

const dropTargets = document.querySelectorAll(".ede-drop-target");
        const clearButtons = document.querySelectorAll("#clear-img");
        
        dropTargets.forEach((dropTarget) => {
            dropTarget.addEventListener("dragover", function (e) {
                e.preventDefault();
                dropTarget.style.backgroundColor = "#ddd";
            });
        
            dropTarget.addEventListener("dragleave", function () {
                dropTarget.style.backgroundColor = "";
            });
        
            dropTarget.addEventListener("drop", function (e) {
                e.preventDefault();
                dropTarget.style.backgroundColor = "";

                let imgURLInput = dropTarget.parentElement.querySelector("input[placeholder='Image URL']");

                //getting a direct URL from text/plain
                let realImgURL = e.dataTransfer.getData("text/plain").trim();

                // If text/plain doesn't work, fall back to text/html
                if (!realImgURL) {
                    let draggedData = e.dataTransfer.getData("text/html");
                    let doc = new DOMParser().parseFromString(draggedData, "text/html");
                    let imgElement = doc.querySelector("img");
                    if (imgElement) realImgURL = imgElement.src;
                }

                // If successfully get an image URL
                if (realImgURL && realImgURL.startsWith("http")) {
                    imgURLInput.value = realImgURL;

                    // Show preview using the real image URL
                    dropTarget.innerHTML = `<img src="${realImgURL}" alt="Dropped Image" style="max-width: 100%; height: auto; object-fit: cover;">`;
                } else {
                    alert("Couldn't detect an image URL. Please manually paste the image link.");
                }
            });
        });
        
        clearButtons.forEach((clearButton) => {
            clearButton.addEventListener("click", function () {
                const imgContainer = clearButton.parentElement;
                const dropTarget = imgContainer.querySelector(".ede-drop-target");
                const imgURLInput = imgContainer.querySelector("input[placeholder='Image URL']");
        
                dropTarget.innerHTML = "Drop Image Here";
                imgURLInput.value = "";
            });
        });