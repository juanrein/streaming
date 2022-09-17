from django.contrib import admin

# Register your models here.
from .models import Media, Category, Episode, Movie, Season, Favorite

admin.site.register(Media)
admin.site.register(Category)
admin.site.register(Episode)
admin.site.register(Movie)
admin.site.register(Season)
admin.site.register(Favorite)