// Loads header navigation and footer
function loadComponent(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error(`Error loading ${file}:`, error));
}


// Fallback placeholder for missing images
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("img").forEach(img => {
        img.onerror = function() {
            this.src = "assets/images/placeholder.jpg";
            this.onerror = null; // Prevent infinite loop
        };
    });
});
