// Fallback placeholder for missing images
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("img").forEach(img => {
        img.onerror = function() {
            this.src = "assets/images/placeholder.jpg";
            this.onerror = null; // Prevent infinite loop
        };
    });
});