# Generated by Django 2.2.10 on 2020-10-24 21:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_auto_20201016_1046'),
    ]

    operations = [
        migrations.AddField(
            model_name='children',
            name='aros',
            field=models.IntegerField(default=3),
            preserve_default=False,
        ),
    ]
