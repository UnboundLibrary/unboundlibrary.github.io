    document.addEventListener("DOMContentLoaded", function () {
        const toggleButton = document.getElementById("toggleCategories");
        const extraCategories = document.querySelectorAll(".extra-category");

        // Ensure categories start hidden
        extraCategories.forEach(category => category.classList.add("hidden"));

        toggleButton.addEventListener("click", function () {
            const isHidden = extraCategories[0].classList.contains("hidden");
            
            extraCategories.forEach(category => {
                if (isHidden) {
                    category.classList.remove("hidden");
                } else {
                    category.classList.add("hidden");
                }
            });

            toggleButton.textContent = isHidden ? "Show Less Categories ⬆️" : "Show More Categories ⬇️";
        });
    });
