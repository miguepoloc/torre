# Generated by Django 2.2.10 on 2020-10-13 22:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20200924_0031'),
    ]

    operations = [
        migrations.AddField(
            model_name='jugador',
            name='error',
            field=models.CharField(default='No', max_length=200),
        ),
        migrations.AddField(
            model_name='jugador',
            name='n_error',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
