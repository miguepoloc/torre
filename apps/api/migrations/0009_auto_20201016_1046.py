# Generated by Django 2.2.10 on 2020-10-16 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_children_codigo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jugador',
            name='tiempo_entre_movimiento',
            field=models.FloatField(),
        ),
    ]