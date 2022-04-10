// Escribir una función que, dado un año "a", retorne si ese año es bisiesto o no.
var year = 12133;
console.log(`es año biciesto: ${year%400 === 0 ? 'si señor' : year%100 === 0 ? 'no señor' : year%4 === 0 ? 'si señor' : 'no señor'}`);