// Escribir una función que, dado un número "n" ( 0 < n < 1000000), retorne la sumatoria de todos los número primos debajo de ese número.
// Ejemplo: Dado 7
// Se debería retornar 18, ya que: 1 + 2 + 3 + 5 + 7 = 18 ((1 no es un numero primo, la respuesta es 17))

var numero = 7;
sum = 0

for (let i = numero; i >= 2; i--) {
    if (!(i == 0 || i == 1 || i == 4)){
        let primo = true;
        for (let x = 2; x < i; x++) {
            if (i % x === 0){
                primo = false;
            }
        }
        sum = primo ? sum+=i : sum; 
    }
}
console.log(sum)