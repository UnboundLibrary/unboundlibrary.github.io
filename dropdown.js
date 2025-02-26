document.addEventListener("DOMContentLoaded", function () {
    const dropdownBtn = document.getElementById("categoryDropdownBtn");
    const dropdownMenu = document.getElementById("categoryDropdown");
    const dropdownArrow = document.getElementById("dropdownArrow");

    dropdownBtn.addEventListener("click", function () {
        dropdownMenu.classList.toggle("hidden");
        dropdownArrow.classList.toggle("rotate-180");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add("hidden");
            dropdownArrow.classList.remove("rotate-180");
        }
    });
});

// force page reload on click
document.querySelectorAll('.dropdown-item').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        window.location.href = this.href; // Change the URL
        window.location.reload(); // Force refresh
    });
});