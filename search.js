document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const clearSearchButton = document.getElementById("clearSearch");
    const resourcesGrid = document.getElementById("resources-grid");
    const noResultsMessage = document.getElementById("noResults");
    const gridViewButton = document.getElementById("grid-view");
    const listViewButton = document.getElementById("list-view");
    const categoryButtons = document.querySelectorAll(".category-filter");
    const items = document.querySelectorAll(".resource-item");

    function updateVisibility() {
        let hasVisibleItems = Array.from(items).some(item => item.style.display !== "none");
        if (noResultsMessage) {
            noResultsMessage.classList.toggle("hidden", hasVisibleItems);
        }
    }

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();

        items.forEach(item => {
            const title = item.querySelector("h3").textContent.toLowerCase(); // Use title text from the H3
            const category = item.dataset.category.toLowerCase(); // Get the category
            const descriptionTag = item.querySelector("p.text-sm"); // Get description
            const description = descriptionTag ? descriptionTag.textContent.toLowerCase() : ""; // Get p tag text safely
            const detailsSpan = item.querySelector("span.text-sm.text-gray-500"); // Get PDF details
            const details = detailsSpan ? detailsSpan.textContent.toLowerCase() : ""; // Get span text safely
            const tags = item.dataset.tags ? item.dataset.tags.toLowerCase() : ""; // Get hidden tags to assist search results
            const matches = title.includes(query) || category.includes(query) || description.includes(query) || details.includes(query) || tags.includes(query); // Check if the search query matches any of these: title, category, description, or PDF details
                item.style.display = matches ? "flex" : "none"; // Show the item if there's a match, otherwise hide it
        });

        updateVisibility();
    });

    if (clearSearchButton) {
        clearSearchButton.addEventListener("click", () => {
            searchInput.value = "";
            items.forEach(item => item.style.display = "flex");
            updateVisibility();
        });
    }

    gridViewButton.addEventListener("click", () => {
        resourcesGrid.classList.remove("flex", "flex-col");
        resourcesGrid.classList.add("grid", "grid-cols-1", "md:grid-cols-3", "gap-4");
        items.forEach(item => item.classList.remove("flex-row", "items-center", "gap-4"));
    });

    listViewButton.addEventListener("click", () => {
        resourcesGrid.classList.remove("grid", "grid-cols-1", "md:grid-cols-3");
        resourcesGrid.classList.add("flex", "flex-col", "gap-2");
        items.forEach(item => item.classList.add("flex-row", "items-center", "gap-4"));
    });

    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;
            items.forEach(item => {
                item.style.display = (category === "all" || item.dataset.category === category) ? "flex" : "none";
            });
            updateVisibility();
        });
    });

    if (window.location.hash) {
        const categoryHash = window.location.hash.substring(1);
        items.forEach(item => {
            item.style.display = item.dataset.category === categoryHash ? "flex" : "none";
        });
        updateVisibility();
    }

       // Show the "X" button when there's text in the search field
       searchInput.addEventListener("input", () => {
        if (searchInput.value.length > 0) {
            clearSearchButton.classList.remove("hidden");
        } else {
            clearSearchButton.classList.add("hidden");
        }
    });

    // When "X" is clicked, clear the search bar and refresh search results
    clearSearchButton.addEventListener("click", () => {
        searchInput.value = "";
        clearSearchButton.classList.add("hidden");
        searchInput.dispatchEvent(new Event("input")); // Refresh search results
    });
});



    function filterByCategory(category) {
        let items = document.querySelectorAll(".resource-item");
        let visibleCount = 0;

        items.forEach(item => {
            let matchesCategory = category === "all" || item.getAttribute("data-category") === category;
            item.hidden = !matchesCategory;

            if (matchesCategory) visibleCount++;
        });

        // ✅ Update URL hash when category is selected
        if (category === "all") {
            history.pushState(null, null, window.location.pathname);
        } else {
            history.pushState(null, null, window.location.pathname + "#" + category);
        }

        // ✅ Update download count based on visible items
        document.getElementById("totalDownloads").innerText = visibleCount;
    }

    // ✅ Apply filter when clicking category buttons
    document.querySelectorAll(".category-filter").forEach(button => {
        button.addEventListener("click", function() {
            let category = this.getAttribute("data-category");
            filterByCategory(category);
        });
    });

    // ✅ Apply category filter from URL when page loads
    document.addEventListener("DOMContentLoaded", function() {
        let hashCategory = window.location.hash.substring(1);
        if (hashCategory) {
            filterByCategory(hashCategory);
        }
    });
