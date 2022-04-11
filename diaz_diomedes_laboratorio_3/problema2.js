// Escribir una función que, dada una cadena "t", retorne la cantidad de caracteres de la cadena.
// Ejemplo: Dado AABBBACAA
// Se debería retornar que hay 5 A, 3 B, 1 C. El tipo de dato del retorno es a discreción del estudiante.
var frase = "AABBBASASAGGGASAAA".toUpperCase().replace(/\s+/g, ' ');
var cantidad = [];
var lista = [];
for (let i in frase) {
    cantidad[lista.indexOf(frase[i])] = lista.includes(frase[i]) ? cantidad[lista.indexOf(frase[i])]+=1 : (lista.push(frase[i]), cantidad.push(1));}
for (let i in lista){
console.log(`${lista[i]}:${cantidad[i]}`);}
