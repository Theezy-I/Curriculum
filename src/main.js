
const text = "Oi, eu sou o Arthur.";
const speed = 100;
let i = 0;

function typeWriter() {
    const el = document.getElementById("typewriter");
    if (el && i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

window.onload = function() {
    typeWriter();
};



const terminalToggle = document.getElementById('terminal-toggle');
const terminalWindow = document.getElementById('terminal-window');
const closeTerminal = document.getElementById('close-terminal');
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

// Dicionário de Comandos
const commands = {
    help: "Comandos disponíveis: about, stack, contact, clear, date",
    about: "Estudante de ADS, fã de cinema e roupas.",
    stack: "Python | JavaScript | React Basics | SQL | Git",
    contact: "Email: diasarthur.txt@gmail.com (Mande um oi!)",
    date: () => new Date().toLocaleString()
};

// Abrir Terminal
if (terminalToggle) {
    terminalToggle.addEventListener('click', () => {
        terminalWindow.classList.toggle('hidden');
        if (!terminalWindow.classList.contains('hidden')) {
            terminalInput.focus();
        }
    });
}

// Fechar Terminal
if (closeTerminal) {
    closeTerminal.addEventListener('click', () => {
        terminalWindow.classList.add('hidden');
    });
}

// Digitar no Terminal
if (terminalInput) {
    terminalInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const input = this.value.toLowerCase().trim();
            let response = "";

            // 1. Mostra o que você digitou no histórico
            terminalOutput.innerHTML += `<div><span style="color:#64ffda">></span> ${input}</div>`;

            // 2. Processa o comando
            if (input === 'clear') {
                terminalOutput.innerHTML = "";
            } else {
                // Busca no dicionário
                const commandValue = commands[input];

                if (commandValue) {
                    // Se for função executa, se for texto exibe
                    response = typeof commandValue === 'function' ? commandValue() : commandValue;
                } else {
                    response = `Comando '${input}' não encontrado. Digite 'help'.`;
                }
                
                // Exibe a resposta
                terminalOutput.innerHTML += `<div style="color: #8892b0; margin-bottom: 10px;">${response}</div>`;
            }
            
            // 3. Limpa o input e rola para baixo
            this.value = '';
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });
}