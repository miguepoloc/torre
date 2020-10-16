var dato_de;
$.get(
    '/api/jugador/',
    function (data) {
        console.log(data);
        var lista_csv = [];
        var lista_csv_nombre = [];
        var lista_nombres = [];
        let nombre_actual;
        for (let index = 0; index < data.length; index++) {
            lista_csv.push([data[index].id, data[index].nombre, data[index].fecha, data[index].n_juego, data[index].intento,
            data[index].error, data[index].n_error, data[index].sentimiento, data[index].movimiento,
            data[index].tiempo_entre_movimiento, data[index].posicion, data[index].tiempo_total]);

            // Control de niños
            nombre_actual = data[index].nombre.toUpperCase();
            if (lista_nombres.includes(nombre_actual) == false) {
                lista_nombres.push(nombre_actual);
            }
        }

        // Aquí viene el dato
        objeto_jugadores["csv"] = "";
        objeto_jugadores["csv"] += "Nombre del proyecto:;" + "Torre de Hanoi" + "\r\n";
        objeto_jugadores["csv"] += "Lugar:;" + "Santa Marta" + "\r\n";
        objeto_jugadores["csv"] += "" + "\r\n";
        objeto_jugadores["csv"] += "" + "\r\n";

        objeto_jugadores["csv"] += "Id;Nombre;Fecha;# Juego;Intento;Error;# Error;Sentimiento;Movimiento;Tiempo entre movimiento;Posicion;Tiempo total" + "\r\n";
        for (let ix = 0; ix < lista_csv.length; ix++) {
            objeto_jugadores["csv"] += String(lista_csv[ix][0]) + ";";
            objeto_jugadores["csv"] += String(lista_csv[ix][1]) + ";";
            objeto_jugadores["csv"] += String(lista_csv[ix][2]) + ";";
            objeto_jugadores["csv"] += String(lista_csv[ix][3]) + ";";
            objeto_jugadores["csv"] += String(lista_csv[ix][4]) + ";";
            objeto_jugadores["csv"] += String(lista_csv[ix][5]) + ";";
            objeto_jugadores["csv"] += String(lista_csv[ix][6]) + ";";
            objeto_jugadores["csv"] += String(lista_csv[ix][7]) + ";";
            objeto_jugadores["csv"] += String(lista_csv[ix][8]) + ";";
            objeto_jugadores["csv"] += String(lista_csv[ix][9]);
            objeto_jugadores["csv"] += "" + "\r\n";
        }
        objeto_jugadores["csv"] += "" + "\r\n";


        // SELECT
        for (i = 0; i < lista_nombres.length; i++) {
            // Se crea un elemento tipo option
            let z = document.createElement("option");
            // Al cual se le asigna el valor de la variable
            z.setAttribute("value", lista_nombres[i]);
            // Y se le asigna al valor a mostrar el valor de variable_des
            let t = document.createTextNode(lista_nombres[i]);
            z.appendChild(t);
            // Luego se añade al html
            document.getElementById("select_children").appendChild(z);
        }


        var select = document.getElementById('select_children');
        var selectedOption;
        var user;
        // Cuando el select cambie
        select.addEventListener('change',
            function () {
                selectedOption = this.options[select.selectedIndex];
                // En este caso imprime el valor y el texto del select seleccionado
                document.getElementById("descarga_uno").innerHTML = "Descargar datos de: " + selectedOption.value;
                console.log(selectedOption.value + ': ' + selectedOption.text);
                user = selectedOption.value;
                dato_de = "Datos de " + user + ".csv"
                for (let index = 0; index < data.length; index++) {
                    if (data[index].nombre.toUpperCase() == selectedOption.value.toUpperCase()) {
                        lista_csv_nombre.push([data[index].id, data[index].nombre, data[index].fecha, data[index].n_juego, data[index].intento,
                        data[index].error, data[index].n_error, data[index].sentimiento, data[index].movimiento,
                        data[index].tiempo_entre_movimiento, data[index].posicion, data[index].tiempo_total]);
                    }

                }

                objeto_uno["csv"] = "";
                objeto_uno["csv"] += "Nombre del proyecto:;" + "Torre de Hanoi" + "\r\n";
                objeto_uno["csv"] += "Lugar:;" + "Santa Marta" + "\r\n";
                objeto_uno["csv"] += "" + "\r\n";
                objeto_uno["csv"] += "" + "\r\n";

                objeto_uno["csv"] += "Id;Nombre;Fecha;# Juego;Intento;Error;# Error;Sentimiento;Movimiento;Tiempo entre movimiento;Posicion;Tiempo total" + "\r\n";
                for (let ix = 0; ix < lista_csv_nombre.length; ix++) {
                    objeto_uno["csv"] += String(lista_csv_nombre[ix][0]) + ";";
                    objeto_uno["csv"] += String(lista_csv_nombre[ix][1]) + ";";
                    objeto_uno["csv"] += String(lista_csv_nombre[ix][2]) + ";";
                    objeto_uno["csv"] += String(lista_csv_nombre[ix][3]) + ";";
                    objeto_uno["csv"] += String(lista_csv_nombre[ix][4]) + ";";
                    objeto_uno["csv"] += String(lista_csv_nombre[ix][5]) + ";";
                    objeto_uno["csv"] += String(lista_csv_nombre[ix][6]) + ";";
                    objeto_uno["csv"] += String(lista_csv_nombre[ix][7]) + ";";
                    objeto_uno["csv"] += String(lista_csv_nombre[ix][8]) + ";";
                    objeto_uno["csv"] += String(lista_csv_nombre[ix][9]);
                    objeto_uno["csv"] += "" + "\r\n";
                }
                objeto_uno["csv"] += "" + "\r\n";

                // grafica(selectedOption)
            }
        );

    }
);

var objeto_jugadores = new Object();
var objeto_uno = new Object();


function descargar() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(objeto_jugadores["csv"]));
    element.setAttribute('download', "datos.csv");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function descargar_uno() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(objeto_uno["csv"]));
    element.setAttribute('download', String(dato_de));
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}