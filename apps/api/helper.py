from datetime import datetime

now = datetime.now()


def fecha_actual():
    fecha = str(now.date()) + " " + str(now.time()).split(".")[0]
    return (fecha)
