((Utils) => {

    const Sudoku = {
        htmlElements: {
            sudokuForm: document.querySelector('#sudokuForm'),
            sudokuTabla: document.querySelector('#sudokuTabla')
        },

        init: () => {
            Sudoku.handlers.onInitGenerarSudoku();
            Sudoku.htmlElements.sudokuForm.addEventListener('submit', Sudoku.handlers.verificarSudoku);
        },
        utils: {
            ...Utils.methods,
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
                inputSudoku.id = "sudo" + i + j;
                // casilla.contentEditable = false;
                casilla.appendChild(inputSudoku);
                if(valor != " "){
                    // casilla.contentEditable = true;
                    inputSudoku.className = "inputDef";
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
            onInitGenerarSudoku: () => {
                for(let i=0; i<9; i++){
                    cuadroSudoku = Sudoku.utils.generarSudoku();
                    // console.log({cuadroSudoku});
                    Sudoku.handlers.mostrarSudoku(cuadroSudoku);
                }
                    // tabla = Sudoku.htmlElements.sudokuTabla.appendChild(Sudoku.templates.filas());
                    // for (let j=0; j<9; j++) {
                    //     cuadroSudoku[i][j] = Math.floor(Math.random() * (9 - 1)) + 1;

                    //     // listo = false;
                    //     // while(!listo){
                    //     //     listo = true;
                    //     //     console.table(cuadroSudoku);
                    //     //     for (let k=j-1; k>=0; k--) {
                    //     //         if((cuadroSudoku[i][j] == cuadroSudoku[i][k])){
                    //     //             listo = false;
                    //     //             cuadroSudoku[i][j] = Math.floor(Math.random() * (9 - 1)) + 1;
                    //     //         }
                    //     //     }
                    //     // }
                    //     // console.log(listo);
                    //     tabla.appendChild(Sudoku.templates.cuadriculas(cuadroSudoku[i][j], i, j))
                  // }
                // listo = false;
                // while (!listo){
                //     listo = true;
                //     console.log({cuadroSudoku})
                //     cuadroSudoku.sort(function() { return Math.random() - 0.5});
                //     for (let i=0; i<9; i++) {
                //         for (let j=0; j<9; j++) {
                //             for (let k=0; k<9; k++) {
                //                 for (let l=0; l<9; l++) {
                //                     if(i != k && j != l){
                //                         if((parseInt(i/3) == parseInt(k/3)) && (parseInt(j/3) == parseInt(l/3))){
                //                             if(cuadroSudoku[i][j] == cuadroSudoku[k][l]){
                //                                 listo = false;
                //                                 console.log(listo);
                //                                 break;
                //                             }
                //                         }
                //                     }
                //                 }
                //             }
                //         }
                //     }
                // }

                // sudokUser = cuadroSudoku;
                // for(let i=0; i<12; i++){
                //     x = parseInt(Math.floor(Math.random() * 8));
                //     y = parseInt(Math.floor(Math.random() * 8));
                //     if(sudokUser[x][y] !== " "){
                //         sudokUser[x][y] = " ";
                //     }
                    
                // }
                
                // Sudoku.handlers.mostrarSudoku(cuadroSudoku)
                
            },
            mostrarSudoku: (listaSudoku) => {
                console.log(listaSudoku);
                tabla = Sudoku.htmlElements.sudokuTabla.appendChild(Sudoku.templates.filas());
                listaSudoku.forEach(element => {
                    tabla.appendChild(Sudoku.templates.cuadriculas(element));
                });
                for(let i = 0; i < 9; i++) {
                    tabla = Sudoku.htmlElements.sudokuTabla.appendChild(Sudoku.templates.filas());
                    for (let j=0; j < 9; j++){
                        tabla.appendChild(Sudoku.templates.cuadriculas(listaSudoku[i][j], i, j))
                    }
                };
            },
            

            verificarSudoku: (e) => {
                sudokuPlayer = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0],];
                e.preventDefault();
                // console.log(Sudoku.htmlElements.sudokuForm.childElementCount);
                // for(let i=0; i<9; i++){
                //     for(let j=0; j<9; j++){
                //         if(document.querySelector(`#sudo${i}${j}`).value == " "){
                //             break;
                //         }
                //         sudokuPlayer[i][j] = document.querySelector(`#sudo${i}${j}`).value;    
                //     }
                // }
                // if(sudokuPlayer === cuadroSudoku){
                //     console.log("---GANASTE---")
                // }
                // console.table(cuadroSudoku);
            }
        }
    }
    Sudoku.init()

})(document.Utils);

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
