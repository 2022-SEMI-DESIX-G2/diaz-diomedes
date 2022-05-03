((Utils) => {

    const Sudoku = {
        htmlElements: {
            sudokuForm: document.querySelector('#sudokuForm'),
            sudokuTabla: document.querySelector('#sudokuTabla')
        },

        init: () => {
            Sudoku.handlers.generarSudoku();
            Sudoku.htmlElements.sudokuForm.addEventListener('submit', null);
        },
        utils: {

        },
        templates: {
            cuadriculas: (valor) => {
                let casilla = document.createElement("td");
                casilla.className = "linea"
                let inputSudoku = document.createElement("input");
                inputSudoku.type = "number";
                inputSudoku.value = valor;
                inputSudoku.min = 1;
                inputSudoku.max = 9;
                // casilla.contentEditable = false;
                casilla.appendChild(inputSudoku);
                if(valor != " "){
                    // casilla.contentEditable = true;
                    casilla.className = "inputDef";
                }
                return casilla;
            },
            filas: () => {
                let fila = document.createElement("tr");
                fila.className = "fila";
                return fila;
            } 
        },
        handlers: {
            generarSudoku: () => {
                cuadroSudoku = [[1, 2, 3, 4, 5, 6, 7, 8, 9],
                                [2, 3, 4, 5, 6, 7, 8, 9, 1],
                                [3, 4, 5, 6, 7, 8, 9, 1, 2],
                                [4, 5, 6, 7, 8, 9, 1, 2, 3],
                                [5, 6, 7, 8, 9, 1, 2, 3, 4],
                                [6, 7, 8, 9, 1, 2, 3, 4, 5],
                                [7, 8, 9, 1, 2, 3, 4, 5, 6],
                                [8, 9, 1, 2, 3, 4, 5, 6, 7],
                                [9, 1, 2, 3, 4, 5, 6, 7, 8],];

                // for(let i=0; i<9; i++){
                //     for(let j=0; j<9; j++){
                //         cuadroSudoku[i][j] = Math.floor(Math.random() * 9) + 1;
                //         for(let k=j; k>0; k--){
                //             if(cuadroSudoku[i][j] == cuadroSudoku[i][k]){
                //                 cuadroSudoku[i][j] = Math.floor(Math.random() * 9) + 1;
                //             }
                //         }
                //     }
                // }
                // var arr1 = ["a", "b", "c", "d"];
                listo = false;
                while (!listo){
                    listo = true;
                    console.log({cuadroSudoku})
                    cuadroSudoku.sort(function() { return Math.random() - 0.5});
                    for (let i=0; i<9; i++) {
                        // console.log({i});
                        for (let j=0; j<9; j++) {
                            for (let k=0; k<9; k++) {
                                for (let l=0; l<9; l++) {
                                    if(i != k && j != l){
                                        if((parseInt(i/3) == parseInt(k/3)) && (parseInt(j/3) == parseInt(l/3))){
                                            if(cuadroSudoku[i][j] == cuadroSudoku[k][l]){
                                                listo = false;
                                                console.log(listo);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                sudokUser = cuadroSudoku;
                for(let i=0; i<12; i++){
                    x = parseInt(Math.floor(Math.random() * 8));
                    y = parseInt(Math.floor(Math.random() * 8));
                    if(sudokUser[x][y] !== " "){
                        sudokUser[x][y] = " ";
                    }
                }
                Sudoku.handlers.mostrarSudoku(sudokUser)
                
            },
            mostrarSudoku: (listaSudoku) => {
                for(let i = 0; i < 9; i++) {
                    tabla = Sudoku.htmlElements.sudokuTabla.appendChild(Sudoku.templates.filas());
                    for (j of listaSudoku[i]){
                        tabla.appendChild(Sudoku.templates.cuadriculas(j))
                    }
                };
            }
            

            // verificarSudoku 
        }
    }
    Sudoku.init()

})(document.Utils)

// sudoku1 =  ["987654321",,3,6,5,4,8,7,9];

// fila1 = document.querySelector('.fila1');
// sudoku1.forEach(e => {
//     console.log(e)
//     if(e != ""){
//         fila1.innerHTML += `<td class="linea"><input type="number" value="${e}" min="0" max="9" class="s${e}"></td>`;
//     }
//     else{
//         fila1.innerHTML += `<td class="linea"><input type="number" value="${e}" min="0" max="9" class="s${e}"></td>`;

//     }
// });
