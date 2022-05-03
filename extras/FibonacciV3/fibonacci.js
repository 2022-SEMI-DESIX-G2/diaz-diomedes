((Utils) => {
    const App = {
        htmlElements: {
            formulario: document.querySelector("#formulario"),
            input: document.querySelector("#numero"),
            tarjetas: document.querySelector("#tarjetas"),
        },
        init: () => {
            App.htmlElements.formulario.addEventListener("submit", App.handlers.formularioSubmit);
            App.htmlElements.tarjetas.addEventListener("click", App.handlers.tarjetaClick)
        },
        utils: {
            ...Utils.methods,
        },
        templates: {
            tarjeta: (val) => {
                let card = document.createElement("div");
                card.className = "card"
                let texto = document.createTextNode(val);
                card.appendChild(texto);
                return card;
            }
        },
        handlers:{
            formularioSubmit: (e) => {
                e.preventDefault();
                App.htmlElements.tarjetas.innerHTML = '';
                fiboList = App.utils.calcularFibo()
                for(let i = 1; i<=App.htmlElements.input.value;i++){
                    App.htmlElements.tarjetas.appendChild(App.templates.tarjeta(fiboList.next().value))
                }
            },
            tarjetaClick: (e) => {
                console.log(e);
                if(e.target.className == "card"){
                    if(confirm("Tas seguro de borrar esto??")){
                        e.target.remove();
                    }
                }
            }
        }
    };
    App.init();
})(document.Utils);

