const readline = require('readline'); // Pacote nativo do Node.js para entrada de dados via terminal

// Classe que simula uma fila (FIFO - First In, First Out)
class Fila {
  constructor() {
    this.itens = [];
  }

  enfileirar(elemento) {
    this.itens.push(elemento); // Adiciona o paciente no fim da fila
  }

  desenfileirar() {
    return this.itens.shift(); // Remove o paciente do início da fila
  }

  frente() {
    return this.itens[0]; // Retorna o primeiro paciente da fila
  }

  estaVazia() {
    return this.itens.length === 0; // Verifica se a fila está vazia
  }

  imprimir() {
    return this.itens.join(', '); // Retorna todos os pacientes da fila como string
  }

  limpar() {
    this.itens = []; // Esvazia a fila
  }
}

// Classe que simula uma pilha (LIFO - Last In, First Out)
class Pilha {
  constructor() {
    this.itens = [];
  }

  empilhar(elemento) {
    this.itens.push(elemento); // Adiciona o paciente no topo da pilha
  }

  imprimir() {
    return this.itens.join(', '); // Retorna todos os pacientes empilhados como string
  }

  buscar(paciente) {
    return this.itens.includes(paciente); // Verifica se o paciente está na pilha
  }

  limpar() {
    this.itens = []; // Esvazia a pilha
  }
}

// Criação da interface para entrada e saída no terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função principal que executa a simulação
function iniciarSimulacao() {
  const fila = new Fila();     // Instancia a fila de atendimento
  const pilha = new Pilha();   // Instancia a pilha de prontuários

  console.log('🏥 Simulação de atendimento hospitalar');

  // Função para iniciar ou reiniciar a simulação
  function iniciarCadastroPacientes() {
    fila.limpar(); // Esvazia a fila anterior
    pilha.limpar(); // Esvazia a pilha anterior

    rl.question('Quantos pacientes deseja adicionar? ', (quantidade) => {
      let total = parseInt(quantidade);
      let count = 0;

      // Função recursiva para cadastrar os pacientes um a um
      function adicionarPaciente() {
        if (count < total) {
          rl.question(`Digite o nome do paciente ${count + 1}: `, (nome) => {
            fila.enfileirar(nome); // Adiciona o nome na fila
            count++;
            adicionarPaciente(); // Chama novamente até completar o total
          });
        } else {
          mostrarMenu(); // Após adicionar todos, exibe o menu de opções
        }
      }

      adicionarPaciente(); // Inicia o processo de adicionar pacientes
    });
  }

  // Menu com as ações disponíveis para o usuário
  function mostrarMenu() {
    console.log('\n📋 Menu:');
    console.log('1. Ver próximo paciente');
    console.log('2. Atender paciente');
    console.log('3. Ver fila');
    console.log('4. Ver prontuários');
    console.log('5. Buscar paciente em prontuários');
    console.log('6. Reiniciar simulação');
    console.log('7. Sair');

    rl.question('Escolha uma opção: ', (opcao) => {
      switch (opcao) {
        case '1':
          // Mostra quem será o próximo a ser atendido
          console.log('➡️ Próximo paciente:', fila.frente() || 'Fila vazia');
          mostrarMenu();
          break;
        case '2':
          // Atende o paciente da frente da fila e armazena na pilha
          if (fila.estaVazia()) {
            console.log('⚠️ Fila vazia. Ninguém para atender.');
          } else {
            const atendido = fila.desenfileirar();
            console.log(`✅ Paciente atendido: ${atendido}`);
            pilha.empilhar(atendido);
          }
          mostrarMenu();
          break;
        case '3':
          // Exibe a fila atual de pacientes
          console.log('📋 Fila atual:', fila.imprimir() || 'Vazia');
          mostrarMenu();
          break;
        case '4':
          // Exibe a pilha de prontuários
          console.log('📁 Prontuários empilhados:', pilha.imprimir() || 'Nenhum');
          mostrarMenu();
          break;
        case '5':
          // Permite buscar um paciente na pilha de prontuários
          rl.question('Digite o nome do paciente a buscar: ', (nomeBusca) => {
            const encontrado = pilha.buscar(nomeBusca);
            console.log(encontrado
              ? `🔍 ${nomeBusca} está nos prontuários.`
              : `❌ ${nomeBusca} não encontrado nos prontuários.`);
            mostrarMenu();
          });
          break;
        case '6':
          // Reinicia a simulação com nova fila e pilha
          console.log('🔄 Reiniciando simulação...\n');
          iniciarCadastroPacientes();
          break;
        case '7':
          // Encerra o programa
          console.log('🏁 Encerrando simulação...');
          rl.close(); // Fecha a interface readline
          break;
        default:
          // Caso o usuário digite uma opção inválida
          console.log('❌ Opção inválida.');
          mostrarMenu();
      }
    });
  }

  iniciarCadastroPacientes(); // Inicia o primeiro ciclo de cadastro
}

iniciarSimulacao(); // Executa a função principal
