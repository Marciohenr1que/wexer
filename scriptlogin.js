//? evita acessar a função quando for nula //
document.querySelector("#cadastro31")?.addEventListener("submit", (cadastro) => {
    cadastro.preventDefault()
    
  
    let nome = document.querySelector("#exampleInputname1").value
    let mail = document.querySelector("#exampleInputmail1").value


  let password = document.getElementById("cadastro31")
  password.innerHTML = `<form action=""><div class="password">
      <div class="logo1">
          <img src="./imagens/logo (3).png" alt="">
      </div>
      <div class="logo2">
          <img src="./imagens/Seja bem-vindo(a)! (2).png" alt="">
      </div>
      <div class="logo3">
          <img src="./imagens/Escolha uma senha.png" alt="">
      </div>
      <div class="form-group3">
          <label for="exampleInputPassword1" class="labile1">Senha</label>
          <input type="password" class="form-control2" id="exampleInputPassword1" placeholder="senha">
      </div>
      <div class="form-group3">
          <label for="exampleInputPassword2" class="labile1">confirmar senha</label>
          <input type="password" class="form-control2" id="exampleInputPassword2" placeholder="confirmar senha">
      </div>
      <div class="senha1">
          <img src="./imagens/_Precisa no mínimo 8 digitos.png" alt="">
      </div>
      <div class="senha1">
          <img src="./imagens/+..png" alt="">
      </div>
      <div class="senha1">
          <img src="./imagens/_Precisa conter uma letra em MAIÚSCULA.png" alt="">
      </div>
      <div class="final">
      <button type="submit" class="btn btn-primary" id="botao12" onclick="validarSenha()">Prosseguir<svg xmlns="http://www.w3.org/2000/svg" width="16"
              height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
          </svg></button>
          </div>
  </div></form>`
    
    form.addEventListener('submit', (usuario) => {
    usuario.preventDefault()
    let senha1 = document.querySelector("#exampleInputPassword1").value
    let senhaconfirma = document.querySelector("#exampleInputPassword2").value

        adicionar(nome, mail, senha1, senhaconfirma)
        
    
 })
  
})

//confirmando senhas .
  function validarSenha() {
    let senha1 = document.getElementById("exampleInputPassword1").value
    let senha2 = document.getElementById("exampleInputPassword2").value

    if (senha1 !== senha2) {
        alert('As senhas estão diferentes.')
        return
    }

    if (senha1.length < 8) {
        alert('A senha deve ter pelo menos 8 caracteres.')
        return
    }

    let temCaractereEspecial = false //indica que não há caractere especial na senha
    let temNumero = false
    let temLetraMaiuscula = false
//for...of para percorrer cada caractere da senha e verificamos individualmente se há um caractere especial, um número e uma letra maiúscula. 
    for (let caractere of senha1) {
        if (/[!@#$%^&*]/.test(caractere)) {
            temCaractereEspecial = true;
        } else if (/[0-9]/.test(caractere)) {
            temNumero = true;
        } else if (/[A-Z]/.test(caractere)) {
            temLetraMaiuscula = true
        }
    }

    if (!temCaractereEspecial || !temNumero || !temLetraMaiuscula) {
        alert('A senha deve conter pelo menos um caractere especial, um número e uma letra maiúscula.')
        return;
    }

    alert('Senhas válidas!');
    location.replace("index.html"); // redireciona para a tela inicial
}

const form = document.querySelector("form")
async function adicionar(nome,mail,senha1,senhaconfirma){  //aqui vou 
    const login = {
        "nome": nome,
        "mail": mail,
        "senha1": senha1,
        "confirmarsenha": senhaconfirma,
    }

    await createpost(login)
}

async function createpost(login) {
    await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    });
}

document.querySelector("#Login23").addEventListener("submit", async (event) => {
    event?.preventDefault()
    const inputusuario = document.getElementById("exampleInputEmail1").value
    const inputsenha = document.getElementById("exampleInputPassword1").value
  const response = await fetch("http://localhost:3000/login")
    const logar = await response.json()
    
  const usuarioEncontrado = logar.find(item => item.nome == inputusuario && item.senha1 == inputsenha && item.confirmarsenha == inputsenha) 

    if (usuarioEncontrado) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado))
    location.replace("pacientes.html")
  } else {
      alert("senha incorreta")
  }
  console.log(logar)  
})

// //numa suposta api precisava fazer uma ligaçaão para ela onde ela iria me responder , a resposta dela eu iria usar o metodo que achava mais
// adequando para pegar as informaçoes que ele me deu,
//  neste caso precisava das informaçoes de  login e senha do usuario para entrar no meu programa
 