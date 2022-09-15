from turtle import ondrag
from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Media(models.Model):
    title = models.CharField(max_length=200)
    genre = models.ForeignKey(Category, on_delete=models.CASCADE)
    thumbnail = models.ImageField()

    def __str__(self):
        return self.title