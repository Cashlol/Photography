# Generated by Django 4.1.7 on 2023-04-05 12:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_photo_photo_title'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='photo',
            name='date_updated',
        ),
    ]