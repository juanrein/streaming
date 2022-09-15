from django.contrib import admin

# Register your models here.
from .models import Media, Category

admin.site.register(Media)
admin.site.register(Category)