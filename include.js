function loadComponent(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error(`Error loading ${file}:`, error));
}

// Dark Mode Toggle Script
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const rootElement = document.documentElement;

    // Load saved mode from localStorage
    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
        rootElement.classList.toggle('dark', savedMode === 'dark');
    }

    // Update button text
    toggleButton.textContent = rootElement.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';

    // Toggle dark mode
    toggleButton.addEventListener('click', () => {
        const isDarkMode = rootElement.classList.toggle('dark');
        toggleButton.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';

        // Save preference to localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
});
