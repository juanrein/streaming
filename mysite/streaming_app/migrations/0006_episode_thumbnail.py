# Generated by Django 4.1 on 2022-09-16 19:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('streaming_app', '0005_rename_favourite_favorite'),
    ]

    operations = [
        migrations.AddField(
            model_name='episode',
            name='thumbnail',
            field=models.ImageField(default='', upload_to='thumbnail/'),
            preserve_default=False,
        ),
    ]
