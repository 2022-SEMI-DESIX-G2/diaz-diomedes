function CalcularFibo(tam){
    let fibo = 1;
    let fiboAnt = 0;
    let fiboTempo = 0;
    let fiboList = [0];        
    for(let i=0; i<parseInt(tam)-1; i++){
        fiboList.push(fibo);
        fiboTempo = fibo;
        fibo = fiboAnt + fibo;
        fiboAnt = fiboTempo;
    }
    return fiboList
}


function InvocarTarjetas(fiboList){
    const tarjetas = document.getElementById("tarjetas");
    while (tarjetas.firstChild){
        tarjetas.removeChild(tarjetas.firstChild)
    }

    fiboList.forEach(fibo => {
        let card = document.createElement("div");
        card.className = "card"
        let texto = document.createTextNode(fibo);
        let text = document.createElement("p");
        text.appendChild(texto);
        card.appendChild(text);
        tarjetas.appendChild(card);
        console.log(fibo);
    },)
}

function Calcular(){
    res = CalcularFibo(document.getElementById("numero").value)
    InvocarTarjetas(res)
}