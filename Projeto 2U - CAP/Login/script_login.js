//Variaveis:
var dados_usuario = {
    tema_atual: sessionStorage.getItem('Tema')
}

var dados_pagina = {
    imgPaletaSrc: sessionStorage.getItem('imgPaletaSrc'),
    imgLogoSrc: sessionStorage.getItem('imgLogoSrc')
}

const remainder = document.getElementById('rememberMe')

//Funções:
//Função responsavel por tonar o menu suspenso visivel, através da atribuição da classe (.show)
function ShowThemes() {
    document.getElementById('dropthemes').classList.toggle('show');
}

window.onload = function (event) {
    document.querySelector(':root').classList.toggle(sessionStorage.getItem('Tema'))

    // Seleciona a imagem da paleta e troca o src para a variável armazenada no sessionStorage
    document.querySelector('#imgSrc').src = (sessionStorage.getItem('imgPaletaSrc'));
    
    // Seleciona a imagem do search (pesquisa) e troca o src para a variável armazenada no sessionStorage
    document.querySelector('#imgLogoSrc').src = (sessionStorage.getItem('imgLogoSrc'));

    if (localStorage.getItem('memory') == "1") {
        remainder.checked = true
        document.getElementById('user').value = localStorage.getItem('email')
        document.getElementById('password').value = localStorage.getItem('password')
        document.getElementById('register').style.visibility = "hidden"
    } else {
        remainder.checked = false
        document.getElementById('user').value = ""
        document.getElementById('password').value = ""
        document.getElementById('login').style.visibility = "hidden"
    }

    if(dados_pagina.imgLogoSrc == null) {
        document.querySelector('#imgLogoSrc').src = '/img/logo/logoL.png';
    }
    else if (dados_pagina.imgPaletaSrc == null) {
        document.querySelector('#imgSrc').src = '/img/pallete/palleteL-icon.png';
    } 
    else {
        document.querySelector('#imgSrc').src = (sessionStorage.getItem('imgPaletaSrc'));
        document.querySelector('#imgLogoSrc').src = (sessionStorage.getItem('imgLogoSrc'));
    }
}

//Codigo responsavel por identificar quando o menu suspenso está visivel ou não.
window.onclick = function (event) {
    if (!event.target.matches('.themes')) {
        var dropthemes = document.getElementsByClassName('dropdown_content');
        var i;
        
        for (i = 0; i < dropthemes.length; i++) {
            var openDropdown = dropthemes[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

//Funções responsáveis por definir o tema escolhido:

//Temas padrões (escuro e claro respectivamente):
function TurnDefaultD() {
    if (dados_usuario.tema_atual == "") {
        document.querySelector(':root').classList.toggle('dark-theme')
        dados_usuario.tema_atual = document.querySelector(':root').className;
        sessionStorage.setItem('Tema', dados_usuario.tema_atual);
    }
    else {
        document.querySelector(':root').classList.remove(dados_usuario.tema_atual);
        document.querySelector(':root').classList.toggle('dark-theme');
        dados_usuario.tema_atual = document.querySelector(':root').className;
        sessionStorage.setItem('Tema', dados_usuario.tema_atual);
        
        // Troca a imagem da paleta para a padrão dark
        document.querySelector('#imgSrc').src = '/img/pallete/palleteD-icon.png';
        dados_pagina.imgPaletaSrc = document.querySelector('#imgSrc').src;
        sessionStorage.setItem('imgPaletaSrc', dados_pagina.imgPaletaSrc);
                
        // Troca a imagem da logo para o tema
        document.querySelector('#imgLogoSrc').src = '/img/logo/logoD.png';
        dados_pagina.imgLogoSrc = document.querySelector('#imgLogoSrc').src;
        sessionStorage.setItem('imgLogoSrc', dados_pagina.imgLogoSrc);
    }
}

function TurnDefaultL() {
    if (dados_usuario.tema_atual == "") {
        dados_usuario.tema_atual = document.querySelector(':root').className;
        sessionStorage.setItem('Tema', dados_usuario.tema_atual);
    }
    else {
        document.querySelector(':root').classList.remove(dados_usuario.tema_atual);
        document.querySelector(':root').classList.toggle(':root');
        dados_usuario.tema_atual = document.querySelector(':root').className;
        sessionStorage.setItem('Tema', dados_usuario.tema_atual);
        
        // Troca a imagem da paleta para a padrão dark
        document.querySelector('#imgSrc').src = '/img/pallete/palleteL-icon.png';
        dados_pagina.imgPaletaSrc = document.querySelector('#imgSrc').src;
        sessionStorage.setItem('imgPaletaSrc', dados_pagina.imgPaletaSrc);
                
        // Troca a imagem da logo para o tema
        document.querySelector('#imgLogoSrc').src = '/img/logo/logoL.png';
        dados_pagina.imgLogoSrc = document.querySelector('#imgLogoSrc').src;
        sessionStorage.setItem('imgLogoSrc', dados_pagina.imgLogoSrc);
    }
}


//Função responsavel por realizar a atribuição da foto de perfil atravéss do input:
function ChangePerfil() {
    var reader = new FileReader();
    var file = document.getElementById('arquive').files[0];

    reader.onloadend = function () {
        document.getElementById('perfilimg').src = reader.result;
        sessionStorage.setItem('userfoto', reader.result)
    }

    if (file) {
        reader.readAsDataURL(file);
        document.getElementById('userfoto').alt = "PerfilUsuario"
    } else {
        document.getElementById('userfoto').alt = ""
    }
}

//Função que salva os dados do usuario:
function SaveProfile() {
    sessionStorage.setItem('Nome', document.getElementById('user').value)
    sessionStorage.setItem('Senha', document.getElementById('password').value)
    sessionStorage.setItem('Cadastramento', "1")

    if (remainder.checked == true) {
        localStorage.setItem('memory', "1")
        localStorage.setItem('email', document.getElementById('user').value)
        localStorage.setItem('password', document.getElementById('password').value)
    } else {
        localStorage.setItem('memory', "")
        localStorage.setItem('email', "")
        localStorage.setItem('password', "")
    }

    window.location.href = '/index.html'
}

//Função de login que compara os valores salvos com os atuais, e caso seja verdadeiro essa comparação, efetua o login:
//Caso contrario, ele apaga os dados ja cadastrados como medida de segurança akakakakkakaka
function LoadProfile() {
    if (document.getElementById('user').value == localStorage.getItem('email') && document.getElementById('password').value == localStorage.getItem('password')) {
        sessionStorage.setItem('Nome', document.getElementById('user').value)
        sessionStorage.setItem('Senha', document.getElementById('password').value)
        sessionStorage.setItem('Cadastramento', "1")

        if (remainder.checked == true) {
            localStorage.setItem('memory', "1")
            localStorage.setItem('email', document.getElementById('user').value)
            localStorage.setItem('password', document.getElementById('password').value)
        } else {
            localStorage.setItem('memory', "")
            localStorage.setItem('email', "")
            localStorage.setItem('password', "")
        }

        window.location.href = '/index.html'
    } else {
        localStorage.setItem('memory', "")
        localStorage.setItem('email', "")
        localStorage.setItem('password', "")
        window.location.href = '/index.html'
    }
}

//Essa variável vai armazenar a area de texto, tornando mais fácil trabalhar com ela pelo JS.
let texto = document.getElementById('comments')

//Essa função vai ficar rodando a cada 0.1 segundos (o valor 100 ali em baixo), verificando se a quantidade de letras ultrapassa o limite que a area de texto mostra pro usuário.
setInterval(() => {
    if (texto.value.length > 156) {
        texto.disabled = true
    }
}, 100)

//Função que vai "armazenar" o comentario do usuario:
function SendComment() {
    sessionStorage.setItem('Comment', texto.value);
    texto.value = "";
}

// //Essa variável vai armazenar a area de texto, tornando mais fácil trabalhar com ela pelo JS.
// let texto = document.getElementById('comments')
  
// //Essa função vai ficar rodando a cada 0.1 segundos (o valor 100 ali em baixo), verificando se a quantidade de letras ultrapassa o limite que a area de texto mostra pro usuário.
// setInterval(() => {
//     if (texto.value.length > texto.rows*texto.cols) {
//       texto.rows++
//     }
// },100)