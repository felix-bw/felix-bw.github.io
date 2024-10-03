function toggleTheme() {
    const isLight = document.body.classList.toggle('light');
    const button = document.getElementById('toggle-btn');

    // Toggle class für Projektboxen
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.classList.toggle('light', isLight);
    });

    button.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>'; // Icon wechseln
}
