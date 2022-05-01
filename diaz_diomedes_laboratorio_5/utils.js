(() => {
    const Utils = {
        methods: {
            calcularFibo: (tam) => {
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


        }
    };
    document.Utils = Utils;
})()