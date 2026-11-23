// Estado da aplicação
let state = {
    servico: '',
    preco: '',
    data: '',
    horario: ''
};

// Seleciona os elementos do DOM
const servicoCards = document.querySelectorAll('.servico-card');
const resServico = document.getElementById('res-servico');
const resData = document.getElementById('res-data');
const resHorario = document.getElementById('res-horario');
const resTotal = document.getElementById('res-total');
const btnConfirmar = document.getElementById('btn-confirmar');
const calendarioDias = document.getElementById('calendario-dias');
const horariosContainer = document.getElementById('horarios-container');
const horariosGrid = document.getElementById('horarios-grid');

// 1. Lógica de Selecionar Serviço
servicoCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove seleção anterior
        servicoCards.forEach(c => c.classList.remove('selected'));
        // Adiciona seleção atual
        card.classList.add('selected');
        
        // Pega os dados do HTML (dataset)
        state.servico = card.dataset.servico;
        state.preco = card.dataset.preco;
        
        // Atualiza o resumo
        resServico.textContent = state.servico;
        resTotal.textContent = state.preco;
        checkForm();
    });
});

// 2. Lógica de Gerar Calendário (Simulando Outubro de 2026)
function renderizarCalendario() {
    calendarioDias.innerHTML = '';
    // Outubro de 2026 começa numa Quinta-feira (4 espaços vazios antes do dia 1)
    for(let i=0; i<4; i++) {
        calendarioDias.innerHTML += `<div></div>`;
    }
    for(let dia = 1; dia <= 31; dia++) {
        // Simula dias passados ou indisponíveis (fins de semana passados)
        const isDisabled = dia < 23; 
        
        const div = document.createElement('div');
        div.classList.add('dia');
        if(isDisabled) div.classList.add('disabled');
        div.textContent = dia;
        
        if(!isDisabled) {
            div.addEventListener('click', () => {
                // Remove seleção anterior
                document.querySelectorAll('.dia').forEach(d => d.classList.remove('selected'));
                div.classList.add('selected');
                
                // Atualiza estado
                state.data = `Outubro ${dia}, 2026`;
                resData.textContent = `${dia}/10/2026`;
                
                // Mostra horários
                gerarHorarios();
                checkForm();
            });
        }
        calendarioDias.appendChild(div);
    }
}

// 3. Lógica de Gerar Horários
function gerarHorarios() {
    horariosContainer.style.display = 'block';
    horariosGrid.innerHTML = '';
    
    const horariosDisponiveis = ['09:00', '10:30', '13:00', '14:30', '16:00', '17:30'];
    
    horariosDisponiveis.forEach(hora => {
        const btn = document.createElement('button');
        btn.classList.add('horario-btn');
        btn.textContent = hora;
        
        btn.addEventListener('click', () => {
            document.querySelectorAll('.horario-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            
            state.horario = hora;
            resHorario.textContent = hora;
            checkForm();
        });
        
        horariosGrid.appendChild(btn);
    });
}

// 4. Valida se pode habilitar o botão de confirmar
function checkForm() {
    if(state.servico && state.data && state.horario) {
        btnConfirmar.disabled = false;
    } else {
        btnConfirmar.disabled = true;
    }
}

// 5. Ação de Confirmar
btnConfirmar.addEventListener('click', () => {
    if(btnConfirmar.disabled) return;
    
    // Simula o envio com um alerta bonito
    btnConfirmar.textContent = "Processando...";
    
    setTimeout(() => {
        alert(`Agendamento Confirmado!\n\nServiço: ${state.servico}\nData: ${state.data}\nHorário: ${state.horario}\nTotal: ${state.preco}`);
        
        // Reseta o formulário
        window.location.reload();
    }, 1000);
});

// Inicializa o calendário ao carregar a página
renderizarCalendario();