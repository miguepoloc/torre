# Generated by Django 2.2.10 on 2020-09-24 05:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20200924_0019'),
    ]

    operations = [
        migrations.AlterField(
            model_name='children',
            name='telefono',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]