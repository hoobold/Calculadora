let numeroAtual = '';
let numeroAnterior = '';
let operador = '';
let historico = '';
let historicoLista = [];
let acabouDeCalcular = false;

function atualizarDisplay() {
    document.getElementById('display').value = numeroAtual || '0';
    document.getElementById('historico').innerText = historico;
}

function adicionarNumero(num) {
  
    if (acabouDeCalcular) {
      numeroAtual = '';
      acabouDeCalcular = false;
    }

    if (num === '.' && numeroAtual.includes('.')) return;
    numeroAtual += num;
    atualizarDisplay();
}

function escolherOperador(op) {
    if (numeroAtual === '') return;

    if (numeroAnterior !== '') {
        calcular();
    }

    operador = op;
    numeroAnterior = numeroAtual;
    numeroAtual = '';
    historico = `${numeroAnterior} ${op}`;
    atualizarDisplay();
}

function calcular() {
    if (numeroAnterior === '' || numeroAtual === '') return;

    const anterior = parseFloat(numeroAnterior);
    const atual = parseFloat(numeroAtual);
    let resultado;

    switch (operador) {
        case '+': resultado = anterior + atual; break;
        case '-': resultado = anterior - atual; break;
        case '*': resultado = anterior * atual; break;
        case '/':
            if (atual === 0) {
                numeroAtual = 'Erro';
                atualizarDisplay();
                return;
            }
            resultado = anterior / atual;
            break;
    } acabouDeCalcular = true;

    historicoLista.push({
        conta: `${numeroAnterior} ${operador} ${numeroAtual}`,
        resultado: resultado
    });

    numeroAtual = resultado.toString();
    numeroAnterior = '';
    operador = '';

    atualizarDisplay();
    atualizarHistorico();
}

function porcentagem() {
    if (numeroAtual === '') return;
    numeroAtual = (parseFloat(numeroAtual) / 100).toString();
    acabouDeCalcular = true;
    atualizarDisplay();
}

function limpar() {
    numeroAtual = '';
    numeroAnterior = '';
    operador = '';
    historico = '';
    atualizarDisplay();
}

function apagar() {
    numeroAtual = numeroAtual.slice(0, -1);
    atualizarDisplay();
}

function atualizarHistorico() {
    const historicoDiv = document.getElementById('historico');
    historicoDiv.innerHTML = '';

    historicoLista.slice().reverse().forEach((item, index) => {
        const linha = document.createElement('div');
        linha.classList.add('linha-historico');
        linha.innerHTML = `${item.conta} = <strong>${item.resultado}</strong>`;

        linha.onclick = () => restaurarHistorico(historicoLista.length - 1 - index);

        historicoDiv.appendChild(linha);
    });
}

    document.addEventListener('keydown', function(e) {
        if (/^[0-9]$/.test(e.key)) {
        adicionarNumero(e.key);
        } else if (e.key === '.') {
        adicionarNumero('.');
        } else if (['+', '-', '*', '/'].includes(e.key)) {
        escolherOperador(e.key);
        } else if (e.key === 'Enter') {
        calcular();
        } else if (e.key === 'Backspace') {
        apagar();
        } else if (e.key === 'Escape') {
        limpar();
    }
});