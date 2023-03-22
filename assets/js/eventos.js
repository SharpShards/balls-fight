const azulzinho = document.querySelector('#sctLuta #dvBonecos .dvBoneco:first-child');
    const nomeA = document.querySelector('#sctBarras .dvPerson:first-child .dvInfos .dvNome');
    const vidaA = document.querySelector('#sctBarras .dvPerson:first-child .dvInfos .dvQuant');
    let azul;

const vermelhinho = document.querySelector('#sctLuta #dvBonecos .dvBoneco:last-child');
    const nomeV = document.querySelector('#sctBarras .dvPerson:last-child .dvInfos .dvNome');  
    const vidaV = document.querySelector('#sctBarras .dvPerson:last-child .dvInfos .dvQuant'); 
    let vermelho;

function carregarPag(){
    azul = new Azul('Azulzinho');
    nomeA.innerText = azul.nome;
    vidaA.innerText = azul.vida + '/' + azul.vidaMax;

    vermelho = new Ver('Vermelhinho');
    nomeV.innerText = vermelho.nome;
    vidaV.innerText = vermelho.vida + '/' + vermelho.vidaMax;
}

function mudarTurno(){
    // Jogada Vermelho    
    const avisoV = document.querySelector('#sctLuta #dvBonecos .dvGuia .dvVer');
    avisoV.style.animation = 'ladoVer 3s linear'; 

    azulzinho.style.animation = 'dano 2s';

    vidaAAntiga = azul.vida;
    antigaAAnima = vidaAAntiga;
    azul.vida = azul.vida - ataqueV;

    atualizarStatus();

    //Tirar Animação
    setTimeout(function(){
        vermelhinho.style.animation = 'none';
        azulzinho.style.animation = 'none';

        vermelhinho.style.animation = 'levitar 3s ease-in-out infinite';
        azulzinho.style.animation = 'levitar 3s ease-in-out infinite';

        avisoV.style.animation = 'none';
        avisoA.style.animation = 'none';
    }, 5000);

    //Tirar Bloqueio Azul
    setTimeout(function(){
        bloqueio.style.display = 'none';
    }, 5000);
}

const ataques = document.querySelectorAll('#sctLuta #dvDetalhes div p');
    for(let loop = 0; loop < ataques.length; loop++){
        ataques[loop].addEventListener('click', function selecionarAtaque(){
            this.style.backgroundColor = 'var(--azul)';
            this.style.color = 'var(--cinza)';

            for(let loop = 0; loop < ataques.length; loop++){
                if(ataques[loop] != this){
                    ataques[loop].style.backgroundColor = 'var(--transparent)';
                    ataques[loop].style.color = 'var(--branco)';
                }
            }
        });
    }

const liquidV = document.querySelector('#sctBarras .dvPerson:last-child .dvInfos .dvBarra .dvLiquido');
    let barraVMax = liquidV.clientWidth;
    
const liquidA = document.querySelector('#sctBarras .dvPerson:first-child .dvInfos .dvBarra .dvLiquido');
    let barraAMax = liquidA.clientWidth;
    function atualizarStatus(){
        if(vidaVAntiga != vermelho.vida){
            // Animação barra diminuindo
            if(vermelho.vida != 0){
                porcenVida = (ataqueA * 100) / vermelho.vidaMax; // Regra de 3 para descobrir a porcentagem do ataque em relação a vida total
                equivBarra = (barraVMax * porcenVida) / 100;// Regra de 3 para descobrir a largura da barra em relação ao ataque
                liquidV.style.width = (liquidV.clientWidth - equivBarra) + 'px';
            }else{
                liquidV.style.width = '0px';
            }

            // Animação vida descendo
            tempoV = setInterval(function(){
                if(antigaVAnima == vermelho.vida){
                    clearInterval(tempoV);
                }

                vidaV.innerText = antigaVAnima-- + '/' + vermelho.vidaMax;            
            }, 1);

            vidaVAntiga = vermelho.vida;
        }

        if(vidaAAntiga != azul.vida){
            // Animação barra diminuindo
            if(azul.vida != 0){
                porcenVida = (ataqueV * 100) / azul.vidaMax; // Regra de 3 para descobrir a porcentagem do ataque em relação a vida total
                equivBarra = (barraAMax * porcenVida) / 100;// Regra de 3 para descobrir a largura da barra em relação ao ataque
                liquidA.style.width = (liquidA.clientWidth - equivBarra) + 'px';
            }else{
                liquidA.style.width = '0px';
            }     

            // Animação vida descendo
            tempoA = setInterval(function(){
                if(antigaAAnima == azul.vida){
                    clearInterval(tempoA);
                }

                vidaA.innerText = antigaAAnima-- + '/' + azul.vidaMax;            
            }, 1);

            vidaAAntiga = azul.vida;

            // Reabrir detalhes dos ataques
            setTimeout(function(){
                det.style.opacity = '1';
            }, 5000);
        }

        // Encerrar partida
        setTimeout(function(){
            const resultado = document.querySelector('#sctResult');
            let tit = resultado.children[0].children[0];

            if(azul.vida == 0){
                tit.style.color = 'var(--vermelho)';
                tit.innerText = 'Você Perdeu!!!';

                resultado.style.display = 'flex';
            }

            if(vermelho.vida == 0){
                tit.style.color = 'var(--azul)';
                tit.innerText = 'Você Ganhou!!!';

                resultado.style.display = 'flex';
            }
        }, 10000);
    }

let ataqueA;
    let vidaVAntiga = 2200; 
    let antigaVAnima;

let ataqueV;
    let vidaAAntiga = 1880;
    let antigaAAnima;

let selecionado;
const det = document.querySelector('#sctLuta #dvDetalhes');
const bloqueio = document.querySelector('#sctLuta #dvDetalhes .dvBloqueio');
const botao = document.querySelector('#sctLuta #dvDetalhes button');
const avisoA = document.querySelector('#sctLuta #dvBonecos .dvGuia .dvAzul');
    botao.addEventListener('click', function atacar(){
        // Fechar detalhes de ataque
        det.style.opacity = '0';
        det.style.transition = 'all 250ms linear';

        // Determinar ataque azul
        for(let loop = 0; loop < ataques.length; loop++){
            if(ataques[loop].style.color == 'var(--cinza)'){
                ataqueA = ataques[loop].innerText;
                selecionado = true;
            }
        }

        if(ataqueA == 'Tiro Certeiro'){
            ataqueA = azul.ataq1;
        }else if(ataqueA == 'Bomba Dinâmica'){
            ataqueA = azul.ataq2;
        }else{
            ataqueA = azul.ataq3;
        }

        // Verificar se o ataque ta selecionado
        if(selecionado != true){
            // Não consigo parar o evento com e.preventDefault(), então
            // deixei assim. Ele não encontra o 'e' e dispara um erro
            // no console, interrompendo o evento.
            det.style.opacity = '1';

            e.preventDefault();
        }

        selecionado = false;

        //Descolorir ataques azul
        for(let loop = 0; loop < ataques.length; loop++){
            ataques[loop].style.backgroundColor = 'var(--transparent)';
            ataques[loop].style.color = 'var(--branco)';
        }

        //Determinar ataque vermelho
        let ataquesVer = [vermelho.ataq1, vermelho.ataq2, vermelho.ataq3];

        let sorteio = Math.floor(Math.random() * 3 + 1);

        if(sorteio == 1){
            ataqueV = ataquesVer[0];
        }else if(sorteio == 2){
            ataqueV = ataquesVer[1];
        }else{
            ataqueV = ataquesVer[2];
        }

        //Jogada Azul    
        avisoA.style.animation = 'ladoAzul 3s linear';

        vermelhinho.style.animation = 'dano 2s';

        vidaVAntiga = vermelho.vida;
        antigaVAnima = vidaVAntiga;
        vermelho.vida = vermelho.vida - ataqueA;

        atualizarStatus();
                
        bloqueio.style.display = 'block';

        // Trocar Turno
        setTimeout(function(){
            mudarTurno();
        }, 5000);
    })

const fundoConfig = document.querySelector('#sctConfig');

const config = document.querySelector('#imgConfig');
    config.addEventListener('click', function abrirConfig(){
        fundoConfig.style.display = 'flex';
    });

const x = document.querySelector('#sctConfig .dvX');
    x.addEventListener('click', function fecharConfig(){
        fundoConfig.style.display = 'none';
    });

function reiniciarPartida(){
    document.location.reload();
}
    const reiniciar = document.querySelector('#sctConfig .dvFundoIcon .dvIcon:last-child');
        reiniciar.addEventListener('click', reiniciarPartida);
    const rein = document.querySelector('#sctResult .dvFundo .dvFundoIcon .dvIcon:last-child')
        rein.addEventListener('click', reiniciarPartida);

function aumentarElemento(){
    this.style.transform = 'scale(1.2)';
    this.style.transition = 'transform 100ms linear';
}
    botao.addEventListener('mouseover', aumentarElemento);
    config.addEventListener('mouseover', aumentarElemento);
    x.addEventListener('mouseover', aumentarElemento);
    fundoConfig.children[0].children[2].children[0].addEventListener('mouseover', aumentarElemento);
    fundoConfig.children[0].children[2].children[1].addEventListener('mouseover', aumentarElemento);
    rein.addEventListener('mouseover', aumentarElemento);
    const home = document.querySelector("#sctResult .dvFundo .dvFundoIcon .dvIcon:first-child");
    home.addEventListener('mouseover', aumentarElemento);

function diminuirElemento(){
    this.style.transform = 'scale(1)';
    this.style.transition = 'transform 20ms linear';
}
    botao.addEventListener('mouseout', diminuirElemento);
    config.addEventListener('mouseout', diminuirElemento);
    x.addEventListener('mouseout', diminuirElemento);
    fundoConfig.children[0].children[2].children[0].addEventListener('mouseout', diminuirElemento);
    fundoConfig.children[0].children[2].children[1].addEventListener('mouseout', diminuirElemento);
    rein.addEventListener('mouseout', diminuirElemento);
    home.addEventListener('mouseout', diminuirElemento);

botao.addEventListener('click', diminuirElemento);