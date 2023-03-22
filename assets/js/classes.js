class Personagem{
    _vida = 1;
    vidaMax = 1;
    ataq1 = 0;
    ataq2 = 0;
    ataq3 = 0;

    constructor(nome){
        this.nome = nome;
    }

    get vida(){
        return this._vida;
    }

    set vida(novaVida){
        if(novaVida < 0){
            this._vida = 0;
        }else{
            this._vida = novaVida;
        }
    }
}

class Azul extends Personagem{
    constructor(nome){
        super(nome);        
        this._vida = 1880;
        this.vidaMax = this._vida;
        this.ataq1 = 80;
        this.ataq2 = 140;    
        this.ataq3 = 290;
    }
}

class Ver extends Personagem{
    constructor(nome){
        super(nome);        
        this._vida = 2200;
        this.vidaMax = this._vida;
        this.ataq1 = 60;
        this.ataq2 = 120;    
        this.ataq3 = 300;
    }
}

class Cenario{
    constructor(azul, vermelho, azulEl, vermelhoEl){
        this.azul = azul;
        this.vermelho = vermelho;

        this.azulEl = azulEl;
        this.vermelhoEl = vermelhoEl;
    }

    start(){
        this.montarInfos();
    }

    montarInfos(){
        nomeA.innerText = this.azul.nome;
        vidaA.innerText = this.azul.vida + '/' + azul.vidaMax;

        nomeV.innerText = this.vermelho.nome;
        vidaV.innerText = vermelho.vida + '/' + vermelho.vidaMax;
    }

    atualizarStatus(){
        let porcenVida;
        let equivBarra;
        let tempo;

        if(vidaVAntiga != this.vermelho.vida){
            // Animação barra diminuindo
            if(this.vermelho.vida != 0){
                porcenVida = (ataqueA * 100) / this.vermelho.vidaMax; // Regra de 3 para descobrir a porcentagem do ataque em relação a vida total
                equivBarra = (barraVMax * porcenVida) / 100;// Regra de 3 para descobrir a largura da barra em relação ao ataque
                liquidV.style.width = (liquidV.clientWidth - equivBarra) + 'px';
            }else{
                liquidV.style.width = '0px';
            }

            // Animação vida descendo
            tempo = setInterval(function(){
                if(antigaVAnima == this.vermelho.vida){
                    clearInterval(tempo);
                }

                vidaV.innerText = antigaVAnima-- + '/' + this.vermelho.vidaMax;            
            }, 1);

            vidaVAntiga = this.vermelho.vida;
        }

        if(vidaAAntiga != azul.vida){
            // Animação barra diminuindo
            if(this.azul.vida != 0){
                porcenVida = (ataqueV * 100) / this.azul.vidaMax; // Regra de 3 para descobrir a porcentagem do ataque em relação a vida total
                equivBarra = (barraAMax * porcenVida) / 100;// Regra de 3 para descobrir a largura da barra em relação ao ataque
                liquidA.style.width = (liquidA.clientWidth - equivBarra) + 'px';
            }else{
                liquidA.style.width = '0px';
            }     

            // Animação vida descendo
            tempo = setInterval(function(){
                if(antigaAAnima == this.azul.vida){
                    clearInterval(tempo);
                }

                vidaA.innerText = antigaAAnima-- + '/' + this.azul.vidaMax;            
            }, 1);

            vidaAAntiga = this.azul.vida;

            // Reabrir detalhes dos ataques
            setTimeout(function(){
                det.style.opacity = '1';
            }, 5000);
        }

        // Encerrar partida
        setTimeout(function(){
            let tit = resultado.children[0].children[0];

            if(this.azul.vida == 0){
                tit.style.color = 'var(--vermelho)';
                tit.innerText = 'Você Perdeu!!!';

                resultado.style.display = 'flex';
            }

            if(this.vermelho.vida == 0){
                tit.style.color = 'var(--azul)';
                tit.innerText = 'Você Ganhou!!!';

                resultado.style.display = 'flex';
            }
        }, 10000);
    }

    atacar(){
        let selecionado;

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
            det.style.opacity = '1';
            
            return 0;
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

        cen.atualizarStatus();
                
        bloqueio.style.display = 'block';

        // Trocar Turno
        setTimeout(function(){
            cen.mudarTurno();
        }, 5000);
    }

    mudarTurno(){
        // Jogada Vermelho    
        const avisoV = document.querySelector('#sctLuta #dvBonecos .dvGuia .dvVer');
        avisoV.style.animation = 'ladoVer 3s linear'; 
    
        azulzinho.style.animation = 'dano 2s';
    
        vidaAAntiga = azul.vida;
        antigaAAnima = vidaAAntiga;
        azul.vida = azul.vida - ataqueV;
    
        cen.atualizarStatus();
    
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
}