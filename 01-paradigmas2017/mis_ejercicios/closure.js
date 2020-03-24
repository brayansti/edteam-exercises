
let contador = (()=>{
    // Variables privadas de seclaran con _ al principio
    let _contador = 0
    const incrementa = () =>{
        _contador ++
    }
    const decrementa = () =>{
        _contador --
    }
    const obtener = () =>{
        return _contador
    }
    return{
        incrementa : incrementa,
        decrementa : decrementa,
        obtener : obtener,
    }
} )();

contador.incrementa()
contador.incrementa()
contador.incrementa()
//  Esto dará error por que "_contador" esta ENCAPSULADO, no se puede acceder console.log( contador._contador );
console.log( contador.obtener() );

console.log('// ↓↓ OTRO EJEMPLO DE CLOSURE ↓↓')

const closureEj = function () {
    //  A la variable "number" no se puede acceder directamente
    let number = 0;
    //  Retorna una funcion que si tiene acceso a la variable "number"
    return () => {
        number ++
        console.log(number);
    }
}

const ejecucionClosure = closureEj();
ejecucionClosure();
ejecucionClosure();
ejecucionClosure();
ejecucionClosure();
