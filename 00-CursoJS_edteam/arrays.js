// ↓↓↓↓ DESESTRUCTURACION de arrays ↓↓↓↓
// ↓↓↓↓ DESESTRUCTURACION de arrays ↓↓↓↓
arrayDes = ['Esto' , 'es' , 'js' , 'con' , 'arrays'];
let [let1, let2 , let3] = arrayDes;
// console.log(`${let1} ${let2} ${let3}`);

// ↓↓↓↓ Agregar / quitar elementos ↓↓↓↓
// ↓↓↓↓ Agregar / quitar elementos ↓↓↓↓
    // ➝➝ Al final
    arrayDes.push('ultimo');
    // console.log(arrayDes);
    arrayDes.pop('');
    // console.log(arrayDes);

    // ➝➝ Al Principio
    arrayDes.unshift('primero');
    // console.log(arrayDes);
    arrayDes.shift('');
    // console.log(arrayDes);
    
    // ➝➝ Agregar o borrar items : Custom Position
    // splice( startIndex , quantityToDelete , newVal1 , newVal2 , etc... )
    arrayDes.splice(2 , 0 ,'Tercero' , 'cuarto'); // ➝➝ Agrega despues del segundo index 2 elementos, sin eliminar nungún elemento.
    // console.log(arrayDes);
    arrayDes.splice(2 , 1 , 'nuevoTercero'); // ➝➝ Elimina despues del segundo index un elemento y agrega un elemento;
    // console.log(arrayDes);
    arrayDes.splice(2 , 2); // ➝➝ Elimina despues del segundo index dos elementos
    // console.log(arrayDes);

    // ➝➝ Obtener valores (SIN MODIFICAR ARRAY ORIGINALfdf)
    // slice( start , [end -1] )
    // console.log( arrayDes.slice(0 , 2) );


// ↓↓↓↓ Ordenar elementos ↓↓↓↓
// ↓↓↓↓ Ordenar elementos ↓↓↓↓
    // ➝➝ Invertir array
    // .reverse(); ➝➝ (SI LO MODIFICA)
    // arrayDes.reverse();

    // ➝➝ Ordenar array
    // .sort(callback);
    let vocales = ['e','a','u','i','o'];
    // console.log( vocales.sort() ); // Solo ordena alfabeticamente (CON NUMEROS NO FUNCIONA)
    // Ejemplo ordenar Numeros usando el Callback : ↓↓↓
    let numeros = [6,2,9,5,8,3,10,1,7,4];
    numeros.sort( (a , b) => a - b );
    // console.log( numeros );
    
// ↓↓↓↓ Unir arrays / convertir arrays a strings ↓↓↓↓
// ↓↓↓↓ Unir arrays / convertir arrays a strings ↓↓↓↓
    // string.join('separador'); Une array con el separador que se envíe.
    let joinExample = arrayDes.join('--');
    // console.log( joinExample );
    
    //array.concat(); ➝➝ Une dos arrays
    let concatenar = arrayDes.concat(numeros);
    // console.log( concatenar );

// ↓↓↓↓ Encontrar elementos (METODOS) ↓↓↓↓
// ↓↓↓↓ Encontrar elementos (METODOS) ↓↓↓↓
    // ➝➝ Encontrar indice de un elemento:
    // array.indexOf( value ); ➝➝ Si no lo encuentra devolverá -1
    // console.log( arrayDes.indexOf('js') );
    
    // ➝➝ Encontrar indice de un elemento:
    // array.find( callback(condicion) ); ➝➝ Retorna el primer valor que cumpla con la condicion
    let ejFind = ['silla', 'mesa', 'tuberia', 'mesa', 'balon', 'tenedor'];
    console.log(
        // ejFind.find( (a,b,c) => a == 'mesa' ) // retorna mesa porque es el priero que encuentra
    );
    console.log(
        // ejFind.find( (a,b,c) => b == 2 ) // retorna tuberia por que cumple la condicion (index == 2)
    );
    // array.findIndex( callback(condicion) ); ➝➝ Retorna el index del primer valor que cumpla la condicion
    console.log(
        // ejFind.findIndex( (a,b,c) => a == 'tuberia' ) // Retorna 2, que es el indice de tuberia
    );


// ↓↓↓↓ Spread operator en arrays ↓↓↓↓
// ↓↓↓↓ Spread operator en arrays ↓↓↓↓
    // ➝➝ Eliminar elementos duplicados
    let ejSpread = ['silla', 'mesa', 'tuberia', 'mesa', 'balon', 'tenedor', 'silla'];
    console.log(
        // new Set( ejSpread ) // retorna un OBJETO sin valores repetidos
    );
    console.log(
        // [ ...new Set( ejSpread ) ] // [TRUCO] que retorna un Array sin valores repetidos
    );

    // ➝➝ Max Min de un array
    let ejSpread2 = [3,45,25,87,54,98,27,54,14,76];
    console.log(
        // Math.max( ejSpread2 ) // -> da error NAN
        // Math.max( ...ejSpread2 ) // -> Error NAN solucionado
    )


// Recorrer arrays
    const testArray = ['ejemplo' , 'array', 'numeros' , 1 , 2 , 3];
    // → for() →→ normal Este ya lo sabes =D

    // → for of( let iterator of array )
    // for (const iterator of testArray) {
    //     console.log(iterator);
    // }
    
    // → forEach( callcack(elemento , index) )
    // testArray.forEach( (el, i ) => {
    //     console.log('el: ' + el);
    //     console.log('i: ' + i);
    // } );
    
    // .forEach() → Es un Metodo que itera un array
    // array.forEach( callcack(elemento , index) )
    // testArray.forEach( (el, i , array) => {
    //     console.log('el: ' + el);
    //     console.log('i: ' + i);
    // } );
    
    
    // .some( callcack(elemento) ) → Es un Metodo que recibe una condicion (retorna TRUE si al menos UN ELEMENTO del array cumple la condición).
    console.log(
        testArray.some( (el) => el.includes('numeros') ) // Retorna TRUE porque 'numeros' si se encuentra en el array
    );
    // .every( callcack(elemento) ) → Es un Metodo que recibe una condicion (retonta TRUE si TODOS los elemento del array cumple la condición).
    console.log(
        testArray.every( (el) => el.length >= 1 ) // Retorna TRUE porque todos los elementos tienen más de una letra
    );