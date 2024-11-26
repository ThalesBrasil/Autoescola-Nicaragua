document.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    const darkModeButton = document.getElementById('modo-escuro-btn');
    
    if (isDarkMode) {
        toggleDarkMode(true); 
    }

    const savedFontSize = localStorage.getItem('fontSize');
    let fontSize = savedFontSize ? parseInt(savedFontSize) : 16;
    if (savedFontSize) {
        document.body.style.fontSize = fontSize + 'px';
    }

    darkModeButton.textContent = isDarkMode ? 'Modo Claro' : 'Modo Escuro';

    updateSubmenus(fontSize);
});

function toggleDarkMode(enableDarkMode) {
    document.body.classList.toggle('dark-mode', enableDarkMode);
    document.querySelector('header').classList.toggle('dark-mode', enableDarkMode);
    document.querySelector('nav').classList.toggle('dark-mode', enableDarkMode);
    document.querySelector('footer').classList.toggle('dark-mode', enableDarkMode);

    const submenus = document.querySelectorAll('.submenu');
    submenus.forEach(submenu => {
        submenu.classList.toggle('dark-mode', enableDarkMode);
    });

    const darkModeButton = document.getElementById('modo-escuro-btn');
    darkModeButton.textContent = enableDarkMode ? 'Modo Claro' : 'Modo Escuro';

    localStorage.setItem('darkMode', enableDarkMode);
}

function updateSubmenus(fontSize) {
    const submenus = document.querySelectorAll('.submenu');
    submenus.forEach(submenu => {
        submenu.style.fontSize = fontSize + 'px';
    });
}

document.getElementById('modo-escuro-btn').addEventListener('click', () => {
    const isDarkMode = document.body.classList.contains('dark-mode');
    toggleDarkMode(!isDarkMode);
});

let fontSize = 16;

document.getElementById('aumentar-fonte-btn').addEventListener('click', () => {
    fontSize += 2;
    document.body.style.fontSize = fontSize + 'px';
    updateSubmenus(fontSize); 
    localStorage.setItem('fontSize', fontSize);
});

document.getElementById('diminuir-fonte-btn').addEventListener('click', () => {
    if (fontSize > 12) {
        fontSize -= 2;
        document.body.style.fontSize = fontSize + 'px';
        updateSubmenus(fontSize); 
        localStorage.setItem('fontSize', fontSize);
    }
});
