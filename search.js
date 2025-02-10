// Wait until the page is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {

    // Select important elements
    const searchInput = document.getElementById("search");  // The search input field
    const clearSearchButton = document.getElementById("clearSearch"); // "X" button to clear search
    const resourcesGrid = document.getElementById("resources-grid");  // The container holding all resource items
    const noResultsMessage = document.getElementById("noResults"); // A message displayed when no results are found
    const gridViewButton = document.getElementById("grid-view");  // Button to switch to grid view
    const listViewButton = document.getElementById("list-view");  // Button to switch to list view
    const categoryButtons = document.querySelectorAll(".category-filter"); // Buttons to filter by category
    const items = document.querySelectorAll(".resource-item"); // All resource items

    // Function to check if there are visible items, and show/hide "No Results" message
    function updateVisibility() {
        let hasVisibleItems = Array.from(items).some(item => item.style.display !== "none");
        if (noResultsMessage) {
            noResultsMessage.classList.toggle("hidden", hasVisibleItems);
        }
    }

    // Search functionality - filters results as the user types
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase(); // Get the search query

        items.forEach(item => {
            const title = item.querySelector("h3").textContent.toLowerCase(); // Extract title text
            const category = item.dataset.category.toLowerCase(); // Get category from dataset
            const matches = title.includes(query) || category.includes(query); // Match against title or category
            item.style.display = matches ? "flex" : "none"; // Show/hide based on match
        });

        updateVisibility(); // Update "No Results" message visibility
    });

    // Clear search when "X" button is clicked (if it exists)
    if (clearSearchButton) {
        clearSearchButton.addEventListener("click", () => {
            searchInput.value = ""; // Clear search input
            items.forEach(item => item.style.display = "flex"); // Show all items again
            updateVisibility(); // Refresh visibility check
        });
    }

    // Toggle to grid view
    gridViewButton.addEventListener("click", () => {
        resourcesGrid.classList.remove("flex", "flex-col"); // Remove list styles
        resourcesGrid.classList.add("grid", "grid-cols-1", "md:grid-cols-3", "gap-4"); // Add grid styles
        items.forEach(item => item.classList.remove("flex-row", "items-center", "gap-4")); // Reset item layout
    });

    // Toggle to list view
    listViewButton.addEventListener("click", () => {
        resourcesGrid.classList.remove("grid", "grid-cols-1", "md:grid-cols-3"); // Remove grid styles
        resourcesGrid.classList.add("flex", "flex-col", "gap-2"); // Apply list styles
        items.forEach(item => item.classList.add("flex-row", "items-center", "gap-4")); // Adjust item layout
    });

    // Category filter functionality
    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.dataset.category; // Get selected category
            items.forEach(item => {
                item.style.display = (category === "all" || item.dataset.category === category) ? "flex" : "none"; // Show/hide based on category
            });
            updateVisibility(); // Refresh visibility check
        });
    });

    // Handle category filtering via URL hash (e.g., site.com/downloads#preparedness)
    if (window.location.hash) {
        const categoryHash = window.location.hash.substring(1); // Remove "#"
        items.forEach(item => {
            item.style.display = item.dataset.category === categoryHash ? "flex" : "none";
        });
        updateVisibility(); // Refresh visibility check
    }

    // Show the "X" button when the user types in the search field
    searchInput.addEventListener("input", () => {
        if (searchInput.value.length > 0) {
            clearSearchButton.classList.remove("hidden"); // Show "X" button
        } else {
            clearSearchButton.classList.add("hidden"); // Hide "X" button
        }
    });

    // When "X" is clicked, clear the search bar and refresh search results
    clearSearchButton.addEventListener("click", () => {
        searchInput.value = ""; // Clear input
        clearSearchButton.classList.add("hidden"); // Hide "X" button
        searchInput.dispatchEvent(new Event("input")); // Trigger input event to refresh results
    });

});
