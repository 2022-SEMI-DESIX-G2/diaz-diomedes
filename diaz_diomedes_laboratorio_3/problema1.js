// Escribir una función que, dada una cadena "t", retorne si un número es un palíndromo de doble base o no. (Palíndromo en base 10 y base 2)
var numero = 123;
var isPalindromo = true;
var isPalindromoDoble = true;
var palindromo = numero.toString();
var palindromoDoble = numero.toString(2);
j = palindromo.length - 1;
for (var i = 0; i < palindromo.length; i++) {
    if (palindromo[i] != palindromo[j]) {
        isPalindromo = false;
    }
    j--;}
j = palindromoDoble.length - 1;
for (var i = 0; i < palindromoDoble.length; i++) {
    if (palindromoDoble[i] != palindromoDoble[j]) {
        isPalindromoDoble = false;
    }
    j--;}
console.log(isPalindromo)
console.log(isPalindromoDoble)