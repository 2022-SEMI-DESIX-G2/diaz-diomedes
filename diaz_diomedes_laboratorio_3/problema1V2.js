// Escribir una función que, dada una cadena "t", retorne si un número es un palíndromo de doble base o no. (Palíndromo en base 10 y base 2)
var numero = 15351;
console.log(`Es palindromo?: ${ numero.toString() == numero.toString().split('').reverse().join('')}`);
console.log(`Es palindromon doble?: ${ numero.toString(2) == numero.toString(2).split('').reverse().join('')}`);