function toggleTheme() {
    const isLight = document.body.classList.toggle('light');
    const button = document.getElementById('toggle-btn');

    // Toggle class für Projektboxen
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.classList.toggle('light', isLight);
    });

    button.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>'; // Icon wechseln

    // Speichere den Status im localStorage
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Beim Laden der Seite den gespeicherten Modus überprüfen
window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light');
        const button = document.getElementById('toggle-btn');
        button.innerHTML = '<i class="fas fa-moon"></i>'; // Icon für Light Mode
    }
};
