let numeroAleatorio;
let numeroDeIntentos;
let numeroMaximo = 10;
let numeroMinimo = 1;
let listaNumerosGenerados = [];

condicionesIniciales();

function verificarIntento(){
    if(listaNumerosGenerados.length == numeroMaximo){
        asignarTextoElementoHTML('h1',`¡Ganaste ${numeroMaximo} rondas seguidas!`);
        asignarTextoElementoHTML('p','');
        limpiarCampo();
        desactivarElementoHTML('campoValorUsuario');
        desactivarElementoHTML('reiniciar');
        desactivarElementoHTML('intentar');
        
    }else{
            let numeroUsuario = parseInt(document.getElementById('campoValorUsuario').value);
            if(numeroUsuario == numeroAleatorio){
                asignarTextoElementoHTML('h1',`¡Acertaste en ${numeroDeIntentos} ${numeroDeIntentos>1 ? 'intentos' : 'intento'}!`);
                asignarTextoElementoHTML('p',' ');
                activarElementoHTML('reiniciar');
                desactivarElementoHTML('intentar');

            }else{
                if(numeroDeIntentos==3){
                    asignarTextoElementoHTML('h1',`Game Over`);
                    asignarTextoElementoHTML('p',`Fallaste los ${numeroDeIntentos-1} intentos que tenías :( ${listaNumerosGenerados.length==1 ? ' No tenías racha' :`Racha de ${listaNumerosGenerados.length-1} ${listaNumerosGenerados.length==2 ? 'ronda' : 'rondas'}` }`);
                    limpiarCampo();
                    desactivarElementoHTML('intentar');
                    desactivarElementoHTML('campoValorUsuario');
                    document.getElementById('reiniciar').removeAttribute('disabled');
        
                    listaNumerosGenerados = [];
                }else{
                    asignarTextoElementoHTML('h1','Incorrecto');
                    asignarTextoElementoHTML('p',`El número secreto es ${numeroAleatorio > numeroUsuario ? 'mayor' : 'menor'}`);
                    limpiarCampo();
                    numeroDeIntentos++;
                }
              
            } 
        
    }
}

function asignarTextoElementoHTML(elemento,texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function generarNumeroAleatorio() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+numeroMinimo;
   
    console.log(`Numero generado: ${numeroGenerado}`);
    console.log(listaNumerosGenerados);
    if(listaNumerosGenerados.includes(numeroGenerado)){
        return generarNumeroAleatorio();
    }else{
        listaNumerosGenerados.push(numeroGenerado);
        return numeroGenerado;
    }
}

function limpiarCampo(){
    document.querySelector('#campoValorUsuario').value = '';
}

function reiniciarJuego(){
    if(document.querySelector('h1').innerHTML == 'Game Over'){
        activarElementoHTML('campoValorUsuario');
    }
    limpiarCampo();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled',true);
}

function condicionesIniciales(){
    asignarTextoElementoHTML('h1','Juego: Adivina el número secreto');
    asignarTextoElementoHTML('p',`Ingresa un numero del ${numeroMinimo} al ${numeroMaximo}`);
    activarElementoHTML('intentar');
    numeroAleatorio = generarNumeroAleatorio();
    numeroDeIntentos = 1;
}

function desactivarElementoHTML(elemento){
    document.getElementById(elemento).setAttribute('disabled',true);
}

function activarElementoHTML(elemento){
    document.getElementById(elemento).removeAttribute('disabled');
}