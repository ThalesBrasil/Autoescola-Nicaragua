function showError(message) {
    const existingModal = document.querySelector('.modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(modal);

    document.querySelector('.close-btn').onclick = () => {
        modal.remove();
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    };
}

document.querySelectorAll('#telefone_fixo, #celular').forEach((input) => {
    input.addEventListener('focus', (event) => {
        if (!event.target.value.startsWith('+55')) {
            event.target.value = '+55 ';
        }
    });

    input.addEventListener('input', (event) => {
        let value = event.target.value.replace(/[^0-9]/g, '');
        value = value.replace(/^55/, ''); 

        if (value.length > 2 && value.length <= 7) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length > 7) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`; 
        }

        event.target.value = `+55 ${value}`;
    });

    input.addEventListener('blur', (event) => {
        if (event.target.value === '+55 ') {
            event.target.value = ''; 
        }
    });
});

function formatCPF(value) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function formatRG(value) {
    value = value.replace(/\D/g, '');

    if (/^(\d)\1+$/.test(value)) {
        return ''; 
    }

    return value
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1})$/, '$1-$2');
}

function formatCEP(value) {
    return value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
}

function validarRG(rg) {
    rg = rg.replace(/\D/g, '');
    return rg.length === 9;
}

async function validarCEP(cep) {
    cep = cep.replace(/\D/g, '');
    if (cep.length !== 8) {
        showError('CEP inválido. Digite um CEP com 8 dígitos.');
        return;
    }
    
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.erro) {
            showError('CEP não encontrado.');
        } else {
            document.getElementById('endereco').value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
        }
    } catch (error) {
        showError('Erro ao consultar o CEP. Verifique sua conexão.');
    }
}

document.getElementById('cpf').addEventListener('input', (event) => {
    event.target.value = formatCPF(event.target.value);
});

document.getElementById('rg').addEventListener('input', (event) => {
    event.target.value = formatRG(event.target.value);
});

document.getElementById('cep').addEventListener('input', (event) => {
    event.target.value = formatCEP(event.target.value);
});

document.getElementById('numero').addEventListener('input', (event) => {
    let value = event.target.value;

    value = value.replace(/\D/g, '');

    if (value.length > 4) {
        value = value.slice(0, 4);
    }
    
    event.target.value = value;
});

document.getElementById('cep').addEventListener('blur', (event) => {
    validarCEP(event.target.value);
});

document.getElementById('cpf').addEventListener('blur', (event) => {
    if (!validarCPF(event.target.value)) {
        showError('CPF inválido.');
    }
});

document.getElementById('rg').addEventListener('blur', (event) => {
    if (!validarRG(event.target.value)) {
        showError('RG inválido. O RG deve conter 9 dígitos.');
    }
});

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const sexo = document.querySelector('input[name="sexo"]:checked');
    const login = document.getElementById('login').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const confirmarSenha = document.getElementById('confirmar-senha').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const dataNascimento = document.getElementById('data_nascimento').value.trim();
    const nomeMae = document.getElementById('nome_mae').value.trim();
    const rg = document.getElementById('rg').value.trim();
    const dataExpedicao = document.getElementById('data_expedicao').value.trim();
    const cep = document.getElementById('cep').value.trim();
    const telefone = document.getElementById('celular').value.trim();
    const categoria = document.getElementById('categoria').value.trim();

    const currentYear = new Date().getFullYear();

    // Validação (mantida como no código anterior)
    if (!nome || nome.length < 15 || nome.length > 80) {
        showError('Nome inválido. Deve conter entre 15 e 80 caracteres.');
        return;
    }

    if (!sexo) {
        showError('Por favor, selecione um sexo.');
        return;
    }

    if (login.length !== 6) {
        showError('Login deve ter exatamente 6 caracteres.');
        return;
    }

    if (senha.length !== 8) {
        showError('Senha deve ter exatamente 8 caracteres.');
        return;
    }

    if (senha !== confirmarSenha) {
        showError('As senhas não coincidem. Por favor, confirme corretamente.');
        return;
    }

    if (!cpf || !validarCPF(cpf)) {
        showError('CPF inválido. Certifique-se de ter preenchido corretamente.');
        return;
    }

    if (!dataNascimento) {
        showError('Data de Nascimento é obrigatória.');
        return;
    } else {
        const birthYear = parseInt(dataNascimento.split('-')[0]);
        if (birthYear < 1910 || birthYear > currentYear) {
            showError('Data de Nascimento inválida. Deve estar entre 1910 e 2024.');
            return;
        }
    }

    if (!nomeMae) {
        showError('Nome da Mãe é obrigatório.');
        return;
    }

    if (!rg || rg.replace(/\D/g, '').length !== 9) {
        showError('RG inválido. O RG deve conter 9 dígitos.');
        return;
    }

    if (!dataExpedicao) {
        showError('Data de Expedição (RG) é obrigatória.');
        return;
    } else {
        const expedicaoYear = parseInt(dataExpedicao.split('-')[0]);
        if (expedicaoYear < 1910 || expedicaoYear > currentYear) {
            showError('Data de Expedição inválida. Deve estar entre 1910 e 2024.');
            return;
        }
    }

    if (!cep || cep.replace(/\D/g, '').length !== 8) {
        showError('CEP inválido. Certifique-se de ter preenchido corretamente.');
        return;
    }

    if (!telefone) {
        showError('Telefone é obrigatório.');
        return;
    }

    if (!categoria) {
        showError('Categoria Pretendida é obrigatória.');
        return;
    }

    const novoUsuario = {
        nome,
        sexo: sexo.value,
        login,
        senha,
        cpf,
        dataNascimento,
        nomeMae,
        rg,
        dataExpedicao,
        cep,
        telefone,
        categoria,
    };

    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios')) || [];

    const loginExistente = usuariosExistentes.some((user) => user.login === login);
    if (loginExistente) {
        showError('Este login já está em uso. Escolha outro.');
        return;
    }

    usuariosExistentes.push(novoUsuario);

    localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes));

    alert('Cadastro realizado com sucesso!');
    window.location.href = '../Login/login.html';
});