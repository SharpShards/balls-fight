function aumentarElemento(){
    this.style.transform = 'scale(1.2)';
    this.style.transition = 'transform 100ms linear';
}
    const botaoHome = document.querySelector('.btnJogar');
        botaoHome.addEventListener('mouseover', aumentarElemento);

function diminuirElemento(){
    this.style.transform = 'scale(1)';
    this.style.transition = 'transform 20ms linear';
}
    botaoHome.addEventListener('mouseout', diminuirElemento);