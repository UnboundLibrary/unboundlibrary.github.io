    function updateDownloadCount() {
        let total = document.querySelectorAll(".resource-item").length;
        localStorage.setItem("downloadCount", total); // Store the count
    }

    // Run from the downloads page
    if (window.location.pathname.includes("downloads")) {
        document.addEventListener("DOMContentLoaded", updateDownloadCount);
    }

    // Retrieve number to display
    function displayDownloadCount() {
        let total = localStorage.getItem("downloadCount") || "0"; // Retrieve stored count
        document.getElementById("totalDownloads").innerText = total;
    }

    document.addEventListener("DOMContentLoaded", displayDownloadCount);