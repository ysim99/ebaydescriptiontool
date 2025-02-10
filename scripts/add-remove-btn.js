// Add-remove Product Description Section //

document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector(".ede-product-text-section");
    const addButton = document.getElementById("add-product");
    const removeButton = document.getElementById("remove-product");

    // Function to add new product text fields
    addButton.addEventListener("click", function () {
        const newProductTextContainer = document.createElement("div");
        newProductTextContainer.classList.add("ede-product-text-container");

        const titleTextarea = document.createElement("textarea");
        titleTextarea.classList.add("ede-product-title");
        titleTextarea.placeholder = "Product Name";

        const descriptionTextarea = document.createElement("textarea");
        descriptionTextarea.classList.add("ede-product-text");
        descriptionTextarea.placeholder = "Product Description";

        newProductTextContainer.appendChild(titleTextarea);
        newProductTextContainer.appendChild(descriptionTextarea);
        section.appendChild(newProductTextContainer);
    });

    // Function to remove the last product text fields
    removeButton.addEventListener("click", function () {
        const containers = section.querySelectorAll(".ede-product-text-container");
        if (containers.length > 1) {
            containers[containers.length - 1].remove();
        }
    });
})