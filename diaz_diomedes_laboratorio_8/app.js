const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/fibonacii/:valor', function (req, res) {
    let valor = req.params.valor
    let resultado = fibonacci(valor)
    res.json({sequence : resultado})
})

function fibonacci(val){
    let fibo = 0;
    let fiboAnt = 1;
    let fiboTempo = 0;
    let fiboList = [];        
    for(let i=0; i<=parseInt(val)-1; i++){
        fiboList.push(fibo);
        fiboTempo = fibo;
        fibo = fiboAnt + fibo;
        fiboAnt = fiboTempo;
    }
    return fiboList
}

app.listen(3000)