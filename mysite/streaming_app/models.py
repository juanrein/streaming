from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Media(models.Model):
    title = models.CharField(max_length=200)
    genre = models.ForeignKey(Category, on_delete=models.CASCADE)
    thumbnail = models.ImageField(upload_to="thumbnail/")
    MOVIE = "movie"
    SERIES = "series"
    type = models.CharField(
        max_length=200, 
        choices=[(MOVIE,MOVIE), (SERIES,SERIES)], 
        default=MOVIE)

    def __str__(self):
        return self.title

class Season(models.Model):
    number = models.IntegerField()
    show = models.ForeignKey(Media, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)


class Episode(models.Model):
    number = models.IntegerField()
    title = models.CharField(max_length=200)
    season = models.ForeignKey(Season, on_delete=models.CASCADE)
    content = models.FileField(upload_to="video/series/")

class Movie(models.Model):
    content = models.FileField(upload_to="video/movies/")
    media = models.ForeignKey(Media, on_delete=models.CASCADE)
    