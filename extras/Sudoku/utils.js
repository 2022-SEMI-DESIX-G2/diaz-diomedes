(() => {
    const Utils = {
        methods: {
            generarSudoku: () => {
                let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                let cuadroSudoku = [];                   
                for (let i=0; i<1; i++) {
                    numeros.sort(function() { return Math.random() - 0.5});
                    cuadroSudoku.push([...numeros]);
                    listo = false;
                    // console.log("aqui");
                    // while(!listo){
                    //     listo = true;
                    //     for(let j=0; j<9; j++){
                    //         for(let k=i-1; k>0; k--){
                    //             console.log({i},{j},{k});
                    //             if(i == j){
                    //                 if(cuadroSudoku[i][k] == cuadroSudoku[j][k]){
                    //                     numeros.sort(function() { return Math.random() - 0.5});
                    //                     cuadroSudoku[i] = [...numeros];
                    //                     listo = false;
                    //                 }
                    //             }
                    //         }
                    //     }
                    //     console.log({listo});
                    // }
                    // console.log(cuadroSudoku);
                    // retorno = [...cuadroSudoku[i]];
                    yield cuadroSudoku[i];
                }

            }
        }
    }
    document.Utils = Utils;
})();