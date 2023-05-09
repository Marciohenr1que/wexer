
let form1 = document.getElementById('paciente1')
form1?.addEventListener('submit', (evento) => {
    evento.preventDefault()

    let cpf = document.getElementById('cpf').value
    let nome = document.getElementById('Nome').value
    let dnascimento = document.getElementById('data_nascimento').value
    let email = document.getElementById('email').value
    let sexo = document.getElementById('sexo').value
    let nacionalidade = document.getElementById('nacionalidade').value
    let naturalidade = document.getElementById('naturalidade').value
    let profissao = document.getElementById('profissao').value
    let escolaridade = document.getElementById('escolaridade').value
    let estado_civil = document.getElementById('estado_civil').value
    let mae = document.getElementById('mae').value
    let pai = document.getElementById('pai').value
    

    lista(cpf,nome,dnascimento,email,sexo,nacionalidade,naturalidade,profissao,escolaridade,estado_civil,mae,pai)
})
async function lista(cpf, nome, dnascimento, email, sexo, nacionalidade, naturalidade, profissao, escolaridade, estado_civil, mae, pai) {  
  const post_id = Math.floor(Math.random() * 9000) + 1000 //gerar id aleatorios*    // mathrandom recebe um id que multiplica por 9000
  //soma 1000 para assim ter 4 digitos  //mathfloor para deixar como numero inteiro
  const paciente = {
        "id": post_id,
        "cpf": cpf,
        "nome": nome,
        "dnascimento": dnascimento,
        "email": email,
        "sexo": sexo,
        "nacionalidade": nacionalidade,
        "naturalidade": naturalidade,
        "profissao": profissao,
        "escolaridade": escolaridade,
        "estado_civil": estado_civil,
        "mae": mae,
        "pai": pai,
        
    }

    await lista_paciente(paciente)
}
//* gerar ids aleatorios porque estou usando urlparams e percebi que cada vez que fazia a exclusao de todos os pacientes no meu caso como o id gerava novamente exemplo id1 
//os resultados na pagina do paciente estava pegando tambem os fatos e sessoes do cliente que tinha excluido teria que no caso excluir fatos e sessoes deste cliente mas 
//como iria excluir os fatos e sessoes se ja tinha excluido o paciente na pagina anterior
async function lista_paciente(dados){
        await fetch("http://localhost:3000/paciente", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
}
  
 async function getposts(){
  const apiResponse = await fetch('http://localhost:3000/paciente')
     const posts = await apiResponse.json()  
     console.log(posts)
   
     
      posts.forEach(post => Exibirposts(post))
     console.log(posts)
     
     
}

window.addEventListener('DOMContentLoaded', () => {
    getposts();
})

const botaofiltrar = document.querySelector('#filtrar');
const procurar = document.querySelector('#pesquisarnome');
const exibirPacientesDiv = document.querySelector('#pacientes23');

// Função para exibir os pacientes
function exibirPacientes(pacientes) {
  // Limpar a div e exibe os pacientes
  exibirPacientesDiv.innerHTML = ''

  //  pacientes e exibir cada um na div
  pacientes.forEach((paciente) => {
    exibirPaciente(paciente);
  })
}

// Função exibir paciente
function exibirPaciente(paciente) {
  exibirPacientesDiv.innerHTML += `<div name="titulos" class="container d-flex border">
                <div class="col-2 p-1 ps-2 d-flex justify-content-center"><p class="text-secondary mb-0">${paciente.id}</p></div>
                <div class="col-4 p-1 ps-2 border-start"><p class="text-secondary mb-0" onclick="leitura(${paciente.id})">${paciente.nome}</p></div>
                <div class="col-4 p-1 ps-2 border-start"><p class="text-secondary mb-0">${paciente.cpf}</p></div>
                <div class="col-2 p-1 ps-2 border-start d-flex justify-content-center"><p class="text-secondary mb-0">
                   <a class="button1" id="adicionar" href="meuspacientes.html?usuario=${paciente.id}">
                    <img src="./imagens/novo (1).png" alt="">
                   </a>
                    <button class="button1" id="" onclick="editar(${paciente.id})"><img src="./imagens/novo (6).png" alt=""></button>
                    <button class="button1" onclick="removerpost(${paciente.id})"><img src="./imagens/novo (2).png" alt=""></button>
                </p></div>`;
}

// Ao clicar no botão filtrar
botaofiltrar.addEventListener('click', async () => {
  // Obter a entrada de pesquisa
  const valorBusca = procurar.value

  // Fazer a requisição para buscar todos os pacientes do json-server
  const response = await fetch('http://localhost:3000/paciente');
  const pacientes = await response.json()

  // Filtrar os pacientes com base na entrada de pesquisa
  const pacientesFiltrados = pacientes.filter((paciente) =>
    paciente.nome.toLowerCase().includes(valorBusca.toLowerCase())
  )

  // mostrar paciente filtrado
  exibirPacientes(pacientesFiltrados)
})

// Ao carregar a página, exibir todos os pacientes
async function carregarPacientes() {
  // Fazer a requisição para buscar todos os pacientes do json-server
  const response = await fetch('http://localhost:3000/paciente');
  const pacientes = await response.json();

  // Exibir os pacientes
  exibirPacientes(pacientes)
}

carregarPacientes()

async function leitura(id) {
  
  const post1 = await fetch(`http://localhost:3000/paciente/${id}`);
  const post = await post1.json();

  document.getElementById('dadospaciente').open = true;
  document.getElementById('cpfpaciente').value = post.cpf;
  document.getElementById('Nomepaciente').value = post.nome;
  document.getElementById('data_nascimentopaciente').value = post.dnascimento;
  document.getElementById('emailpaciente').value = post.email;
  document.getElementById('sexopaciente').value = post.sexo;
  document.getElementById('nacionalidadepaciente').value = post.nacionalidade;
  document.getElementById('naturalidadepaciente').value = post.naturalidade;
  document.getElementById('profissaopaciente').value = post.profissao;
  document.getElementById('escolaridadepaciente').value = post.escolaridade;
  document.getElementById('estado_civilpaciente').value = post.estado_civil;
  document.getElementById('maepaciente').value = post.mae;
  document.getElementById('paipaciente').value = post.pai;
  const dados = document.querySelectorAll('#dadospaciente input, #dadospaciente select')
  dados.forEach(dadospaciente => {
    dadospaciente.readOnly = true //definir somente para leitura
    dadospaciente.disabled = true // impede que modifique o formulario
  })
   
}

async function editar(id) {
  const post1 = await fetch(`http://localhost:3000/paciente/${id}`);
  const post = await post1.json();

  document.getElementById('editarpaciente').open = true;
  document.getElementById('cpf1').value = post.cpf;
  document.getElementById('Nome1').value = post.nome;
  document.getElementById('data_nascimento1').value = post.dnascimento;
  document.getElementById('email1').value = post.email;
  document.getElementById('sexo1').value = post.sexo;
  document.getElementById('nacionalidade1').value = post.nacionalidade;
  document.getElementById('naturalidade1').value = post.naturalidade;
  document.getElementById('profissao1').value = post.profissao;
  document.getElementById('escolaridade1').value = post.escolaridade;
  document.getElementById('estado_civil1').value = post.estado_civil;
  document.getElementById('mae1').value = post.mae;
  document.getElementById('pai1').value = post.pai;

  const form = document.getElementById('pacienteeditar');
  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const body = Object.fromEntries(new URLSearchParams(new FormData(form)))
    //conversão de formulário em objeto JSON
    await fetch(`http://localhost:3000/paciente/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    document.getElementById('editarpaciente').open = false;
     
  });
}


async function buscarPacientePorId() {
    const urlstring = window.location.search
    const params = new URLSearchParams(urlstring)
    const usuario = params.get('usuario')
  const apiResponse = await fetch('http://localhost:3000/paciente/' + usuario)
    const paciente = await apiResponse.json();
  let pacientenovo = document.getElementById('cliente')
  const dataDado = new Date(paciente.dnascimento) //aqui estou recebendo a data sem formatar.
      const dia = dataDado.getDate() // aqui pego o dia
      const mes = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(dataDado) // formato o mes para portugues 
      const ano = dataDado.getFullYear() // aqui formato o ano 
      const dataFormatada = `${dia} de ${mes} de ${ano}` // aqui armazena a data completa formatada 
    pacientenovo.innerHTML += `<h3 class="mb-3 text-center mx-auto">identificação do paciente</h3>
                <span class="identificaçao"><img src="./imagens/Group2.png" alt=""> Paciente</span>
                <p class="m-2" style="font-size: 25px;">${paciente.nome}</p>
                <span class="identificaçao"><img src="./imagens/Group3.png" alt=""> Nascimento</span>
                <p class="m-2" style="font-size: 25px;">${dataFormatada}</p>
                <span class="identificaçao"><img src="./imagens/Group4.png" alt=""> Profissão</span>
                <p class="m-2" style="font-size: 25px;">${paciente.profissao}</p>
                <span class="identificaçao"><img src="./imagens/Group5.png" alt=""> Escolaridade</span>
                <p class="m-2" style="font-size: 25px;">${paciente.escolaridade}</p>`

}
document.addEventListener('DOMContentLoaded', () => {
    buscarPacientePorId() 
})
    

async function removerpost(id) {
   await fetch(`http://localhost:3000/paciente/${id}`, {
       method: "DELETE"
        
  })
}


//quando a pessoa fazer o login e se tiver um cadastro no banco de dados sera exibido seu nome e email
window.addEventListener('DOMContentLoaded', () => {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (usuarioLogado) {
    const nomeUsuario = usuarioLogado.nome;
    const emailUsuario = usuarioLogado.mail;
    const login123 = document.getElementById('loginNovo');
    const mail = document.getElementById('emaiL');
    login123.innerHTML = `<h4 class="fs-3" id="nome">${nomeUsuario}</h4>`;
    mail.innerHTML = `<li>${emailUsuario}</li>`;
  }
})

 const prontuarionovo = document.getElementById('novasessao')
prontuarionovo.addEventListener('submit', (novo) => {
    novo.preventDefault()
    let data = document.getElementById('input-data').value
    let horainicio = document.getElementById('input-hora-inicio').value
    let horafim = document.getElementById('input-hora-fim').value
    let titulo = document.getElementById('input-titulo').value
    let resumo = document.getElementById('input-resumo').value
    let valor = document.getElementById('valor').value
    let formadepagamento = document.getElementById('input-forma-pagamento').value
    let pago = document.getElementById('input-pago').checked
    let naopago = document.getElementById('input-nao-pago').checked
    let status = '' // começamos com string vazia se for pago ele defini status pago se nao status nao pago no caso de ser selecionado nao pago
    if (pago) {
      status = 'pago'
    } else if (naopago) {
      status = 'não pago'
  }
   
    modal(data, horainicio, horafim, titulo, resumo, valor, formadepagamento, status)
    console.log(status)
    
})
async function modal(data, horainicio, horafim, titulo, resumo, valor, formadepagamento, status,) {
    const urlParams =  new URLSearchParams(window.location.search)
  const pacienteId = urlParams.get('usuario')
  
    const sessao = {
        "data": data,
        "hora_Inicio": horainicio,
        "hora_Fim": horafim,
        "titulo_sessao": titulo,
        "resumo_sessao": resumo,
        "valor_sessao": valor,
        "forma_sessao": formadepagamento,
        "status": status,
        "paciente": pacienteId,
        
    };
    await lista_sessao(sessao)
}

async function lista_sessao(id) {
    
    await fetch('http://localhost:3000/sessao', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
}


 
const prontuarionovomodal = document.getElementById('Modalrelevante')
prontuarionovomodal?.addEventListener('submit', (novomodal) => {
    novomodal.preventDefault()

    let datarelevante = document.getElementById('input-datafatos').value
    let titulo = document.getElementById('input-titulofatos').value
    let textorelevante = document.getElementById('input-descricao').value

    modalrelevante(datarelevante,titulo,textorelevante)

    
})
async function modalrelevante(datarelevante, titulo, textorelevante) {
    const urlParams =  new URLSearchParams(window.location.search)
    const pacienteId = urlParams.get('usuario')
    const post3 = {
       
        "data": datarelevante,
        "titulo": titulo,
        "textorelevante": textorelevante,
        "paciente": pacienteId
    }
    await lista_fatos(post3)
}
async function lista_fatos(dados3){
        await fetch("http://localhost:3000/fatos_relevantes", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados3)
             
        });
}

async function listarSessoesEFatos() {
  const urlParams = new URLSearchParams(window.location.search)
  const usuario = urlParams.get('usuario')
  const responseSessoes = await fetch('http://localhost:3000/sessao')
  const sessoes = await responseSessoes.json()
  const sessoesFiltradas = sessoes.filter(sessao => sessao.paciente === usuario)

  const responseFatos = await fetch('http://localhost:3000/fatos_relevantes')
  const fatos = await responseFatos.json();
  const fatosFiltrados = fatos.filter(fato => fato.paciente === usuario)

  const dados = [...sessoesFiltradas, ...fatosFiltrados]
  dados.sort((a, b) => new Date(a.data) - new Date(b.data))

  const container = document.getElementById('sessao123') 
  contagem = 1
  for (const dado of dados) {
    if (dado.titulo_sessao) {
      const dataDado = new Date(dado.data) //aqui estou recebendo a data sem formatar.
      const dia = dataDado.getDate() // aqui pego o dia
      const mes = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(dataDado) // formato o mes para portugues 
      const ano = dataDado.getFullYear() // aqui formato o ano 
      const dataFormatada = `${dia} de ${mes} de ${ano}` // aqui armazena a data completa formatada 
      const sessaoHTML = `<div class="in-between2"></div><a id="sessaonova" href="finalpaciente.html?usuario=${dado.id}&sessao=${contagem}" onclick=><div class="sessao1 position-relative bg-white mt-5 rounded-3">
  <img class="elipse" src="./imagens/Ellipse 239.png" alt="">
  <img class="m-white" src="./imagens/mental-health-line.png" alt="">
  <div class="d-flex justify-content-between">
    <h4 class="title-sf">Sessão ${contagem}</h4></a>
    <div class="ellipsis">
  <button class="btn btn-secondary dropdown" data-bs-toggle="dropdown" id="seleccionar">. . .</button>
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" onclick="editarsessao(${dado.id})"><img src="./imagens/novo (7).png" alt=""> editar</a></li>
    <li><a class="dropdown-item" onclick="deletar(${dado.id})"><img src="./imagens/novo (8).png" alt=""> deletar</a></li>
  </ul>
</div>
  </div>
  <p id="dataescrita">${dataFormatada}</p>
  <p class="paragrafo1 mb-0">${dado.resumo_sessao}</p>
</div>`
      
      contagem++
      container.insertAdjacentHTML('afterbegin', sessaoHTML)
    } else { // É um fato relevante 
      const dataDado = new Date(dado.data) //aqui estou recebendo a data sem formatar.
      const dia = dataDado.getDate() // aqui pego o dia
      const mes = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(dataDado) // formato o mes para portugues 
      const ano = dataDado.getFullYear() // aqui formato o ano 
      const dataFormatada = `${dia} de ${mes} de ${ano}` // aqui armazena a data completa formatada 
      const fatoHTML = `<div class="in-between"></div>
                    <div class="relevante1 position-relative bg-white rounded-3 mt-4">
                      <img class="elipse-b" src="./imagens/Ellipse 239 (1).png" alt="">
                      <img class="m-white-b" src="./imagens/Groupnovo.png" alt="">
                      <div class="d-flex justify-content-between">
                        <h4 class="title-sf">Fatos Relevantes</h4>
                        <div class="ellipsis"><button class="btn btn-secondary dropdown" data-bs-toggle="dropdown" id="seleccionar">. . .</button>
                      </button>
                      <ul class="dropdown-menu">
                      <li><a class="dropdown-item" onclick="editarfatos(${dado.id})"><img src="./imagens/novo (7).png" alt=""> editar</a></li>
                      <li><a class="dropdown-item" onclick="deletar2(${dado.id})"><img src="./imagens/novo (8).png" alt=""> deletar</a></li>
                      </ul></div>
                        </div>
                      <p class="field-span">${dataFormatada}</p>
                      <p class="field-span mb-0">${dado.textorelevante}</p>
                    </div>`      
      container.insertAdjacentHTML('afterbegin', fatoHTML)
      
    }
  }
}
window.addEventListener('DOMContentLoaded', () => {
   listarSessoesEFatos()
})
//deletar sessoes
async function deletar(id) {
   await fetch(`http://localhost:3000/sessao/${id}`, {
       method: "DELETE"
        
  })
} 


async function editarsessao(id) {
 document.getElementById('modaleditar').open = true
  const post1 = await fetch(`http://localhost:3000/sessao/${id}`);
  const editar_sessao = await post1.json()
  
  document.getElementById('data12').value = editar_sessao.data
  document.getElementById('hora-inicio1').value = editar_sessao.hora_Inicio
  document.getElementById('hora-fim1').value = editar_sessao.hora_Fim
  document.getElementById('titulo1').value = editar_sessao.titulo_sessao
  document.getElementById('resumo1').value = editar_sessao.resumo_sessao
  document.getElementById('valoreditar').value = editar_sessao.valor_sessao
  document.getElementById('forma-pagameto12').value = editar_sessao.forma_sessao
  if (editar_sessao.status === "pago") {
  document.getElementById('pago1').checked = true
  document.getElementById('naopago1').checked = false
} else if (editar_sessao.status === "não pago") {
  document.getElementById('pago1').checked = false
  document.getElementById('naopago1').checked = true
  }
  document.getElementById('paciente22').value = editar_sessao.paciente
  console.log(document.getElementById('paciente22').value)
 const formularioeditar = document.getElementById('novasessaoeditar22');
formularioeditar.addEventListener('submit', async (event) => {
  event.preventDefault();
  const body = { // aqui é o corpo da sessao do meu paciente onde vou atualizar com os novos dados mudo o conteudo do paciente em editar_sessao
    data: formularioeditar.elements.data12.value,
    hora_Inicio: formularioeditar.elements['hora-inicio1'].value, //elements é propriedade do formulario ele retorna os valores com alteraçao ou nao .
    hora_Fim: formularioeditar.elements['hora-fim1'].value, //como tenho um - tenho que passar nome da div em colchetes.
    titulo_sessao: formularioeditar.elements.titulo1.value,
    resumo_sessao: formularioeditar.elements.resumo1.value,
    valor_sessao: formularioeditar.elements.valoreditar.value,
    forma_sessao: formularioeditar.elements['forma-pagameto12'].value,
    status: formularioeditar.elements.status.value,
    paciente: document.getElementById('paciente22').value, //aqui esta armazenado o id do paciente 
  }
  
  await fetch(`http://localhost:3000/sessao/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })  
});
}
//deletar fatos
   async function deletar2(id) {
   await fetch(`http://localhost:3000/fatos_relevantes/${id}`, {
       method: "DELETE"
        
  })
} 
async function editarfatos(id) {
  document.getElementById('modaleditarfatos').open = true;
  const post1 = await fetch(`http://localhost:3000/fatos_relevantes/${id}`);
  const editar_fatos = await post1.json()
 //criei uma div vazia no modal de editar fatos para armazenar o id do paciente ele vem da url.
  document.getElementById('datafatoseditar').value = editar_fatos.data
  document.getElementById('titulofatoseditar').value = editar_fatos.titulo
  document.getElementById('descriçãoeditar').value = editar_fatos.textorelevante
  
  document.getElementById('fatospaciente').value = editar_fatos.paciente
  const formulariofatoeditar = document.getElementById('Modalrelevanteeditar');
  formulariofatoeditar.addEventListener('submit', async (event) => {
    event.preventDefault();
    const body = {
      data: formulariofatoeditar.elements.datafatoseditar.value,
      titulo: formulariofatoeditar.elements.titulofatoseditar.value,
      textorelevante: formulariofatoeditar.elements.descriçãoeditar.value,
      paciente: document.getElementById('fatospaciente').value

    }
      
    await fetch(`http://localhost:3000/fatos_relevantes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    
  })
}


async function finalpacientesessao() {
  const urlParams = new URLSearchParams(window.location.search);
  const usuario = urlParams.get('usuario')
   const sessao = urlParams.get('sessao')
  console.log(usuario)

  const responseSessoes = await fetch('http://localhost:3000/sessao/' + sessao)
  const sessoes = await responseSessoes.json()
  
  const pacientefinal = document.querySelector('#pacientesessao35')
   const data = new Date(sessoes.data);
const dia = data.getDate();
const mes = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(data)//formatando a data para modo br e escrita
const ano = data.getFullYear() 
const dataFormatada = `${dia} de ${mes} de ${ano}`
 
    pacientefinal.innerHTML = `
    <div class="container p-2 mt-5">
      <p class="fs-2 mt-5">Sessão</p>
      <div class="bg-white p-4 d-flex flex-column shadow rounded-3">
        <div class="justify-content-between bg-white d-flex align-items-end">
          <div>
            <h4>Sessao${sessao}</h4>
          </div>
          <div>
            <img onclick="" src="./imagens/novo (7).png" alt="">
            <img onclick="" src="./imagens/novo (8).png" alt="">
          </div>
        </div>
        <div class="d-flex gap-2">
          <p>${dataFormatada}</p>
          <p>inicio ${sessoes.hora_Inicio}</p>
          <p>ate ${sessoes.hora_Fim}</p>
        </div>
        <div class="mt-4">
          <p>${sessoes.resumo_sessao}</p>
          <div class="mt-4">
            <h4>Pagamento</h4>
          </div>
          <div class="d-flex gap-2 mt-3 mb-0" id="paragrafofixo">
            <p>Valor</p>
            <p>Forma de pagamento</p>
            <p>Status</p>
          </div>
          <div class="d-flex" id="paragrafopagamento">
            <p>${sessoes.valor_sessao}</p>
            <p>${sessoes.forma_sessao}</p>
            <p>${sessoes.status}</p>
          </div>
        </div>`
  }
 



