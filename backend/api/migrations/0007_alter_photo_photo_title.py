# Generated by Django 4.1.7 on 2023-04-05 15:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_photo_photo_caption_alter_photo_photo_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='photo_title',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
    ]