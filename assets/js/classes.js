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