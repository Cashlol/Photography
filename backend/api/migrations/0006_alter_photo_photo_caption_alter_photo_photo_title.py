# Generated by Django 4.1.7 on 2023-04-05 14:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_photo_photo_caption_alter_photo_photo_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='photo_caption',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='photo',
            name='photo_title',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]