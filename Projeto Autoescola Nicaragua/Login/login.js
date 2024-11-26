document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const usuarioInput = document.getElementById('Usuario').value.trim();
        const senhaInput = document.getElementById('Senha').value.trim();

        const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuarioEncontrado = usuariosSalvos.find(
            (usuario) => usuario.login === usuarioInput && usuario.senha === senhaInput
        );

        if (usuarioEncontrado) {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
            alert('Login realizado com sucesso!');
            window.location.href = '../Menu/menu.html';
        } else {
            alert('Login ou senha incorretos!');
        }
    });
});
