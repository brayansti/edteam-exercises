////Javascript

// OPERADOR DE CORTO CIRCUITO:
// Corto Circuito normal: || → Si el primer valor es TRUE lo toma, de lo contrario toma el segundo.
let circuitoNormal = null || 'juan' // →  Va a tomar 'juan'

// Corto Circuito inverso: && → Si el primer valor es TRUE lo ignora, de lo contrario toma el segundo.
let circuitoInverso = null && 'juan' //  → Va a tomar null



// ↓↓ NUMEROS ↓↓
// Los metodos tienen parentesis: ejm: toFixed();

number = 20.125156;
number.toFixed(2); // →→ Cantidad de decimales (redondea al numero mas cercano)

// Convertir TEXTO a NUMERO:
parseInt('202' , 10) // →→ Devuelve 20 como NUMERO, el 10 es convercion a numeros decimales;
parseFloat('20.1212'); // →→ Convertir y mantener los decimales

// NAN Significa not a number : ejemplo de NAN:
var ejmNAN = 5 * 'hola';

// Objeto Math → Operaciones cion numeros:
Math.floor(20.7)    // → Redondea hacia abajo, daria 20
Math.ceil(20.1)     // → Redondea hacia arriba, daria 21
Math.round(20.6);   // → Redondea al mas cercano, daria 21
Math.random();      // → Genera un numero aleatorio con decimales del menor a 1 por ejemplo: 0.6792349040797971
Math.random();      // → Para generar un numero entre 0 y 10 se puede multiplicar por 10 ejm: Math.random() * 10;


// ↓↓ TEXTOS (strings) ↓↓
let texto = 'murcielago volador'

// PROPIEDADES → Caracteristicas que algo tiene ↓↓
texto.length; // →→ Devuelve la propiedad length de un string

// Metodos (SIN PARAMETROS) → 'Algo que puede hacer' ↓↓
'   hola    '.trim();            // → quitar espacios en blanco al principio y final ejemplo: retorna hola
texto.toUpperCase();       // → Convierte a MAYUSCULAS : retorna MURCIELAGO VOLADOR
texto.toLowerCase();       // → Convierte a MINUSCULAS : retorna murcielago volador

// Metodos (CON PARAMETROS) → 'Algo que puede hacer' ↓↓
texto.indexOf('m');             // → Devuelve la posicion de una letra daria: 0
texto.indexOf('o' , 10);        // → Segundo parametro de este metodo indica desde que posición se va a buscar. daria 12

texto.lastIndexOf('o');         // → Devuelve la posicion de una letra contando al revez daria: 16
texto.lastIndexOf('o', 17);     // → Segundo parametro de este metodo indica desde que posición se va a buscar. daria 16

texto.includes('volador');      // → Pregunta si el texto contiene esa cadena: devuelve true
texto.startsWith('volador');    // → Pregunta si el comienza con esa cadena: devuelve false
texto.endsWith('volador');      // → Pregunta si el termina con esa cadena: devuelve true

// Metodos (CON PARAMETROS): Manipilar strings ↓↓
let newTexto = texto.replace('volador' , 'sin alas');   // → Reemplaza un texto por otro devuelve: "murcielago sin alas"
texto.split('e');           // → Separa un texto segun un caracter : devuelve un ARRAY (ELIMINA EL CARACTER QUE DIVIDE)
texto.substring(4);         // Extrae el texto a partir del index que le paso como parametro (Segundo parametro es opcional indica hasta que indice buscar); Daria "ielago volador"
texto.substr(4 , 2);        // Funciona igual que substring(), PERO el segundo parametro NO indica final, indica cantidad de caracteres que quiero devolver Daria "ie"



// ↓↓↓↓ CONDICIONALES ↓↓↓↓

// ↓↓ CONDICIONALES : una linea ↓↓
if(true) console.log('IF de una linea');

// ↓↓ CONDICIONALES : Bloque ↓↓
    if(true){
        console.log('IF de bloque');
    }else if(true){
        console.log('IF de bloque');
    }
    else{
        console.log('IF de bloque');
    }

// ↓↓ CONDICIONES MULTIPLES ↓↓
if(5>2 && 5>3){
    console.log('Condicion &&');
}
if(false || 5>3){
    console.log('Condicion ||');
}

// ↓↓↓↓↓↓ TRUTHY y FALSY ↓↓ VALORES que : ↓↓↓↓↓↓
//    sin ser FALSE, se comportan como FALSE
// || sin ser TRUE se comportan como TRUE:

// FALSY: ↓↓
0;
"";
NaN;
undefined;
null;

// TRUTHY: ↓↓
/* string no vacio: */ "dhjsahdsjk"
/* Numero diferente de 0 NEGATIVOS tambien: */ "dhjsahdsjk"
/* Arrays: */  var truthy_array = [];
/* Objetos: */  {};

/* ↓↓↓↓ Arrays ↓↓↓↓ */
/* ↓↓↓↓ Arrays - Iteradores ↓↓↓↓ */
let ejemploIterador = ['a','b','c','d','e','f'];
let arrayIteradorKeys = ejemploIterador.keys();
let arrayIteradorValues = ejemploIterador.values();
let arrayIteradorEntries = ejemploIterador.entries();
// Todos los iteradores tienen un médodo next() que devuelve un objeto con las propiedades de array cada vez que se llama y que guarda la posicion.
console.log(arrayIteradorKeys.next());
console.log('Esto no interrumpe el ciclo');
console.log(arrayIteradorKeys.next());
console.log(arrayIteradorKeys.next());

// FUNCIONES
// FUNCIONES
// FUNCIONES

function saludar(person, sexo) {
    let saludo = sexo === 'm' ? 'Bienvenida' : 'Bienvenido';
    return `${saludo} ${person}`
}
console.log(saludar('Brayan'));
console.log(saludar('Camila' , 'm'));




// FUNCION con parametros REST: permiten representar un número indefinido de argumentos como un array ↓↓
const sumarTodo = (...numeros) => {
    let resultado = 0;
    for (let i = 0; i < numeros.length; i++) {
        resultado += numeros[i];
    }
    return resultado
}
// console.log( sumarTodo(2,5,7) );

// ↓↓ Funciones como ciudadanos de primera clase ↓↓
// ↓↓ Funciones como ciudadanos de primera clase ↓↓
// • Pueden ser almacenadas en variables y constates
        const functionSumar = (number1 , number2) => number1 + number2;

// • Pueden ser pasadas como argumentos (callback)
        // console.log( functionSumar(3 , functionSumar(1,2) ) );

// • Pueden ser retornadas (closures)
    function functionSumarToReturn(x){
        return function(y){
            return x + y;
        }
    }
    // Equivalencia de lo anterior ↑ como ↓↓ arrow function ↓↓
    // const functionSumarToReturn = (x) => (y) => x+y;
    console.log( functionSumarToReturn(5)(4) );
    // ↓ 🐷 Un ejemplo mas cerdo 🐷 ↓
    const doSomething = (x) => (y) => x * y;
    const doSomethingA = doSomething(2)(2)
    const doSomethingB = doSomething(3)
    console.log( doSomething(doSomethingA)(doSomethingB(3)) );

// • Pueden tener metodos y propiedades (PPO → programacion orientada a objetos)


// ↓↓↓ Closures ↓↓↓ Closures ↓↓↓
// ↓↓↓ Closures ↓↓↓ Closures ↓↓↓
// ↓↓↓ Closures ↓↓↓ Closures ↓↓↓

function closure() {
    var numero = 0;
    return function(){
        numero ++
        console.log(numero);
    }
}
// ↓↓ La funcion closure retorna una funcion anónima que se guarda en runClosure
const runClosure = closure();

// ↓↓ Al ejecutar closure()() el contador NOO aumenta
    // closure()();
    // closure()();
    // closure()();
    // closure()();
    // closure()();
// ↓↓ Al ejecutar runClosure() el contador aumenta
    // runClosure();
    // runClosure();
    // runClosure();
    // runClosure();
    // runClosure();
    // runClosure();

// ↑↑↑ Closures ↑↑↑ Closures ↑↑↑
// ↑↑↑ Closures ↑↑↑ Closures ↑↑↑
// ↑↑↑ Closures ↑↑↑ Closures ↑↑↑

// ↓↓ this 
// ↓↓ this 
// ↓↓ this representa el objeto actual
