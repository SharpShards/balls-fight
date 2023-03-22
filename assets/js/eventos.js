function aumentarElemento(){
    this.style.transform = 'scale(1.2)';
    this.style.transition = 'transform 100ms linear';
}

function diminuirElemento(){
    this.style.transform = 'scale(1)';
    this.style.transition = 'transform 20ms linear';
}

function reiniciarPartida(){
    document.location.reload();
}

azul = new Azul('Azulzinho');
    const azulzinho = document.querySelector('#sctLuta #dvBonecos .dvBoneco:first-child');
    const nomeA = document.querySelector('#sctBarras .dvPerson:first-child .dvInfos .dvNome');
    const vidaA = document.querySelector('#sctBarras .dvPerson:first-child .dvInfos .dvQuant');
        let vidaAAntiga = azul.vida;
        let antigaAAnima;
    const liquidA = document.querySelector('#sctBarras .dvPerson:first-child .dvInfos .dvBarra .dvLiquido');
        let barraAMax = liquidA.clientWidth;
    let ataqueA;        

vermelho = new Ver('Vermelhinho');    
    const vermelhinho = document.querySelector('#sctLuta #dvBonecos .dvBoneco:last-child');
    const nomeV = document.querySelector('#sctBarras .dvPerson:last-child .dvInfos .dvNome');  
    const vidaV = document.querySelector('#sctBarras .dvPerson:last-child .dvInfos .dvQuant'); 
        let vidaVAntiga = vermelho.vida;
        let antigaVAnima;
    const liquidV = document.querySelector('#sctBarras .dvPerson:last-child .dvInfos .dvBarra .dvLiquido');
        let barraVMax = liquidV.clientWidth;
    let ataqueV;

cen = new Cenario(azul, vermelho, azulzinho, vermelhinho);
    cen.start();

const avisoA = document.querySelector('#sctLuta #dvBonecos .dvGuia .dvAzul');

const det = document.querySelector('#sctLuta #dvDetalhes');
    const bloqueio = document.querySelector('#sctLuta #dvDetalhes .dvBloqueio');
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
    const botao = document.querySelector('#sctLuta #dvDetalhes button');
        botao.addEventListener('mouseover', aumentarElemento);    
        botao.addEventListener('mouseout', diminuirElemento);
        botao.addEventListener('click', cen.atacar);
        botao.addEventListener('click', diminuirElemento);

const fundoConfig = document.querySelector('#sctConfig');
    const config = document.querySelector('#imgConfig');
        config.addEventListener('mouseover', aumentarElemento);
        config.addEventListener('mouseout', diminuirElemento);
        config.addEventListener('click', function abrirConfig(){
            fundoConfig.style.display = 'flex';
        });
    const x = document.querySelector('#sctConfig .dvX');
        x.addEventListener('mouseover', aumentarElemento);
        x.addEventListener('mouseout', diminuirElemento);
        x.addEventListener('click', function fecharConfig(){
            fundoConfig.style.display = 'none';
        });
    const reiniciar = document.querySelector('#sctConfig .dvFundoIcon .dvIcon:last-child');
        reiniciar.addEventListener('click', reiniciarPartida);
    const homeConfig = fundoConfig.children[0].children[2].children[0];
        homeConfig.addEventListener('mouseover', aumentarElemento);
        homeConfig.addEventListener('mouseout', diminuirElemento);
    const recom = fundoConfig.children[0].children[2].children[1];
        recom.addEventListener('mouseover', aumentarElemento);
        recom.addEventListener('mouseout', diminuirElemento);

const resultado = document.querySelector('#sctResult');
    const home = document.querySelector("#sctResult .dvFundo .dvFundoIcon .dvIcon:first-child");
        home.addEventListener('mouseover', aumentarElemento);    
        home.addEventListener('mouseout', diminuirElemento);
    const rein = document.querySelector('#sctResult .dvFundo .dvFundoIcon .dvIcon:last-child')
        rein.addEventListener('mouseover', aumentarElemento);
        rein.addEventListener('mouseout', diminuirElemento);
        rein.addEventListener('click', reiniciarPartida);