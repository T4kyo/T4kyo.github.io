//Variaveis:
var dados_usuario = {
    nome: sessionStorage.getItem('Nome'),
    senha: sessionStorage.getItem('Senha'),
    tema_atual: sessionStorage.getItem('Tema'),
    perfil_foto: sessionStorage.getItem('userfoto'),
    cadastro: sessionStorage.getItem('Cadastramento')
}

var dados_pagina = {
    imgPaletaSrc: sessionStorage.getItem('imgPaletaSrc'),
    imgPowerSrc: sessionStorage.getItem('imgPowerSrc'),
    imgLogoSrc: sessionStorage.getItem('imgLogoSrc')
}

//Função global para todas as paginas, na qual analisa os dados da sessão para saber se um tema já foi escolhido
window.onload = function (event) {
    document.querySelector(':root').classList.toggle(sessionStorage.getItem('Tema'));

    // Seleciona a imagem da paleta e troca o src para a variável armazenada no sessionStorage
    document.querySelector('#imgSrc').src = (sessionStorage.getItem('imgPaletaSrc'));
    
    if (dados_usuario.nome != null && dados_usuario.senha != null) {
        document.getElementById('userbar').innerHTML = `<p class="username" onclick="SideShow()">${dados_usuario.nome}</p>`
        document.getElementById('username').innerHTML = dados_usuario.nome;
        document.getElementById('userpassword').innerHTML = dados_usuario.senha;
        document.getElementById('imagem-user').src = dados_usuario.perfil_foto;
        document.getElementById('imagem').src = dados_usuario.perfil_foto;
    }
    else {
        document.getElementById('userbar').innerHTML = `<p class="username" onclick="SideShow()">Anônimo</p>`
        document.getElementById('userName').innerHTML = `<p class="username" onclick="SideShow()">Anônimo</p>`
        document.getElementById('imagem-user').src = "/img/user/user-icon.png";
        document.getElementById('imagem').src = "/img/user/user-icon.png";
    }

    // Condicional para os dados da página (imagens)
    if (dados_pagina.imgPaletaSrc == null && dados_pagina.imgPowerSrc == null && dados_pagina.imgLogoSrc == null) {
        document.querySelector('#imgSrc').src = '/img/pallete/palleteL-icon.png';
        document.querySelector('#imgPowerSrc').src = '/img/power/powerL-icon.png';
        document.querySelector('#imgLogoSrc').src = '/img/logo/logoL.png';
    }
    else {
        document.querySelector('#imgSrc').src = (sessionStorage.getItem('imgPaletaSrc'));
        document.querySelector('#imgPowerSrc').src = (sessionStorage.getItem('imgPowerSrc'));
        document.querySelector('#imgLogoSrc').src = (sessionStorage.getItem('imgLogoSrc'));
    }
}

//Funções:
//Função responsavel por tonar o menu suspenso visivel, através da atribuição da classe (.show)
function ShowThemes() {
    // document.getElementById('dropthemes').classList.toggle('show');

    if (dados_usuario.cadastro == "1") {
        document.getElementById('dropthemes').classList.toggle('show');
    } else {
        ShowPopup();
    }
}

//Função responsavel por realizar a atribuição da foto de perfil através do input:
function ChangePerfil() {
    var reader = new FileReader();
    var file = document.getElementById('arquive').files[0];

    reader.onloadend = function () {
        document.getElementById('imagem-user').src = reader.result;
        document.getElementById('imagem').src = reader.result;
        sessionStorage.setItem('userfoto', reader.result)
    }

    if (file) {
        reader.readAsDataURL(file);
        document.getElementById('userfoto').alt = "PerfilUsuario"
    } else {
        document.getElementById('userfoto').alt = ""
    }
}

//Codigo responsavel por identificar quando o me nu suspenso está visivel ou não.
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

        // Troca a imagem do botão de logout na barra lateral para o tema
        document.querySelector('#imgPowerSrc').src = '/img/power/powerD-icon.png';
        dados_pagina.imgPowerSrc = document.querySelector('#imgPowerSrc').src;
        sessionStorage.setItem('imgPowerSrc', dados_pagina.imgPowerSrc);

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
        // Remove o tema atual do root
        document.querySelector(':root').classList.remove(dados_usuario.tema_atual);
        // Substitui pelo tema padrão do root
        document.querySelector(':root').classList.toggle(':root');
        // Coloca como tema atual
        dados_usuario.tema_atual = document.querySelector(':root').className;
        // Joga no sessionStorage
        sessionStorage.setItem('Tema', dados_usuario.tema_atual);

        // Troca a imagem da paleta para a padrão claro
        document.querySelector('#imgSrc').src = '/img/pallete/palleteL-icon.png';
        dados_pagina.imgPaletaSrc = document.querySelector('#imgSrc').src;
        sessionStorage.setItem('imgPaletaSrc', dados_pagina.imgPaletaSrc);

        // Troca a imagem do botão de logout na barra lateral para o tema
        document.querySelector('#imgPowerSrc').src = '/img/power/powerL-icon.png';
        dados_pagina.imgPowerSrc = document.querySelector('#imgPowerSrc').src;
        sessionStorage.setItem('imgPowerSrc', dados_pagina.imgPowerSrc);

        // Troca a imagem da logo para o tema
        document.querySelector('#imgLogoSrc').src = '/img/logo/logoL.png';
        dados_pagina.imgLogoSrc = document.querySelector('#imgLogoSrc').src;
        sessionStorage.setItem('imgLogoSrc', dados_pagina.imgLogoSrc);
    }
}

//Temas escuros (ensolarado, flamingo, marino respectivamente):
function TurnEnsoD() {
    if (dados_usuario.tema_atual == "") {
        document.querySelector(':root').classList.toggle('ensolarado-darktheme')
        dados_usuario.tema_atual = document.querySelector(':root').className;
        sessionStorage.setItem('Tema', dados_usuario.tema_atual);
        
    }
    else {
        document.querySelector(':root').classList.remove(dados_usuario.tema_atual);
        document.querySelector(':root').classList.toggle('ensolarado-darktheme');
        dados_usuario.tema_atual = document.querySelector(':root').className;
        sessionStorage.setItem('Tema', dados_usuario.tema_atual);

        // Troca a imagem da paleta para o tema ensolarado dark
        document.querySelector('#imgSrc').src = '/img/pallete/ensolaradoD-pallete-icon.png';
        dados_pagina.imgPaletaSrc = document.querySelector('#imgSrc').src;
        sessionStorage.setItem('imgPaletaSrc', dados_pagina.imgPaletaSrc);

        // Troca a imagem do botão de logout na barra lateral para o tema
        document.querySelector('#imgPowerSrc').src = '/img/power/ensolaradoD-power-icon.png';
        dados_pagina.imgPowerSrc = document.querySelector('#imgPowerSrc').src;
        sessionStorage.setItem('imgPowerSrc', dados_pagina.imgPowerSrc);
        
        // Troca a imagem da logo para o tema
        document.querySelector('#imgLogoSrc').src = '/img/logo/logoD.png';
        dados_pagina.imgLogoSrc = document.querySelector('#imgLogoSrc').src;
        sessionStorage.setItem('imgLogoSrc', dados_pagina.imgLogoSrc);
    }
}

function TurnFlamD() {
    if (dados_usuario.tema_atual == "") {
        document.querySelector(':root').classList.toggle('flamingo-darktheme');
        dados_usuario.tema_atual = document.querySelector(':root').className;
        sessionStorage.setItem('Tema', dados_usuario.tema_atual);
    }
    else {
        document.querySelector(':root').classList.remove(dados_usuario.tema_atual);
        document.querySelector(':root').classList.toggle('flamingo-darktheme');
        dados_usuario.tema_atual = document.querySelector(':root').className;
        sessionStorage.setItem('Tema', dados_usuario.tema_atual);

        // Troca a imagem da paleta para o tema flamingo dark
        document.querySelector('#imgSrc').src = '/img/pallete/flamingoD-pallete-icon.png';
        dados_pagina.imgPaletaSrc = document.querySelector('#imgSrc').src;
        sessionStorage.setItem('imgPaletaSrc', dados_pagina.imgPaletaSrc);

        // Troca a imagem do botão de logout na barra lateral para o tema
        document.querySelector('#imgPowerSrc').src = '/img/power/flamingoD-power-icon.png';
        dados_pagina.imgPowerSrc = document.querySelector('#imgPowerSrc').src;
        sessionStorage.setItem('imgPowerSrc', dados_pagina.imgPowerSrc);
        
        // Troca a imagem da logo para o tema
        document.querySelector('#imgLogoSrc').src = '/img/logo/logoD.png';
        dados_pagina.imgLogoSrc = document.querySelector('#imgLogoSrc').src;
        sessionStorage.setItem('imgLogoSrc', dados_pagina.imgLogoSrc);
    }
}

function TurnMariD() {
    if (dados_usuario.tema_atual == "") {
        document.querySelector(':root').classList.toggle('marino-darktheme')
        dados_usuario.tema_atual = document.querySelector(':root').className;
        sessionStorage.setItem('Tema', dados_usuario.tema_atual);
    }
    else {
        document.querySelector(':root').classList.remove(dados_usuario.tema_atual);
        document.querySelector(':root').classList.toggle('marino-darktheme');
        dados_usuario.tema_atual = document.querySelector(':root').className;
        sessionStorage.setItem('Tema', dados_usuario.tema_atual);
        
        // Troca a imagem da paleta para o tema marino dark
        document.querySelector('#imgSrc').src = '/img/pallete/marinoD-pallete-icon.png';
        dados_pagina.imgPaletaSrc = document.querySelector('#imgSrc').src;
        sessionStorage.setItem('imgPaletaSrc', dados_pagina.imgPaletaSrc);

        // Troca a imagem do botão de logout na barra lateral para o tema
        document.querySelector('#imgPowerSrc').src = '/img/power/marinoD-power-icon.png';
        dados_pagina.imgPowerSrc = document.querySelector('#imgPowerSrc').src;
        sessionStorage.setItem('imgPowerSrc', dados_pagina.imgPowerSrc);

        // Troca a imagem da logo para o tema
        document.querySelector('#imgLogoSrc').src = '/img/logo/logoD.png';
        dados_pagina.imgLogoSrc = document.querySelector('#imgLogoSrc').src;
        sessionStorage.setItem('imgLogoSrc', dados_pagina.imgLogoSrc);
    }
}

//Temas claros (ensolarado, flamingo, marino respectivamente):
function TurnEnsoL() {
    if (dados_usuario.tema_atual == "") {
        document.querySelector(':root').classList.toggle('ensolarado-lighttheme')
        dados_usuario.tema_atual = document.querySelector(':root').className;
        sessionStorage.setItem('Tema', dados_usuario.tema_atual);
    }
    else {
        document.querySelector(':root').classList.remove(dados_usuario.tema_atual);
        document.querySelector(':root').classList.toggle('ensolarado-lighttheme');
        dados_usuario.tema_atual = document.querySelector(':root').className;
        sessionStorage.setItem('Tema', dados_usuario.tema_atual);

        // Troca a imagem da paleta para a paleta tema ensolarado light
        document.querySelector('#imgSrc').src = '/img/pallete/ensolaradoL-pallete-icon.png';
        dados_pagina.imgPaletaSrc = document.querySelector('#imgSrc').src;
        sessionStorage.setItem('imgPaletaSrc', dados_pagina.imgPaletaSrc);

        // Troca a imagem do botão de logout na barra lateral para o tema
        document.querySelector('#imgPowerSrc').src = '/img/power/ensolaradoL-power-icon.png';
        dados_pagina.imgPowerSrc = document.querySelector('#imgPowerSrc').src;
        sessionStorage.setItem('imgPowerSrc', dados_pagina.imgPowerSrc);

        // Troca a imagem da logo para o tema
        document.querySelector('#imgLogoSrc').src = '/img/logo/logoL.png';
        dados_pagina.imgLogoSrc = document.querySelector('#imgLogoSrc').src;
        sessionStorage.setItem('imgLogoSrc', dados_pagina.imgLogoSrc);
    }
}

function TurnFlamL() {
    if (dados_usuario.tema_atual == "") {
        document.querySelector(':root').classList.toggle('flamingo-lighttheme')
        dados_usuario.tema_atual = document.querySelector(':root').className;
        sessionStorage.setItem('Tema', dados_usuario.tema_atual);
    }
    else {
        document.querySelector(':root').classList.remove(dados_usuario.tema_atual);
        document.querySelector(':root').classList.toggle('flamingo-lighttheme');
        dados_usuario.tema_atual = document.querySelector(':root').className;
        sessionStorage.setItem('Tema', dados_usuario.tema_atual);

        // Troca a imagem da paleta para a paleta tema flamingo light
        document.querySelector('#imgSrc').src = '/img/pallete/flamingoL-pallete-icon.png';
        dados_pagina.imgPaletaSrc = document.querySelector('#imgSrc').src;
        sessionStorage.setItem('imgPaletaSrc', dados_pagina.imgPaletaSrc);

        // Troca a imagem do botão de logout na barra lateral para o tema
        document.querySelector('#imgPowerSrc').src = '/img/power/flamingoL-power-icon.png';
        dados_pagina.imgPowerSrc = document.querySelector('#imgPowerSrc').src;
        sessionStorage.setItem('imgPowerSrc', dados_pagina.imgPowerSrc);

        // Troca a imagem da logo para o tema
        document.querySelector('#imgLogoSrc').src = '/img/logo/logoL.png';
        dados_pagina.imgLogoSrc = document.querySelector('#imgLogoSrc').src;
        sessionStorage.setItem('imgLogoSrc', dados_pagina.imgLogoSrc);
    }
}

function TurnMariL() {
    if (dados_usuario.tema_atual == "") {
        document.querySelector(':root').classList.toggle('marino-lighttheme')
        dados_usuario.tema_atual = document.querySelector(':root').className;
        sessionStorage.setItem('Tema', dados_usuario.tema_atual);
    }
    else {
        document.querySelector(':root').classList.remove(dados_usuario.tema_atual);
        document.querySelector(':root').classList.toggle('marino-lighttheme');
        dados_usuario.tema_atual = document.querySelector(':root').className;
        sessionStorage.setItem('Tema', dados_usuario.tema_atual);

        // Troca a imagem da paleta para a paleta tema marino light
        document.querySelector('#imgSrc').src = '/img/pallete/marinoL-pallete-icon.png';
        dados_pagina.imgPaletaSrc = document.querySelector('#imgSrc').src;
        sessionStorage.setItem('imgPaletaSrc', dados_pagina.imgPaletaSrc);

        // Troca a imagem do botão de logout na barra lateral para o tema
        document.querySelector('#imgPowerSrc').src = '/img/power/marinoL-power-icon.png';
        dados_pagina.imgPowerSrc = document.querySelector('#imgPowerSrc').src;
        sessionStorage.setItem('imgPowerSrc', dados_pagina.imgPowerSrc);

        // Troca a imagem da logo para o tema
        document.querySelector('#imgLogoSrc').src = '/img/logo/logoL.png';
        dados_pagina.imgLogoSrc = document.querySelector('#imgLogoSrc').src;
        sessionStorage.setItem('imgLogoSrc', dados_pagina.imgLogoSrc);
    }
}

//Função responsavel por identificar se ja foi realizado o login e por mostrar o popup:
function ShowPopup() {
    let popup = document.getElementById('popupTheme');
    popup.classList.toggle('popupshow')
    setTimeout(() => {
        popup.classList.toggle('popupshow');
    }, 3000)
}

//Fução que abre e fecha o menu lateral (respectivamente):
function SideShow() {
    document.getElementById('sidebar').style.width = "350px";
    // document.style.body.backgroundColor = "rbga (0, 0, 0, 0.4)";
    document.querySelector('.mascara').classList.toggle('isclose')
}

    document.querySelector('.mascara').addEventListener('click', () => 
        { document.querySelector('.mascara').classList.toggle('isclose')
          document.getElementById('sidebar').style.width = "0px";
        })

    document.getElementById('closebtn').addEventListener('click', () => 
        { document.querySelector('.mascara').classList.toggle('isclose')
          document.getElementById('sidebar').style.width = "0px";
        })
    


//Função para deslogar da conta:
function LogOut() {
    sessionStorage.removeItem('Nome');
    sessionStorage.removeItem('Senha');
    sessionStorage.removeItem('Cadastramento');
    sessionStorage.removeItem('userfoto');
    sessionStorage.removeItem('Tema');

    window.location.href = '/index.html';
}