$.get(
    '/api/jugador/',
    function (data) {
        console.log(data);
        var lista_csv = [];
        for (let index = 0; index < data.length; index++) {
            lista_csv.push([data[index].id, data[index].nombre, data[index].fecha, data[index].jugada, data[index].tiempo_entre_jugada, data[index].posicion, data[index].tiempo_total]);
        }
        // console.log(lista_csv);

        // Aquí viene el dato
        objeto_jugadores["csv"] = "";
        objeto_jugadores["csv"] += "Nombre del proyecto:;" + "Torre de Hanoi" + "\r\n";
        objeto_jugadores["csv"] += "Lugar:;" + "Santa Marta" + "\r\n";
        objeto_jugadores["csv"] += "" + "\r\n";
        objeto_jugadores["csv"] += "" + "\r\n";

        objeto_jugadores["csv"] += "Id;Nombre;Fecha;Jugada;Tiempo de jugada;Posicion;Tiempo total" + "\r\n";
        objeto_jugadores["csv"] += "" + "\r\n";
        objeto_jugadores["csv"] += "" + "\r\n";
        for (let ix = 0; ix < lista_csv.length; ix++) {
            // console.log(lista_csv[ix][0]);
            objeto_jugadores["csv"] += String(lista_csv[ix][0]) + ";";
            objeto_jugadores["csv"] += String(lista_csv[ix][1]) + ";";
            objeto_jugadores["csv"] += String(lista_csv[ix][2]) + ";";
            objeto_jugadores["csv"] += String(lista_csv[ix][3]) + ";";
            objeto_jugadores["csv"] += String(lista_csv[ix][4]) + ";";
            objeto_jugadores["csv"] += String(lista_csv[ix][5]) + ";";
            objeto_jugadores["csv"] += String(lista_csv[ix][6]);
            objeto_jugadores["csv"] += "" + "\r\n";
        }
        objeto_jugadores["csv"] += "" + "\r\n";
    }
);

var objeto_jugadores = new Object();

function descargar(evt) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(objeto_jugadores["csv"]));
    element.setAttribute('download', "datos.csv");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}