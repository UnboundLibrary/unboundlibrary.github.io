// Fallback placeholder for missing images
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("img").forEach(img => {
        img.onerror = function() {
            this.src = "https://unboundlibrary.org/assets/images/placeholder.jpg";
            this.onerror = null; // Prevent infinite loop
        };
    });
});