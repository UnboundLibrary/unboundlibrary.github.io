// Dark Mode Toggle Script
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const rootElement = document.documentElement;

    // Check if the user has a saved preference
    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
        rootElement.classList.toggle('dark', savedMode === 'dark');
    }

    // Update button text
    toggleButton.textContent = rootElement.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';

    // Toggle dark mode when button is clicked
    toggleButton.addEventListener('click', () => {
        const isDarkMode = rootElement.classList.toggle('dark');
        toggleButton.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';

        // Save preference in localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
});
