function saveChanges() {
    fetch("source.html")
    .then(response => response.text())
    .then(sourceHTML => {
        // Convert source.html into a DOM element
        const parser = new DOMParser();
        const doc = parser.parseFromString(sourceHTML, "text/html");

        //Handle Multiple Product Titles and Descriptions
        const productContainers = document.querySelectorAll(".ede-product-text-container");
        let productHTML = "";

        productContainers.forEach((container) => {
            const title = container.querySelector(".ede-product-title")?.value.trim() || "";
            const description = container.querySelector(".ede-product-text")?.value.trim() || "";

            if (title || description) {
                productHTML += `<div class="product-item">`; // Wrapper for each product
                
                if (title) {
                    productHTML += `<p class="product-title">${title}</p>`; // Keep title first
                }

                if (description) {
                    const sentences = description.split("\n").filter(sentence => sentence.trim() !== "");
                    productHTML += `<ul class="product-description">`;
                    sentences.forEach(sentence => {
                        productHTML += `<li>${sentence.trim()}</li>`; // Wrap each line in <li>
                    });
                    productHTML += `</ul>`;
                }

                productHTML += `</div>`; // End product wrapper
            }
        });

        // Insert into source.html
        const descContainer = doc.querySelector(".product-description-container");
        if (descContainer) descContainer.innerHTML = productHTML;

        
        // Update Image Data
        const images = [];
        for (let i = 1; i <= 8; i++) {
            const imgUrl = document.getElementById(`img-url-${i}`).value;
            const imgDesc = document.getElementById(`img-description-${i}`).value;
            const imgLink = document.getElementById(`img-link-${i}`).value;

            if (imgUrl && imgDesc && imgLink) {
                images.push({ url: imgUrl, desc: imgDesc, link: imgLink });
            }
        }

        const addonContainer = doc.querySelector("#source-addons");
        if (addonContainer) {
            addonContainer.innerHTML = ""; // Clear existing add-ons

            images.forEach((image) => {
                const newImageHTML = `
                <div class="img-container">
                    <a href="${image.link}">
                        <img alt="${image.desc}" src="${image.url}">
                    </a>
                    <p class="img-description">${image.desc}</p>
                </div>`;
                addonContainer.innerHTML += newImageHTML;
            });
        }

    // Final Stage
        const updatedHTML = doc.documentElement.outerHTML;

        previewHTML(updatedHTML); 

    // Copy the updated HTML to clipboard
        const tempTextarea = document.createElement("textarea");
        tempTextarea.value = updatedHTML;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextarea);

        alert("Copied to clipboard!");
    })
    .catch(error => {
        console.error("Error fetching source.html:", error);
        alert("Failed to fetch source.html.");
    });

}