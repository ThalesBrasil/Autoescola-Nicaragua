document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        try {
            const usuarioInput = document.getElementById('Usuario').value.trim();
            const senhaInput = document.getElementById('Senha').value.trim();
            const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

            if (!usuarioSalvo) {
                throw new Error('Usuário não encontrado no armazenamento.');
            }

            if (usuarioInput === usuarioSalvo.login && senhaInput === usuarioSalvo.senha) {
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioSalvo));
                alert('Login realizado com sucesso!');
                window.location.href = '../Menu/menu.html';
            } else {
                throw new Error('Credenciais incorretas.');
            }
        } catch (error) {
            console.error(error);
            window.location.href = 'erro.html';
        }
    });
});

