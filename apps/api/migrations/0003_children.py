# Generated by Django 2.2.10 on 2020-09-24 04:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20200922_2105'),
    ]

    operations = [
        migrations.CreateModel(
            name='Children',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('vinculador', models.CharField(max_length=200)),
                ('nombre', models.CharField(max_length=200)),
                ('sexo', models.CharField(max_length=200)),
                ('fecha_nacimiento', models.CharField(max_length=200)),
                ('edad', models.IntegerField()),
                ('colegio', models.CharField(max_length=200)),
                ('estrato', models.IntegerField()),
                ('nombre_acudiente', models.CharField(max_length=200)),
                ('telefono', models.IntegerField()),
                ('correo', models.EmailField(max_length=254)),
            ],
        ),
    ]
