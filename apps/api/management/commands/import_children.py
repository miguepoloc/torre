import csv
import datetime
from django.core.management.base import BaseCommand
from apps.api.models import Children


class Command(BaseCommand):
    help = 'Import children data from CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str)

    def handle(self, *args, **options):
        file_path = options['csv_file']

        with open(file_path, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                # Parse date (adjust format as needed)
                try:
                    date_parts = row['fecha_nacimiento'].split('/')
                    birth_date = datetime.date(
                        int(date_parts[2]), int(date_parts[1]), int(date_parts[0])  # year  # month  # day
                    )
                except (ValueError, IndexError):
                    self.stdout.write(
                        self.style.WARNING(f"Invalid date format for {row['nombre']}: {row['fecha_nacimiento']}")
                    )
                    continue

                # Create object
                Children.objects.create(
                    vinculador=row['vinculador'],
                    nombre=row['nombre'],
                    sexo=row['sexo'],
                    fecha_nacimiento=birth_date,
                    edad=int(row['edad']),
                    colegio=row['colegio'] if row['colegio'] else None,
                    estrato=int(row['estrato']) if row['estrato'] else None,
                    nombre_acudiente=row['nombre_acudiente'],
                    telefono=row['telefono'] or None,
                    correo=row['correo'] or None,
                    codigo=row['codigo'],
                    aros=int(row['aros']),
                )

        self.stdout.write(self.style.SUCCESS('Successfully imported children data'))
