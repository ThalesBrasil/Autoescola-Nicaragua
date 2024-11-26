document.addEventListener('DOMContentLoaded', () => {
    const userArea = document.querySelector('.user-area');
    const userNameSpan = document.getElementById('user-name');
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const userInfoContainer = document.getElementById('user-info');
    const logoutToggleButton = document.getElementById('logout-toggle');
    const logoutOptions = document.getElementById('logout-options');
    const logoutButton = document.getElementById('logout-btn');

    if (usuarioLogado) {
        userNameSpan.textContent = `Bem-vindo, ${usuarioLogado.nome}`;
        userInfoContainer.style.display = 'flex';

        const loginCadastroContainer = document.querySelector('.login-cadastro');
        if (loginCadastroContainer) {
            loginCadastroContainer.remove();
        }

        logoutToggleButton.addEventListener('click', () => {
            logoutOptions.style.display = (logoutOptions.style.display === 'block') ? 'none' : 'block';
        });

        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('usuarioLogado');
            window.location.reload();
        });
    }
});
