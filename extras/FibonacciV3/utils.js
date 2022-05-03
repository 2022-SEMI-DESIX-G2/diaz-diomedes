(() => {
    const Utils = {
        methods: {
            calcularFibo: function* () {
                let fibo = 0;
                let fiboAnt = 1;
                let fiboTempo = 0;
                while(true){
                    fiboTempo = fibo;   
                    yield fibo;
                    fibo = fiboAnt + fibo;
                    fiboAnt = fiboTempo;
                }
            }


        }
    };
    document.Utils = Utils;
})()